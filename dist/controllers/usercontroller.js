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
    _helper2.default.validEmail(req.body.emailAddress, function (valid) {
      try {
        if (valid) {
          _bcrypt2.default.genSalt(10, function (err, salt) {
            if (err) {
              throw err;
            }
            _bcrypt2.default.hash(req.body.password, salt, function (error, hash) {
              if (err) {
                throw err;
              }
              var text = 'INSERT INTO public."Users" ("firstName", "lastName", "sex", "dob", "mobileNumber", "emailAddress", "password", "ridesTaken", "ridesOffered", "friends", "accountStatus") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;';
              var values = [req.body.firstName, req.body.lastName, req.body.sex, req.body.dob, req.body.phoneNumber, req.body.emailAddress, hash, 0, 0, 0, 'Active'];
              _db2.default.query(text, values, function (error1, result) {
                if (error1) {
                  res.status(400).json({
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
                      iD: result.rows[0].id,
                      firstName: result.rows[0].firstName,
                      lastName: result.rows[0].lastName,
                      mobileNumber: result.rows[0].mobileNumber,
                      emailAddress: result.rows[0].emailAddress,
                      ridesTaken: result.rows[0].ridesTaken,
                      ridesOffered: result.rows[0].ridesOffered,
                      friends: result.rows[0].friends
                    }
                  };
                  res.json(response);
                }
              });
            });
          });
        } else {
          res.status(400).json({
            status: 'fail',
            message: 'Could not add user to database'
          });
        }
      } catch (e) {
        res.status(500).json({
          status: 'fail',
          message: 'Oops, seems like something went wrong here'
        });
      }
    });
  },
  postLogIn: function postLogIn(req, res) {
    try {
      var sql = 'SELECT * FROM public."Users" WHERE "emailAddress" = \'' + req.body.emailAddress + '\'';
      _db2.default.query(sql, function (err, result) {
        if (err || result.rows.length === 0) {
          res.status(401).json({
            status: 'fail',
            message: 'Wrong login details'
          });
        } else {
          _bcrypt2.default.compare(req.body.password, result.rows[0].password, function (error, same) {
            if (error || !same) {
              res.status(401).json({
                status: 'fail',
                message: 'Wrong login details'
              });
            } else {
              var token = _jsonwebtoken2.default.sign({
                userId: result.rows[0].id
              }, process.env.KEY, {
                expiresIn: '1h'
              });
              var response = {
                status: 'success',
                data: {
                  token: token,
                  iD: result.rows[0].id,
                  firstName: result.rows[0].firstName,
                  lastName: result.rows[0].lastName,
                  mobileNumber: result.rows[0].mobileNumber,
                  emailAddress: result.rows[0].emailAddress,
                  ridesTaken: result.rows[0].ridesTaken,
                  ridesOffered: result.rows[0].ridesOffered,
                  friends: result.rows[0].friends
                }
              };
              res.json(response);
            }
          });
        }
      });
    } catch (e) {
      res.status(500).json({
        status: 'fail',
        message: 'Oops, seems like something went wrong here'
      });
    }
  },
  postRide: function postRide(req, res) {
    try {
      _jsonwebtoken2.default.verify(req.headers.jwt, process.env.KEY, null, function (er) {
        if (er) {
          res.status(401).json({
            status: 'fail',
            message: 'This token is either wrong or has expired'
          });
        } else {
          var sqlInsert = 'INSERT INTO public."Rides" ("driverId", "origin", "destination", "time", "allowStops", "avaliableSpace", "description") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;';
          var values = [req.body.driverId, req.body.origin, req.body.destination, req.body.time, req.body.allowStops, req.body.avaliableSpace, req.body.description];
          _db2.default.query(sqlInsert, values, function (error) {
            if (error) {
              res.status(404).json({
                status: 'fail',
                message: 'Ride not found'
              });
            } else {
              var sqlSelect = 'SELECT * FROM public."Rides" Where "driverId" = ' + req.body.driverId + ';';
              _db2.default.query(sqlSelect, function (err, re) {
                var sqlUpdate = 'UPDATE public."Users" SET "ridesOffered" = ' + re.rowCount + ' Where "ID" = \'' + req.body.driverId + '\';';
                _db2.default.query(sqlUpdate, function () {
                  res.status(200).json({
                    status: 'success',
                    message: 'Ride offer saved'
                  });
                });
              });
            }
          });
        }
      });
    } catch (e) {
      res.status(500).json({
        status: 'fail',
        message: 'Oops, seems like something went wrong here'
      });
    }
  },
  deleteTestUser: function deleteTestUser(email, callback) {
    var sql = 'DELETE FROM public."Users" WHERE "emailAddress" = \'' + email + '\'';
    _db2.default.query(sql, function () {
      callback();
    });
  }
};

exports.default = controller;
//# sourceMappingURL=usercontroller.js.map