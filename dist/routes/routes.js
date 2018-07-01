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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiRoutes = _express2.default.Router();

apiRoutes.get('/', _controller2.default.get);
apiRoutes.get('/api/v1/rides', _controller2.default.getRides);
apiRoutes.get('/api/v1/rides/:rideId', _controller2.default.getSpecificRide);
apiRoutes.post('/api/v1/rides', _controller2.default.postRide);
apiRoutes.post('/api/v1/rides/:rideId/requests', _controller2.default.postRequest);
// apiRoutes.post('/api/v1/auth/signup', userController.postSignUp);

exports.default = apiRoutes;
//# sourceMappingURL=routes.js.map