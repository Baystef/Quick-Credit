import express from 'express';
import expressValidator from 'express-validator';
import authorization from '../middleware/authorization';
import Loan from '../controllers/loans';
import validation from '../middleware/loan-validate';

const { loanApplyValidate, approvedValidate, oneLoanValidate } = validation;
const { verifyUser, verifyAdmin } = authorization;
const { loanApply, getAllLoans, getALoan } = Loan;


const router = express.Router();
router.use(expressValidator());

// Create loan application
router.post('/loans', verifyUser, loanApplyValidate, loanApply);

// Get all loan applications or get repaid and unrepaid loans if query is provided
router.get('/loans', approvedValidate, verifyUser, verifyAdmin, getAllLoans);

// Get a specific loan application
router.get('/loans/:id', oneLoanValidate, verifyUser, verifyAdmin, getALoan);


export default router;
