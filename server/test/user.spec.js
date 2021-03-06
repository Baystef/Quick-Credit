// import logger from '../src/helper/debugger';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import logger from '../src/helper/debugger';


const { expect } = chai;
chai.use(chaiHttp);

// Tests for the Signup route
describe('SIGNUP route', () => {
  it('should create a new user account', (done) => {
    const newUser = {
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'steve@quick.com',
      password: 'quickcredit10',
      homeAddress: '1, osbourne, lagos',
      workAddress: '5, dolphin, lagos',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.a('object');
        expect(res.body.data.status).to.exist;
        expect(res.body.data.isAdmin).to.exist;
        done();
      });
  });

  it('should return 409 if user already exists', (done) => {
    const newUser = {
      firstName: 'Steve',
      lastName: 'Gates',
      email: 'steve@quick.com',
      password: 'macinwindow10',
      homeAddress: '1, osbourne, lagos',
      workAddress: '5, dolphin, lagos',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        logger(res);
        expect(res.status).to.equal(409);
        expect(res.body.error).to.equal('User already exists');
        expect(res.body.error).to.exist;
        done();
      });
  });

  it('should return 400 if email is empty', (done) => {
    const newUser = {
      firstName: 'Bayo',
      lastName: 'Steve',
      email: '',
      password: 'quickcredit10',
      homeAddress: '1, osbourne, lagos',
      workAddress: '5, dolphin, lagos',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Email is required');
        expect(res.body.error).to.exist;
        done();
      });
  });

  it('should return 400 if password is empty', (done) => {
    const newUser = {
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quickcredit.com',
      password: '',
      homeAddress: '1, osbourne, lagos',
      workAddress: '5, dolphin, lagos',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Password is required');
        expect(res.body.error).to.exist;
        done();
      });
  });

  it('should return 400 if home address is empty', (done) => {
    const newUser = {
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quickcredit.com',
      password: 'quickcredit10',
      homeAddress: '',
      workAddress: '5, dolphin, lagos',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Home Address is required');
        expect(res.body.error).to.exist;
        done();
      });
  });

  it('should return 400 if work address is empty', (done) => {
    const newUser = {
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quickcredit.com',
      password: 'quickcredit10',
      homeAddress: '1, osbourne, lagos',
      workAddress: '',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Work Address is required');
        expect(res.body.error).to.exist;
        done();
      });
  });

  it('should return 400 if first name is not an alphabet', (done) => {
    const newUser = {
      firstName: 1234,
      lastName: 'Steve',
      email: 'adebayo@quick.com',
      password: 'quickcredit10',
      homeAddress: '1, osbourne, lagos',
      workAddress: '5, dolphin, lagos',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('First name should contain alphabets only');
        expect(res.body.error).to.exist;
        done();
      });
  });

  it('should return 400 if last name is not an alphabet', (done) => {
    const newUser = {
      firstName: 'Bayo',
      lastName: 1234,
      email: 'adebayo@quick.com',
      password: 'quickcredit10',
      homeAddress: '1, osbourne, lagos',
      workAddress: '5, dolphin, lagos',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Last name should contain alphabets only');
        expect(res.body.error).to.exist;
        done();
      });
  });

  it('should return 400 if email is invalid', (done) => {
    const newUser = {
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quick',
      password: 'quickcredit10',
      homeAddress: '1, osbourne, lagos',
      workAddress: '5, dolphin, lagos',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Invalid Email Address');
        expect(res.body.error).to.exist;
        done();
      });
  });

  it('should return 400 if password is too simple', (done) => {
    const newUser = {
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quick.com',
      password: 'password',
      homeAddress: '1, osbourne, lagos',
      workAddress: '5, dolphin, lagos',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Password is too simple');
        expect(res.body.error).to.exist;
        done();
      });
  });

  it('should return 400 if home address is invalid', (done) => {
    const newUser = {
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quick.com',
      password: 'quickcredit10',
      homeAddress: '@#1, osbourne, lagos',
      workAddress: '5, dolphin, lagos',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Invalid Address entered');
        expect(res.body.error).to.exist;
        done();
      });
  });

  it('should return 400 if work address is invalid', (done) => {
    const newUser = {
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quick.com',
      password: 'quickcredit10',
      homeAddress: '1, osbourne, lagos',
      workAddress: '@#5, dolphin, lagos',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Invalid Address entered');
        expect(res.body.error).to.exist;
        done();
      });
  });

  it('should return 400 if first name is not of required length', (done) => {
    const newUser = {
      firstName: 'da',
      lastName: 'Steve',
      email: 'adebayo@quick.com',
      password: 'quickcredit',
      homeAddress: '1, osbourne, lagos',
      workAddress: '5, dolphin, lagos',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('First name should be between 3 to 25 characters');
        expect(res.body.error).to.exist;
        done();
      });
  });

  it('should return 400 if last name is not of required length', (done) => {
    const newUser = {
      firstName: 'Bayo',
      lastName: 'St',
      email: 'adebayo@quick.com',
      password: 'quickcredit',
      homeAddress: '1, osbourne, lagos',
      workAddress: '5, dolphin, lagos',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Last name should be between 3 to 25 characters');
        expect(res.body.error).to.exist;
        done();
      });
  });

  it('should return 400 if password is not of required length', (done) => {
    const newUser = {
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quick.com',
      password: 'quickcr',
      homeAddress: '1, osbourne, lagos',
      workAddress: '5, dolphin, lagos',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Password must be atleast 8 to 100 characters');
        expect(res.body.error).to.exist;
        done();
      });
  });

  it('should return 400 if home address is not of required length', (done) => {
    const newUser = {
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quick.com',
      password: 'quickcredit10',
      homeAddress: 'lagos',
      workAddress: '5, dolphin, lagos',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Address should be between 10 to 60 characters');
        expect(res.body.error).to.exist;
        done();
      });
  });

  it('should return 400 if work address is not of required length', (done) => {
    const newUser = {
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quick.com',
      password: 'quickcredit10',
      homeAddress: '1, osbourne, lagos',
      workAddress: 'lagos',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Address should be between 10 to 60 characters');
        expect(res.body.error).to.exist;
        done();
      });
  });
});

