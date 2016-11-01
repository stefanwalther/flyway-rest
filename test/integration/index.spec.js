/*global describe, expect, it, afterEach, before, beforeEach*/
import supertest from 'supertest';
import express from 'express';
import http from 'http';

describe( 'integration:basic', ( suite ) => {

  var server = null;
  const FLYWAY_REST_PORT = process.env.FLYWAY_REST_PORT || 9001;
  const FLYWAY_REST_HOST = process.env.FLYWAY_REST_HOST || 'flyway_rest_service';

  beforeEach( () => {
    server = supertest.agent( `http://${FLYWAY_REST_HOST}:${FLYWAY_REST_PORT}` );
  } );

  it.only( 'can ping the REST service (/)', ( done ) => {

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

  it.only( '/ should return some general pkg information', ( done ) => {
    server
      .get( '/' )
      .set( 'Accept', 'application/json' )
      .expect( 200, done );
  } );

  //it( 'should return help', ( done ) => {
  //  request( server.expressApp )
  //    .get( '/help' )
  //    .set( 'Accept', 'application/json' )
  //    .expect( 200 )
  //    .end( function( err, res ) {
  //      console.log( 'result: ', res );
  //      done();
  //    } );
  //} );

  describe( 'migrate', ()=> {

    it( 'should fail without any parameters', ( done ) => {
      request( server.expressApp )
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
      request( server.expressApp )
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

  it( 'should container endpoint `clean`', () => {
    request( server.expressApp )
      .get( '/clean' )
      .expect( 200 )
  } );

  it( 'should container endpoint `info`', () => {
    request( server.expressApp )
      .get( '/info' )
      .expect( 200 )
  } );

  it( 'should container endpoint `validate`', () => {
    request( server.expressApp )
      .get( '/validate' )
      .expect( 200 )
  } );

  it( 'should container endpoint `baseline`', () => {
    request( server.expressApp )
      .get( '/baseline' )
      .expect( 200 )
  } );

  it( 'should container endpoint `repair`', () => {
    request( server.expressApp )
      .get( '/repair' )
      .expect( 200 )
  } );
} );
