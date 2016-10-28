import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './api';
import defaultConfig from './config.json';

export default class appServer {
  constructor() {
    this.init();
  }

  init() {
    this.expressApp = express();

    this.expressApp.use( cors( {
      exposedHeaders: defaultConfig.corsHeaders
    } ) );

    this.expressApp.use( bodyParser.json( {
      limit: defaultConfig.bodyLimit
    } ) );

    this.expressApp.use( middleware( defaultConfig ) );

  }

  start( done ) {
    if ( !this.server ) {
      let port = process.env.PORT || defaultConfig.port;
      this.server = this.expressApp.listen( port, ( err ) => {
        if ( !err ) {
          console.log( `Started on port ${port}.` );
        } else {
          console.log( `Cannot start server.`, err );
        }
        return done();
      } );
    } else {
      done();
    }

  }

  stop( ) {
    if ( this.server ) {
      return this.server.close(  );
    }
  }

}

