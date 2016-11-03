import { Router } from 'express';
import * as validation from './../middleware/validation';
import * as cmd from './../middleware/cmd';
import pkg from './../../package.json';

// Todo: config not being used right now ...
export default ( config ) => {
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
    res.status( 200 ).send( {} );
  } );

  routes.get( '/info', ( req, res ) => {
    res.json( {
      "node.js": process.versions.node
    } );
  } );

  //Todo: Can probably be removed or replaced; no value in having that
  routes.get( '/', ( req, res ) => {
    res.sendStatus( 200 );
  } );

  routes.post( '/migrate',
    validation.validateParams(),
    cmd.exec()
  );

  routes.post( '/clean',
    validation.addParams(),
    validation.validateParams(),
    cmd.exec()
  );

  routes.post( '/info',
    validation.validateParams(),
    cmd.exec()
  );

  routes.post( '/validate',
    validation.validateParams(),
    cmd.exec()
  );

  routes.post( '/baseline',
    validation.validateParams(),
    cmd.exec()
  );

  routes.post( '/repair',
    validation.validateParams(),
    cmd.exec()
  );

  return routes;
}
