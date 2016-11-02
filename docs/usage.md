
## End Points
<!-- see https://github.com/pando85/cherrymusic/blob/devel-django/docs/api/v1/index.md -->

- **`info`** (GET) - Returns the current versions of nvm, node.js and flyway:

**Example: `*
```js
  {
    "flyway": "4.0.3",
    "nvm": "v0.32.1",
    "node.js", "6.9.1"
  }
```

**Post parameters** 

- **`mode`** - The execution mode. The following values are possible:
  - `simulation` - Does not execute the command, just returns the generated command (see `cmd` in the result).
  - `sync` - Executes the command synchronously and returns the result
  - `async` - Executes the command, but returns immediately a result
- **`command` - 
- **`flyway_args`** - Flyway arguments as used in ["Flyway Command-line"](https://flywaydb.org/documentation/commandline/)
- **`callback_url`** - 

**Result**

- **`status`** - Status of the operation. Can have the following values:  
  - `OK` - Everything OK.
  - `Error` - An error occurred, see `error` for more details.
- **`mode`** - The execution mode as passed in.
- **`cmd`** - The CLI command as generated, based on the input arguments.
- **`error`**
  - `message`
  - `details`

**Example**

