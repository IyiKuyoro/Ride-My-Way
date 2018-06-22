import Ride from './classes/ride';
import User from './classes/user';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Just some mock users for testing purposes
const u1 = new User('Jide', 'Dayo', 'Male', '08/03/1990', '0801472689', 'JideDayo@ridemyway.com');
const u2 = new User('James', 'Ikechukwu', 'Male', '08/07/1993', '08073901746', 'JamesIK@ridemyway.com');
const u3 = new User('Francis', 'Odebala', 'Male', '18/11/1985', '08927839810', 'FrancisO@ridemyway.com');
const u4 = new User('Okon', 'Johnson', 'Male', '12/05/1990', '09094782319', 'Okon@ridemyway.com');

// Array to hold the rides
const rides = [
  // Just some mock rides for testing purposes
  new Ride(u1.userID, 'Ikeja', 'Musin', '9:30AM', true, 3, 'Ikeja to Mushin via Oshodi'),
  new Ride(u2.userID, 'Lagos', 'Enugu', '12:00PM', false, 2, 'Non-stop to enugu'),
  new Ride(u3.userID, 'Ikorodu', 'Idumota', '1:45pm', false, 3),
  new Ride(u4.userID, 'Magodo', 'Iyana-Ipaja', '3:00PM', true, 3, 'Going via Ogba and Agege'),
];

app.get('/', (req, res) => {
  res.send('server is running, kindly use api endpoints.');
});

app.get('/api/v1/rides', (req, res) => {
  res.json(rides);
});

app.get('/api/v1/rides/:rideId', (req, res) => {
  let success = false;
  rides.forEach((element) => {
    if (element.rideID === req.params.rideId) {
      success = true;
      res.json(element);
    }
  });

  if (!success) {
    res.status(404).send('Information not found. Perhaps try to get the avaliable rides first and select an ID.');
  }
});

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
    rides.push(new Ride(u1.userID, ride.origin, ride.destination, ride.time, ride.allowStops, ride.avaliableSpace, ride.description));
    res.json(rides[rides.length - 1]);
  } else {
    res.status(400).send('The information you provided doesn\'t conform.');
  }
});

app.post('/api/v1/rides/:rideId/requests', (req, res) => {
  const request = req.body;
  const hasRequesterID = Object.prototype.hasOwnProperty.call(request, 'requesterID');
  const hasDestination = Object.prototype.hasOwnProperty.call(request, 'destination');

  if (hasRequesterID && hasDestination) {
    rides.forEach((element) => {
      if (element.rideID === req.params.rideId) {
        element.addRequest(request);
      }
    });
    res.json(rides);
  } else {
    res.status(400).send('Invalid data.');
  }
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

export default server;
