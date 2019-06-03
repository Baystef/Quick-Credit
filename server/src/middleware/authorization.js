import Authentication from './authentication';
import { unauthorizedResponse, forbiddenResponse } from '../helper/error-handler';

const { verifyToken } = Authentication;

/**
 * @description User Authorization
 * @exports Authorization
 */
class Authorization {
  /**
   * @description Verifies if user is admin and has a valid token
   * to access admin resources
   * @param {object} req request object
   * @param {object} res response object
   * @returns {boolean} returns true or false for admin verification
   */
  static verifyAdmin(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = verifyToken(token);
      req.user = decoded.payload;
      if (!req.user.isAdmin) {
        return forbiddenResponse(req, res, 'Access denied');
      }
      return next();
    } catch (error) {
      return unauthorizedResponse(req, res, 'Invalid token or none provided');
    }
  }

  /**
   * @description Verifies if user is signed in and has a valid token
   * to access user resources
   * @param {object} req request object
   * @param {object} res response object
   * @returns {boolean} returns true or false for user verification
   */
  static verifyUser(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = verifyToken(token);
      req.user = decoded.payload;
      if (!req.user.id) {
        return forbiddenResponse(req, res, 'You have to be Authenticated to access this route');
      }
      return next();
    } catch (error) {
      return unauthorizedResponse(req, res, 'Invalid token or none provided');
    }
  }
}

export default Authorization;
