class RepaymentValidate {
  static repaymentRecordValidate(req, res, next) {
    req
      .checkParams('id')
      .isNumeric()
      .withMessage('Invalid loan parameter type');

    req
      .checkBody('paidAmount')
      .notEmpty()
      .withMessage('Amount is required')
      .isNumeric()
      .withMessage('Amount must be a number')
      .isFloat({ min: 437.5, max: 525000 })
      .withMessage('Amount cannot be less than (\u20A6)437.50 or more than (\u20A6)525000');
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 400,
        error: errors[0].msg,
      });
    }
    return next();
  }

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
