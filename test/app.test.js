const Request = require('request');
require('../server/app');
const assert = require('assert');

describe('Server', () => {
  const data = {};
  before((done) => {
    Request.get('http://localhost:3000/api/v1/rides', (error, res, body) => {
      data.firstRideID = JSON.parse(body)[0].rideID;
      done();
    });
  });
  describe('GET Ride', () => {
    before((done) => {
      Request.get(`http://localhost:3000/api/v1/rides/${data.firstRideID}`, (error, res, body) => {
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    after(() => {
      process.exit();
    });
    it('Reponse has all properties of a ride object', () => {
      const hasRideID = Object.prototype.hasOwnProperty.call(data.body, 'rideID');
      const hasDriverID = Object.prototype.hasOwnProperty.call(data.body, 'driverID');
      const hasOrigin = Object.prototype.hasOwnProperty.call(data.body, 'origin');
      const hasDestination = Object.prototype.hasOwnProperty.call(data.body, 'destination');
      const hasTime = Object.prototype.hasOwnProperty.call(data.body, 'time');
      const hasAllowStops = Object.prototype.hasOwnProperty.call(data.body, 'allowStops');
      const hasAvaliableSpace = Object.prototype.hasOwnProperty.call(data.body, 'avaliableSpace');
      const hasDescription = Object.prototype.hasOwnProperty.call(data.body, 'description');
      const hasRidersID = Object.prototype.hasOwnProperty.call(data.body, 'ridersID');
      assert.equal(hasRideID, true);
      assert(hasDriverID, true);
      assert(hasOrigin, true);
      assert(hasDestination, true);
      assert(hasTime, true);
      assert(hasAllowStops, true);
      assert(hasAvaliableSpace, true);
      assert(hasDescription, true);
      assert(hasRidersID, true);
    });
  });
});
