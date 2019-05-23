import logger from '../helper/debugger';
import { loans, repayments } from '../models/db';
import db from '../../db';

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
    const loanFound = loans.find(loan => loan.id === id);


    if (loanFound) {
      const loanId = loanFound.id;
      const amount = loanFound.amount;
      const createdOn = new Date().toLocaleString();
      const monthlyInstallment = loanFound.paymentInstallment;
      const paidAmount = loanFound.paymentInstallment;
      const newBalance = loanFound.balance - paidAmount;

      const newRecord = {
        id: repayments.length + 1,
        loanId,
        createdOn,
        amount,
        monthlyInstallment,
        paidAmount,
        balance: newBalance,
      };

      loanFound.balance = newBalance;
      if (loanFound.balance <= 0) {
        loanFound.repaid = true;
        return res.status(200).json({
          status: 200,
          error: 'Loan has been fully repaid',
        });
      }

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
  static async getRepaymentHistory(req, res) {
    const { id } = req.params;
    const loanId = Number(id);
    const getUserQuery = 'SELECT * FROM loans WHERE id = $1';

    try {
      const { rows } = await db.query(getUserQuery, [loanId]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'You have no repayment history',
        });
      }
      const historyQuery = `SELECT, "paymentInstallment", balance, repaid, status, repayment.amount" 
      FROM loans JOIN repayments ON loans.id = repayments."loanId" WHERE repayments."loanId" = $1;`;

      const history = await db.query(historyQuery, [loanId]);
      return res.status(200).json({
        status: 200,
        data: history.rows,
      });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

export default Repayments;
