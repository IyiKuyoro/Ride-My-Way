'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _helper = require('../helpers/helper');

var _helper2 = _interopRequireDefault(_helper);

var _db = require('../model/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var genID = function genID() {
  return 'U_' + (Math.floor(Math.random() * 9000000000) + 1000000000);
}; //  Got this from a web source I can't remember now.
var controller = {
  postSignUp: function postSignUp(req, res) {
    _helper2.default.validEmail(req.body.EmailAddress, function (valid) {
      try {
        if (valid) {
          _bcrypt2.default.genSalt(10, function (err, salt) {
            if (err) {
              throw err;
            }
            _bcrypt2.default.hash(req.body.Password, salt, function (error, hash) {
              if (err) {
                throw err;
              }
              var text = 'INSERT INTO public."Users" ("ID", "FirstName", "LastName", "Sex", "DOB", "MobileNumber", "EmailAddress", "Password", "RidesOffered", "RidesTaken", "Friends") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;';
              var values = [genID(), req.body.FirstName, req.body.LastName, req.body.Sex, req.body.DOB, req.body.PhoneNumber, req.body.EmailAddress, hash, 0, 0, 0];
              _db2.default.query(text, values, function (error1, result) {
                if (error1) {
                  res.status(400);
                  res.json({
                    status: 'fail',
                    message: 'Could not add user to database'
                  });
                } else {
                  var token = _jsonwebtoken2.default.sign({
                    email: result.rows[0].EmailAddress,
                    userId: result.rows[0].ID
                  }, process.env.KEY, {
                    expiresIn: '1h'
                  });
                  var response = {
                    token: token,
                    status: 'Success',
                    data: {
                      ID: result.rows[0].ID,
                      FirstName: result.rows[0].FirstName,
                      LastName: result.rows[0].LastName,
                      Sex: result.rows[0].Sex,
                      DOB: result.rows[0].DOB,
                      EmailAddress: result.rows[0].EmailAddress
                    }
                  };
                  res.json(response);
                }
              });
            });
          });
        } else {
          res.status(400);
          res.json({
            status: 'fail',
            message: 'Could not add user to database'
          });
        }
      } catch (e) {
        res.status(400);
        res.json({
          status: 'fail',
          message: 'Could not add user to database'
        });
      }
    });
  },
  deleteTestUser: function deleteTestUser(email, callback) {
    _helper2.default.validEmail(email, function (response) {
      if (response) {
        var sql = 'DELETE FROM public."Users" WHERE "EmailAddress" = \'' + email + '\'';
        _db2.default.query(sql, function () {
          callback();
        });
      } else {
        callback();
      }
    });
  }
};

exports.default = controller;
//# sourceMappingURL=usercontroller.js.map