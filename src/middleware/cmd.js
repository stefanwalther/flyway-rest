import execa from 'execa';

export function exec() {
  return function( req, res, next ) {

    let command = buildCommand( req.body.flyway_args, req.body.command );

    let result = {
      mode: req.body.mode,
      cmd: command,
      ts_start: new Date().toJSON()
    };

    if ( !result.mode === 'simulation' ) {
      execa.shell( command )
        .then( result => {
          res.status( 200 );
          result.status = 'OK';
          finish( next );
        } )
        .catch( error => {
          res.status( 500 );
          result.status = 'Error';
          finish( next );

        } );
    } else {
      finish( next );
    }

    function finish( next ) {

      res.json( result );
      next();
    }
  };

}

export function buildCommand( flyWayArgs, command = 'info' ) {

  if ( !flyWayArgs || (typeof flyWayArgs === 'object' && Object.keys( flyWayArgs ).length < 1) ) {
    throw new Error( 'No Flyway args defined.' );
  }

  if ( [ 'clean', 'info', 'validate', 'baseline', 'repair', 'migrate' ].indexOf( command ) <= -1 ) {
    throw new Error( 'Invalid Flyway command.', command );
  }

  var space = ' ';
  var cmd = 'flyway';
  for ( const key of Object.keys( flyWayArgs ) ) {
    cmd += space + '--' + key + space + flyWayArgs[ key ];
  }
  cmd += space + command;
  return cmd;

}


