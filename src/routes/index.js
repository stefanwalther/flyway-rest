import { Router } from 'express';
import * as validation from './../middleware/validation';
import * as helpers from './../middleware/helpers';
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

  routes.post( '/migrate',
    helpers.addParams( { action: 'migrate' } ),
    validation.validateParams(),
    cmd.exec()
  );

  routes.post( '/clean',
    helpers.addParams( { action: 'clean' } ),
    validation.validateParams(),
    cmd.exec()
  );

  routes.post( '/info',
    helpers.addParams( { action: 'info' } ),
    validation.validateParams(),
    cmd.exec()
  );

  routes.post( '/validate',
    helpers.addParams( { action: 'validate' } ),
    validation.validateParams(),
    cmd.exec()
  );

  routes.post( '/baseline',
    helpers.addParams( { action: 'baseline' } ),
    validation.validateParams(),
    cmd.exec()
  );

  routes.post( '/repair',
    helpers.addParams( { action: 'repair' } ),
    validation.validateParams(),
    cmd.exec()
  );

  return routes;
}
