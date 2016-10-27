/*global describe, expect, it, afterEach, beforeEach*/
import request from 'supertest';
import express from 'express';
import appServer from './../../src/app-server';

describe( 'integration:basic', () => {

  var app = null;
  var server = null;
  beforeEach( ( done ) => {
    server = new appServer();
    server.start( () => {
      done();
    } );

    //console.log('routes', server.app._router.stack);
  } );

  afterEach( () => {
    server.stop();
  } );

  it( 'should work', ( done ) => {
    request( server.expressApp )
      .get( '/' )
      .set( 'Accept', 'application/json' )
      .expect( 200, done );
  } );

} );
