/*global describe, expect, it, afterEach, beforeEach*/
import request from 'supertest';
import express from 'express';
import appServer from './../../src/app-server';

describe( 'integration:basic', () => {

  var server = null;
  beforeEach( ( done ) => {
    server = new appServer();
    server.start( () => {
      done();
    } );
  } );

  afterEach( () => {
    server.stop();
  } );

  it( 'should by default return 404', ( done ) => {
    request( server.expressApp )
      .get( '/' )
      .set( 'Accept', 'application/json' )
      .expect( 404, done );
  } );

  it( 'should return help', ( done ) => {
    request( server.expressApp )
      .get( '/help' )
      .set( 'Accept', 'application/json' )
      .expect( 200 )
      .end( function( err, res ) {
        console.log( 'result: ', res );
        done();
      } );
  } );

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

    it.only( 'should return the correct mode `simulation`', ( done ) => {
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
