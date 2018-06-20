import Ride from './classes/ride';
import User from './classes/user';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Just some mock users for testing purposes
const user = new User('Jide', 'Dayo', 'Male', '08/03/1990', '0801472689', 'JideDayo@ridemyway.com');

// Array to hold the rides
const rides = [
];

app.post('/api/v1/rides', (req, res) => {
  const ride = req.body;
  const hasOrigin = Object.prototype.hasOwnProperty.call(ride, 'origin');
  const hasDestination = Object.prototype.hasOwnProperty.call(ride, 'destination');
  const hasTime = Object.prototype.hasOwnProperty.call(ride, 'time');
  const hasAllowStops = Object.prototype.hasOwnProperty.call(ride, 'allowStops');
  const hasAvaliableSpace = Object.prototype.hasOwnProperty.call(ride, 'avaliableSpace');
  const hasDescription = Object.prototype.hasOwnProperty.call(ride, 'description');

  if (hasOrigin && hasDestination && hasTime && hasAllowStops &&
    hasAvaliableSpace && hasDescription) {
    rides.push(new Ride(user.userID, ride.origin, ride.destination, ride.time, ride.allowStops, ride.avaliableSpace, ride.description));
    res.json(rides[rides.length - 1]);
  } else {
    res.status(400).send('The information you provided doesn\'t conform.');
  }
});

app.listen(3000);
