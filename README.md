# flyway-rest[![Build Status](https://travis-ci.org/stefanwalther/flyway-rest.svg?branch=master)](https://travis-ci.org/stefanwalther/flyway-rest) [![npm version](https://badge.fury.io/js/flyway-rest.svg)](https://www.npmjs.com/package/flyway-rest) [![Dependency Status](https://david-dm.org/stefanwalther/flyway-rest.svg)](https://david-dm.org/stefanwalther/flyway-rest)

> REST interface for flyway.

## Install

### Run docker container

```sh
docker run
```

### Run the development environment:

```sh
$ git clone https://github.com/stefanwalther/flyway-rest && cd flyway-rest

$ docker-comose up --f=./docker/docker-compose.dev.yml up
```

## Usage

### End Points

<!-- see https://github.com/pando85/cherrymusic/blob/devel-django/docs/api/v1/index.md -->

All endpoints share the same parameters.
All endpoints are also described in an OpenAPI definition file (swagger), which can be accessed at http://<server-name>:<port>/api-docs/

### Parameters

**Post parameters**

* **`mode`** - The execution mode. The following values are possible:
  - `get-cmd` - Does not execute the command, just validates and processes the request and returns the generated command (see `cmd` in the result).
  - `sync` - Executes the command synchronously and returns the result
* **`flyway_args`** - Flyway arguments as used in ["Flyway Command-line"](https://flywaydb.org/documentation/commandline/)
* **`files`** -

**Result**

* **`status`** - Status of the operation. Can have the following values:
  - `OK` - Everything OK.
  - `Error` - An error occurred, see `error` for more details.
  - `ValidationError` - A validation error occurred, see `validationErrors` for more details.
* **`mode`** - The execution mode as passed in.
* **`cmd`** - The CLI command as generated, based on the input arguments.
* **`errorMsg`** - Error message in case of `status` equals `Error` or `ValidationError`.
* **`validationErrors`** - Array of validation errors.

## Examples

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

## Todos

- [ ] Clear separation of concerns:
  - [ ] container flyway-rest-integration should not execute unit tests
- [ ] Container optimization
  - [ ] No need to do the full install on flyway-rest-integration; could use only a subset of devDependencies
- [ ] nodemon should not be part of the official image

## Author

**Stefan Walther**

* [github/stefanwalther](https://github.com/stefanwalther)
* [twitter/waltherstefan](http://twitter.com/waltherstefan)

## License

Released under the MIT license.

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.2.0, on November 28, 2016._
```