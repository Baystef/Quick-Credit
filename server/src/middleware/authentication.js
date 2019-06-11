import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const seCrypt = process.env.SECRET;

/**
 * @description Class for token generation and verification
 * @exports Authentication
 */

class Authentication {
  /**
   * @description Generates access token
   * @param {object} payload User credential(s)
   * @param {string} secret encryption key
   * @param {string} duration token expiry time
   * @returns {string} Access token
   */
  static generateToken(payload, secret = seCrypt, duration = '7d') {
    return jwt.sign({ payload }, secret, { expiresIn: duration });
  }

  /**
   * @description  Verifies and decodes the access token
   * @param {string} token  Access token
   * @param {string} secret decryption key
   * @returns {object} Decoded Access token
   */
  static verifyToken(token, secret = seCrypt) {
    return jwt.verify(token, secret);
  }

  /**
   * @description Decodes the reset token
   * @param {string} token  reset token
   * @returns {object} Decoded Access token
   */
  static decodeToken(token) {
    return (jwt.decode(token)).payload;
  }
}

export default Authentication;
