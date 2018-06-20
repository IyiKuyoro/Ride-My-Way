const Request = require('request');
const server = require('../server/app');

describe('Server', () => {
  describe('POST-Requests', () => {
    const data = {};
    beforeAll((done) => {
      Request.get('http://localhost:3000/api/v1/rides', (error, res, body) => {
        data.status = res.statusCode;
        data.rides = JSON.parse(body);
        done();
      });
    });

    it('Status 200', () => {
      expect(data.status).toBe(200);
    });

    it('Number of rides', () => {
      expect(data.rides.length).toEqual(4);
    });
  });
});
