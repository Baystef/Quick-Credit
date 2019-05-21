import { users } from '../models/db';
import Authentication from '../middleware/authentication';
import Helper from '../helper/auth-helper';
import db from '../../db';


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

    const hashPassword = Helper.hashPassword(password);

    const createUserQuery = `INSERT INTO 
    users(firstName, lastName, email, password, homeAddress, workAddress)
    VALUES($1,$2,$3,$4,$5,$6) 
    RETURNING firstName, lastName, email, homeAddress, workAddress, status, isAdmin`;

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
      return res.status(201).json({
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
          phoneNumber: users[withEmail].phoneNumber,
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
    return res.status(401).json({
      status: 401,
      error: 'You are unauthorized',
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
