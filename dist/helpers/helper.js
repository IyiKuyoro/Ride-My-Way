'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../model/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var helpers = {
  validEmail: function validEmail(email, callback) {
    if (email) {
      var sql = 'SELECT * FROM public."Users" WHERE "EmailAddress" = \'' + email + '\';';
      _db2.default.query(sql, function (err, res) {
        if (res.rowCount === 1) {
          callback(false);
        } else {
          callback(true);
        }
      });
    }
  }
};

exports.default = helpers;
//# sourceMappingURL=helper.js.map