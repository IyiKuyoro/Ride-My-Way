const Request = require('request');
require('../server/app');
const assert = require('assert');

describe('Server', () => {
  describe('POST-Requests', () => {
    const data = {};
    before((done) => {
      Request.get('http://localhost:3000/api/v1/rides', (error, res, body) => {
        data.status = res.statusCode;
        data.rides = JSON.parse(body);
        done();
      });
    });
    after(() => {
      process.exit();
    });

    it('Should return status 200', () => {
      assert.equal(data.status, 200);
    });

    it('Number of rides', () => {
      assert.equal(data.rides.length, 4);
    });
  });
});
