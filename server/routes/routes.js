import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import controller from '../controllers/controller';
import userController from '../controllers/usercontroller';
import rideController from '../controllers/ridecontroller';

dotenv.config();
const apiRoutes = express.Router();

apiRoutes.get('/', controller.get);
apiRoutes.post('/api/v1/auth/signup', userController.postSignUp);
apiRoutes.post('/api/v1/auth/login', userController.postLogIn);

apiRoutes.use((req, res, done) => {
  jwt.verify(req.headers.jwt, process.env.KEY, null, (err, decoded) => {
    if (err) {
      res.status(401).json({
        status: 'fail',
        message: 'This token is either wrong or has expired'
      });
    } else {
      req.decoded = decoded;
      done();
    }
  });
});

apiRoutes.get('/api/v1/rides', rideController.getRides);
apiRoutes.get('/api/v1/rides/:rideId', rideController.getSpecificRide);
apiRoutes.post('/api/v1/rides/:rideId/requests', rideController.postRideRequest);
apiRoutes.post('/api/v1/users/rides', rideController.postRide);
apiRoutes.get('/api/v1/users/rides/:rideId/requests', rideController.getRequests);
apiRoutes.put('/api/v1/users/rides/:rideId/requests/:requestId', rideController.putResponse);

export default apiRoutes;
