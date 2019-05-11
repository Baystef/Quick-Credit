import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';


const { expect } = chai;
chai.use(chaiHttp);

// Repayment record generation tests
describe('CREATE REPAYMENT RECORD route', () => {
  it('should return 403 if a user, not admin tries to access the route', (done) => {
    const user = {
      email: 'daramola.steve@gmail.com',
      password: 'testing30',
    };
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((loginerr, loginres) => {
        const token = `Bearer ${loginres.body.data.token}`;
        const paidAmount = { paidAmount: 10000 };
        chai
          .request(server)
          .post('/api/v1/loans/1/repayments')
          .set('authorization', token)
          .send(paidAmount)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.error).to.exist;
            expect(res.body.error).to.equal('Access denied');
            done();
          });
      });
  });
});
