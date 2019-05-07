/**
 * @description A validation class for validation of fields in each loan endpoint
 * @class LoanValidation
 */

class LoanValidation {
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
}

export default LoanValidation;
