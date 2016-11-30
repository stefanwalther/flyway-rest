import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import defaultConfig from './config.json';
import winster from 'winster';


/**
 * appServer
 */
export default class appServer {
  constructor() {
    this._init();
    this.logger = new winster();
  }

  /**
   * Initialize the express server.
   */
  _init() {
    this.expressApp = express();

    this.expressApp.use( cors( {
      exposedHeaders: defaultConfig.corsHeaders
    } ) );

    this.expressApp.use( bodyParser.json( {
      limit: defaultConfig.bodyLimit
    } ) );

    this.expressApp.use('/api-docs', express.static('./api-docs.yaml'));

    this.expressApp.use( routes( defaultConfig ) );

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
          this.logger.info( `Started on port ${port}.` );
        } else {
          this.logger.error( 'Cannot start server.', err );
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

