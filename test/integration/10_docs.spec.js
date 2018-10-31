/*global describe, expect, it, afterEach, before, beforeEach*/

import {superagent as request} from 'superagent';

xdescribe( 'Documentation examples', () => {

  xit( 'should ideally succeed', () => {
    const url = 'http://localhost:9001';
    request(url)
      .get( '/info')
      .end( ( err, res) => {

      })
  } );

} );
