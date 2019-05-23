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
  static async generateRepaymentRecord(req, res) {
    const id = Number(req.params.id);
    const { paidAmount } = req.body;
    const findLoanQuery = 'SELECT * FROM loans WHERE id = $1';
    const updateBalanceQuery = 'UPDATE loans SET repaid = $1 WHERE id = $2';
    // const updateLoanQuery = 'UPDATE loans SET balance = $1 WHERE id = $2 RETURNING *';


    try {
      const { rows } = await db.query(findLoanQuery, [id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Loan does not exist',
        });
      }
      if (rows[0].repaid) {
        return res.status(400).json({
          status: 400,
          error: 'Loan has been fully repaid',
        });
      }
      if (paidAmount > rows[0].balance) {
        return res.status(400).json({
          status: 400,
          error: 'Payment is more than balance',
        });

      }

      const newBalance = rows[0].balance - paidAmount;

      if (newBalance === 0) {
        await db.query(updateBalanceQuery, [true, id]);
      }

      // const updatedLoan = await db.query(updateLoanQuery, [newBalance, id]);

      // return res.status(201).json({
      //   status: 201,
      //   data: repayment,
      // });
    } catch (error) {
      return res.status(400).json(error.message);
    }

    // if (loanFound) {
    //   const loanId = loanFound.id;
    //   const amount = loanFound.amount;
    //   const createdOn = new Date().toLocaleString();
    //   const monthlyInstallment = loanFound.paymentInstallment;
    //   const paidAmount = loanFound.paymentInstallment;
     

    //   const newRecord = {
    //     id: repayments.length + 1,
    //     loanId,
    //     createdOn,
    //     amount,
    //     monthlyInstallment,
    //     paidAmount,
    //     balance: newBalance,
    //   };

    //   loanFound.balance = newBalance;
    //   if (loanFound.balance <= 0) {
    //     loanFound.repaid = true;
    //     return res.status(200).json({
    //       status: 200,
    //       error: 'Loan has been fully repaid',
    //     });
    //   }

    //   repayments.push(newRecord);

    //   return res.status(201).json({
    //     status: 201,
    //     data: newRecord,
    //   });
    // }
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
