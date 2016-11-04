# flyway-rest[![Build Status](https://travis-ci.org/stefanwalther/flyway-rest.svg?branch=master)](https://travis-ci.org/stefanwalther/flyway-rest) [![npm version](https://badge.fury.io/js/flyway-rest.svg)](https://www.npmjs.com/package/flyway-rest) [![Dependency Status](https://david-dm.org/stefanwalther/flyway-rest.svg)](https://david-dm.org/stefanwalther/flyway-rest)

> REST interface for flyway.

## Prerequisites

[Flyway](https://flywaydb.org/documentation/commandline/) CLI (v4+) installed.

## End Points

<!-- see https://github.com/pando85/cherrymusic/blob/devel-django/docs/api/v1/index.md -->

* **`info`** (GET) - Returns the current versions of nvm, node.js and flyway:

*_Example: `_

```js
  {
    "flyway": "4.0.3",
    "nvm": "v0.32.1",
    "node.js", "6.9.1"
  }
```

**Post parameters**

* **`mode`** - The execution mode. The following values are possible:
  - `simulation` - Does not execute the command, just returns the generated command (see `cmd` in the result).
  - `sync` - Executes the command synchronously and returns the result
  - `async` - Executes the command, but returns immediately a result
* **`command` - Only applicable for endpoint `/go`: Can any of  `clean`
* **`flyway_args`** - Flyway arguments as used in ["Flyway Command-line"](https://flywaydb.org/documentation/commandline/)

**Result**

* **`status`** - Status of the operation. Can have the following values:

  - `OK` - Everything OK.
  - `Error` - An error occurred, see `error` for more details.
  - `ValidationError` - A validation error occurred, see `validationErrors` for more details.
* **`mode`** - The execution mode as passed in.
* **`cmd`** - The CLI command as generated, based on the input arguments.
* errorMsg
* isValidationError
* validationErrors
* **`error`**

  - `message`
  - `details`

**Example**

## Todos

* [ ] Clear separation of concerns:
  - [ ] container flyway_rest_integration should not execute unit tests
* [ ] Container optimization
  - [ ] No need to do the full install on flyway_rest_integration; could use only a subset of devDependencies

## Author

**Stefan Walther**

* [github/stefanwalther](https://github.com/stefanwalther)
* [twitter/waltherstefan](http://twitter.com/waltherstefan)

## License

Released under the MIT license.

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.1.30, on November 04, 2016._