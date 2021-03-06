import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('test', () => {
  it('should return a string', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res.body.message).to.exist;
        expect(res.body.message).to.equal('Welcome to Quick Credit');
        expect(res.status).to.equal(200);
        done();
      });
  });
});
