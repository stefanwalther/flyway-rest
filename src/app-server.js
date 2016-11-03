import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import middleware from './middleware';
import defaultConfig from './config.json';

/**
 * appServer
 */
export default class appServer {
  constructor() {
    this.init();
  }

  /**
   * Initialize the express server.
   * Todo: Should be an internal method
   */
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

  /**
   * Start the server
   * @param done
   */
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

  /**
   * Stop the server.
   * @returns {void|*}
   */
  stop() {
    if ( this.server ) {
      return this.server.close();
    }
  }

}

