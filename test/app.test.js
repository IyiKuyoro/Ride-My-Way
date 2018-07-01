import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app';
import controller from '../server/controllers/usercontroller';

chai.use(chaiHttp);
const { expect } = chai;

chai.expect();

//  James helped me understand how Chai works.
describe('Server', () => {
  describe('Challenge two tests', () => {
    it('GET /', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(res.text).to.equal('Server is running, kindly use the endpoints. /api/v1/rides, /api/v1/rides/:rideId, /api/v1/rides, /api/v1/rides/:rideId/requests');
          done();
        });
    });
    it('POST /api.v1.rides (Success)', (done) => {
      chai.request(server)
        .post('/api/v1/rides')
        .send({
          origin: 'Magodo',
          destination: 'Musin',
          time: '10:20AM',
          allowStops: true,
          avaliableSpace: 3,
          description: 'Musin via Ikeja and Oshodi',
        })
        .end((err, res) => {
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
    it('POST /api/v1/rides (Fail)', (done) => {
      chai.request(server)
        .post('/api/v1/rides')
        .send({
          time: '10:20AM',
          allowStops: true,
          avaliableSpace: 3,
          description: 'Musin via Ikeja and Oshodi',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('The information you provided doesn\'t conform.');
          done();
        });
    });
  });
  describe('Challenge three tests', () => {
    it('LogIn existing user (success)', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          EmailAddress: 'DummyData@example.com',
          Password: 'qwerty'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('FirstName');
          expect(res.body.data).to.have.property('LastName');
          expect(res.body.data).to.have.property('MobileNumber');
          expect(res.body.data).to.have.property('EmailAddress');
          expect(res.body.data).to.have.property('RidesTaken');
          expect(res.body.data).to.have.property('RidesOffered');
          expect(res.body.data).to.have.property('Friends');
          done();
        });
    });
    it('Get all avaliable ride (success)', (done) => {
      chai.request(server)
        .get('/api/v1/rides')
        .set('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVXzcwNDUyOTA2MzUiLCJpYXQiOjE1MzA0NjE2NjMsImV4cCI6MTUzMDQ2NTI2M30.01K4pqwheFdOpZDwtUxpP1gASTzFl5PE1S29vFR3fMA')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body[0]).to.have.property('ID');
          expect(res.body[0]).to.have.property('DriverID');
          expect(res.body[0]).to.have.property('Origin');
          expect(res.body[0]).to.have.property('Destination');
          expect(res.body[0]).to.have.property('Time');
          expect(res.body[0]).to.have.property('AllowStops');
          expect(res.body[0]).to.have.property('AvaliableSpace');
          expect(res.body[0]).to.have.property('Description');
          done();
        });
    });
    it('Get specific ride', (done) => {
      chai.request(server)
        .get('/api/v1/rides/R_0000000001')
        .set('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVXzcwNDUyOTA2MzUiLCJpYXQiOjE1MzA0NjE2NjMsImV4cCI6MTUzMDQ2NTI2M30.01K4pqwheFdOpZDwtUxpP1gASTzFl5PE1S29vFR3fMA')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('ID');
          expect(res.body).to.have.property('DriverID');
          expect(res.body).to.have.property('Origin');
          expect(res.body).to.have.property('Destination');
          expect(res.body).to.have.property('Time');
          expect(res.body).to.have.property('AllowStops');
          expect(res.body).to.have.property('AvaliableSpace');
          expect(res.body).to.have.property('Description');
          done();
        });
    });
    it('Post ride request', (done) => {
      chai.request(server)
        .post('/api/v1/rides/R_0000000001/requests')
        .set('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVXzcwNDUyOTA2MzUiLCJpYXQiOjE1MzA0NjE2NjMsImV4cCI6MTUzMDQ2NTI2M30.01K4pqwheFdOpZDwtUxpP1gASTzFl5PE1S29vFR3fMA')
        .send({
          requesterID: 'U_5677440769'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Request Sent');
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
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('FirstName');
          expect(res.body.data).to.have.property('LastName');
          expect(res.body.data).to.have.property('MobileNumber');
          expect(res.body.data).to.have.property('EmailAddress');
          expect(res.body.data).to.have.property('RidesTaken');
          expect(res.body.data).to.have.property('RidesOffered');
          expect(res.body.data).to.have.property('Friends');
          done();
        });
    });
  });
});
