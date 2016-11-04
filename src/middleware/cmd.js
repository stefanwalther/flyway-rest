import execa from 'execa';

export function exec() {
  return function( req, res, next ) {

    let command = buildCommand( req.body.flyway_args, req.body.action );

    let returnResult = {
      mode: req.body.mode,
      cmd: command,
      ts_start: new Date().toJSON(),
      action: req.body.action
    };

    // Only execute if the mode is not 'simulation'
    if ( returnResult.mode !== 'simulation' ) {
      execa.shell( command )
        .then( result => {
          returnResult.status = 'OK';
          returnResult.stdout = result;
          res.status( 200 );
          finish( next );
        } )
        .catch( error => {
          returnResult.status = 'Error';
          returnResult.stderr = error;
          res.status( 500 );
          finish( next );

        } );
    } else {
      returnResult.status = 'OK';
      finish( next );
    }

    function finish( next ) {

      res.json( returnResult );
      next();
    }
  };

}

export function buildCommand( flyWayArgs, action = 'info' ) {

  if ( !flyWayArgs || (typeof flyWayArgs === 'object' && Object.keys( flyWayArgs ).length < 1) ) {
    throw new Error( 'No Flyway args defined.' );
  }

  if ( [ 'clean', 'info', 'validate', 'baseline', 'repair', 'migrate' ].indexOf( action ) <= -1 ) {
    throw new Error( 'Invalid Flyway action.', action );
  }

  var space = ' ';
  let del = '=';
  var cmd = 'flyway';
  for ( const key of Object.keys( flyWayArgs ) ) {
    cmd += space + '-' + key + del + flyWayArgs[ key ];
  }
  cmd += space + action;
  return cmd;

}


