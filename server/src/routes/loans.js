import express from 'express';
import expressValidator from 'express-validator';
import authorization from '../middleware/authorization';
import { Loan } from '../controllers';
import validation from '../middleware/loan-validate';

const router = express.Router();
router.use(expressValidator());

// Import { method(s) } from class;
const { verifyUser, verifyAdmin } = authorization;
const {
  loanApplyValidate, approvedValidate, oneLoanValidate, approveRejectValidate,
} = validation;
const {
  loanApply, getAllLoans, getALoan, approveRejectLoan,
} = Loan;

// Create loan application
router.post('/loans', verifyUser, loanApplyValidate, loanApply);

// Get all loan applications or get repaid and unrepaid loans if query is provided
router.get('/loans', verifyAdmin, approvedValidate, getAllLoans);

// Get a specific loan application
router.get('/loans/:id', verifyAdmin, oneLoanValidate, getALoan);

// Approve or reject a loan application
router.patch('/loans/:id', verifyAdmin, approveRejectValidate, approveRejectLoan);


export default router;
