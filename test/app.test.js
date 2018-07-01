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
    const data = {};
    it('GET /', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(res.text).to.equal('Server is running, kindly use the endpoints. /api/v1/rides, /api/v1/rides/:rideId, /api/v1/rides, /api/v1/rides/:rideId/requests');
          done();
        });
    });
    it('GET /api/v1/rides/:rideID (Success)', (done) => {
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
    it('GET /api/v1/rides/:rideID (Fail)', (done) => {
      chai.request(server)
        .get('/api/v1/rides/kdidhsvs')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Information not found. Perhaps try to get the avaliable rides first and select an ID.');
          done();
        });
    });
    it('POST /api.v1.rides/:rideID/requests (Success)', (done) => {
      chai.request(server)
        .post(`/api/v1/rides/${data.body[0].rideID}/requests`)
        .send({
          requesterID: 'U_4782937582',
          destination: 'Mushin',
        })
        .end((err, res) => {
          expect(res.body[0].requests[0]).to.have.property('requesterID');
          expect(res.body[0].requests[0]).to.have.property('destination');
          done();
        });
    });
    it('POST /api/v1/rides/:rideID/requests (Fail)', (done) => {
      chai.request(server)
        .post(`/api/v1/rides/${data.body[0].rideID}/requests`)
        .send({
          destination: 'Mushin',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Invalid data.');
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
        .set('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVXzk0NDIzODEzNjUiLCJpYXQiOjE1MzA0NDQ1NTEsImV4cCI6MTUzMDQ0ODE1MX0.LaRpqdHUCWhsAX2mSlzmB2dN9ezIMsZ5nVaLaMPdtc8')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body[0].data).to.have.property('ID');
          expect(res.body[0].data).to.have.property('DriverID');
          expect(res.body[0].data).to.have.property('Origin');
          expect(res.body[0].data).to.have.property('Destination');
          expect(res.body[0].data).to.have.property('Time');
          expect(res.body[0].data).to.have.property('AllowStops');
          expect(res.body[0].data).to.have.property('AvaliableSpace');
          expect(res.body[0].data).to.have.property('Description');
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
