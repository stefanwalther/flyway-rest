/* eslint-disable */
/*global describe, expect, it, afterEach, before, beforeEach*/
import * as lib from './lib/lib';
import * as config from './lib/config';

describe( 'POST /repair', () => {

  let server = null;

  //console.log( 'Flyway Rest URL: ', config.FLYWAY_REST_URL, '\n' );

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

} );
