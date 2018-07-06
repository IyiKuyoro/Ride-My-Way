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
    it('LogIn existing user (password error)', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          emailAddress: 'SecondTestDriver@example.com',
          passwod: 'qwy'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('password is required');
          done();
        });
    });
    it('LogIn existing user (email error)', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          emaildress: 'SecondTestDriver@example.com',
          password: 'qwy'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('emailAddress is required');
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
    it('Post users ride (origin error)', (done) => {
      chai.request(server)
        .post('/api/v1/users/rides')
        .set('jwt', token)
        .send({
          orign: 'Magodo',
          destination: 'Musin',
          time: '10:20AM',
          allowStops: true,
          avaliableSpace: 3,
          description: 'This is a test data'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('origin is required');
          done();
        });
    });
    it('Post users ride (origin error)', (done) => {
      chai.request(server)
        .post('/api/v1/users/rides')
        .set('jwt', token)
        .send({
          origin: {},
          destination: 'Musin',
          time: '10:20AM',
          allowStops: true,
          avaliableSpace: 3,
          description: 'This is a test data'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('origin must be a string');
          done();
        });
    });
    it('Post users ride (destination error)', (done) => {
      chai.request(server)
        .post('/api/v1/users/rides')
        .set('jwt', token)
        .send({
          origin: 'Magodo',
          destintion: 'Musin',
          time: '10:20AM',
          allowStops: true,
          avaliableSpace: 3,
          description: 'This is a test data'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('destination is required');
          done();
        });
    });
    it('Post users ride (destination error)', (done) => {
      chai.request(server)
        .post('/api/v1/users/rides')
        .set('jwt', token)
        .send({
          origin: 'Magodo',
          destination: {},
          time: '10:20AM',
          allowStops: true,
          avaliableSpace: 3,
          description: 'This is a test data'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('destination must be a string');
          done();
        });
    });
    it('Post users ride (time error)', (done) => {
      chai.request(server)
        .post('/api/v1/users/rides')
        .set('jwt', token)
        .send({
          origin: 'Magodo',
          destination: 'Musin',
          tie: '10:20',
          allowStops: 'true',
          avaliableSpace: 3,
          description: 'This is a test data'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('time is required');
          done();
        });
    });
    it('Post users ride (time error)', (done) => {
      chai.request(server)
        .post('/api/v1/users/rides')
        .set('jwt', token)
        .send({
          origin: 'Magodo',
          destination: 'Musin',
          time: '10:20AM',
          allowStops: 'true',
          avaliableSpace: 3,
          description: 'This is a test data'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('time must be in the format hh:mm');
          done();
        });
    });
    it('Post users ride (allowStops error)', (done) => {
      chai.request(server)
        .post('/api/v1/users/rides')
        .set('jwt', token)
        .send({
          origin: 'Magodo',
          destination: 'Musin',
          time: '10:20',
          allwStops: 'true',
          avaliableSpace: 3,
          description: 'This is a test data'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('allowStops is required');
          done();
        });
    });
    it('Post users ride (allowStops error)', (done) => {
      chai.request(server)
        .post('/api/v1/users/rides')
        .set('jwt', token)
        .send({
          origin: 'Magodo',
          destination: 'Musin',
          time: '10:20',
          allowStops: true,
          avaliableSpace: 3,
          description: 'This is a test data'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('allowStops must be a string type');
          done();
        });
    });
    it('Post users ride (avaliableSpace error)', (done) => {
      chai.request(server)
        .post('/api/v1/users/rides')
        .set('jwt', token)
        .send({
          origin: 'Magodo',
          destination: 'Musin',
          time: '10:20',
          allowStops: 'true',
          aaliableSpace: 3,
          description: 'This is a test data'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('avaliableSpace is required');
          done();
        });
    });
    it('Post users ride (avaliableSpace error)', (done) => {
      chai.request(server)
        .post('/api/v1/users/rides')
        .set('jwt', token)
        .send({
          origin: 'Magodo',
          destination: 'Musin',
          time: '10:20',
          allowStops: 'true',
          avaliableSpace: 'hhfd',
          description: 'This is a test data'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('avaliableSpace must be an integer');
          done();
        });
    });
    it('Post users ride (description error)', (done) => {
      chai.request(server)
        .post('/api/v1/users/rides')
        .set('jwt', token)
        .send({
          origin: 'Magodo',
          destination: 'Musin',
          time: '10:20',
          allowStops: 'true',
          avaliableSpace: 3,
          desription: 'This is a test data'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('description is required');
          done();
        });
    });
    it('Post users ride (description error)', (done) => {
      chai.request(server)
        .post('/api/v1/users/rides')
        .set('jwt', token)
        .send({
          origin: 'Magodo',
          destination: 'Musin',
          time: '10:20',
          allowStops: 'true',
          avaliableSpace: 3,
          description: {}
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('description must be a string');
          done();
        });
    });
    it('Post users ride (token error)', (done) => {
      chai.request(server)
        .post('/api/v1/users/rides')
        .set('jwt', 'eyJhQ3NjgsImV4cCI6MTUzMDYzODM2OH0.QsX36Ay9pkfs7B0pruwyGw4YB5u_M8sEcOuT4PIpVAg')
        .send({
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
          origin: 'Magodo',
          destination: 'Musin',
          time: '10:20',
          allowStops: 'true',
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
          done();
        });
    });
    it('SignUp (firstNameError)', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstNae: 'Test',
          lastName: 'User',
          sex: 'Male',
          dob: '05/01/1872',
          phoneNumber: 9054387612,
          emailAddress: 'test.user@example.com',
          password: 'qwerty',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('firstName is a required field');
          done();
        });
    });
    it('SignUp (lastNameError)', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Test',
          lastNae: 'User',
          sex: 'Male',
          dob: '05/01/1872',
          phoneNumber: 9054387612,
          emailAddress: 'test.user@example.com',
          password: 'qwerty',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('lastName is a required field');
          done();
        });
    });
    it('SignUp (sexError)', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Test',
          lastName: 'User',
          ex: 'Male',
          dob: '05/01/1872',
          phoneNumber: 9054387612,
          emailAddress: 'test.user@example.com',
          password: 'qwerty',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('sex is a required field');
          done();
        });
    });
    it('SignUp (dobError)', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Test',
          lastName: 'User',
          sex: 'Male',
          phoneNumber: 9054387612,
          emailAddress: 'test.user@example.com',
          password: 'qwerty',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('dob is a required field');
          done();
        });
    });
    it('SignUp (phoneNumberError)', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Test',
          lastName: 'User',
          sex: 'Male',
          dob: '05/01/1872',
          pheNumber: 9054387612,
          emailAddress: 'test.user@example.com',
          password: 'qwerty',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('phoneNumber is a required field');
          done();
        });
    });
    it('SignUp (emailError)', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Test',
          lastName: 'User',
          sex: 'Male',
          dob: '05/01/1872',
          phoneNumber: 9054387612,
          emaAddress: 'test.user@example.com',
          password: 'qwerty',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('emailAddress is a required field');
          done();
        });
    });
    it('SignUp (passwordError)', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Test',
          lastName: 'User',
          sex: 'Male',
          dob: '05/01/1872',
          phoneNumber: 9054387612,
          emailAddress: 'test.user@example.com',
          pasord: 'qwerty',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('password is a required field');
          done();
        });
    });
    it('SignUp (firstNameError)', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: '453dscev',
          lastName: 'User',
          sex: 'Male',
          dob: '05/01/1872',
          phoneNumber: 9054387612,
          emailAddress: 'test.user@example.com',
          password: 'qwerty',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('firstName must be a string');
          done();
        });
    });
    it('SignUp (lastNameError)', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'scdasdf',
          lastName: '1234',
          sex: 'Male',
          dob: '05/01/1872',
          phoneNumber: 9054387612,
          emailAddress: 'test.user@example.com',
          password: 'qwerty',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('lastName must be a string');
          done();
        });
    });
    it('SignUp (sexError)', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'scdasdf',
          lastName: 'sdvsfs',
          sex: '345sd',
          dob: '05/01/1872',
          phoneNumber: 9054387612,
          emailAddress: 'test.user@example.com',
          password: 'qwerty',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('sex must be a string');
          done();
        });
    });
    it('SignUp (dobError)', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'scdasdf',
          lastName: 'sdvsfs',
          sex: 'male',
          dob: '05/011872',
          phoneNumber: 9054387612,
          emailAddress: 'test.user@example.com',
          password: 'qwerty',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('dob must be in a this format mm/dd/yy');
          done();
        });
    });
    it('SignUp (phoneNumberError)', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'scdasdf',
          lastName: 'sdvsfs',
          sex: 'male',
          dob: '05/01/1872',
          phoneNumber: '905sdcsf12',
          emailAddress: 'test.user@example.com',
          password: 'qwerty',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('phoneNumber must be a number');
          done();
        });
    });
    it('SignUp (emailError)', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'scdasdf',
          lastName: 'sdvsfs',
          sex: 'male',
          dob: '05/01/1872',
          phoneNumber: '90512',
          emailAddress: 'test.userexample.com',
          password: 'qwerty',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('emailAddress must be an email');
          done();
        });
    });
    it('SignUp (passwordError)', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'scdasdf',
          lastName: 'sdvsfs',
          sex: 'male',
          dob: '05/01/1872',
          phoneNumber: '90512',
          emailAddress: 'test.user@example.com',
          password: {},
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('password must be a string');
          done();
        });
    });
  });
});
