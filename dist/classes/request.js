"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Request =
/**
 * Create a new instance of a ride
 *
 * @param {string} rideID The ride ID
 * @param {string} userID The ID of the rider
 * @param {string} destination The exact destination of the rider
 */
function Request(rideID, userID, destination) {
  _classCallCheck(this, Request);

  this.rideID = rideID;
  this.requesterID = userID;
  this.destination = destination;
};

exports.default = Request;
//# sourceMappingURL=request.js.map