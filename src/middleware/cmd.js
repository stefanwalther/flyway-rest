import execa from 'execa';
import * as base64 from './../lib/base64';
import tmp from 'tmp';
import path from 'path';

export function exec() {
  return function( req, res, next ) {

    let args = req.body.flyway_args; //shortcut
    let tmpDirObj = extractFiles( req.body.files ); //Todo: Do not save the files in case of `get-cmd`
    let command = buildCommand( args, req.body.action, tmpDirObj ? tmpDirObj.name : '' );

    let returnResult = {
      mode: req.body.mode,
      cmd: command,
      ts_start: new Date().toJSON(),
      action: req.body.action,
      tmpDir: tmpDirObj ? tmpDirObj.name : '',
      postedFiles: req.body.files // Todo: Could be removed, just for debugging purposes
    };

    // Only execute if the mode is not 'get-cmd'
    if ( returnResult.mode !== 'get-cmd' ) {

      execa.shell( command )
        .then( result => {
          returnResult.status = 'OK';
          returnResult.stdout = result;
          res.status( 200 );
          finish( next );
        } )
        .catch( error => {
          returnResult.status = 'Error';
          returnResult.stderr = error;
          res.status( 500 );
          finish( next );
        } );
    } else {
      returnResult.status = 'OK';
      finish( next );
    }

    //Todo: Potentially break out to ./lib/restStatus.js
    function finish( next ) {

      // Todo: Could be necessary to catch any errors here (see manual for `tmp`)
      // Delete the temporary files
      if (tmpDirObj && typeof tmpDirObj.removeCallback === 'function') {
        tmpDirObj.removeCallback();
      }

      res.json( returnResult );
      next();
    }
  };

}

export function buildCommand( flyWayArgs, action = 'info', locations ) {

  if ( !flyWayArgs || ( typeof flyWayArgs === 'object' && Object.keys( flyWayArgs ).length < 1 ) ) {
    throw new Error( 'No Flyway args defined.' );
  }

  if ( [ 'clean', 'info', 'validate', 'baseline', 'repair', 'migrate' ].indexOf( action ) <= -1 ) {
    throw new Error( 'Invalid Flyway action.', action );
  }

  let space = ' ';
  let del = '=';
  let cmd = 'flyway';
  cmd += space + '-q'; //Suppress all output, except warnings and errors
  for ( const key of Object.keys( flyWayArgs ) ) {
    cmd += space + '-' + key + del + flyWayArgs[ key ];
  }

  if ( locations ) {
    cmd += space + '-locations' + del + `filesystem:${locations}`;
  }

  cmd += space + action;
  return cmd;

}

/**
 * Extract (decode) the array of base64 encoded files to a temporary directory.
 * @param filesObj
 * @returns {*}
 */
export function extractFiles( filesObj ) {

  let tmpDirObj;
  if ( filesObj && Array.isArray( filesObj ) && filesObj.length > 0 ) {
    tmpDirObj = tmp.dirSync( { unsafeCleanup: true } );
    console.log( tmpDirObj, tmpDirObj );
    filesObj.forEach( fileDef => {
      base64.decode( fileDef.base64, path.join( tmpDirObj.name, fileDef.name ) );
    } );
    return tmpDirObj;
  }
  return null;
}


