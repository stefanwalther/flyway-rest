/*global describe, expect, it, afterEach, before, beforeEach*/
import * as lib from './lib/lib';
import path from 'path';
import _ from 'lodash';
import * as config from './lib/config';

describe( 'POST /migrate', () => {

  let server = null;

  before( () => {

    let opts = {
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

  it( 'requires files to be defined', done => {

    let args = {
      mode: 'sync',
      flyway_args: {
        url: 'jdbc:postgresql://flyway-rest-db:5432/flyway',
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
        expect( res.body.validationErrors ).to.have.length.of.least( 1 );
        done();
      } )
  } );

  it( 'should return the correct mode `get-cmd`', done => {
    server
      .post( '/migrate' )
      .send( {
        mode: 'get-cmd',
        flyway_args: {
          url: 'bla',
          user: 'foo',
          password: 'bar'
        },
        files: lib.getFiles( path.resolve( __dirname, './fixtures/dummy-files' ) )
      } )
      .set( 'Accept', 'application/json' )
      .expect( 200 )
      .end( ( err, res ) => {
        expect( err ).to.not.exist;
        expect( res.body ).to.have.property( 'mode' );
        expect( res.body.mode ).to.equal( 'get-cmd' );
        done();
      } )
  } );

  it( 'should return the action `migrate` (if not set)', done => {

    let args = {
      mode: 'get-cmd',
      flyway_args: {
        user: 'foo',
        password: 'bar',
        url: 'baz'
      },
      files: lib.getFiles( path.resolve( __dirname, './fixtures/dummy-files' ) )
    };

    server
      .post( '/migrate' )
      .send( args )
      .expect( 200 )
      .end( ( err, res ) => {
        expect( err ).to.not.exist;
        expect( res.body.action ).to.be.equal( 'migrate' );
        done();
      } )
  } );

  it( 'successfully uploads files', done => {

    let args = {
      mode: 'get-cmd',
      flyway_args: {
        user: 'foo',
        password: 'bar',
        url: 'baz',
      },
      files: lib.getFiles( path.resolve( __dirname, './fixtures/dummy-files' ) )
    };

    server
      .post( '/migrate' )
      .send( args )
      .expect( 200 )
      .end( ( err, res ) => {
        expect( err ).to.not.exist;
        expect( res.body.status ).to.be.equal( 'OK' );
        expect( res.body.action ).to.be.equal( 'migrate' );
        done();
      } )
  } );

  it( 'should successfully migrate', done => {
    let args = lib.getBaseArgs();
    args = _.merge( args, {
      flyway_args: {},
      files: lib.getFiles( path.resolve( __dirname, './fixtures/migrate-basic' ) )
    } );

    server
      .post( '/migrate' )
      .send( args )
      .expect( 200 )
      .end( ( err, res ) => {
        expect( err ).to.not.exist;
        expect( res.body.status ).to.be.equal( 'OK' );
        expect( res.body.action ).to.be.equal( 'migrate' );
        done();
      } )
  } )

} )
;
