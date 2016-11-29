import fs from 'fs';

/**
 * Encode file data to a base64 encoded string.
 * @param file
 */
export function encodeFile( file ) {
  let bitmap = fs.readFileSync( file );
  return new Buffer( bitmap ).toString( 'base64' );
}

/**
 * Create a file from a base64 encoded string.
 * @param base64str
 * @param file
 */
export function decodeFile( base64str, file ) {
  let bitmap = new Buffer( base64str, 'base64' );
  fs.writeFileSync( file, bitmap );
}
