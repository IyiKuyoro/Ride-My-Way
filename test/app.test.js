const Request = require('request');
require('../server/app');
const assert = require('assert');

describe('Server', () => {
  let data = {};
  before((done) => {
    Request.get('http://localhost:3000/api/v1/rides', (error, res, body) => {
      data.firstRideID = JSON.parse(body)[0].rideID;
      done();
    });
  });
  describe('POST Requests Success', () => {
    before((done) => {
      Request({
        url: `http://localhost:3000/api/v1/rides/${data.firstRideID}/requests`,
        method: 'POST',
        json: {
          requesterID: 'U_4782937582',
          destination: 'Mushin',
        },
      }, (error, res, body) => {
        data.status = res.statusCode;
        data.body = [...body];
        done();
      });
    });

    it('Add correct request', () => {
      const hasRequesterID = Object.prototype.hasOwnProperty.call(data.body[0].requests[0], 'requesterID');
      const hasDestination = Object.prototype.hasOwnProperty.call(data.body[0].requests[0], 'destination');
      assert.equal(hasRequesterID, true);
      assert.equal(hasDestination, true);
    });
  });

  describe('POST Requests Error', () => {
    data = {};
    before((done) => {
      Request({
        url: `http://localhost:3000/api/v1/rides/${data.firstRideID}/requests`,
        method: 'POST',
        json: {
          requrID: 'U_4782937582', //  wrong data
          destination: 'Mushin',
        },
      }, (error, res, body) => {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    after(() => {
      process.exit();
    });

    it('Invalid Data', () => {
      assert.equal(data.status, 400);
      assert.equal(data.body, 'Invalid data.');
    });
  });
});
