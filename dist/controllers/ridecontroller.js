'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _db = require('../model/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var controller = {
  getRides: function getRides(req, res) {
    try {
      _jsonwebtoken2.default.verify(req.headers.jwt, process.env.KEY, null, function (err) {
        if (err) {
          res.status(401).json({
            status: 'fail',
            message: 'This token is either wrong or has expired'
          });
        } else {
          var sql = 'SELECT * FROM public."Rides";';
          _db2.default.query(sql, function (error, result) {
            if (error) {
              res.status(500);
              res.json({
                status: 'fail',
                message: 'Oops, seems like something went wrong here'
              });
            } else {
              res.status(200).json({
                data: {
                  rides: result.rows
                }
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
  getSpecificRide: function getSpecificRide(req, res) {
    try {
      _jsonwebtoken2.default.verify(req.headers.jwt, process.env.KEY, null, function (err) {
        if (err) {
          res.status(401).json({
            status: 'fail',
            message: 'This token is either wrong or has expired'
          });
        } else {
          var sql = 'SELECT * FROM public."Rides" Where "id" = \'' + req.params.rideId + '\';';
          _db2.default.query(sql, function (error, result) {
            if (error || result.rowCount === 0) {
              res.status(404).json({
                status: 'fail',
                message: 'Ride not found'
              });
            } else {
              res.status(200).json({
                data: {
                  ride: result.rows[0]
                }
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
  postRideRequest: function postRideRequest(req, res) {
    try {
      _jsonwebtoken2.default.verify(req.headers.jwt, process.env.KEY, null, function (err) {
        if (err) {
          res.status(401).json({
            status: 'fail',
            message: 'This token is either wrong or has expired'
          });
        } else {
          var sqlInsert = 'INSERT INTO public."Requests" ("rideId", "requesterId", "status", "requesterName", "mobileNumber") VALUES ($1, $2, $3, $4, $5) RETURNING *;';
          var values = [req.params.rideId, req.body.requesterId, 'pending', req.body.firstName + ' ' + req.body.lastName, req.body.mobileNumber];
          _db2.default.query(sqlInsert, values, function (error, result) {
            if (error) {
              res.status(400).json({
                status: 'fail',
                message: 'Some information provided is not of the right type'
              });
            } else {
              var sqlUpdate = 'UPDATE public."Rides" SET "requests" = array_cat("requests", \'{' + result.rows[0].id + '}\') Where "id" = \'' + req.params.rideId + '\';';
              _db2.default.query(sqlUpdate, function (inError) {
                if (inError) {
                  res.status(400).json({
                    status: 'fail',
                    message: 'Some information provided is not of the right type'
                  });
                } else {
                  res.status(200).json({
                    status: 'success',
                    message: 'Request Sent'
                  });
                }
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
  getRequests: function getRequests(req, res) {
    try {
      _jsonwebtoken2.default.verify(req.headers.jwt, process.env.KEY, null, function (err) {
        if (err) {
          res.status(401).json({
            status: 'fail',
            message: 'This token is either wrong or has expired'
          });
        } else {
          var sql = 'SELECT * FROM public."Requests" Where "rideId" = \'' + req.params.rideId + '\';';
          _db2.default.query(sql, function (error, result) {
            if (error || result.rowCount === 0) {
              res.status(400).json({
                status: 'fail',
                message: 'Cannot get requests'
              });
            } else {
              res.status(200).json({
                status: 'success',
                data: {
                  requests: result.rows
                }
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
  putResponse: function putResponse(req, res) {
    try {
      _jsonwebtoken2.default.verify(req.headers.jwt, process.env.KEY, null, function (err) {
        if (err) {
          res.status(401).json({
            status: 'fail',
            message: 'This token is either wrong or has expired'
          });
        } else {
          var sql = 'UPDATE public."Requests" SET "status" = \'' + req.body.newStatus + '\' Where "id" = \'' + req.params.requestId + '\';';
          _db2.default.query(sql, function (error, result) {
            if (error || result.rowCount === 0) {
              res.status(400).json({
                status: 'fail',
                message: 'Cannot put response'
              });
            } else {
              res.status(200).json({
                status: 'success',
                message: 'Response recorded'
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
  }
};

exports.default = controller;
//# sourceMappingURL=ridecontroller.js.map