import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';


const { expect } = chai;
chai.use(chaiHttp);

describe('LOANS route', () => {
  // Loan application tests
  describe('CREATE LOANS route', () => {
    it('should return 201 on loan application success', (done) => {
      const user = {
        firstName: 'Steve',
        lastName: 'Gates',
        email: 'steve.gates@gmail.com',
        password: 'macinwindow6',
        phoneNo: 2347012345678,
        homeAddress: '1, Silicon Valley, San Francisco',
        workAddress: '2, Grove Street, San Francisco',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((signuperr, signupres) => {
          const token = `Bearer ${signupres.body.data.token}`;
          const loanApply = {
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
        password: 'macinwindow10',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(loginUser)
        .end((loginerr, loginres) => {
          const token = `Bearer ${loginres.body.data.token}`;
          const loanApply = {
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
        password: 'macinwindow10',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(loginUser)
        .end((loginerr, loginres) => {
          const token = `Bearer ${loginres.body.data.token}`;
          const loanApply = {
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
        password: 'macinwindow10',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(loginUser)
        .end((loginerr, loginres) => {
          const token = `Bearer ${loginres.body.data.token}`;
          const loanApply = {
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
        password: 'macinwindow10',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(loginUser)
        .end((loginerr, loginres) => {
          const token = `Bearer ${loginres.body.data.token}`;
          const loanApply = {
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

  // Get all loan application tests
  describe('GET ALL LOANS route', () => {
    it('should return a status 200 with all loan applications', (done) => {
      const admin = {
        email: 'admin@quickcredit.com',
        password: 'quickcreditsecret10',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(admin)
        .end((loginerr, loginres) => {
          const token = `Bearer ${loginres.body.data.token}`;
          chai
            .request(server)
            .get('/api/v1/loans')
            .set('authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.be.a('object');
              expect(res.body.data).to.be.a('array');
              expect(res.body.data[0].interest).to.exist;
              expect(res.body.data[0].paymentInstallment).to.exist;
              done();
            });
        });
    });

    it('should return 403 if user is not an admin', (done) => {
      const notAdmin = {
        email: 'daramola@quick.com',
        password: 'quickcredit10',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(notAdmin)
        .end((loginerr, loginres) => {
          const token = `Bearer ${loginres.body.data.token}`;
          chai
            .request(server)
            .get('/api/v1/loans')
            .set('authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(403);
              expect(res.body).to.be.a('object');
              expect(res.body.error).to.exist;
              expect(res.body.error).to.equal('Access denied');
              done();
            });
        });
    });

    it('should return 401 if token is not provided or invalid', (done) => {
      const admin = {
        email: 'admin@quickcredit.com',
        password: 'quickcreditsecret10',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(admin)
        .end((loginerr, loginres) => {
          const token = `${loginres.body.data.token}`;
          chai
            .request(server)
            .get('/api/v1/loans')
            .set('authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(401);
              expect(res.body).to.be.a('object');
              expect(res.body.error).to.exist;
              expect(res.body.error).to.equal('Invalid token or none provided');
              done();
            });
        });
    });
  });

  // Loan query parameter tests
  describe('GET REPAID OR CURRENT LOANS route', () => {
    it('should return 200 and all approved & repaid loans', (done) => {
      const admin = {
        email: 'admin@quickcredit.com',
        password: 'quickcreditsecret10',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(admin)
        .end((loginerr, loginres) => {
          const token = `Bearer ${loginres.body.data.token}`;
          chai
            .request(server)
            .get('/api/v1/loans?status=approved&repaid=true')
            .set('authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body).to.be.a('object');
              expect(res.body.data).to.be.a('array');
              expect(res.body.data[0].interest).to.exist;
              expect(res.body.data[0].paymentInstallment).to.exist;
              done();
            });
        });
    });

    it('should return 200 and all approved & unrepaid loans', (done) => {
      const admin = {
        email: 'admin@quickcredit.com',
        password: 'quickcreditsecret10',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(admin)
        .end((loginerr, loginres) => {
          const token = `Bearer ${loginres.body.data.token}`;
          chai
            .request(server)
            .get('/api/v1/loans?status=approved&repaid=false')
            .set('authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body).to.be.a('object');
              expect(res.body.data).to.be.a('array');
              expect(res.body.data[0].interest).to.exist;
              expect(res.body.data[0].paymentInstallment).to.exist;
              done();
            });
        });
    });

    it('should return 400 for invalid status query', (done) => {
      const admin = {
        email: 'admin@quickcredit.com',
        password: 'quickcreditsecret10',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(admin)
        .end((loginerr, loginres) => {
          const token = `Bearer ${loginres.body.data.token}`;
          chai
            .request(server)
            .get('/api/v1/loans?status=approval&repaid=false')
            .set('authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(400);
              expect(res.body).to.be.a('object');
              expect(res.body.error).to.exist;
              expect(res.body.error).to.equal('Invalid status query');
              done();
            });
        });
    });

    it('should return 400 for invalid repaid query', (done) => {
      const admin = {
        email: 'admin@quickcredit.com',
        password: 'quickcreditsecret10',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(admin)
        .end((loginerr, loginres) => {
          const token = `Bearer ${loginres.body.data.token}`;
          chai
            .request(server)
            .get('/api/v1/loans?status=approved&repaid=yes')
            .set('authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(400);
              expect(res.body).to.be.a('object');
              expect(res.body.error).to.exist;
              expect(res.body.error).to.equal('Invalid repaid query');
              done();
            });
        });
    });
  });

  describe('GET A LOAN route', () => {
    it('should return 200 and a specific loan application', (done) => {
      const admin = {
        email: 'admin@quickcredit.com',
        password: 'quickcreditsecret10',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(admin)
        .end((loginerr, loginres) => {
          const token = `Bearer ${loginres.body.data.token}`;
          chai
            .request(server)
            .get('/api/v1/loans/1')
            .set('authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body).to.be.a('object');
              expect(res.body.data.user).to.exist;
              expect(res.body.data.interest).to.exist;
              expect(res.body.data.paymentInstallment).to.exist;
              done();
            });
        });
    });

    it('should return 400 if parameter is not a number', (done) => {
      const admin = {
        email: 'admin@quickcredit.com',
        password: 'quickcreditsecret10',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(admin)
        .end((loginerr, loginres) => {
          const token = `Bearer ${loginres.body.data.token}`;
          chai
            .request(server)
            .get('/api/v1/loans/b')
            .set('authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.be.a('object');
              expect(res.body.error).to.exist;
              expect(res.body.error).to.equal('Invalid loan query type');
              done();
            });
        });
    });

    it('should return 404 if loan id not found', (done) => {
      const admin = {
        email: 'admin@quickcredit.com',
        password: 'quickcreditsecret10',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(admin)
        .end((loginerr, loginres) => {
          const token = `Bearer ${loginres.body.data.token}`;
          chai
            .request(server)
            .get('/api/v1/loans/8')
            .set('authorization', token)
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body).to.be.a('object');
              expect(res.body.error).to.exist;
              expect(res.body.error).to.equal('Loan does not exist');
              done();
            });
        });
    });
  });

  // Loan Status(Appproved or Rejected) Tests
  describe('LOAN STATUS UPDATE route', () => {
    it('should return 200 and update the loan status of a specific user', (done) => {
      const admin = {
        email: 'admin@quickcredit.com',
        password: 'quickcreditsecret10',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(admin)
        .end((loginerr, loginres) => {
          const token = `Bearer ${loginres.body.data.token}`;
          const updateStatus = { status: 'approved' };
          chai
            .request(server)
            .patch('/api/v1/loans/3')
            .set('authorization', token)
            .send(updateStatus)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body).to.be.a('object');
              expect(res.body.data.status).to.exist;
              expect(res.body.data.status).to.match(/^(approved|rejected)$/);
              done();
            });
        });
    });

    it('should return 400 if an invalid status is provided', (done) => {
      const admin = {
        email: 'admin@quickcredit.com',
        password: 'quickcreditsecret10',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(admin)
        .end((loginerr, loginres) => {
          const token = `Bearer ${loginres.body.data.token}`;
          const updateStatus = { status: 'approval' };
          chai
            .request(server)
            .patch('/api/v1/loans/3')
            .set('authorization', token)
            .send(updateStatus)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.be.a('object');
              expect(res.body.error).to.exist;
              expect(res.body.error).to.equal('Status is invalid');
              done();
            });
        });
    });

    it('should return 404 if loanID is not found', (done) => {
      const admin = {
        email: 'admin@quickcredit.com',
        password: 'quickcreditsecret10',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(admin)
        .end((loginerr, loginres) => {
          const token = `Bearer ${loginres.body.data.token}`;
          const updateStatus = { status: 'approved' };
          chai
            .request(server)
            .patch('/api/v1/loans/20')
            .set('authorization', token)
            .send(updateStatus)
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body).to.be.a('object');
              expect(res.body.error).to.exist;
              expect(res.body.error).to.equal('Loan does not exist');
              done();
            });
        });
    });
  });
});
