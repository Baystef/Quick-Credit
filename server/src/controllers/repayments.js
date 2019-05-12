import { loans, repayments } from '../models/db';

/**
 * @description Collection of methods that generates and retrieves repayment record
 * @exports Repayments
 */

class Repayments {
  /**
   * @description Generates new loan repayment records
   * @param {object} req request object
   * @param {object}  res response object
   * @returns {object} new loan repayment record
   */
  static generateRepaymentRecord(req, res) {
    const id = Number(req.params.id);
    const paidAmount = Number(req.body.paidAmount);
    const loanFound = loans.find(loan => loan.id === id);


    if (loanFound) {
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
        createdOn: loanFound.createdOn,
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

  /**
   * @description Retrieves repayment records
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object}  repayment record object
   */
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
