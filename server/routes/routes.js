import express from 'express';
import controller from '../controllers/controller';
import userController from '../controllers/usercontroller';
import rideController from '../controllers/ridecontroller';

const apiRoutes = express.Router();

apiRoutes.get('/', controller.get);
apiRoutes.get('/api/v1/rides', rideController.getRides);
apiRoutes.get('/api/v1/rides/:rideId', rideController.getSpecificRide);
apiRoutes.post('/api/v1/rides', controller.postRide);
apiRoutes.post('/api/v1/rides/:rideId/requests', rideController.postRideRequest);
apiRoutes.post('/api/v1/auth/signup', userController.postSignUp);
apiRoutes.post('/api/v1/auth/login', userController.postLogIn);

export default apiRoutes;
