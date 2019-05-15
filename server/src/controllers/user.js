import { users } from '../models/db';
import Authentication from '../middleware/authentication';
import Helper from '../helper/auth-helper';

/**
 * @description contains methods for each user endpoint
 * @exports User
 */
class User {
  /**
   * @description Creates new user account
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object}  new user object
   */
  static signUp(req, res) {
    const {
      firstName, lastName, email, password, phoneNo, homeAddress, workAddress,
    } = req.body;

    const exists = users.find(user => user.email === email);
    if (exists) return res.status(409).json({ status: 409, error: 'User already exists' });

    const id = users.length + 1;
    const status = 'unverified';
    const isAdmin = false;
    const createdOn = new Date().toLocaleString();
    const hashPassword = Helper.hashPassword(password);
    const token = Authentication.generateToken({
      id, firstName, lastName, email, isAdmin,
    });

    // Data stored in data structure
    const newUser = {
      token,
      id,
      firstName,
      lastName,
      email,
      password: hashPassword,
      phoneNo,
      homeAddress,
      workAddress,
      status,
      isAdmin,
      createdOn,
    };


    users.push(newUser);

    // Data sent as response to user
    const data = {
      token: newUser.token,
      id: newUser.id,
      firstName: newUser.firstname,
      lastName: newUser.lastName,
      email: newUser.email,
      phoneNo: newUser.phoneNo,
      homeAddress: newUser.homeAddress,
      workAddress: newUser.workAddress,
      status: newUser.status,
      isAdmin: newUser.isAdmin,
      createdOn: newUser.createdOn,
    };

    return res.status(201).json({
      status: '201',
      data,
    });
  }

  /**
   * @description User signin
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object} user object
   */
  static signIn(req, res) {
    const { email, password } = req.body;
    const withEmail = users.findIndex(user => user.email === email);

    if (withEmail !== -1) {
      const verify = Helper.comparePassword(
        users[withEmail].password,
        password,
      );

      if (verify) {
        const data = {
          token: users[withEmail].token,
          id: users[withEmail].id,
          firstName: users[withEmail].firstname,
          lastName: users[withEmail].lastName,
          email: users[withEmail].email,
          phoneNo: users[withEmail].phoneNo,
          homeAddress: users[withEmail].homeAddress,
          workAddress: users[withEmail].workAddress,
          status: users[withEmail].status,
          isAdmin: users[withEmail].isAdmin,
          createdOn: users[withEmail].createdOn,
        };

        return res.status(200).json({
          status: 200,
          data,
        });
      }
    }
    return res.status(400).json({
      status: 400,
      error: 'Invalid Email or Password',
    });
  }

  /**
   * @description User Verification
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object} user object with verified status
   */
  static newUserVerify(req, res) {
    const { email } = req.params;
    const unverified = users.find(user => user.email === email);

    if (unverified) {
      unverified.status = 'verified';

      const newStatus = {
        email: unverified.email,
        firstName: unverified.firstName,
        lastName: unverified.lastName,
        address: unverified.workAddress,
        status: unverified.status,
      };
      return res.status(200).json({
        status: 200,
        data: newStatus,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'User does not exist',
    });
  }
}

export default User;
