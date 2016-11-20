import fs from 'fs';

// function to encode file data to base64 encoded string
export function encode( file ) {
  // read binary data
  let bitmap = fs.readFileSync( file );
  // convert binary data to base64 encoded string
  return new Buffer( bitmap ).toString( 'base64' );
}

// function to create file from base64 encoded string
export function decode( base64str, file ) {
  // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
  let bitmap = new Buffer( base64str, 'base64' );
  // write buffer to file
  console.log( 'decode', file );
  fs.writeFileSync( file, bitmap );
  //console.log( '******** File created from base64 encoded string ********' );
}
