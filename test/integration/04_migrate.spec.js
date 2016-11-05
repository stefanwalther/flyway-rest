/*global describe, expect, it, afterEach, before, beforeEach*/
import * as lib from './lib/lib';
import path from 'path';

describe( 'POST /migrate', () => {

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
      .post( '/migrate' )
      .expect( 500 );
  } );

  it( 'requires files to be defined', done => {

    var args = {
      mode: 'sync',
      flyway_args: {
        url: `jdbc:postgresql://flyway_rest_db:5432/flyway`,
        user: 'postgres',
        password: 'postgres'
      }
    };

    server
      .post( '/migrate' )
      .send( args )
      .expect( 500 )
      .end( ( err, res ) => {
        expect( err ).to.not.exist;
        expect( res.body.status ).to.equal( 'ValidationError' );
        expect( res.body.errorMsg ).to.exist.and.to.be.equal( 'Validation of parameters failed.' );
        expect( res.body.validationErrors ).to.contain( 'Action requires files.' );
        done();
      } )
  } );

  it( 'should fail without any parameters', done => {
    server
      .post( '/migrate' )
      .set( 'Content-Type', 'application/json' )
      .expect( 500 )
      .end( ( err, res ) => {
        expect( err ).to.not.exist;
        expect( res.body ).to.have.a.property( 'errorMsg' ).to.be.equal( 'Validation of parameters failed.' );
        expect( res.body ).to.have.a.property( 'validationErrors' );
        expect( res.body ).to.have.a.property( 'validationErrors' ).to.be.an.array;
        expect( res.body.validationErrors ).to.have.length.of( 1 );
        done();
      } )
  } );

  it( 'should return the correct mode `simulation`', done => {
    server
      .post( '/migrate' )
      .send( {
        mode: "simulation",
        flyway_args: {
          url: "bla",
          user: "foo",
          password: "bar",
          files: lib.getFiles( path.resolve( __dirname, './fixtures/dummy-files' ) )
        }
      } )
      .set( 'Accept', 'application/json' )
      .expect( 200 )
      .end( ( err, res ) => {
        expect( err ).to.not.exist;
        expect( res.body ).to.have.property( 'mode' );
        expect( res.body.mode ).to.equal( 'simulation' );
        done();
      } )
  } );

  it( 'should return the action `clean` (if not set)', done => {

    var args = {
      mode: 'simulate',
      flyway_args: {
        user: 'foo',
        password: 'bar',
        url: 'baz',
        files: lib.getFiles( path.resolve( __dirname, './fixtures/dummy-files' ) )
      }
    };

    server
      .post( '/migrate' )
      .send( args )
      .expect( 200 )
      .end( ( err, res ) => {
        expect( res.body.action ).to.be.equal( 'migrate' );
        done();
      } )
  } );

  it( 'successfully uploads files', done => {

    var args = {
      mode: 'simulation',
      flyway_args: {
        user: 'foo',
        password: 'bar',
        url: 'baz',
        files: lib.getFiles( path.resolve( __dirname, './fixtures/dummy-files' ) )
      }
    };

    server
      .post( '/migrate' )
      .send( args )
      .expect( 200 )
      .end( ( err, res ) => {
        expect( res.body.status ).to.be.equal( 'OK' );
        expect( res.body.action ).to.be.equal( 'migrate' );
        done();
      } )
  } )

} );
