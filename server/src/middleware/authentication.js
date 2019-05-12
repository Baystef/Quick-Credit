import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @description Class for token generation and verification
 * @exports Authentication
 */

class Authentication {
  /**
   * @description Generates access token
   * @param {object} payload User credentials
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
}

export default Authentication;
