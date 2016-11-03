/*global describe, expect, it, afterEach, before, beforeEach*/
import supertest from 'supertest-as-promised';
import * as lib from './lib/lib';

describe( 'integration-tests:clean', () => {

  var server = null;
  const FLYWAY_REST_PORT = process.env.FLYWAY_REST_PORT || 9001;
  const FLYWAY_REST_HOST = process.env.FLYWAY_REST_HOST || 'localhost';
  const FLYWAY_REST_URL = `http://${FLYWAY_REST_HOST}:${FLYWAY_REST_PORT}`;

  console.log( 'Flyway Rest URL: ', FLYWAY_REST_URL, '\n' );

  before( () => {
    server = supertest.agent( FLYWAY_REST_URL );

    return lib.healthcheck( server );

  } );

  describe( 'POST /clean', () => {
    it( 'checks required params', () => {
      return server
        .post( '/clean' )
        .expect( 500 );
    } );

    it( 'properly cleans the db', ( done ) => {

      var args = {
        mode: 'sync',
        flyway_args: {
          url: `jdbc:postgresql://flyway_rest_db:5432/flyway`,
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

  } );

} );
