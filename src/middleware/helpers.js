/**
 * Add a parameter to the list of request's body parameters.
 * @param params
 * @returns {Function}
 */
export function addParams( params ) {
  return function( req, res, next ) {
    Object.assign( req.body, params );
    return next();
  }
}
