import { loans } from '../db';

class Loan {
  /**
   * @method loanApply is used to create new loan applications
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object} new loan application
   */
  static loanApply(req, res) {
    const {
      firstName, lastName, email, loanAmount, tenor,
    } = req.body;

    const loanId = loans.length + 1;
    const interest = 0.05 * Number(loanAmount).toFixed(2);
    const paymentInstallment = (Number(loanAmount + interest) / tenor).toFixed(2);
    const balance = Number(loanAmount + interest).toFixed(2);
    const repaid = false;
    const status = 'pending';
    const createdAt = new Date().toLocaleString();

    // Loan data returned to user
    const loanApplied = {
      loanId,
      firstName,
      lastName,
      email,
      loanAmount,
      tenor,
      interest,
      paymentInstallment,
      balance,
      repaid,
      createdAt,
      status,
    };

    // Loan data stored in data structure
    const id = loanApplied.loanId;
    const user = req.user.email;
    const newLoan = {
      id,
      user,
      loanAmount,
      interest,
      paymentInstallment,
      balance,
      tenor,
      repaid,
      createdAt,
      status,
    };

    const currentLoan = loans.find(loan => loan.user === req.user.email);
    if (currentLoan) {
      return res.status(409).json({
        status: 409,
        error: 'You have a current unrepaid loan',
      });
    }

    loans.push(newLoan);
    return res.status(201).json({
      status: 201,
      data: loanApplied,
    });
  }

  /**
   * @method getAllLoans retrieves all loans from the data structure
   * and also if query is specified, it return loans that match the specified query
   * @param {object} req request object
   * @param {object} res response object {status,data}
   * @returns [array] array of loans
   */
  static getAllLoans(req, res) {
    const { status } = req.query;
    let { repaid } = req.query;

    if (status && repaid) {
      // This parses status from string back to boolean
      repaid = JSON.parse(repaid);
      const approved = loans.filter(loan => loan.status === status && loan.repaid === repaid);
      return res.status(200).json({
        status: 200,
        data: approved,
      });
    }
    return res.status(200).json({
      status: 200,
      data: loans,
    });
  }

  /**
   * @method getALoan retrieves a single specified loan
   * @param {object} req request parameter
   * @param {object} res response object {status, data}
   * @returns {object} A specified loan
   */
  static getALoan(req, res) {
    let { id } = req.params;
    id = Number(id);
    const aLoan = loans.find(loan => loan.id === id);
    if (aLoan) {
      return res.status(200).json({
        status: 200,
        data: aLoan,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Loan does not exist',
    });
  }

  /**
   * @method approveRejectLoan approves or rejects a loan for a particular user
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object}
   */
  static approveRejectLoan(req, res) {
    const { status } = req.body;
    let { id } = req.params;
    id = Number(id);

    const pending = loans.find(loan => loan.id === id);
    if (pending) {
      pending.status = status;
      const newStatus = {
        loanId: pending.id,
        loanAmount: pending.loanAmount,
        tenor: pending.tenor,
        status: pending.status,
        monthlyInstallment: pending.paymentInstallment,
        interest: pending.interest,
      };
      return res.status(200).json({
        status: 200,
        data: newStatus,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Loan does not exist',
    });
  }
}

export default Loan;
