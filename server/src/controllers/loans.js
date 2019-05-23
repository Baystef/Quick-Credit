import logger from '../helper/debugger';
import { loans } from '../models/db';
import db from '../../db';

/**
 * @description Loan class of methods for each loan endpoint
 * @exports Loan
 */
class Loan {
  /**
   * @description creates new loan applications
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object}  new loan application object
   */
  static async loanApply(req, res) {
    const { amount, tenor } = req.body;
    const { firstName, lastName, email } = req.user;


    const interest = 0.05 * amount.toFixed(2);
    const paymentInstallment = Number(((amount + interest) / tenor).toFixed(2));
    const balance = Number((amount + interest).toFixed(2));

    const values = [email, amount, tenor, interest, paymentInstallment, balance];

    const findLoanQuery = 'SELECT * FROM loans WHERE "userMail" = $1';
    const loanApplyQuery = `INSERT INTO 
    loans("userMail", amount, tenor, interest, "paymentInstallment", balance)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *`;

    try {
      const currentLoan = await db.query(findLoanQuery, [email]);
      if (currentLoan.rows[0] || !currentLoan.rows.repaid) {
        return res.status(409).json({
          status: 409,
          error: 'You have a current unrepaid loan',
        });
      }
      const { rows } = await db.query(loanApplyQuery, values);
      return res.status(201).json({
        status: 201,
        data: {
          firstName,
          lastName,
          ...rows[0],
        },
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }


  /**
   * @description Retrieves all loans from the data structure
   * and also if query is specified, it return loans that match the specified query
   * @param {object} req request object
   * @param {object} res response object
   * @returns [array] array of loans
   */
  static async getAllLoans(req, res) {
    const { status } = req.query;
    let { repaid } = req.query;
    const loanqueryQuery = 'SELECT * FROM loans WHERE status=$1 AND repaid=$2';
    const allLoanQuery = 'SELECT * FROM loans';
    const values = [status, repaid];

    try {
      if (status && repaid) {
        repaid = JSON.parse(repaid); // parses repaid back to boolean
        const { rows } = await db.query(loanqueryQuery, values);
        return res.status(200).json({
          status: 200,
          data: rows[0],
        });
      }

      const allLoans = await db.query(allLoanQuery);
      return res.status(200).json({
        status: 200,
        data: [allLoans.rows[0]],
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }


  /**
   * @description Retrieves a single specified loan
   * @param {object} req request parameter
   * @param {object} res response object {status, data}
   * @returns {object} A specified loan
   */
  static async getALoan(req, res) {
    const { id } = req.params;
    const oneLoanQuery = 'SELECT * FROM loans WHERE id=$1';

    try {
      const { rows } = await db.query(oneLoanQuery, [id]);

      if (rows[0]) {
        return res.status(200).json({
          status: 200,
          data: {
            ...rows[0],
          },
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'Loan does not exist',
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  /**
   * @description Approves or rejects a loan for a particular user
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object} loan application with new status
   */
  static async approveRejectLoan(req, res) {
    const { status } = req.body;
    const { id } = req.params;

    const oneLoanQuery = 'SELECT * FROM loans WHERE id=$1';
    const values = [status, id];

    try {
      const { rows } = await db.query(oneLoanQuery, [id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Loan does not exist',
        });
      }
      if (rows[0].status === 'approved') {
        return res.status(409).json({
          status: 409,
          error: 'Loan is approved already',
        });
      }

      const approveQuery = 'UPDATE loans SET status=$1 WHERE id=$2 RETURNING *';
      const approve = await db.query(approveQuery, values);

      return res.status(200).json({
        status: 200,
        data: approve.rows[0],
      });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

export default Loan;
