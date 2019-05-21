import { users } from '../models/db';
import Authentication from '../middleware/authentication';
import Helper from '../helper/auth-helper';
import db from '../../db';
import logger from '../helper/debugger';


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
  static async signUp(req, res) {
    const {
      firstName, lastName, email, password, homeAddress, workAddress,
    } = req.body;

    logger(firstName);
    const hashPassword = Helper.hashPassword(password);

    const createUserQuery = `INSERT INTO 
    users("firstName", "lastName", email, password, "homeAddress", "workAddress")
    VALUES($1,$2,$3,$4,$5,$6) 
    RETURNING "firstName", "lastName", email, "homeAddress", "workAddress", status, "isAdmin"`;

    const values = [
      firstName,
      lastName,
      email,
      hashPassword,
      homeAddress,
      workAddress,
    ];

    try {
      const { rows } = await db.query(createUserQuery, values);
      const { id, isAdmin } = rows[0];
      const token = Authentication.generateToken({
        id, firstName, lastName, email, isAdmin,
      });
      return res.status(201).header('x-auth-token', token).json({
        status: '201',
        data: {
          token,
          ...rows[0],
        },
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({ status: 409, error: 'User already exists' });
      }
      return res.status(400).send(error);
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

    const findUserQuery = 'SELECT * FROM users WHERE email = $1';

    try {
      const { rows } = await db.query(findUserQuery, [email])
      if (!rows[0]) {
        return res.status(401).json({
          status: 401,
          error: 'You are unauthorized',
        });
      }
      if (!Helper.comparePassword(rows[0].password, password)) {
        return res.status(401).json({
          status: 401,
          error: 'You are unauthorized',
        });
      }
      const {
        id, firstname, lastname, isAdmin,
      } = rows[0];

      const firstName = firstname;
      const lastName = lastname;

      const token = Authentication.generateToken({
        id, firstName, lastName, isAdmin,
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
  static newUserVerify(req, res) {
    const { email } = req.params;
    const unverified = users.find(user => user.email === email);

    if (unverified && unverified.status === 'verified') {
      return res.status(409).json({
        status: 409,
        error: 'User is already verified',
      });
    }

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
