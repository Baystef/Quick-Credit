import { users } from '../db';
import Authentication from '../middleware/authentication';

/**
 * @class User controller
 * @description contains methods for each user endpoint
 * @exports User
 */
class User {
  /**
   * @description Creates new user account
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object} JSON response
   */
  static register(req, res) {
    const {
      firstName, lastName, email, password, phoneNo, homeAddress, workAddress,
    } = req.body;

    const exists = users.find(user => user.email === email);
    if (exists) return res.status(422).json({ status: 422, error: 'User already exists' });

    const id = users.length + 1;
    const status = 'unverified';
    const isAdmin = false;
    const token = Authentication.generateToken({ id, email, isAdmin });


    const newUser = {
      token,
      id,
      firstName,
      lastName,
      email,
      password: Authentication.hashPassword(password),
      phoneNo,
      homeAddress,
      workAddress,
      status,
      isAdmin,
      createdAt: new Date().toLocaleString(),
    };

    users.push(newUser);
    return res.status(201).json({ status: '201', data: newUser });
  }
}

export default User;