// Tests for the Signin route
describe('SIGNIN route', () => {
  it('should return 200 and login a user account successfully', (done) => {
    const newUser = {
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quick.com',
      password: 'quickcredit10',
      homeAddress: '1, osbourne, lagos',
      workAddress: 'lagos',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((signuperr, signupres) => {
        const user = {
          email: 'steve@quick.com',
          password: 'quickcredit10',
        };
        chai
          .request(server)
          .post('/api/v1/auth/signin')
          .send(user)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.data).to.exist;
            expect(res.body.data.token).to.exist;
            done();
          });
      });
  });

  it('should return 400 if email is invalid', (done) => {
    const user = {
      email: 'daramola.ste@gmail',
      password: 'testing30',
    };
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.exist;
        expect(res.body.error).to.equal('Email Address is invalid');
        done();
      });
  });

  it('should return 400 if email is not found', (done) => {
    const user = {
      email: 'daramola.ste@gmail.com',
      password: 'testing30',
    };
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.exist;
        expect(res.body.error).to.equal('Invalid Credentials');
        done();
      });
  });

  it('should return 400 if password is wrong/invalid', (done) => {
    const user = {
      email: 'daramola.steve@gmail.com',
      password: 'testing38',
    };
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.exist;
        expect(res.body.error).to.equal('Invalid Credentials');
        done();
      });
  });

  it('should return 400 if email is omited', (done) => {
    const user = {
      email: '',
      password: 'testing30',
    };
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.exist;
        expect(res.body.error).to.equal('Email is required');
        done();
      });
  });

  it('should return 400 if password is omited', (done) => {
    const user = {
      email: 'daramola.steve@gmail.com',
      password: '',
    };
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.exist;
        expect(res.body.error).to.equal('Password is required');
        done();
      });
  });
});

// Tests for the password reset and forgot password endpoints
describe('FORGOT PASSWORD route', () => {
  it('should return 404 if user does not exist', (done) => {
    const email = { email: 'daramola.steve@gmail.com' };
    chai.request(server)
      .post('/api/v1/auth/forgot_password')
      .send(email)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.exist;
        expect(res.body.error).to.equal('User does not exist');
        done();
      });
  });
});

// Tests for User Verification by Admin
describe('VERIFY USER route', () => {
  it('should return 200 for a successful verification', (done) => {
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
          .patch('/api/v1/users/steve@quick.com/verify')
          .set('authorization', token)
          .end((err, res) => {
            expect(res.body).to.be.a('object');
            expect(res.body.status).to.equal(200);
            expect(res.body.data.status).to.equal('verified');
            done();
          });
      });
  });

  it('should return 404 for a user that does not exist', (done) => {
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
          .patch('/api/v1/users/men@yahoomail.com/verify')
          .set('authorization', token)
          .end((err, res) => {
            expect(res.body).to.be.a('object');
            expect(res.status).to.equal(404);
            expect(res.body.error).to.exist;
            expect(res.body.error).to.equal('User does not exist');
            done();
          });
      });
  });

  it('should return 400 if parameter is not a valid email', (done) => {
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
        logger(token);
        chai
          .request(server)
          .patch('/api/v1/users/man@onmoon/verify')
          .set('authorization', token)
          .end((err, res) => {
            expect(res.body).to.be.a('object');
            expect(res.status).to.equal(400);
            expect(res.body.error).to.exist;
            expect(res.body.error).to.equal('Email Address is invalid');
            done();
          });
      });
  });
});
