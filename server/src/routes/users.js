import express from 'express';
import expressValidator from 'express-validator';
import User from '../controllers/user';
import validation from '../middleware/user-validate';

const router = express.Router();
router.use(expressValidator());

router.post('/signup', validation.signupValidate, User.register);

export default router;
