'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _validation = require('./validation');

var validation = _interopRequireWildcard(_validation);

var _cmd = require('./cmd');

var cmd = _interopRequireWildcard(_cmd);

var _execa = require('execa');

var _execa2 = _interopRequireDefault(_execa);

var _package = require('./../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (config) {
  var routes = (0, _express.Router)();

  routes.get('/', function (req, res) {
    res.json({
      name: _package2.default.name,
      version: _package2.default.version,
      description: _package2.default.description,
      homepage: _package2.default.homepage
    });
  });

  routes.get('/info', function (req, res) {
    res.json({
      "node.js": process.versions.node
    });
  });

  routes.get('/', function (req, res) {
    console.log('fetching default');
    res.sendStatus(200);
  });

  routes.post('/migrate', validation.validateParams(), cmd.exec());

  routes.get('/clean', function (req, res) {
    res.sendStatus(200);
  });

  routes.get('/info', function (req, res) {
    res.sendStatus(200);
  });

  routes.get('/validate', function (req, res) {
    res.sendStatus(200);
  });

  routes.get('/baseline', function (req, res) {
    res.sendStatus(200);
  });

  routes.get('/repair', function (req, res) {
    res.sendStatus(200);
  });

  return routes;
};
//# sourceMappingURL=index.js.map
