import { Router } from 'express';
import * as validation from './validation';
import * as cmd from './cmd';

export default ( config ) => {
  let routes = Router();

  routes.get( '/', ( req, res ) => {
    res.sendStatus( 404 );
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
