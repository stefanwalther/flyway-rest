/*global describe, it, afterEach, before, beforeEach*/
import * as lib from './lib/lib';
import * as config from './lib/config';

describe( 'General tests for ', () => {

  let testDefs = [
    {
      endpoint: "clean",
      requireFiles: false
    },
    {
      endpoint: "baseline",
      requireFiles: false
    },
    {
      endpoint: "migrate",
      requireFiles: true
    },
    {
      endpoint: "repair",
      requireFiles: true
    },
    {
      endpoint: "info",
      requireFiles: false
    },
    {
      endpoint: "validate",
      requireFiles: true
    }
  ];

  testDefs.forEach( testDef => {
    return run( testDef );
  } );
} );

function run( testDef ) {
  describe( `POST /'${testDef.endpoint}'`, () => {

    let server = null;

    before( () => {

      let opts = {
        debug: false,
        url: config.FLYWAY_REST_URL
      };

      return lib.connect( opts )
        .then( result => {
          server = result;
        } )
        .catch( ( err ) => {
          throw new Error( err );
        } )

    } );

    beforeEach( () => {
      return lib.healthCheck( server );
    } );

    it( 'should return 500 if required params are missing', () => {
      return server
        .post( `/${testDef.endpoint}` )
        .expect( 500 );
    } );

    it( 'contains the correct action (if not set)', done => {

      let args = {
        mode: 'get-cmd',
        flyway_args: {
          user: 'foo',
          password: 'bar',
          url: 'baz'
        },
        files: []
      };

      server
        .post( `/${testDef.endpoint}` )
        .send( args )
        .expect( 200 )
        .end( ( err, res ) => {
          expect( err ).to.not.exist;
          expect( res.body.action ).to.be.equal( testDef.endpoint );
          done();
        } )
    } );

    it( 'returns a validation error if user and password are not set', done => {
      let args = {
        mode: 'sync',
        flyway_args: {
          url: `jdbc:postgresql://${config.FLYWAY_REST_DB_HOST}:${config.FLYWAY_REST_DB_PORT}/flyway`
        }
      };

      server
        .post( `/${testDef.endpoint}` )
        .send( args )
        .expect( 500 )
        .end( ( err, res ) => {
          expect( err ).to.not.exist;
          expect( res.body.status ).to.equal( 'ValidationError' );
          expect( res.body.errorMsg ).to.exist.and.to.be.equal( 'Validation of parameters failed.' );
          expect( res.body.validationErrors ).to.contain( 'Argument user is mandatory.' );
          expect( res.body.validationErrors ).to.contain( 'Argument password is mandatory.' );
          done();
        } )
    } );

    it( 'returns an error if the db is unknown', done => {
      let args = {
        mode: 'sync',
        flyway_args: {
          url: `jdbc:postgresql://${config.FLYWAY_REST_DB_HOST}:${config.FLYWAY_REST_DB_PORT}/foo`,
          user: 'postgres',
          password: 'postgres'
        }
      };

      server
        .post( `/${testDef.endpoint}` )
        .send( args )
        .expect( 500 )
        .end( ( err, res ) => {
          expect( err ).to.not.exist;
          expect( res.body.stdout ).to.not.exist;
          expect( res.body.stderr ).to.exist;
          expect( res.body.stderr ).to.have.a.property( 'stderr' ).to.contain( 'FATAL: database "foo" does not exist' );
          done();
        } )
    } );

    it.only( 'should return 500 if files are required, but not defined', done => {

      let args = {
        mode: 'sync',
        flyway_args: {
          url: `jdbc:postgresql://${config.FLYWAY_REST_DB_HOST}:${config.FLYWAY_REST_DB_PORT}/flyway`,
          user: 'postgres',
          password: 'postgres'
        }
      };

      server.post( `/${testDef.endpoint}` )
        .send( args )
        .end( ( err, res ) => {
          expect( err ).to.not.exist;
          if ( testDef.requireFiles ) {
            expect( res.statusCode ).to.be.equal( 500 );
          } else {
            expect( res.statusCode ).to.be.equal( 200 );
          }
          done();
        } )

    } );

  } )
}





