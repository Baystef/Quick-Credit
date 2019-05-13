/**
 * @description A validation class for validation of fields in each loan endpoint
 * @exports LoanValidation
 */

class LoanValidation {
  /**
   * @description Validates all fields in loan application request body
   * @param {object} req request object
   * @param {object} res response object
   * @param {function} next move to next middleware
   */
  static loanApplyValidate(req, res, next) {
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
   * @description Validates query parameters(status and repaid) in the loan repaid request query
   * @param {object} req request object
   * @param {object} res response object
   * @param {function} next move to next middleware
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

  /**
   * @description Validates the loan id parameter
   * @param {object} req request object
   * @param {object} res response object
   * @param {function} next move to next middleware
   */
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

  /**
   * @description Validates id parameter and field in loan verification request body
   * @param {object} req request object
   * @param {object} res response object
   * @param {function} next move to next middleware
   */
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
