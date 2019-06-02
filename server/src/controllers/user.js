import Model from '../models';
import Authentication from '../middleware/authentication';
import Helper from '../helper/auth-helper';
import { conflictResponse, unauthorizedResponse, nullResponse } from '../helper/error-handler';
// import logger from '../helper/debugger';


/**
 * @description contains methods for each user endpoint
 * @exports User
 */
class User {
  /**
   * @description Creates the Loans Model instance
   */
  static Model() {
    return new Model('users');
  }

  /**
   * @description Creates new user account
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object}  new user object
   */
  static async signUp(req, res) {
    const {
      firstName, lastName, email, password, homeAddress, workAddress,
    } = req.body;
    const hashPassword = Helper.hashPassword(password);
    const columns = '"firstName", "lastName", email, password, "homeAddress", "workAddress"';
    const values = `'${firstName}', '${lastName}', '${email}', '${hashPassword}', '${homeAddress}', '${workAddress}'`;
    const clause = 'RETURNING "firstName", "lastName", email, "homeAddress", "workAddress", status, "isAdmin"';

    try {
      const data = await User.Model().insert(columns, values, clause);
      const { id, isAdmin } = data[0];
      const token = Authentication.generateToken({
        id, firstName, lastName, email, isAdmin,
      });
      return res.status(201).header('x-auth-token', token).json({
        status: '201',
        data: {
          token,
          ...data[0],
        },
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return conflictResponse(req, res, 'User already exists');
      }
      return res.status(400).json(error.message);
    }
  }

  /**
   * @description User signin
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object} user object
   */
  static async signIn(req, res) {
    const { email, password } = req.body;

    try {
      const data = await User.Model().select('*', `WHERE email='${email}'`);
      if (!data[0]) {
        return unauthorizedResponse(req, res, 'Invalid Credentials');
      }
      if (!Helper.comparePassword(data[0].password, password)) {
        return unauthorizedResponse(req, res, 'Invalid Credentials');
      }
      const {
        id, firstName, lastName, isAdmin,
      } = data[0];

      const token = Authentication.generateToken({
        id, firstName, lastName, isAdmin, email,
      });
      return res.status(200).json({
        status: 200,
        data: {
          token,
          firstName,
          lastName,
          email,
        },
      });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  /**
   * @description User Verification
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object} user object with verified status
   */
  static async newUserVerify(req, res) {
    const { email } = req.params;
    const columns = "status='verified'";
    const clause = `WHERE email='${email}' 
    RETURNING "firstName", "lastName", email, "workAddress" AS address, status`;

    try {
      const data = await User.Model().select('*', `WHERE email='${email}'`);
      if (!data[0]) {
        return nullResponse(req, res, 'User does not exist');
      }
      if (data[0].status === 'verified') {
        return conflictResponse(req, res, 'User is already verified');
      }
      const verify = await User.Model().update(columns, clause);
      return res.status(200).json({
        status: 200,
        data: {
          ...verify[0],
        },
      });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

export default User;
