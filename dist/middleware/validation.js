'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateParams = validateParams;
function validateParams() {
  return function (req, res, next) {
    var errors = [];

    if (req.body && !req.body.flyway_args) {
      errors.push('Missing Flyway arguments.');
    }

    if (req.body.flyway_args && !req.body.flyway_args.url) {
      errors.push('Argument url is mandatory.');
    }

    // Todo: Generalize restStatus
    if (errors.length > 0) {
      res.status(500);
      res.json({
        error: 'Validation of parameters failed.',
        details: errors
      });
      res.end();
    } else {
      return next();
    }
  };
}
//# sourceMappingURL=validation.js.map
