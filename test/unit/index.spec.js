/*global describe, expect, it, beforeEach*/
import appServer from './../../src/app-server';

describe( 'unit:appServer', () => {

  let appInst = null;
  beforeEach( () => {
    appInst = new appServer();
  } );

  it( 'should have a method `start`', () => {
    expect( appInst ).to.have.a.property( 'start' ).that.is.a.function;
  } );

  it( 'should have a method `stop`', () => {
    expect( appInst ).to.have.a.property( 'stop' ).that.is.a.function;
  } );
} );
