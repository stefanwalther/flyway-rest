
### End Points
<!-- see https://github.com/pando85/cherrymusic/blob/devel-django/docs/api/v1/index.md -->

All endpoints share the same parameters.
All endpoints are also described in an OpenAPI definition file (swagger), which can be accessed at http://{server-name}:{port}/api-docs/

### Parameters

**Post parameters** 

- **`mode`** - The execution mode. The following values are possible:
  - `get-cmd` - Does not execute the command, just validates and processes the request and returns the generated command (see `cmd` in the result).
  - `sync` - Executes the command synchronously and returns the result
- **`flyway_args`** - Flyway arguments as used in ["Flyway Command-line"](https://flywaydb.org/documentation/commandline/)
- **`files`** - 

**Result**

- **`status`** - Status of the operation. Can have the following values:  
  - `OK` - Everything OK.
  - `Error` - An error occurred, see `error` for more details.
  - `ValidationError` - A validation error occurred, see `validationErrors` for more details.
- **`mode`** - The execution mode as passed in.
- **`cmd`** - The CLI command as generated, based on the input arguments.
- **`errorMsg`** - Error message in case of `status` equals `Error` or `ValidationError`. 
- **`validationErrors`** - Array of validation errors.
