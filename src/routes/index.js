import { Router } from 'express';
import * as validation from './../middleware/validation';
import * as cmd from './../middleware/cmd';
import pkg from './../../package.json';

// Todo: config not being used right now ...
export default ( /*config*/ ) => { // eslint-disable-line no-inline-comments
  let routes = Router();

  routes.get( '/', ( req, res ) => {
    res.json( {
      name: pkg.name,
      version: pkg.version,
      description: pkg.description,
      homepage: pkg.homepage
    } )
  } );

  /**
   * Endpoint to ping the server.
   */
  routes.get( '/health', ( req, res ) => {
    res.setHeader( "Content-Type", "application/json" );
    res.send( { ts: new Date().toJSON() } );
  } );

  routes.get( '/info', ( req, res ) => {
    res.json( {
      'node.js': process.versions.node
    } );
  } );

  //Todo: Can probably be removed or replaced; no value in having that
  routes.get( '/', ( req, res ) => {
    res.sendStatus( 200 );
  } );

  routes.post( '/migrate',
    validation.addParams( { action: 'migrate' } ),
    validation.validateParams(),
    cmd.exec()
  );

  routes.post( '/clean',
    validation.addParams( { action: 'clean' } ),
    validation.validateParams(),
    cmd.exec()
  );

  routes.post( '/info',
    validation.addParams( { action: 'info' } ),
    validation.validateParams(),
    cmd.exec()
  );

  routes.post( '/validate',
    validation.addParams( { action: 'validate' } ),
    validation.validateParams(),
    cmd.exec()
  );

  routes.post( '/baseline',
    validation.addParams( { action: 'baseline' } ),
    validation.validateParams(),
    cmd.exec()
  );

  routes.post( '/repair',
    validation.addParams( { action: 'repair' } ),
    validation.validateParams(),
    cmd.exec()
  );

  return routes;
}
