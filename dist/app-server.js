'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var appServer = function () {
  function appServer() {
    _classCallCheck(this, appServer);

    this.init();
  }

  _createClass(appServer, [{
    key: 'init',
    value: function init() {
      this.expressApp = (0, _express2.default)();

      this.expressApp.use((0, _cors2.default)({
        exposedHeaders: _config2.default.corsHeaders
      }));

      this.expressApp.use(_bodyParser2.default.json({
        limit: _config2.default.bodyLimit
      }));

      this.expressApp.use((0, _middleware2.default)(_config2.default));
    }
  }, {
    key: 'start',
    value: function start(done) {
      var _this = this;

      if (!this.server) {
        (function () {
          var port = process.env.PORT || _config2.default.port;
          console.log('env.port', process.env.PORT);
          _this.server = _this.expressApp.listen(port, function (err) {
            if (!err) {
              console.log('Started on port ' + port + '.');
            } else {
              console.log('Cannot start server.', err);
            }
            return done();
          });
        })();
      } else {
        done();
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this.server) {
        return this.server.close();
      }
    }
  }]);

  return appServer;
}();

exports.default = appServer;
//# sourceMappingURL=app-server.js.map
