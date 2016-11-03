
import promiseRetry from 'promise-retry';

export function healthcheck( server ) {

  const check = () => {

    return server
      .get( '/health' )
      .expect( 200 )
  };

  let retryOpts = {
    retries: 200,
    factor: 1,
    minTimeout: 250
  };

  return promiseRetry( function( retry, attempts ) {

    if ( attempts > 1 ) {
      console.log( `Health-check failed, retry (${attempts - 1})` );
    }

    return check()
      .catch( retry );

  }, retryOpts )

}
