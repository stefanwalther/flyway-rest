/* eslint-disable no-inline-comments */
/*global describe, it, after, afterEach, before, beforeEach*/
/* eslint-enable no-inline-comments */
import * as lib from './lib/lib';
import * as config from './lib/config';

describe( 'integration-tests:general', () => {

  let server = null;

  console.log( 'Flyway Rest URL: ', config.FLYWAY_REST_URL, '\n' );

  before( () => {

    let opts = {
      debug: false,
      url: config.FLYWAY_REST_URL
    };

    return lib.connect( opts )
      .then( result => {
        server = result;
      } )
      .catch( ( err ) => {
        throw new Error( err );
      } )

  } );

  beforeEach( () => {
    return lib.healthCheck( server );
  } );

  describe( 'general setup', () => {

    // Should probably just redirect to /openapi
    it( 'can ping the REST service (/)', ( /*done*/ ) => { //eslint-disable-line no-inline-comments

      return server
        .get( '/' )
        .expect( 200 )

    } );

  } );

} );
