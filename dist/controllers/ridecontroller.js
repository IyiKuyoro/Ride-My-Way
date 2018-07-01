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
          res.status(403);
          res.json({
            message: 'Forbiden'
          });
        } else {
          var sql = 'SELECT * FROM public."Rides";';
          _db2.default.query(sql, function (error, result) {
            if (error || result.rowCount === 0) {
              res.status(401);
              res.json({
                message: 'Unauthorized'
              });
            } else {
              res.status(200);
              res.json(result.rows);
            }
          });
        }
      });
    } catch (e) {
      res.status(403);
      res.json({
        message: 'Forbiden'
      });
    }
  },
  getSpecificRide: function getSpecificRide(req, res) {
    try {
      _jsonwebtoken2.default.verify(req.headers.jwt, process.env.KEY, null, function (err) {
        if (err) {
          res.status(403);
          res.json({
            message: 'Forbiden'
          });
        } else {
          var sql = 'SELECT * FROM public."Rides" Where "ID" = \'' + req.params.rideId + '\';';
          _db2.default.query(sql, function (error, result) {
            if (error || result.rowCount === 0) {
              res.status(401);
              res.json({
                message: 'Unauthorized'
              });
            } else {
              res.status(200);
              res.json(result.rows[0]);
            }
          });
        }
      });
    } catch (e) {
      res.status(403);
      res.json({
        message: 'Forbiden'
      });
    }
  },
  postRideRequest: function postRideRequest(req, res) {
    try {
      _jsonwebtoken2.default.verify(req.headers.jwt, process.env.KEY, null, function (err) {
        if (err) {
          res.status(403);
          res.json({
            message: 'Forbiden'
          });
        } else {
          var sql = 'UPDATE public."Rides" SET "Requests" = array_cat("Requests", \'{' + req.body.requesterID + '}\') Where "ID" = \'' + req.params.rideId + '\';';
          _db2.default.query(sql, function (error, result) {
            if (error) {
              console.log(error);
              res.status(403);
              res.json({
                message: 'Unauthorized'
              });
            } else {
              res.status(200);
              res.json({
                message: 'Request Sent'
              });
            }
          });
        }
      });
    } catch (e) {
      res.status(403);
      res.json({
        message: 'Forbiden'
      });
    }
  }
};

exports.default = controller;
//# sourceMappingURL=ridecontroller.js.map