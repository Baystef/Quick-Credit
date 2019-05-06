import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';


const { expect } = chai;
chai.use(chaiHttp);

// Tests for the Signup route
describe('SIGNUP route', () => {
  it('should create a new user account', (done) => {
    const newUser = {
      id: 2,
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quick.com',
      password: 'quickcredit',
      phoneNo: 2347012345678,
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
        done(err);
      });
  });

  it('should return 422 if user already exists', (done) => {
    const newUser = {
      id: 2,
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'daramola@quick.com',
      password: 'quickcredit',
      phoneNo: 2347012345678,
      homeAddress: '1, osbourne, lagos',
      workAddress: '5, dolphin, lagos',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('User already exists');
        expect(res.body.error).to.exist;
        done(err);
      });
  });

  it('should return 400 if email is empty', (done) => {
    const newUser = {
      id: 2,
      firstName: 'Bayo',
      lastName: 'Steve',
      email: '',
      password: 'quickcredit',
      phoneNo: 2347012345678,
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
        done(err);
      });
  });

  it('should return 400 if password is empty', (done) => {
    const newUser = {
      id: 2,
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quickcredit.com',
      password: '',
      phoneNo: 2347012345678,
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
        done(err);
      });
  });

  it('should return 400 if phone number is empty', (done) => {
    const newUser = {
      id: 2,
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quickcredit.com',
      password: 'quickcredit',
      homeAddress: '1, osbourne, lagos',
      workAddress: '5, dolphin, lagos',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Phone number is required');
        expect(res.body.error).to.exist;
        done(err);
      });
  });

  it('should return 400 if home address is empty', (done) => {
    const newUser = {
      id: 2,
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quickcredit.com',
      password: 'quickcredit',
      phoneNo: 2347012345678,
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
        done(err);
      });
  });

  it('should return 400 if work address is empty', (done) => {
    const newUser = {
      id: 2,
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quickcredit.com',
      password: 'quickcredit',
      phoneNo: 2347012345678,
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
        done(err);
      });
  });

  it('should return 400 if first name is not an alphabet', (done) => {
    const newUser = {
      id: 2,
      firstName: 1234,
      lastName: 'Steve',
      email: 'adebayo@quick.com',
      password: 'quickcredit',
      phoneNo: 2347012345678,
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
        done(err);
      });
  });

  it('should return 400 if last name is not an alphabet', (done) => {
    const newUser = {
      id: 2,
      firstName: 'Bayo',
      lastName: 1234,
      email: 'adebayo@quick.com',
      password: 'quickcredit',
      phoneNo: 2347012345678,
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
        done(err);
      });
  });

  it('should return 400 if email is invalid', (done) => {
    const newUser = {
      id: 2,
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quick',
      password: 'quickcredit',
      phoneNo: 2347012345678,
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
        done(err);
      });
  });

  it('should return 400 if password is too simple', (done) => {
    const newUser = {
      id: 2,
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quick.com',
      password: 'password',
      phoneNo: 2347012345678,
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
        done(err);
      });
  });

  it('should return 400 if home address is invalid', (done) => {
    const newUser = {
      id: 2,
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quick.com',
      password: 'quickcredit',
      phoneNo: 2347012345678,
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
        done(err);
      });
  });

  it('should return 400 if work address is invalid', (done) => {
    const newUser = {
      id: 2,
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quick.com',
      password: 'quickcredit',
      phoneNo: 2347012345678,
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
        done(err);
      });
  });

  it('should return 400 if first name is not of required length', (done) => {
    const newUser = {
      id: 2,
      firstName: 'da',
      lastName: 'Steve',
      email: 'adebayo@quick.com',
      password: 'quickcredit',
      phoneNo: 2347012345678,
      homeAddress: '1, osbourne, lagos',
      workAddress: '5, dolphin, lagos',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('First name should be between 3 to 20 characters');
        expect(res.body.error).to.exist;
        done(err);
      });
  });

  it('should return 400 if last name is not of required length', (done) => {
    const newUser = {
      id: 2,
      firstName: 'Bayo',
      lastName: 'St',
      email: 'adebayo@quick.com',
      password: 'quickcredit',
      phoneNo: 2347012345678,
      homeAddress: '1, osbourne, lagos',
      workAddress: '5, dolphin, lagos',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Last name should be between 3 to 20 characters');
        expect(res.body.error).to.exist;
        done(err);
      });
  });

  it('should return 400 if password is not of required length', (done) => {
    const newUser = {
      id: 2,
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quick.com',
      password: 'quickcr',
      phoneNo: 2347012345678,
      homeAddress: '1, osbourne, lagos',
      workAddress: '5, dolphin, lagos',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Password must be atleast 8 to 24 characters');
        expect(res.body.error).to.exist;
        done(err);
      });
  });

  it('should return 400 if home address is not of required length', (done) => {
    const newUser = {
      id: 2,
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quick.com',
      password: 'quickcredit',
      phoneNo: 2347012345678,
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
        done(err);
      });
  });

  it('should return 400 if work address is not of required length', (done) => {
    const newUser = {
      id: 2,
      firstName: 'Bayo',
      lastName: 'Steve',
      email: 'adebayo@quick.com',
      password: 'quickcredit',
      phoneNo: 2347012345678,
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
        done(err);
      });
  });
});

// Tests for the Signin route
describe('SIGNIN route', () => {
  it('should login a user account successfully', (done) => {
    const user = {
      email: 'daramola.steve@gmail.com',
      password: 'testing30',
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
        done(err);
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
        done(err);
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
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.exist;
        expect(res.body.error).to.equal('Invalid Email or Password');
        done(err);
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
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.exist;
        expect(res.body.error).to.equal('Invalid Email or Password');
        done(err);
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
        done(err);
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
        done(err);
      });
  });
});
