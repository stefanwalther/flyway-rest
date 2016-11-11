/* eslint-disable no-inline-comments */
/*global describe, it, afterEach, before, beforeEach*/
/* eslint-enable no-inline-comments */
import * as lib from './lib/lib';
import * as config from './lib/config';

describe( 'integration-tests:general', () => {

  var server = null;

  console.log( 'Flyway Rest URL: ', config.FLYWAY_REST_URL, '\n' );

  before( () => {

    var opts = {
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

    //Todo: extend that check
    xit( '/ should return some general pkg information', done => {
      server
        .get( '/' )
        .set( 'Accept', 'application/json' )
        .expect( 200, done );
    } );

  } );

  describe( 'POST /info', () => {
    it( 'checks required params', () => {
      return server
        .post( '/info' )
        .expect( 500 );
    } )
  } );

  describe( 'POST /validate', () => {
    it( 'checks required params', () => {
      return server
        .post( '/validate' )
        .expect( 500 );
    } )
  } );

} );
