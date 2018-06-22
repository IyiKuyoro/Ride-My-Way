const Request = require('request');
require('../server/app');
const assert = require('assert');

describe('Server', () => {
  const data = {};
  before((done) => {
    Request.get('http://localhost:3000/api/v1/rides', (error, res, body) => {
      data.status = res.statusCode;
      data.body = JSON.parse(body);
      done();
    });
  });
  after(() => {
    process.exit();
  });
  it('Response is ok', () => {
    assert.equal(data.status, 200);
    assert.equal(data.body.length, 4);
  });
});
