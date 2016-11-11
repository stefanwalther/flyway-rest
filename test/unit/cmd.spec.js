/*global expect, describe, it, beforeEach, before, after, afterEach */
import * as cmd from './../../src/middleware/cmd';

describe( 'cli:buildCommand', () => {

  it( 'throws an error if no args are defined.', () => {
    expect( cmd.buildCommand.bind( null, null ) ).to.throw( 'No Flyway args defined.' );
  } );

  it( 'Returns a command if flyway args are passed.', () => {
    expect( cmd.buildCommand.bind( null, { url: 'foo' } ) ).not.to.throw( Error );
    expect( cmd.buildCommand( { url: 'foo' } ) ).to.be.equal( 'flyway -q -url=foo info' );
  } );

  it( 'cli:buildCommand:command has to one of ["clean", "info", "validate", "baseline", "repair", "migrate"]', () => {
    expect( cmd.buildCommand( { url: 'foo' }, 'clean' ) ).to.be.equal( 'flyway -q -url=foo clean' );
    expect( cmd.buildCommand( { url: 'foo' }, 'info' ) ).to.be.equal( 'flyway -q -url=foo info' );
    expect( cmd.buildCommand( { url: 'foo' }, 'validate' ) ).to.be.equal( 'flyway -q -url=foo validate' );
    expect( cmd.buildCommand( { url: 'foo' }, 'baseline' ) ).to.be.equal( 'flyway -q -url=foo baseline' );
    expect( cmd.buildCommand( { url: 'foo' }, 'repair' ) ).to.be.equal( 'flyway -q -url=foo repair' );
    expect( cmd.buildCommand( { url: 'foo' }, 'migrate' ) ).to.be.equal( 'flyway -q -url=foo migrate' );
    expect( cmd.buildCommand.bind( null, { url: 'foo' }, 'bar' ) ).to.throw( 'Invalid Flyway action.' );
  } );

  it( 'cli:buildCommand:command defaults to "info"', () => {
    expect( cmd.buildCommand( { url: 'foo' } ) ).to.be.equal( 'flyway -q -url=foo info' );
  } );

} );
