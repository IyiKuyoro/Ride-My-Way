'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _usercontroller = require('../controllers/usercontroller');

var _usercontroller2 = _interopRequireDefault(_usercontroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// goten from a source online I forgot to document.
var genID = function genID() {
  return 'U_' + (Math.floor(Math.random() * 9000000000) + 1000000000);
};

var user = {
  addUser: function addUser(object) {
    var result = [];

    _bcrypt2.default.genSalt(10, function (err, salt) {
      if (err) {
        console.log(err);
      }
      _bcrypt2.default.hash(object.Password, salt, function (error, hash) {
        if (err) {
          console.log(error);
        }
        var text = 'INSERT INTO public."Users" ("ID", "FirstName", "LastName", "Sex", "DOB", "MobileNumber", "EmailAddress", "Password", "RidesOffered", "RidesTaken", "Friends") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;';
        var values = [genID(), object.FirstName, object.LastName, object.Sex, object.DOB, object.PhoneNumber, object.EmailAddress, hash, 0, 0, 0];
        _db2.default.query(text, values, function (error1, res) {
          if (error1) {
            console.log(error1.stack);
          } else {
            _usercontroller2.default.postSuccess = true;
            result = res.rows[0];
            console.log(result);
          }
        });
      });
    });
  }
};

exports.default = user;
//# sourceMappingURL=dbUserModels.js.map