'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ridesmodel = require('../model/ridesmodel');

var _ridesmodel2 = _interopRequireDefault(_ridesmodel);

var _usersmodel = require('../model/usersmodel');

var _usersmodel2 = _interopRequireDefault(_usersmodel);

var _ride = require('../model/classes/ride');

var _ride2 = _interopRequireDefault(_ride);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = {
  get: function get(req, res) {
    res.send('Server is running, kindly use the endpoints. /api/v1/rides, /api/v1/rides/:rideId, /api/v1/rides, /api/v1/rides/:rideId/requests');
  },

  getRides: function getRides(req, res) {
    res.json(_ridesmodel2.default);
  },

  getSpecificRide: function getSpecificRide(req, res) {
    var success = false;
    _ridesmodel2.default.forEach(function (element) {
      if (element.rideID === req.params.rideId) {
        success = true;
        res.json(element);
      }
    });

    if (!success) {
      res.status(404).send('Information not found. Perhaps try to get the avaliable rides first and select an ID.');
    }
  },

  postRequest: function postRequest(req, res) {
    var request = req.body;
    var hasRequesterID = Object.prototype.hasOwnProperty.call(request, 'requesterID');
    var hasDestination = Object.prototype.hasOwnProperty.call(request, 'destination');

    if (hasRequesterID && hasDestination) {
      _ridesmodel2.default.forEach(function (element) {
        if (element.rideID === req.params.rideId) {
          element.addRequest(request);
        }
      });
      res.json(_ridesmodel2.default);
    } else {
      res.status(400).send('Invalid data.');
    }
  },

  postRide: function postRide(req, res) {
    var ride = req.body;
    var hasOrigin = Object.prototype.hasOwnProperty.call(ride, 'origin');
    var hasDestination = Object.prototype.hasOwnProperty.call(ride, 'destination');
    var hasTime = Object.prototype.hasOwnProperty.call(ride, 'time');
    var hasAllowStops = Object.prototype.hasOwnProperty.call(ride, 'allowStops');
    var hasAvaliableSpace = Object.prototype.hasOwnProperty.call(ride, 'avaliableSpace');
    var hasDescription = Object.prototype.hasOwnProperty.call(ride, 'description');

    if (hasOrigin && hasDestination && hasTime && hasAllowStops && hasAvaliableSpace && hasDescription) {
      _ridesmodel2.default.push(new _ride2.default(_usersmodel2.default[0].userID, ride.origin, ride.destination, ride.time, ride.allowStops, ride.avaliableSpace, ride.description));
      res.json(_ridesmodel2.default[_ridesmodel2.default.length - 1]);
    } else {
      res.status(400).send('The information you provided doesn\'t conform.');
    }
  }
};

exports.default = controller;
//# sourceMappingURL=controller.js.map