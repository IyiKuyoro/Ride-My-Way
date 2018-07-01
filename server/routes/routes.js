import express from 'express';
import controller from '../controllers/controller';
import userController from '../controllers/usercontroller';

const apiRoutes = express.Router();

apiRoutes.get('/', controller.get);
apiRoutes.get('/api/v1/rides', controller.getRides);
apiRoutes.get('/api/v1/rides/:rideId', controller.getSpecificRide);
apiRoutes.post('/api/v1/rides', controller.postRide);
apiRoutes.post('/api/v1/rides/:rideId/requests', controller.postRequest);
apiRoutes.post('/api/v1/auth/signup', userController.postSignUp);
apiRoutes.post('/api/v1/auth/login', userController.postLogIn);

export default apiRoutes;
