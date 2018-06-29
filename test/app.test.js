import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app';

chai.use(chaiHttp);
const { expect } = chai;

chai.expect();

//  James helped me understand how Chai works.
describe('Server', () => {
  describe('Challenge one - GET Requests', () => {
    let data = {};
    it('GET /api/v1/rides', (done) => {
      chai.request(server)
        .get('/api/v1/rides')
        .end((err, res) => {
          data = res;
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.lengthOf(4);
          done();
        });
    });
    it('Response has all required properties of a ride', (done) => {
      chai.request(server)
        .get(`/api/v1/rides/${data.body[0].rideID}`)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('rideID');
          expect(res.body).to.have.property('driverID');
          expect(res.body).to.have.property('origin');
          expect(res.body).to.have.property('destination');
          expect(res.body).to.have.property('time');
          expect(res.body).to.have.property('allowStops');
          expect(res.body).to.have.property('avaliableSpace');
          expect(res.body).to.have.property('description');
          expect(res.body).to.have.property('requests');
          done();
        });
    });
  });

  describe('Challenge two - POST User Sign-Up', () => {
    it('POST /api/v1/auth/signup', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          FirstName: 'Test',
          LastName: 'User',
          Sex: 'Male',
          DOB: '05/01/1872',
          PhoneNumber: 9054387612,
          EmailAddress: 'test.user@example.com',
          Password: 'qwerty',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('token');
          expect(res.body.data).to.have.property('FirstName');
          expect(res.body).to.have.property('LastName');
          expect(res.body).to.have.property('Sex');
          expect(res.body).to.have.property('DOB');
          expect(res.body).to.have.property('EmailAddress');
          done();
        });
      process.exit();
    });
  });
});

// const Request = require('request');
// require('../server/app');
// const assert = require('assert');
// 
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

// // New test
// describe('Post user sign-up', () => {
//   const data = {};
//   before((done) => {
//     Request({
//       url: 'http://localhost:3000/api/v1/auth/signup',
//       method: 'POST',
//       json: {
//         FirstName: 'Test',
//         LastName: 'User',
//         Sex: 'Male',
//         DOB: '05/01/1872',
//         PhoneNumber: 9054387612,
//         EmailAddress: 'test.user@example.com',
//         Password: 'qwerty',
//       },
//     }, (error, res, body) => {
//       data.body = body;
//       done();
//     });
//   });
//   after(() => {
//     process.exit();
//   });
//   it('User was added', () => {
//     assert.equal(Object.prototype.hasOwnProperty.call(data.body, 'token'), true);
//     assert.equal(Object.prototype.hasOwnProperty.call(data.body.data, 'FirstName'), true);
//     assert.equal(Object.prototype.hasOwnProperty.call(data.body.data, 'LastName'), true);
//     assert.equal(Object.prototype.hasOwnProperty.call(data.body.data, 'Sex'), true);
//     assert.equal(Object.prototype.hasOwnProperty.call(data.body.data, 'DOB'), true);
//     assert.equal(Object.prototype.hasOwnProperty.call(data.body.data, 'EmailAddress'), true);
//   });
// });
