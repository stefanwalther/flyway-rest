export function addParams( params ) {
  return function( req, res, next ) {
    Object.assign( req.body, params );
    return next();
  }
}

export function validateParams() {
  return function( req, res, next ) {
    let validationErrors = [];

    if ( req.body && !req.body.flyway_args ) {
      validationErrors.push( 'Missing Flyway arguments.' );
    }

    if ( req.body.flyway_args && !req.body.flyway_args.url ) {
      validationErrors.push( 'Argument url is mandatory.' );
    }

    if ( req.body.flyway_args && !req.body.flyway_args.user ) {
      validationErrors.push( 'Argument user is mandatory.' );
    }

    if ( req.body.flyway_args && !req.body.flyway_args.password ) {
      validationErrors.push( 'Argument password is mandatory.' );
    }

    // Check for files:
    //
    //  CHECK
    //  - migrate
    //  - repair
    //  - validate
    //
    //  NO CHECK
    //  - baseline
    //  - clean
    //  - info
    if ( req.body && [ 'migrate', 'validate', 'repair' ].indexOf( req.body.action ) > -1 ) {
      if ( !req.body.files || !Array.isArray( req.body.files )) {
        validationErrors.push( 'Action requires files.' );
      }
    }

    // Todo: Generalize restStatus
    if ( validationErrors.length > 0 ) {
      res.status( 500 );
      res.json( {
        status: 'ValidationError',
        errorMsg: 'Validation of parameters failed.',
        validationErrors: validationErrors
      } );
      res.end();
    } else {
      return next();
    }
  };
}
