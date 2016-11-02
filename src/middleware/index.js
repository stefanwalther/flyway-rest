import { Router } from 'express';
import * as validation from './validation';
import * as cmd from './cmd';
import execa from 'execa';
import pkg from './../../package.json';

export default ( config ) => {
  let routes = Router();

  routes.get('/', (req, res) => {
    res.json( {
      name: pkg.name,
      version: pkg.version,
      description: pkg.description,
      homepage: pkg.homepage
    })
  });

  routes.get( '/info', ( req, res ) => {
    res.json( {
      "node.js": process.versions.node
    });
  } );

  routes.get('/', (req, res) => {
    //console.log('fetching default');
    res.sendStatus(200);
  });

  routes.post( '/migrate',
    validation.validateParams(),
    cmd.exec()
  );

  routes.post( '/clean', ( req, res ) => {
    res.sendStatus( 200 );
  } );

  routes.post( '/info', ( req, res ) => {
    res.sendStatus( 200 );
  } );

  routes.post( '/validate', ( req, res ) => {
    res.sendStatus( 200 );
  } );

  routes.post( '/baseline', ( req, res ) => {
    res.sendStatus( 200 );
  } );

  routes.post( '/repair', ( req, res ) => {
    res.sendStatus( 200 );
  } );

  return routes;
}
