export function addParams() {
  return function (req, res, next) {
    req.body.command = 'clean';
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

    // Todo: Generalize restStatus
    if ( validationErrors.length > 0 ) {
      res.status( 500 );
      res.json( {
        status: 'Error',
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
