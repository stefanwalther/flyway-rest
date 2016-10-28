import execa from 'execa';

export function exec() {
  return function( req, res, next ) {

    res.status( 200 );
    let result = {
      mode: req.body.mode,
      cmd: buildCommand( req.body.flyway_args ),
      ts_start: new Date().toJSON(),
      status: 'OK'
    };
    console.log( 'server', result );
    res.json( result );
    next();
  };

}

export function buildCommand( args ) {
  return `flyway `;
}


