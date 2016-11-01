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

  //Todo: simplify
  //routes.get( '/help', ( req, res ) => {
  //  execa.shell( 'flyway' )
  //    .then( ( result ) => {
  //      return res.sendStatus( { result } )
  //    } )
  //    .catch( ( err ) => {
  //      return res.sendStatus( { err } )
  //    } )
  //} );

  routes.get('/', (req, res) => {
    console.log('fetching default');
    res.sendStatus(200);
  });

  routes.post( '/migrate',
    validation.validateParams(),
    cmd.exec()
  );

  routes.get( '/clean', ( req, res ) => {
    res.sendStatus( 200 );
  } );

  routes.get( '/info', ( req, res ) => {
    res.sendStatus( 200 );
  } );

  routes.get( '/validate', ( req, res ) => {
    res.sendStatus( 200 );
  } );

  routes.get( '/baseline', ( req, res ) => {
    res.sendStatus( 200 );
  } );

  routes.get( '/repair', ( req, res ) => {
    res.sendStatus( 200 );
  } );

  return routes;
}
