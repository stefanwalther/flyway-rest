/*global describe, expect, it, afterEach, before, beforeEach*/
import * as lib from './lib/lib';

describe.only( 'POST /baseline', () => {

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

    return lib.healthCheck( server )
      .then( lib.clean( server ) );

  } );

  it( 'checks required params', () => {
    return server
      .post( '/baseline' )
      .expect( 500 );
  } );

  it( 'does not require files', done => {

    var args = {
      mode: 'simulation',
      flyway_args: {
        url: `jdbc:postgresql://flyway_rest_db:5432/flyway`,
        user: 'postgres',
        password: 'postgres'
      }
    };

    server
      .post( '/baseline' )
      .send( args )
      .expect( 200 )
      .end( ( err, res ) => {
        expect( err ).to.not.exist;
        done();
      } )

  } );

  //it( 'creates a baseline', () => {
  //
  //  var args = {
  //    mode: 'sync',
  //    flyway_args: {
  //      url: `jdbc:postgresql://flyway_rest_db:5432/flyway`,
  //      user: 'postgres',
  //      password: 'postgres'
  //    }
  //  };
  //
  //  return server
  //    .post( '/baseline' )
  //    .send( args )
  //    .expect( 200 )
  //
  //} )

} );
