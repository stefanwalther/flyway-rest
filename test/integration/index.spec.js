/*global describe, expect, it, afterEach, before, beforeEach*/
import supertest from 'supertest';
import express from 'express';
import http from 'http';

describe( 'integration-tests', () => {

  var server = null;
  const FLYWAY_REST_PORT = process.env.FLYWAY_REST_PORT || 9001;
  const FLYWAY_REST_HOST = process.env.FLYWAY_REST_HOST || 'localhost';
  const FLYWAY_REST_URL = `http://${FLYWAY_REST_HOST}:${FLYWAY_REST_PORT}`;

  console.log( 'Flyway Rest URL: ', FLYWAY_REST_URL );

  beforeEach( () => {
    server = supertest.agent( FLYWAY_REST_URL );
  } );

  describe( 'general setup', () => {
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

  } );

  describe(' POST /migrate', () => {
      it('checks required params', ( done ) => {
        server
          .post('/migrate')
          .expect( 500, done);
      })
  });

  describe( 'endpoints', (  ) => {

    it( 'should container endpoint `clean`', ( done ) => {
      server
        .post( '/clean' )
        .expect( 200, done )

    } );

    it( 'should container endpoint `info`', ( done ) => {
      server
        .post( '/info' )
        .expect( 200, done )
    } );

    it( 'should container endpoint `validate`', ( done ) => {
      server
        .post( '/validate' )
        .expect( 200, done )
    } );

    it( 'should container endpoint `baseline`', ( done ) => {
      server
        .post( '/baseline' )
        .expect( 200, done )
    } );

    it( 'should container endpoint `repair`', ( done ) => {
      server
        .post( '/repair' )
        .expect( 200, done )
    } );
  } );

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
          //console.log( 'res', res.body );
          expect( err ).to.not.exist;
          expect( res.body ).to.have.property( 'mode' );
          expect( res.body.mode ).to.equal( 'simulation' );
          done();
        } )
    } );

  } );

} );
