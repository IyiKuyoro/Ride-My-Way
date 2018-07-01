import rides from '../model/ridesmodel';
import users from '../model/usersmodel';
import Ride from '../model/classes/ride';

const controller = {
  get: (req, res) => {
    res.send('Server is running, kindly use the endpoints. /api/v1/rides, /api/v1/rides/:rideId, /api/v1/rides, /api/v1/rides/:rideId/requests');
  },

  postRide: (req, res) => {
    const ride = req.body;
    const hasOrigin = Object.prototype.hasOwnProperty.call(ride, 'origin');
    const hasDestination = Object.prototype.hasOwnProperty.call(ride, 'destination');
    const hasTime = Object.prototype.hasOwnProperty.call(ride, 'time');
    const hasAllowStops = Object.prototype.hasOwnProperty.call(ride, 'allowStops');
    const hasAvaliableSpace = Object.prototype.hasOwnProperty.call(ride, 'avaliableSpace');
    const hasDescription = Object.prototype.hasOwnProperty.call(ride, 'description');

    if (hasOrigin && hasDestination && hasTime && hasAllowStops &&
      hasAvaliableSpace && hasDescription) {
      rides.push(new Ride(users[0].userID, ride.origin, ride.destination, ride.time, ride.allowStops, ride.avaliableSpace, ride.description));
      res.json(rides[rides.length - 1]);
    } else {
      res.status(400);
      res.json({
        status: 'fail',
        message: 'The information you provided doesn\'t conform.',
      });
    }
  },
};

export default controller;
