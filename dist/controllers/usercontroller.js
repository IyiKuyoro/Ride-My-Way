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
              var text = 'INSERT INTO public."Users" ("FirstName", "LastName", "Sex", "DOB", "MobileNumber", "EmailAddress", "Password", "RidesTaken", "RidesOffered", "Friends", "AccountStatus") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;';
              var values = [req.body.FirstName, req.body.LastName, req.body.Sex, req.body.DOB, req.body.PhoneNumber, req.body.EmailAddress, hash, 0, 0, 0, 'Active'];
              _db2.default.query(text, values, function (error1, result) {
                if (error1) {
                  res.status(400);
                  res.json({
                    status: 'fail',
                    message: 'Could not add user to database'
                  });
                } else {
                  var token = _jsonwebtoken2.default.sign({
                    userId: result.rows[0].ID
                  }, process.env.KEY, {
                    expiresIn: '1h'
                  });
                  var response = {
                    status: 'Success',
                    data: {
                      token: token,
                      ID: result.rows[0].ID,
                      FirstName: result.rows[0].FirstName,
                      LastName: result.rows[0].LastName,
                      MobileNumber: result.rows[0].MobileNumber,
                      EmailAddress: result.rows[0].EmailAddress,
                      RidesTaken: result.rows[0].RidesTaken,
                      RidesOffered: result.rows[0].RidesOffered,
                      Friends: result.rows[0].Friends
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
  postLogIn: function postLogIn(req, res) {
    try {
      var sql = 'SELECT * FROM public."Users" WHERE "EmailAddress" = \'' + req.body.EmailAddress + '\'';
      _db2.default.query(sql, function (err, result) {
        if (err || result.rows.length === 0) {
          res.status(401);
          res.json({
            status: 'fail',
            message: 'Unauthorized'
          });
        } else {
          _bcrypt2.default.compare(req.body.Password, result.rows[0].Password, function (error, same) {
            if (error || !same) {
              res.status(401);
              res.json({
                status: 'fail',
                message: 'Unauthorized'
              });
            } else {
              var token = _jsonwebtoken2.default.sign({
                userId: result.rows[0].ID
              }, process.env.KEY, {
                expiresIn: '1h'
              });
              var response = {
                status: 'success',
                data: {
                  token: token,
                  ID: result.rows[0].ID,
                  FirstName: result.rows[0].FirstName,
                  LastName: result.rows[0].LastName,
                  MobileNumber: result.rows[0].MobileNumber,
                  EmailAddress: result.rows[0].EmailAddress,
                  RidesTaken: result.rows[0].RidesTaken,
                  RidesOffered: result.rows[0].RidesOffered,
                  Friends: result.rows[0].Friends
                }
              };
              res.json(response);
            }
          });
        }
      });
    } catch (e) {
      res.status(401);
      res.json({
        status: 'fail',
        message: 'Unauthorized'
      });
    }
  },
  deleteTestUser: function deleteTestUser(email, callback) {
    var sql = 'DELETE FROM public."Users" WHERE "EmailAddress" = \'' + email + '\'';
    _db2.default.query(sql, function () {
      callback();
    });
  }
};

exports.default = controller;
//# sourceMappingURL=usercontroller.js.map