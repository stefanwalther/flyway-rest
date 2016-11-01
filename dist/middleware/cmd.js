'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.exec = exec;
exports.buildCommand = buildCommand;

var _execa = require('execa');

var _execa2 = _interopRequireDefault(_execa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function exec() {
  return function (req, res, next) {

    res.status(200);
    var result = {
      mode: req.body.mode,
      cmd: buildCommand(req.body.flyway_args, req.body.command),
      ts_start: new Date().toJSON(),
      status: 'OK'
    };
    console.log('server', result);
    res.json(result);
    next();
  };
}

function buildCommand(flyWayArgs) {
  var command = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';


  if (!flyWayArgs || (typeof flyWayArgs === 'undefined' ? 'undefined' : _typeof(flyWayArgs)) === 'object' && Object.keys(flyWayArgs).length < 1) {
    throw new Error('No Flyway args defined.');
  }

  if (['clean', 'info', 'validate', 'baseline', 'repair', 'migrate'].indexOf(command) <= -1) {
    throw new Error('Invalid Flyway command.', command);
  }

  var space = ' ';
  var cmd = 'flyway';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(flyWayArgs)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      cmd += space + '--' + key + space + flyWayArgs[key];
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  cmd += space + command;
  return cmd;
}
//# sourceMappingURL=cmd.js.map
