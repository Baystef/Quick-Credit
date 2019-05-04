import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('test', () => {
  it('should return a string', (done) => {
    chai.request(server)
      .get('/api/v1')
      .end((err, res) => {
        expect(res.body.message).to.exist;
        expect(res.body.message).to.equal('This is Quick Credit');
        expect(res.status).to.equal(200);
        done(err);
      });
  });
});
