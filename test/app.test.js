const Request = require('request');
require('../server/app');
const assert = require('assert');

describe('Post user sign-up', () => {
  const data = {};
  before((done) => {
    Request({
      url: 'http://localhost:3000/api/v1/auth/signup',
      method: 'POST',
      json: {
        FirstName: 'Test',
        LastName: 'User',
        Sex: 'Male',
        DOB: '05/01/1872',
        PhoneNumber: 9054387612,
        EmailAddress: 'test.user@example.com',
        Password: 'qwerty',
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
  it('User was added', () => {
    assert.equal(Object.prototype.hasOwnProperty.call(data.body, 'token'), true);
    assert.equal(Object.prototype.hasOwnProperty.call(data.body.data, 'FirstName'), true);
    assert.equal(Object.prototype.hasOwnProperty.call(data.body.data, 'LastName'), true);
    assert.equal(Object.prototype.hasOwnProperty.call(data.body.data, 'Sex'), true);
    assert.equal(Object.prototype.hasOwnProperty.call(data.body.data, 'DOB'), true);
    assert.equal(Object.prototype.hasOwnProperty.call(data.body.data, 'MobileNumber'), true);
    assert.equal(Object.prototype.hasOwnProperty.call(data.body.data, 'EmailAddress'), true);
    assert.equal(Object.prototype.hasOwnProperty.call(data.body.data, 'Password'), true);
    assert.equal(Object.prototype.hasOwnProperty.call(data.body.data, 'RidesTaken'), true);
    assert.equal(Object.prototype.hasOwnProperty.call(data.body.data, 'RidesOffered'), true);
    assert.equal(Object.prototype.hasOwnProperty.call(data.body.data, 'Friends'), true);
  });
});
