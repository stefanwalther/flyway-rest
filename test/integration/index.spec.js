/*global describe, expect, it, afterEach, before, beforeEach*/
import supertest from 'supertest-as-promised';
import * as lib from './lib/lib';

describe( 'integration-tests', () => {

  var server = null;
  const FLYWAY_REST_PORT = process.env.FLYWAY_REST_PORT || 9001;
  const FLYWAY_REST_HOST = process.env.FLYWAY_REST_HOST || 'localhost';
  const FLYWAY_REST_URL = `http://${FLYWAY_REST_HOST}:${FLYWAY_REST_PORT}`;

  console.log( 'Flyway Rest URL: ', FLYWAY_REST_URL, '\n' );

  before( () => {
    server = supertest.agent( FLYWAY_REST_URL );

    return lib.healthcheck( server );

  } );

  //beforeEach( () => {
  //
  //} );

  describe( 'general setup', () => {
    it( 'can ping the REST service (/)', ( /*done*/ ) => {

      return server
        .get( '/' )
        .expect( 200 )

    } );

    xit( '/ should return some general pkg information', ( done ) => {
      server
        .get( '/' )
        .set( 'Accept', 'application/json' )
        .expect( 200, done );
    } );

  } );

  describe( 'POST /migrate', () => {
    it( 'checks required params', () => {
      return server
        .post( '/migrate' )
        .expect( 500 );
    } );

    it( 'should fail without any parameters', ( done ) => {
      server
        .post( '/migrate' )
        .set( 'Content-Type', 'application/json' )
        .expect( 500 )
        .end( ( err, res ) => {
          expect( err ).to.not.exist;
          expect( res.body ).to.have.a.property( 'error' ).to.be.equal( 'Validation of parameters failed.' );
          expect( res.body ).to.have.a.property( 'details' );
          expect( res.body ).to.have.a.property( 'details' ).to.be.an.array;
          expect( res.body.details ).to.have.length.of( 1 );
          done();
        } )
    } );


    it( 'should return the correct mode `simulation`', ( done ) => {
      server
        .post( '/migrate' )
        .send( {
          mode: "simulation",
          flyway_args: {
            url: "bla"
          }
        } )
        .set( 'Accept', 'application/json' )
        .expect( 200 )
        .end( ( err, res ) => {
          //console.log( 'res', res.body );
          expect( err ).to.not.exist;
          expect( res.body ).to.have.property( 'mode' );
          expect( res.body.mode ).to.equal( 'simulation' );
          done();
        } )
    } );


  } );

  describe( 'POST /clean', () => {
    it( 'checks required params', () => {
      return server
        .post( '/clean' )
        .expect( 500 );
    } )
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
    it( 'checks required params', () => {
      return server
        .post( '/baseline' )
        .expect( 500 );
    } )
  } );

  describe( 'POST /repair', () => {
    it( 'checks required params', () => {
      return server
        .post( '/repair' )
        .expect( 500 );
    } )
  } );



} );
