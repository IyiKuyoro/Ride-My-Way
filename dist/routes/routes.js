'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controller = require('../controllers/controller');

var _controller2 = _interopRequireDefault(_controller);

var _usercontroller = require('../controllers/usercontroller');

var _usercontroller2 = _interopRequireDefault(_usercontroller);

var _ridecontroller = require('../controllers/ridecontroller');

var _ridecontroller2 = _interopRequireDefault(_ridecontroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiRoutes = _express2.default.Router();

apiRoutes.get('/', _controller2.default.get);
apiRoutes.get('/api/v1/rides', _ridecontroller2.default.getRides);
apiRoutes.get('/api/v1/rides/:rideId', _ridecontroller2.default.getSpecificRide);
apiRoutes.post('/api/v1/rides', _controller2.default.postRide);
apiRoutes.post('/api/v1/rides/:rideId/requests', _ridecontroller2.default.postRideRequest);
apiRoutes.post('/api/v1/auth/signup', _usercontroller2.default.postSignUp);
apiRoutes.post('/api/v1/auth/login', _usercontroller2.default.postLogIn);
apiRoutes.post('/api/v1/users/rides', _usercontroller2.default.postRide);

exports.default = apiRoutes;
//# sourceMappingURL=routes.js.map