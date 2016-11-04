/*global describe, expect, it, afterEach, before, beforeEach*/
import supertest from 'supertest-as-promised';
import * as lib from './lib/lib';

describe( 'POST /xx', () => {

  var server = null;
  const FLYWAY_REST_PORT = process.env.FLYWAY_REST_PORT || 9001;
  const FLYWAY_REST_HOST = process.env.FLYWAY_REST_HOST || 'localhost';
  const FLYWAY_REST_URL = `http://${FLYWAY_REST_HOST}:${FLYWAY_REST_PORT}`;

  console.log( 'Flyway Rest URL: ', FLYWAY_REST_URL, '\n' );

  before( () => {
    server = supertest.agent( FLYWAY_REST_URL );
    return lib.healthCheck( server );
  } );

} );
