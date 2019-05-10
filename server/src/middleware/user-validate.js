class Validation {
  static signupValidate(req, res, next) {
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
      .checkBody('password')
      .notEmpty()
      .withMessage('Password is required')
      .not()
      .isIn(['password', 'PASSWORD', 12345678, 87654321])
      .withMessage('Password is too simple')
      .trim()
      .isLength({ min: 8, max: 24 })
      .withMessage('Password must be atleast 8 to 24 characters');

    req
      .checkBody('phoneNo')
      .notEmpty()
      .withMessage('Phone number is required')
      .isInt()
      .withMessage('Phone number should be numbers only')
      .trim()
      .isLength({ min: 13 })
      .withMessage('Phone number should be 13 digits')
      .matches(/^(234).\d{9}$/)
      .withMessage('Invalid Phone number');

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
    if (errors) return res.status(400).json({ status: 400, error: errors[0].msg });

    return next();
  }

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
    if (errors) {
      return res.status(400).json({
        status: 400,
        error: errors[0].msg,
      });
    }
    return next();
  }

  static newUserVerifyValidate(req, res, next) {
    req
      .checkParams('email')
      .isEmail()
      .withMessage('Email Address is invalid')
      .customSanitizer(email => email.toLowerCase());
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

export default Validation;
