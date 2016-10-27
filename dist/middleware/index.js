'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

exports.default = function (config) {
  var routes = (0, _express.Router)();

  console.log('config in middleware', config);

  routes.get('/', function (req, res) {
    res.send({ message: 'Hello World!!' });
  });

  return routes;
};
//# sourceMappingURL=index.js.map
