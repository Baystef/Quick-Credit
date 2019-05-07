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
}

export default Loan;
