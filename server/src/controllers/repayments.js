import { loans, repayments } from '../db';

/**
 * @class RepaymentController
 * @description Collection of methods that generates and retrieves repayment record
 */

class Repayments {
  static generateRepaymentRecord(req, res) {
    const id = Number(req.params.id);
    const paidAmount = Number(req.body.paidAmount);
    const loanFound = loans.find(loan => loan.id === id);


    if (loanFound) {
      // If amount repaid is greater than repayment due
      if (paidAmount > loanFound.balance) {
        return res.status(400).json({
          status: 400,
          error: 'Amount paid is more than Repayment due',
        });
      }

      const newBalance = loanFound.balance - paidAmount;

      const newRecord = {
        id: repayments.length + 1,
        loanId: loanFound.id,
        createdOn: loanFound.createdAt,
        amount: loanFound.loanAmount,
        monthlyInstallments: loanFound.paymentInstallment,
        paidAmount,
        balance: newBalance,
      };

      loanFound.balance = newBalance;
      if (loanFound.balance === 0) loanFound.repaid = true;

      repayments.push(newRecord);

      return res.status(201).json({
        status: 201,
        data: newRecord,
      });
    }

    return res.status(404).json({
      status: 404,
      error: 'Loan does not exist',
    });
  }

  static getRepaymentHistory(req, res) {
    const id = Number(req.params.id);

    const history = repayments.filter(repayment => repayment.loanId === id);


    if (history) {
      return res.status(200).json({
        status: 200,
        data: history,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'You have no repayment history',
    });
  }
}

export default Repayments;
