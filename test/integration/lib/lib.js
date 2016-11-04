import promiseRetry from 'promise-retry';
import * as base64 from './../../../src/lib/base64';
import fs from 'fs';
import path from 'path';

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
      base64: base64.encode(path.join(folderPath, file)),
    };
    files.push( f );
  } );
  return r;

}
