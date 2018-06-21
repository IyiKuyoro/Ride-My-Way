"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ride = function () {
  _createClass(Ride, [{
    key: "generateID",
    value: function generateID() {
      this.rideID = "R_" + (Math.floor(Math.random() * 9000000000) + 1000000000);
    }

    /**
     * Create a new instance of a ride
     *
     * @param {string} userID The drivers userID
     * @param {string} origin The origin of the ride
     * @param {string} destination The destination of the ride
     * @param {string} time The time of departure
     * @param {bool} stops Will the driver be making stops
     * @param {number} avaSpace The avaliable space on the ride
     * @param {string} description A description of the proposed route
     */

  }]);

  function Ride(userID, origin, destination, time, stops, avaSpace, description) {
    _classCallCheck(this, Ride);

    this.generateID();
    this.driverID = userID;
    this.origin = origin;
    this.destination = destination;
    this.time = time;
    this.allowStops = stops;
    this.avaliableSpace = avaSpace;
    this.description = description;
    this.ridersID = [];
  }

  return Ride;
}();

exports.default = Ride;
//# sourceMappingURL=ride.js.map