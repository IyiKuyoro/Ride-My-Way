import dotenv from 'dotenv';
import express from 'express';
import controller from '../controllers/controller';
import userController from '../controllers/usercontroller';
import rideController from '../controllers/ridecontroller';

dotenv.config();
const apiRoutes = express.Router();

apiRoutes.use((req, res, done) => {
  res.header('Accept', 'application/json, text/plain, */*');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Content-Type', 'application/json');
  done();
});

apiRoutes.get('/', controller.get);
apiRoutes.post('/api/v1/auth/signup', userController.postSignUp);
apiRoutes.post('/api/v1/auth/login', userController.postLogIn);
apiRoutes.get('/api/v1/rides', rideController.getRides);
apiRoutes.get('/api/v1/rides/:rideId', rideController.getSpecificRide);
apiRoutes.post('/api/v1/rides/:rideId/requests', rideController.postRideRequest);
apiRoutes.post('/api/v1/users/rides', rideController.postRide);
apiRoutes.get('/api/v1/users/rides/:rideId/requests', rideController.getRequests);
apiRoutes.put('/api/v1/users/rides/:rideId/requests/:requestId', rideController.putResponse);

export default apiRoutes;
