import { Router } from 'express';
import * as validation from './validation';
import * as cmd from './cmd';
import execa from 'execa';
import pkg from './../../package.json';

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

  routes.get( '/health', ( req, res ) => {
    res.status( 200 ).send( {} );
  } );

  routes.get( '/info', ( req, res ) => {
    res.json( {
      "node.js": process.versions.node
    } );
  } );

  routes.get( '/', ( req, res ) => {
    res.sendStatus( 200 );
  } );

  routes.post( '/migrate',
    validation.validateParams(),
    cmd.exec()
  );

  routes.post( '/clean',
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
