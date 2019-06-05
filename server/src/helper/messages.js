class Messages {
  static loanApprovalMessage(data) {
    const { userMail } = data;
    const email = userMail;
    const subject = 'Loan Application Approval';
    const html = `<h3>Dear Customer,</h3>
    <p>Your Loan of &#8358;${data.amount} has been ${data.status}</p>
    <br/>
    <p>Click <a href="https://baystef.github.io/Quick-Credit/UI/signin.html">here</a> to sign in for more details</p>
    <br/>
    <br/>
    <p>Regards,</p>
    <span> - The Quick Credit Team</span>
    `;
    return { email, subject, html };
  }
}

export default Messages;
