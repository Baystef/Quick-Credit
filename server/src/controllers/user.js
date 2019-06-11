import { Model } from '../models';
import Authentication from '../middleware/authentication';
import Helper from '../helper/auth-helper';
import sendMail from '../helper/mailer';
import Messages from '../helper/messages';
import { conflictResponse, unauthorizedResponse, nullResponse, goneResponse } from '../helper/error-handler';
import logger from '../helper/debugger';


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
    const clause = 'RETURNING id, "firstName", "lastName", email, "homeAddress", "workAddress", status, "isAdmin"';

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
  * @description User forgot password
  * @param {object} req request object
  * @param {object} res response object
  * @returns {string} reset token
  */
  static async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const data = await User.Model().select('*', `WHERE email='${email}'`);
      if (!data[0]) {
        return nullResponse(req, res, 'User does not exist');
      }
      const secret = data[0].password;
      const token = Authentication.generateToken({ email: data[0].email }, secret, '1h');
      logger(token);
      const msg = Messages.resetMessage(data[0], token);
      sendMail(msg);
      return res.status(200).json({
        status: 200,
        message: 'Password reset link has been sent to your email',
      });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  /**
  * @description Reset user's password
  * @param {object} req request object
  * @param {object} res response object
  * @returns {string} new password for user
  */
  static async resetPassword(req, res) {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
    const { email } = Authentication.decodeToken(token);

    try {
      const data = await User.Model().select('*', `WHERE email='${email}'`);
      if (!data[0]) {
        return nullResponse(req, res, 'User does not exist');
      }
      if (!(password && confirmPassword)) return false;
      const secret = data[0].password;
      const hashPassword = Helper.hashPassword(password);
      Authentication.verifyToken(token, secret);
      await User.Model().update(`password='${hashPassword}'`, `WHERE email='${email}'`);
      return res.status(200).json({
        status: 200,
        message: 'Your password has been reset successfully',
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError' || error.message === 'jwt expired') {
        return goneResponse(req, res, 'Reset link has expired.');
      }
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
