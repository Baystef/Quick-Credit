import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Helper class for token generation and verification
 * Also for password hashing and verification
 */

class Authentication {
  /**
   * @description Generates access token
   * @param {object} payload User credential
   * @returns {string} Access token
   */
  static generateToken(payload) {
    return jwt.sign({ payload }, process.env.SECRET, { expiresIn: '7d' });
  }

  /**
   * @description Decodes the access token
   * @param {string} token  Access token
   * @returns {object} Decoded Access token (payload)
   */
  static verifyToken(token) {
    return jwt.verify(token, process.env.SECRET);
  }

  /**
   * @description Hashes plain text password
   * @param {string} password Password in plain text
   * @returns {string} Hashed password
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  /**
   * @description Verifies if user password is valid by comparing with stored hashed password
   * @param {string} hashPassword Hashed password to compare with
   * @param {string} password Plain text password to be verified
   * @returns {boolean} Will be true or false if password matches hashed password or not
   */
  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }
}

export default Authentication;
