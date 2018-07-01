'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var client = new _pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
client.connect();

exports.default = client;
//# sourceMappingURL=db.js.map