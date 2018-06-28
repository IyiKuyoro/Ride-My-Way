import userModel from '../server/model/dbUserModels';

const Request = require('request');
require('../server/app');
const assert = require('assert');

// describe('Server', () => {
//   let data = {};
//   before((done) => {
//     Request.get('http://localhost:3000/api/v1/rides', (error, res, body) => {
//       data.firstRideID = JSON.parse(body)[0].rideID;
//       done();
//     });
//   });
//   describe('POST Requests Success', () => {
//     before((done) => {
//       Request({
//         url: `http://localhost:3000/api/v1/rides/${data.firstRideID}/requests`,
//         method: 'POST',
//         json: {
//           requesterID: 'U_4782937582',
//           destination: 'Mushin',
//         },
//       }, (error, res, body) => {
//         data.status = res.statusCode;
//         data.body = [...body];
//         done();
//       });
//     });

//     it('Add correct request', () => {
//       const hasRequesterID = Object.prototype.hasOwnProperty.call(data.body[0].requests[0], 'requesterID');
//       const hasDestination = Object.prototype.hasOwnProperty.call(data.body[0].requests[0], 'destination');
//       assert.equal(hasRequesterID, true);
//       assert.equal(hasDestination, true);
//     });
//   });

//   describe('POST Requests Error', () => {
//     data = {};
//     before((done) => {
//       Request({
//         url: `http://localhost:3000/api/v1/rides/${data.firstRideID}/requests`,
//         method: 'POST',
//         json: {
//           requrID: 'U_4782937582', //  wrong data
//           destination: 'Mushin',
//         },
//       }, (error, res, body) => {
//         data.status = res.statusCode;
//         data.body = body;
//         done();
//       });
//     });
//     it('Invalid Data', () => {
//       assert.equal(data.status, 400);
//       assert.equal(data.body, 'Invalid data.');
//     });
//   });
// });

// describe('Server', () => {
//   const data = {};
//   before((done) => {
//     Request.get('http://localhost:3000/api/v1/rides', (error, res, body) => {
//       data.firstRideID = JSON.parse(body)[0].rideID;
//       done();
//     });
//   });
//   describe('GET Ride', () => {
//     before((done) => {
//       Request.get(`http://localhost:3000/api/v1/rides/${data.firstRideID}`, (error, res, body) => {
//         data.status = res.statusCode;
//         data.body = JSON.parse(body);
//         done();
//       });
//     });
//     it('Reponse has all properties of a ride object', () => {
//       const hasRideID = Object.prototype.hasOwnProperty.call(data.body, 'rideID');
//       const hasDriverID = Object.prototype.hasOwnProperty.call(data.body, 'driverID');
//       const hasOrigin = Object.prototype.hasOwnProperty.call(data.body, 'origin');
//       const hasDestination = Object.prototype.hasOwnProperty.call(data.body, 'destination');
//       const hasTime = Object.prototype.hasOwnProperty.call(data.body, 'time');
//       const hasAllowStops = Object.prototype.hasOwnProperty.call(data.body, 'allowStops');
//       const hasAvaliableSpace = Object.prototype.hasOwnProperty.call(data.body, 'avaliableSpace');
//       const hasDescription = Object.prototype.hasOwnProperty.call(data.body, 'description');
//       const hasRequests = Object.prototype.hasOwnProperty.call(data.body, 'requests');
//       assert.equal(hasRideID, true);
//       assert.equal(hasDriverID, true);
//       assert.equal(hasOrigin, true);
//       assert.equal(hasDestination, true);
//       assert.equal(hasTime, true);
//       assert.equal(hasAllowStops, true);
//       assert.equal(hasAvaliableSpace, true);
//       assert.equal(hasDescription, true);
//       assert.equal(hasRequests, true);
//     });
//   });
// });

// describe('POST Offer Success', () => {
//   const data = {};
//   before((done) => {
//     Request({
//       url: 'http://localhost:3000/api/v1/rides',
//       method: 'POST',
//       json: {
//         origin: 'Magodo',
//         destination: 'Musin',
//         time: '10:20AM',
//         allowStops: true,
//         avaliableSpace: 3,
//         description: 'Musin via Ikeja and Oshodi',
//       },
//     }, (error, res, body) => {
//       data.status = res.statusCode;
//       data.body = body;
//       done();
//     });
//   });

//   it('Add correct offer', () => {
//     const hasRideID = Object.prototype.hasOwnProperty.call(data.body, 'rideID');
//     const hasDriverID = Object.prototype.hasOwnProperty.call(data.body, 'driverID');
//     const hasOrigin = Object.prototype.hasOwnProperty.call(data.body, 'origin');
//     const hasDestination = Object.prototype.hasOwnProperty.call(data.body, 'destination');
//     const hasTime = Object.prototype.hasOwnProperty.call(data.body, 'time');
//     const hasAllowStops = Object.prototype.hasOwnProperty.call(data.body, 'allowStops');
//     const hasAvaliableSpace = Object.prototype.hasOwnProperty.call(data.body, 'avaliableSpace');
//     const hasDescription = Object.prototype.hasOwnProperty.call(data.body, 'description');
//     const hasRequests = Object.prototype.hasOwnProperty.call(data.body, 'requests');
//     assert.equal(hasRideID, true);
//     assert.equal(hasDriverID, true);
//     assert.equal(hasOrigin, true);
//     assert.equal(hasDestination, true);
//     assert.equal(hasTime, true);
//     assert.equal(hasAllowStops, true);
//     assert.equal(hasAvaliableSpace, true);
//     assert.equal(hasDescription, true);
//     assert.equal(hasRequests, true);
//   });

//   it('Status code 200', () => {
//     assert.equal(data.status, 200);
//   });
// });

// describe('POST Offer Error', () => {
//   const data = {};
//   before((done) => {
//     Request({
//       url: 'http://localhost:3000/api/v1/rides',
//       method: 'POST',
//       json: {
//         origin: 'Magodo',
//         destination: 'Musin',
//         avaliableSpace: 3,
//         description: 'Musin via Ikeja and Oshodi',
//       },
//     }, (error, res, body) => {
//       data.status = res.statusCode;
//       data.body = body;
//       done();
//     });
//   });
//   after(() => {
//     process.exit();
//   });
//   it('Refuses request', () => {
//     assert.equal(data.body, 'The information you provided doesn\'t conform.');
//   });

//   it('Status code 400', () => {
//     assert.equal(data.status, 400);
//   });
// });

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
  });
});
