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

    // Check for files for all actions except
    //  - baseline
    if ( req.body.flyway_args && [ 'migrate', 'info', 'validate', 'repair' ].indexOf( req.body.action ) > -1 ) {
      if ( !req.body.flyway_args.files || !Array.isArray(req.body.flyway_args.files) && !req.body.flyway_args.files.length <= 0 ) {
        validationErrors.push( 'Action requires files.' );
      }
    }

    // Todo: Generalize restStatus
    if ( validationErrors.length > 0 ) {
      res.status( 500 );
      res.json( {
        status: 'ValidationError',
        errorMsg: 'Validation of parameters failed.',
        isValidationError: true,
        validationErrors: validationErrors
      } );
      res.end();
    } else {
      return next();
    }
  };
}
