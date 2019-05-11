import express from 'express';
import expressValidator from 'express-validator';
import authorization from '../middleware/authorization';
import repayment from '../controllers/repayments';
import validation from '../middleware/repayment-validate';


const router = express.Router();
router.use(expressValidator());

const { repaymentRecordValidate, historyRepaymentValidate } = validation;
const { verifyAdmin, verifyUser } = authorization;
const { generateRepaymentRecord, getRepaymentHistory } = repayment;

router.post('/loans/:id/repayments', verifyAdmin, repaymentRecordValidate, generateRepaymentRecord);
router.get('/loans/:id/repayments', verifyUser, historyRepaymentValidate, getRepaymentHistory);

export default router;
