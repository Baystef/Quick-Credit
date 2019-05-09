/**
 * @description A validation class for validation of fields in each loan endpoint
 * @class LoanValidation
 */

class LoanValidation {
  /**
   * @description loanApplyValidate validates all fields in loan
   * application request body
   * @param {object} req request object
   * @param {object} res response object {error status, error message}
   * @function next() pass control to the next middleware function
   */
  static loanApplyValidate(req, res, next) {
    req
      .checkBody('firstName')
      .notEmpty()
      .withMessage('First name is required')
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage('First name should be between 3 to 20 characters')
      .isAlpha()
      .withMessage('First name should contain alphabets only');

    req
      .checkBody('lastName')
      .notEmpty()
      .withMessage('Last name is required')
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage('Last name should be between 3 to 20 characters')
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
      .checkBody('loanAmount')
      .notEmpty()
      .withMessage('Please specify an amount')
      .trim()
      .isNumeric()
      .withMessage('Amount must be numbers only')
      .isInt({ min: 5000, max: 500000 })
      .withMessage('Minimum loan is 5000 and maximum is 500000');

    req
      .checkBody('tenor')
      .notEmpty()
      .withMessage('Please specify a tenor')
      .trim()
      .isNumeric()
      .withMessage('Tenor must be a number')
      .isInt({ min: 1, max: 12 })
      .withMessage('Tenor minimum is 1 and maximum is 12 months');

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 400,
        error: errors[0].msg,
      });
    }
    return next();
  }

  /**
   * @description approvedValidate validates query
   * parameters(status and repaid) in the request query
   * @param {object} req request object
   * @param {object} res response object {error status, error message}
   * @function next() pass control to the next middleware function
   */
  static approvedValidate(req, res, next) {
    req
      .checkQuery('status')
      .optional()
      .isAlpha()
      .withMessage('Invalid status query type')
      .equals('approved')
      .withMessage('Invalid status query');

    req
      .checkQuery('repaid')
      .optional()
      .isAlpha()
      .withMessage('Invalid repaid query type')
      .isBoolean()
      .withMessage('Invalid repaid query');
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 400,
        error: errors[0].msg,
      });
    }
    return next();
  }

  static oneLoanValidate(req, res, next) {
    req
      .checkParams('id')
      .isNumeric()
      .withMessage('Invalid loan query type');
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 400,
        error: errors[0].msg,
      });
    }
    return next();
  }

  static approveRejectValidate(req, res, next) {
    req
      .checkParams('id')
      .isNumeric()
      .withMessage('Invalid loan query type');

    req
      .checkBody('status')
      .notEmpty()
      .withMessage('Status is required')
      .isAlpha()
      .withMessage('Invalid status type')
      .matches(/^(approved|rejected)$/)
      .withMessage('Status is invalid');
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 400,
        error: errors[0].msg,
      });
    }
    return next();
  }
}

export default LoanValidation;
