/*global describe, expect, it, afterEach, before, beforeEach*/
import * as lib from './lib/lib';


describe( 'integration-tests:general', () => {

  var server = null;
  const FLYWAY_REST_PORT = process.env.FLYWAY_REST_PORT || 9001;
  const FLYWAY_REST_HOST = process.env.FLYWAY_REST_HOST || 'localhost';
  const FLYWAY_REST_URL = `http://${FLYWAY_REST_HOST}:${FLYWAY_REST_PORT}`;

  console.log( 'Flyway Rest URL: ', FLYWAY_REST_URL, '\n' );

  before( () => {

    var opts = {
      debug: false,
      url: FLYWAY_REST_URL
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
    it( 'can ping the REST service (/)', ( /*done*/ ) => {

      return server
        .get( '/' )
        .expect( 200 )

    } );

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

  describe( 'POST /baseline', () => {

  } );

  describe( 'POST /repair', () => {
    it( 'checks required params', () => {
      return server
        .post( '/repair' )
        .expect( 500 );
    } )
  } );

} );
