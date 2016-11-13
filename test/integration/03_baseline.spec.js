/*global describe, expect, it, afterEach, before, beforeEach*/
import * as lib from './lib/lib';
import * as config from './lib/config';

describe( 'POST /baseline', () => {

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

    return lib.healthCheck( server )
      .then( lib.clean( server ) );

  } );

  it( 'does not require files', done => {

    let args = {
      mode: 'get-cmd',
      flyway_args: {
        url: 'jdbc:postgresql://flyway_rest_db:5432/flyway',
        user: 'postgres',
        password: 'postgres'
      }
    };

    server
      .post( '/baseline' )
      .send( args )
      .expect( 200 )
      .end( ( err /*, res*/ ) => { //eslint-disable-line no-inline-comments
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
