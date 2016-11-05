/* eslint-disable */
/*global describe, expect, it, afterEach, before, beforeEach*/
import * as lib from './lib/lib';
import path from 'path';

describe( 'POST /xx', () => {

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

} );
