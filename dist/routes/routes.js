'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = require('../controllers/controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');

var apiRoutes = express.Router();

apiRoutes.get('/', _controller2.default.get);
apiRoutes.get('/api/v1/rides', _controller2.default.getRides);
apiRoutes.get('/api/v1/rides/:rideId', _controller2.default.getSpecificRide);
apiRoutes.post('/api/v1/rides', _controller2.default.postRide);
apiRoutes.post('/api/v1/rides/:rideId/requests', _controller2.default.postRequest);

exports.default = apiRoutes;
//# sourceMappingURL=routes.js.map