'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ride = require('./classes/ride');

var _ride2 = _interopRequireDefault(_ride);

var _user = require('./classes/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

// Just some mock users for testing purposes
var u1 = new _user2.default('Jide', 'Dayo', 'Male', '08/03/1990', '0801472689', 'JideDayo@ridemyway.com');
var u2 = new _user2.default('James', 'Ikechukwu', 'Male', '08/07/1993', '08073901746', 'JamesIK@ridemyway.com');
var u3 = new _user2.default('Francis', 'Odebala', 'Male', '18/11/1985', '08927839810', 'FrancisO@ridemyway.com');
var u4 = new _user2.default('Okon', 'Johnson', 'Male', '12/05/1990', '09094782319', 'Okon@ridemyway.com');

// Array to hold the rides
var rides = [
// Just some mock rides for testing purposes
new _ride2.default(u1.userID, 'Ikeja', 'Musin', '9:30AM', true, 3, 'Ikeja to Mushin via Oshodi'), new _ride2.default(u2.userID, 'Lagos', 'Enugu', '12:00PM', false, 2, 'Non-stop to enugu'), new _ride2.default(u3.userID, 'Ikorodu', 'Idumota', '1:45pm', false, 3), new _ride2.default(u4.userID, 'Magodo', 'Iyana-Ipaja', '3:00PM', true, 3, 'Going via Ogba and Agege')];

app.get('/', function (req, res) {
  res.send('server is running, kindly use api endpoints.');
});

app.get('/api/v1/rides', function (req, res) {
  res.json(rides);
});

app.get('/api/v1/rides/:rideId', function (req, res) {
  var success = false;
  rides.forEach(function (element) {
    if (element.rideID === req.params.rideId) {
      success = true;
      res.json(element);
    }
  });

  if (!success) {
    res.status(404).send('Information not found. Perhaps try to get the avaliable rides first and select an ID.');
  }
});

app.post('/api/v1/rides', function (req, res) {
  var ride = req.body;
  var hasOrigin = Object.prototype.hasOwnProperty.call(ride, 'origin');
  var hasDestination = Object.prototype.hasOwnProperty.call(ride, 'destination');
  var hasTime = Object.prototype.hasOwnProperty.call(ride, 'time');
  var hasAllowStops = Object.prototype.hasOwnProperty.call(ride, 'allowStops');
  var hasAvaliableSpace = Object.prototype.hasOwnProperty.call(ride, 'avaliableSpace');
  var hasDescription = Object.prototype.hasOwnProperty.call(ride, 'description');

  if (hasOrigin && hasDestination && hasTime && hasAllowStops && hasAvaliableSpace && hasDescription) {
    rides.push(new _ride2.default(u1.userID, ride.origin, ride.destination, ride.time, ride.allowStops, ride.avaliableSpace, ride.description));
    res.json(rides[rides.length - 1]);
  } else {
    res.status(400).send('The information you provided doesn\'t conform.');
  }
});

app.post('/api/v1/rides/:rideId/requests', function (req, res) {
  var request = req.body;
  var hasRequesterID = Object.prototype.hasOwnProperty.call(request, 'requesterID');
  var hasDestination = Object.prototype.hasOwnProperty.call(request, 'destination');

  if (hasRequesterID && hasDestination) {
    rides.forEach(function (element) {
      if (element.rideID === req.params.rideId) {
        element.addRequest(request);
      }
    });
    res.json(rides);
  } else {
    res.status(400).send('Invalid data.');
  }
});

var PORT = process.env.PORT || 3000;
var server = app.listen(PORT, function () {
  console.log('App is running on port ' + PORT);
});

exports.default = server;
//# sourceMappingURL=app.js.map