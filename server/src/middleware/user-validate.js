import { badRequestResponse } from '../helper/error-handler';
/**
 * @description A validation class for validation of fields and parameters of user endpoints
 * @exports Validation
 */

class Validation {
  /**
  * @description Validates all fields in signup request body
  * @param {object} req request object
  * @param {object} res response object
  * @param {function} next move to next middleware
  */
  static signupValidate(req, res, next) {
    req
      .checkBody('firstName')
      .notEmpty()
      .withMessage('First name is required')
      .trim()
      .isLength({ min: 3, max: 25 })
      .withMessage('First name should be between 3 to 25 characters')
      .isAlpha()
      .withMessage('First name should contain alphabets only');

    req
      .checkBody('lastName')
      .notEmpty()
      .withMessage('Last name is required')
      .trim()
      .isLength({ min: 3, max: 25 })
      .withMessage('Last name should be between 3 to 25 characters')
      .isAlpha()
      .withMessage('Last name should contain alphabets only');

    req
      .checkBody('email')
      .notEmpty()
      .withMessage('Email is required')
      .trim()
      .isEmail()
      .withMessage('Invalid Email Address')
      .customSanitizer(email => email.toLowerCase());

    req
      .checkBody('password')
      .notEmpty()
      .withMessage('Password is required')
      .not()
      .isIn(['password', 'PASSWORD', 12345678, 87654321])
      .withMessage('Password is too simple')
      .trim()
      .isLength({ min: 8, max: 100 })
      .withMessage('Password must be atleast 8 to 100 characters')
      .matches(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,100}$/)
      .withMessage('Password must contain letters and atleast 1 number');

    req
      .checkBody('homeAddress')
      .notEmpty()
      .withMessage('Home Address is required')
      .trim()
      .isLength({ min: 10, max: 60 })
      .withMessage('Address should be between 10 to 60 characters')
      .matches(/^[\w',-\\/.\s]*$/)
      .withMessage('Invalid Address entered');

    req
      .checkBody('workAddress')
      .notEmpty()
      .withMessage('Work Address is required')
      .trim()
      .isLength({ min: 10, max: 60 })
      .withMessage('Address should be between 10 to 60 characters')
      .matches(/^[\w',-\\/.\s]*$/)
      .withMessage('Invalid Address entered');
    const errors = req.validationErrors();
    if (errors) return badRequestResponse(req, res, errors[0].msg);

    return next();
  }

  /**
  * @description Validates all fields in signin request body
  * @param {object} req request object
  * @param {object} res response object
  * @param {function} next move to next middleware
  */
  static signinValidate(req, res, next) {
    req
      .checkBody('email')
      .notEmpty()
      .withMessage('Email is required')
      .trim()
      .isEmail()
      .withMessage('Email Address is invalid')
      .customSanitizer(email => email.toLowerCase());

    req
      .checkBody('password')
      .notEmpty()
      .withMessage('Password is required');
    const errors = req.validationErrors();
    if (errors) return badRequestResponse(req, res, errors[0].msg);

    return next();
  }

  /**
  * @description Validates all fields in reset password request body
  * @param {object} req request object
  * @param {object} res response object
  * @param {function} next move to next middleware
  */
  static resetPasswordValidate(req, res, next) {
    const { password, confirmPassword } = req.body;
    req
      .checkBody('password')
      .notEmpty()
      .withMessage('Password is required')
      .not()
      .isIn(['password', 'PASSWORD', 12345678, 87654321])
      .withMessage('Password is too simple')
      .trim()
      .isLength({ min: 8, max: 100 })
      .withMessage('Password must be atleast 8 to 100 characters')
      .matches(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,100}$/)
      .withMessage('Password must contain letters and atleast 1 number');
    const errors = req.validationErrors();
    if (errors) return badRequestResponse(req, res, errors[0].msg);
    if (password !== confirmPassword) return badRequestResponse(req, res, 'Passwords do not match');

    return next();
  }

  /**
  * @description Validates email field in forgot password request body
  * @param {object} req request object
  * @param {object} res response object
  * @param {function} next move to next middleware
  */
  static forgotPasswordValidate(req, res, next) {
    req
      .checkBody('email')
      .notEmpty()
      .withMessage('Email is required')
      .trim()
      .isEmail()
      .withMessage('Email Address is invalid')
      .customSanitizer(email => email.toLowerCase());
    const errors = req.validationErrors();
    if (errors) return badRequestResponse(req, res, errors[0].msg);

    return next();
  }

  /**
  * @description Validates email field in user verification request parameter
  * @param {object} req request object
  * @param {object} res response object
  * @param {function} next move to next middleware
  */
  static newUserVerifyValidate(req, res, next) {
    req
      .checkParams('email')
      .isEmail()
      .withMessage('Email Address is invalid')
      .customSanitizer(email => email.toLowerCase());
    const errors = req.validationErrors();
    if (errors) return badRequestResponse(req, res, errors[0].msg);

    return next();
  }
}

export default Validation;
