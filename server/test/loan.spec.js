import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';


const { expect } = chai;
chai.use(chaiHttp);

describe('LOANS route', () => {
  describe('Create Loans route', () => {
    it('should return 201 on loan application success', (done) => {
      const user = {
        firstName: 'Steve',
        lastName: 'Gates',
        email: 'steve.gates@hotmail.com',
        password: 'macinwindow',
        phoneNo: 2347012345678,
        homeAddress: '1, Silicon Valley, San Francisco',
        workAddress: '2, Grove Street, San Francisco',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((signuperr, signupres) => {
          console.log(`Bearer signup ${signupres.body.data.token}`);
          const token = `Bearer ${signupres.body.data.token}`;
          const loanApply = {
            firstName: 'Steve',
            lastName: 'Gates',
            email: 'steve.gates@hotmail.com',
            loanAmount: 100000,
            tenor: 3,
          };
          chai
            .request(server)
            .post('/api/v1/loans')
            .set('authorization', token)
            .send(loanApply)
            .end((err, res) => {
              expect(res.body.status).to.equal(201);
              expect(res.body).to.be.a('object');
              expect(res.body.error).to.not.exist;
              done();
            });
        });
    });

    it('should return 400 if loan amount is empty', (done) => {
      const loginUser = {
        email: 'steve.gates@hotmail.com',
        password: 'macinwindow',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(loginUser)
        .end((loginerr, loginres) => {
          const token = `Bearer ${loginres.body.data.token}`;
          const loanApply = {
            firstName: 'Steve',
            lastName: 'Gates',
            email: 'steve.gates@hotmail.com',
            tenor: 3,
          };
          chai
            .request(server)
            .post('/api/v1/loans')
            .set('authorization', token)
            .send(loanApply)
            .end((err, res) => {
              expect(res.body.status).to.equal(400);
              expect(res.body.error).to.exist;
              expect(res.body.error).to.equal('Please specify an amount');
              done();
            });
        });
    });

    it('should return 400 if loan amount is not a number', (done) => {
      const loginUser = {
        email: 'steve.gates@hotmail.com',
        password: 'macinwindow',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(loginUser)
        .end((loginerr, loginres) => {
          const token = `Bearer ${loginres.body.data.token}`;
          const loanApply = {
            firstName: 'Steve',
            lastName: 'Gates',
            email: 'steve.gates@hotmail.com',
            loanAmount: 'string',
            tenor: 3,
          };
          chai
            .request(server)
            .post('/api/v1/loans')
            .set('authorization', token)
            .send(loanApply)
            .end((err, res) => {
              expect(res.body.status).to.equal(400);
              expect(res.body.error).to.exist;
              expect(res.body.error).to.equal('Amount must be numbers only');
              done();
            });
        });
    });

    it('should return 400 if tenor is empty', (done) => {
      const loginUser = {
        email: 'steve.gates@hotmail.com',
        password: 'macinwindow',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(loginUser)
        .end((loginerr, loginres) => {
          const token = `Bearer ${loginres.body.data.token}`;
          const loanApply = {
            firstName: 'Steve',
            lastName: 'Gates',
            email: 'steve.gates@hotmail.com',
            loanAmount: 100000,
          };
          chai
            .request(server)
            .post('/api/v1/loans')
            .set('authorization', token)
            .send(loanApply)
            .end((err, res) => {
              expect(res.body.status).to.equal(400);
              expect(res.body.error).to.exist;
              expect(res.body.error).to.equal('Please specify a tenor');
              done();
            });
        });
    });

    it('should return 400 if tenor is not a number', (done) => {
      const loginUser = {
        email: 'steve.gates@hotmail.com',
        password: 'macinwindow',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(loginUser)
        .end((loginerr, loginres) => {
          const token = `Bearer ${loginres.body.data.token}`;
          const loanApply = {
            firstName: 'Steve',
            lastName: 'Gates',
            email: 'steve.gates@hotmail.com',
            loanAmount: 100000,
            tenor: 'string',
          };
          chai
            .request(server)
            .post('/api/v1/loans')
            .set('authorization', token)
            .send(loanApply)
            .end((err, res) => {
              expect(res.body.status).to.equal(400);
              expect(res.body.error).to.exist;
              expect(res.body.error).to.equal('Tenor must be a number');
              done();
            });
        });
    });
  });
});
