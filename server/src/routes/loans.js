import express from 'express';
import expressValidator from 'express-validator';
import authorization from '../middleware/authorization';
import Loan from '../controllers/loans';
import validation from '../middleware/loan-validate';

const { loanApplyValidate } = validation;
const { verifyUser } = authorization;
const { loanApply } = Loan;

const router = express.Router();
router.use(expressValidator());

// Create loan application
router.post('/loans', verifyUser, loanApplyValidate, loanApply);

export default router;
