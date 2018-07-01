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
  });
  describe('Challenge three tests', () => {
    it('LogIn existing user (success)', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          EmailAddress: 'FirstTestDriver@example.com',
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
        .set('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMSIsImlhdCI6MTUzMDQ4NzkzNCwiZXhwIjoxNTMwNDkxNTM0fQ.dlhPVQ-JId8V6bYwTAyI09Pm7IP29uM-yPFvYXLhhlU')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body[0]).to.have.property('ID');
          expect(res.body[0]).to.have.property('DirverID');
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
        .get('/api/v1/rides/1')
        .set('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMSIsImlhdCI6MTUzMDQ4NzkzNCwiZXhwIjoxNTMwNDkxNTM0fQ.dlhPVQ-JId8V6bYwTAyI09Pm7IP29uM-yPFvYXLhhlU')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('ID');
          expect(res.body).to.have.property('DirverID');
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
        .post('/api/v1/rides/1/requests')
        .set('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMSIsImlhdCI6MTUzMDQ4NzkzNCwiZXhwIjoxNTMwNDkxNTM0fQ.dlhPVQ-JId8V6bYwTAyI09Pm7IP29uM-yPFvYXLhhlU')
        .send({
          requesterID: '9',
          FirstName: 'Test',
          LastName: 'Requester',
          MobileNumber: '90472865784'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Request Sent');
          done();
        });
    });
    it('Post users ride', (done) => {
      chai.request(server)
        .post('/api/v1/users/rides')
        .set('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMSIsImlhdCI6MTUzMDQ4NzkzNCwiZXhwIjoxNTMwNDkxNTM0fQ.dlhPVQ-JId8V6bYwTAyI09Pm7IP29uM-yPFvYXLhhlU')
        .send({
          driverID: 10,
          origin: 'Magodo',
          destination: 'Musin',
          time: '10:20AM',
          allowStops: true,
          avaliableSpace: 3,
          description: 'Musin via Ikeja and Oshodi'
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
        .set('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMSIsImlhdCI6MTUzMDQ4NzkzNCwiZXhwIjoxNTMwNDkxNTM0fQ.dlhPVQ-JId8V6bYwTAyI09Pm7IP29uM-yPFvYXLhhlU')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.rows[0]).to.have.property('ID');
          expect(res.body.rows[0]).to.have.property('RequesterName');
          expect(res.body.rows[0]).to.have.property('MobileNumber');
          expect(res.body.rows[0]).to.have.property('Status');
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
