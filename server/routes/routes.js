import controller from '../controllers/controller';

const express = require('express');

const apiRoutes = express.Router();

apiRoutes.get('/', controller.get);
apiRoutes.get('/api/v1/rides', controller.getRides);
apiRoutes.get('/api/v1/rides/:rideId', controller.getSpecificRide);
apiRoutes.post('/api/v1/rides', controller.postRide);
apiRoutes.post('/api/v1/rides/:rideId/requests', controller.postRequest);

export default apiRoutes;
