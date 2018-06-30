import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app';

chai.use(chaiHttp);
const { expect } = chai;

chai.expect();

//  James helped me understand how Chai works.
describe('Server', () => {
  describe('Challenge two - GET Requests', () => {
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
    it('GET /', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(res.text).to.equal('Server is running, kindly use the endpoints. /api/v1/rides, /api/v1/rides/:rideId, /api/v1/rides, /api/v1/rides/:rideId/requests');
          done();
        });
    });
    it('GET /api/v1/rides/:rideID', (done) => {
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
    it('POST /api.v1.rides/:rideID/requests', (done) => {
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
    it('POST /api.v1.rides', (done) => {
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
  });

  // I had to use the es5 function here
  // because I needed to adjust the timeout
  // it dosn't work with es6
  describe('Challenge three - POST User Sign-Up', function () {
    this.timeout(5000);
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
          expect(res.body.data).to.have.property('LastName');
          expect(res.body.data).to.have.property('Sex');
          expect(res.body.data).to.have.property('DOB');
          expect(res.body.data).to.have.property('EmailAddress');
          done();
        });
    });
  });
});
