import Ride from './classes/ride';
import User from './classes/user';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Just some mock users for testing purposes
const driver1 = new User('Jide', 'Dayo', 'Male', '12/05/1990', '08123791782', 'JideDayo@ridemyway.com');
const driver2 = new User('Francis', 'Odebala', 'Male', '16/05/1985', '08127685496', 'FrancisO@ridemyway.com');
const driver3 = new User('Okon', 'Johnson', 'Male', '19/02/1993', '08036489524', 'Okon@ridemyway.com');

// Array to hold the rides
const rides = [
  // Just some mock rides for testing purposes
  new Ride(driver1.userID, 'Ikeja', 'Musin', '9:30AM', true, 3, 'Ikeja to Mushin via Oshodi'),
  new Ride(driver2.userID, 'Lagos', 'Enugu', '12:00PM', false, 2, 'Non-stop to enugu'),
  new Ride(driver3.userID, 'Ikorodu', 'Idumota', '1:45pm', false, 3),
];

app.get('/api/v1/rides', (req, res) => {
  res.json(rides);
});

app.post('/api/v1/rides/:rideId/requests', (req, res) => {
  const request = req.body;
  rides.forEach((element) => {
    if (element.rideID === req.params.rideId) {
      element.addRequest(request);
    }
  });
  res.json(rides);
});

app.listen(3000);
