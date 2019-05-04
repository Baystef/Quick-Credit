import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('SIGNUP route', () => {
  it('should return 400 if user already exists', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        id: 2,
        firstName: 'Bayo',
        lastName: 'Steve',
        email: 'daramola@quick.com',
        password: 'quickcredit',
        phoneNo: 2347012345678,
        homeAddress: '1, osbourne, lagos',
        workAddress: '5, dolphin, lagos',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('User already exists');
        expect(res.body.error).to.exist;
        done(err);
      });
  });
  it('should return 400 if a field is empty', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        id: 2,
        firstName: 'Bayo',
        lastName: 'Steve',
        email: '',
        password: 'quickcredit',
        phoneNo: 2347012345678,
        homeAddress: '1, osbourne, lagos',
        workAddress: '5, dolphin, lagos',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('All fields are required');
        expect(res.body.error).to.exist;
        done(err);
      });
  });
});
