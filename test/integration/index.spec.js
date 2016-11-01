/*global describe, expect, it, afterEach, before, beforeEach*/
import supertest from 'supertest';
import express from 'express';
import http from 'http';

describe( 'integration-tests', ( ) => {

  var server = null;
  const FLYWAY_REST_PORT = process.env.FLYWAY_REST_PORT || 9001;
  const FLYWAY_REST_HOST = process.env.FLYWAY_REST_HOST || 'localhost';

  beforeEach( () => {
    server = supertest.agent( `http://${FLYWAY_REST_HOST}:${FLYWAY_REST_PORT}` );
  } );

  describe('general setup', () => {
    it( 'can ping the REST service (/)', ( done ) => {

      let options = {
        host: FLYWAY_REST_HOST,
        port: FLYWAY_REST_PORT,
        path: '/'
      };

      http
        .get( options, function( res ) {
          if ( res.statusCode == 200 ) {
            done();
          }
        } ).on( 'error', function( e ) {
        done( e );
      } );
    } );

    it( '/ should return some general pkg information', ( done ) => {
      server
        .get( '/' )
        .set( 'Accept', 'application/json' )
        .expect( 200, done );
    } );

  });

  describe('endpoints', () => {
    it( 'should container endpoint `clean`', () => {
      server
        .get( '/clean' )
        .expect( 200 )
    } );

    it( 'should container endpoint `info`', () => {
      server
        .get( '/info' )
        .expect( 200 )
    } );

    it( 'should container endpoint `validate`', () => {
      server
        .get( '/validate' )
        .expect( 200 )
    } );

    it( 'should container endpoint `baseline`', () => {
      server
        .get( '/baseline' )
        .expect( 200 )
    } );

    it( 'should container endpoint `repair`', () => {
      server
        .get( '/repair' )
        .expect( 200 )
    } );
  });




  describe( '/migrate', ()=> {

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
          console.log( 'res', res.body );
          expect( err ).to.not.exist;
          expect( res.body ).to.have.property( 'mode' );
          expect( res.body.mode ).to.equal( 'simulation' );
          done();
        } )
    } );

  } );

} );
