The examples use superagent, so install that first:

```sh
$ npm install superagent --save
```


### Clean
```js
import superagent from 'superagent'

const url = '';
let args = {
  
};

superagent( url )
  .post( '/clean` )
  .send( 'args' )
  ;
  
```

### Migrate
```
import superagent from 'superagent';
import fs from 'fs';

// Create a list of file definitions


const url = '';
let args = {
  mode: 'sync',
  flyway_args: {
    url: 'jdbc:postgresql://server-name:5432/your-db',
    user: 'postgres',
    password: 'postgres'
  },
  files: fileDefs
};

superagent( url )
  .post( '/migrate' )
  .send( args )
  .end( ( err, res ) => {
    if (err) console.error( err );
    
    // DB has been migrated    
    console.log( 'Migration result: ', res.body );
    
  });