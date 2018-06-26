'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _routes = require('./routes/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.use(_routes2.default);

var PORT = process.env.PORT || 3000;
var server = app.listen(PORT, function () {
  console.log('App is running on port ' + PORT);
});

exports.default = server;
//# sourceMappingURL=app.js.map