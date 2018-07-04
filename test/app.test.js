import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app';
import controller from '../server/controllers/usercontroller';
import client from '../server/model/db';

chai.use(chaiHttp);
const { expect } = chai;

chai.expect();

//  James helped me understand how Chai works.
describe('Server', () => {
  let token = '';
  describe('Challenge two tests', () => {
    it('GET /', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(res.text).to.equal('Server is running, kindly use the endpoints. /api/v1/rides, /api/v1/rides/:rideId, /api/v1/rides, /api/v1/rides/:rideId/requests');
          done();
        });
    });
  });
  describe('Challenge three tests', () => {
    after((done) => {
      const sql = 'DELETE FROM public."Rides" WHERE "description" = \'This is a test data\';';
      const sqlRequests = 'DELETE FROM public."Requests" WHERE "driverId" = 10;';
      const sqlUpdate = 'UPDATE public."Rides" SET "requests" = \'{}\' WHERE "id" = 1;';
      client.query(sql);
      client.query(sqlRequests);
      client.query(sqlUpdate);
      done();
    });
    it('LogIn existing user (success)', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          emailAddress: 'SecondTestDriver@example.com',
          password: 'qwerty'
        })
        .end((err, res) => {
          ({ token } = res.body.data);
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('firstName');
          expect(res.body.data).to.have.property('lastName');
          expect(res.body.data).to.have.property('mobileNumber');
          expect(res.body.data).to.have.property('emailAddress');
          expect(res.body.data).to.have.property('ridesTaken');
          expect(res.body.data).to.have.property('ridesOffered');
          expect(res.body.data).to.have.property('friends');
          done();
        });
    });
    it('LogIn existing user (password error)', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          emailAddress: 'SecondTestDriver@example.com',
          password: 'qwy'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Wrong login details');
          done();
        });
    });
    it('Get all avaliable ride (success)', (done) => {
      chai.request(server)
        .get('/api/v1/rides')
        .set('jwt', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data.rides[0]).to.have.property('id');
          expect(res.body.data.rides[0]).to.have.property('driverId');
          expect(res.body.data.rides[0]).to.have.property('origin');
          expect(res.body.data.rides[0]).to.have.property('destination');
          expect(res.body.data.rides[0]).to.have.property('time');
          expect(res.body.data.rides[0]).to.have.property('allowStops');
          expect(res.body.data.rides[0]).to.have.property('avaliableSpace');
          expect(res.body.data.rides[0]).to.have.property('description');
          done();
        });
    });
    it('Get specific ride', (done) => {
      chai.request(server)
        .get('/api/v1/rides/1')
        .set('jwt', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data.ride).to.have.property('id');
          expect(res.body.data.ride).to.have.property('driverId');
          expect(res.body.data.ride).to.have.property('origin');
          expect(res.body.data.ride).to.have.property('destination');
          expect(res.body.data.ride).to.have.property('time');
          expect(res.body.data.ride).to.have.property('allowStops');
          expect(res.body.data.ride).to.have.property('avaliableSpace');
          expect(res.body.data.ride).to.have.property('description');
          done();
        });
    });
    it('Get specific ride (token error)', (done) => {
      chai.request(server)
        .get('/api/v1/rides/1')
        .set('jwt', 'vnsdvlcjibvasdlvjbhui')
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('This token is either wrong or has expired');
          done();
        });
    });
    it('Get specific ride (rideId error)', (done) => {
      chai.request(server)
        .get('/api/v1/rides/0')
        .set('jwt', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Ride not found');
          done();
        });
    });
    it('Post ride request', (done) => {
      chai.request(server)
        .post('/api/v1/rides/1/requests')
        .set('jwt', token)
        .send({
          requesterId: '9',
          firstName: 'Test',
          lastName: 'Requester',
          mobileNumber: '90472865784'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Request Sent');
          done();
        });
    });
    it('Post users ride (query error)', (done) => {
      chai.request(server)
        .post('/api/v1/users/rides')
        .set('jwt', token)
        .send({
          drirId: 10,
          time: '10:20AM',
          allowStops: true,
          avaliableSpace: 3,
          description: 'Musin via Ikeja and Oshodi'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Ride not found');
          done();
        });
    });
    it('Post users ride (token error)', (done) => {
      chai.request(server)
        .post('/api/v1/users/rides')
        .set('jwt', 'eyJhQ3NjgsImV4cCI6MTUzMDYzODM2OH0.QsX36Ay9pkfs7B0pruwyGw4YB5u_M8sEcOuT4PIpVAg')
        .send({
          driverId: 10,
          origin: 'Magodo',
          destination: 'Musin',
          time: '10:20AM',
          allowStops: true,
          avaliableSpace: 3,
          description: 'Musin via Ikeja and Oshodi'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('This token is either wrong or has expired');
          done();
        });
    });
    it('Post users ride', (done) => {
      chai.request(server)
        .post('/api/v1/users/rides')
        .set('jwt', token)
        .send({
          driverId: 10,
          origin: 'Magodo',
          destination: 'Musin',
          time: '10:20AM',
          allowStops: true,
          avaliableSpace: 3,
          description: 'This is a test data'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Ride offer saved');
          done();
        });
    });
    it('Get Request', (done) => {
      chai.request(server)
        .get('/api/v1/users/rides/2/requests')
        .set('jwt', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data.requests[0]).to.have.property('id');
          expect(res.body.data.requests[0]).to.have.property('requesterName');
          expect(res.body.data.requests[0]).to.have.property('mobileNumber');
          expect(res.body.data.requests[0]).to.have.property('status');
          done();
        });
    });
    it('Put Response', (done) => {
      chai.request(server)
        .put('/api/v1/users/rides/2/requests/1')
        .set('jwt', token)
        .send({
          newStatus: 'accepted'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Response recorded');
          done();
        });
    });
    it('Put response (query error)', (done) => {
      chai.request(server)
        .put('/api/v1/users/rides/0/requests/0')
        .set('jwt', token)
        .send({
          newStatu: 'accepted'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Cannot put response');
          done();
        });
    });
    it('Put response (token error)', (done) => {
      chai.request(server)
        .put('/api/v1/users/rides/0/requests/0')
        .set('jwt', 'QiOjE1MzA2MjAzNDEsImV4cCI6MTUzMDYyMzk0MX0.As30')
        .send({
          newStatu: 'accepted'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('This token is either wrong or has expired');
          done();
        });
    });
  });
  describe('', () => {
    after((done) => {
      controller.deleteTestUser('test.user@example.com', done);
    });
    it('SignUp with complete data (success)', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Test',
          lastName: 'User',
          sex: 'Male',
          dob: '05/01/1872',
          phoneNumber: 9054387612,
          emailAddress: 'test.user@example.com',
          password: 'qwerty',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('firstName');
          expect(res.body.data).to.have.property('lastName');
          expect(res.body.data).to.have.property('mobileNumber');
          expect(res.body.data).to.have.property('emailAddress');
          expect(res.body.data).to.have.property('ridesTaken');
          expect(res.body.data).to.have.property('ridesOffered');
          expect(res.body.data).to.have.property('friends');
          done();
        });
    });
    it('SignUp (query error)', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Test',
          lastName: 'User',
          sex: 'Male',
          emailAddress: 'test.user@example.com',
          password: 'qwerty',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Could not add user to database');
          done();
        });
    });
  });
});
