/**
 * @description A validation class for validation of fields and parameters of repayment record
 * @exports RepaymentValidate
 */

class RepaymentValidate {
  /**
  * @description Validates id parameter and field in repayment record request body
  * @param {object} req request object
  * @param {object} res response object
  * @param {function} next move to next middleware
  */
  static repaymentRecordValidate(req, res, next) {
    req
      .checkParams('id')
      .isNumeric()
      .withMessage('Invalid loan parameter type');

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
 * @description Validates id parameter in repayment history request
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next move to next middleware
 */
  static historyRepaymentValidate(req, res, next) {
    req
      .checkParams('id')
      .isNumeric()
      .withMessage('Invalid loan parameter type');
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

export default RepaymentValidate;
