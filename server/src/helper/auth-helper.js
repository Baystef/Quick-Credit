import bcrypt from 'bcrypt';

/**
 * @description  Helper class for password hashing and verification
 * @exports Helper
 */

class Helper {
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

export default Helper;
