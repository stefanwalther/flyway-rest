import promiseRetry from 'promise-retry';
import * as base64 from './../../../src/lib/base64';
import fs from 'fs';
import path from 'path';
import ExpressServer from './../../../src/app-server';
import supertest from 'supertest-as-promised';

export function healthCheck( server ) {

  const check = () => {

    return server
      .get( '/health' )
      .expect( 200 )
  };

  let retryOpts = {
    retries: 200,
    factor: 1,
    minTimeout: 250
  };

  return promiseRetry( function( retry, attempts ) {

    if ( attempts > 1 ) {
      console.log( `Health-check failed, retry (${attempts - 1})` );
    }

    return check()
      .catch( retry );

  }, retryOpts )

}

/**
 * Retrieve all files from `folderPath` and returns a file array object containing the base64 encoded value for each file.
 * @param {String}folderPath - Path of the folder to look for files.
 * @returns {Array<Object>}
 */
export function getFiles( folderPath ) {

  let r = [];
  let files = fs.readdirSync( folderPath );
  files.forEach( file => {
    let f = {
      name: file,
      base64: base64.encode( path.join( folderPath, file ) ),
    };
    files.push( f );
  } );
  return r;

}

/**
 * Configures the supertest agent.
 * By default it would connect to the flyway_rest docker container.
 *
 * If opts.debug is set to true (just meant to be used for debugging purposes), then the local
 * expressApp would be used. That makes it easier to locally debug the entire express app without
 * having to debug inside the containers (with e.g. node-inspector)
 *
 */
export function connect( opts ) {

  return new Promise( ( resolve, reject ) => {
    resolve( supertest.agent( opts.url ) );
  } );

  //if ( !opts.debug ) {
  //  server = supertest.agent( opts.url );
  //  cb();
  //} else {
  //  let expressInst = new ExpressServer();
  //  expressInst.start( () => {
  //    server = supertest( expressInst.expressApp );
  //    cb();
  //  } );
  //}

}

/**
 * Return the base arguments
 * @returns {{flyway_args: {url: string, user: string, password: string}}}
 */
export function getBaseArgs() {

  return {
    flyway_args: {
      url: `jdbc:postgresql://flyway_rest_db:5432/flyway`,
      user: 'postgres',
      password: 'postgres'
    }
  };

}

/**
 * Clean the database
 * @param server
 */
export function clean( server ) {

  return server
    .post( '/clean' )
    .send( this.getBaseArgs() )
}