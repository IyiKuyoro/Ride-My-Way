'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var controller = {
  get: function get(req, res) {
    res.send('Server is running, kindly use the endpoints. /api/v1/rides, /api/v1/rides/:rideId, /api/v1/rides, /api/v1/rides/:rideId/requests');
  }
};

exports.default = controller;
//# sourceMappingURL=controller.js.map