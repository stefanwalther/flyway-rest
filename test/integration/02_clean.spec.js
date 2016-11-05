/*global describe, expect, it, afterEach, before, beforeEach*/
import * as lib from './lib/lib';

describe( 'POST /clean', () => {

  var server = null;
  const FLYWAY_REST_PORT = process.env.FLYWAY_REST_PORT || 9001;
  const FLYWAY_REST_HOST = process.env.FLYWAY_REST_HOST || 'localhost';
  const FLYWAY_REST_URL = `http://${FLYWAY_REST_HOST}:${FLYWAY_REST_PORT}`;

  //console.log( 'Flyway Rest URL: ', FLYWAY_REST_URL, '\n' );

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


  it( 'checks required params', () => {

    return server
      .post( '/clean' )
      .expect( 500 );
  } );

  it( 'contains the correct action (if not set)', done => {

    var args = {
      mode: 'simulate',
      flyway_args: {
        user: 'foo',
        password: 'bar',
        url: 'baz'
      }
    };

    server
      .post( '/clean' )
      .send( args )
      .expect( 200 )
      .end( ( err, res ) => {
        expect( res.body.action ).to.be.equal( 'clean' );
        done();
      } )
  } );

  it( 'properly cleans the db (user & pwd separate)', done => {

    var args = {
      mode: 'sync',
      flyway_args: {
        url: 'jdbc:postgresql://flyway_rest_db:5432/flyway',
        user: 'postgres',
        password: 'postgres'
      }
    };

    server
      .post( '/clean' )
      .send( args )
      .expect( 200 )
      .end( ( err, res ) => {
        expect( res.body.stderr ).to.not.exist;
        expect( res.body.stdout ).to.exist;
        done();
      } )
  } );

  it( 'returns a validation error if user and password are not set', done => {
    var args = {
      mode: 'sync',
      flyway_args: {
        url: 'jdbc:postgresql://flyway_rest_db:5432/foo'
      }
    };

    server
      .post( '/clean' )
      .send( args )
      .expect( 500 )
      .end( ( err, res ) => {
        expect( res.body.status ).to.equal( 'ValidationError' );
        expect( res.body.errorMsg ).to.exist.and.to.be.equal( 'Validation of parameters failed.' );
        expect( res.body.validationErrors ).to.contain( 'Argument user is mandatory.' );
        done();
      } )
  } );

  it( 'returns an error if the db is unknown', done => {
    var args = {
      mode: 'sync',
      flyway_args: {
        url: 'jdbc:postgresql://flyway_rest_db:5432/foo',
        user: 'postgres',
        password: 'postgres'
      }
    };

    server
      .post( '/clean' )
      .send( args )
      .expect( 500 )
      .end( ( err, res ) => {
        expect( res.body.stderr ).to.exist;
        expect( res.body.stdout ).to.not.exist;
        done();
      } )
  } )
} );
