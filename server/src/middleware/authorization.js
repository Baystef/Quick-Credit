import Authentication from './authentication';

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
        return res.status(403).json({
          status: 403,
          error: 'Access denied',
        });
      }
      return next();
    } catch (error) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid token or none provided',
      });
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
        return res.status(403).json({
          status: 403,
          error: 'You have to be Authenticated to access this route',
        });
      }
      return next();
    } catch (error) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid token or none provided',
      });
    }
  }
}

export default Authorization;
