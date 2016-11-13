/*global describe, expect, it, afterEach, before, beforeEach*/
import * as lib from './lib/lib';
import * as config from './lib/config';

describe( 'POST /clean', () => {

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

  it( 'properly cleans the db (user & pwd separate)', done => {

    let args = {
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
        expect( err ).to.not.exist;
        expect( res.body.stderr ).to.not.exist;
        expect( res.body.stdout ).to.exist;
        expect( res.body.stdout ).to.have.property( 'stderr' ).to.be.empty;
        done();
      } )
  } );

} );
