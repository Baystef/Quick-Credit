export const users = [
  {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJBZG1pbiIsImxhc3ROYW1lIjoiUXVpY2tjcmVkaXQiLCJlbWFpbCI6ImFkbWluQHF1aWNrY3JlZGl0LmNvbSIsImlzQWRtaW4iOnRydWV9LCJpYXQiOjE1NTc3MDkxMTQsImV4cCI6MTU1ODMxMzkxNH0.IVA1tKts1TIKEb4juIdekxMsPaZ7fv6EyjzN-RuXqOA',
    id: 1,
    firstName: 'Admin',
    lastName: 'Quickcredit',
    email: 'admin@quickcredit.com',
    password: '$2b$08$B3zqsHMWC/nYRY3wm8G9m.4oT4XN3Kb13AFsaybvHHE7vc2Cbk6Mu',
    phoneNo: 2347012345678,
    homeAddress: '1, Quick Credit Avenue',
    workAddress: '2, Quick Credit Complex',
    status: 'verified',
    isAdmin: true,
    createdOn: '5/13/2019, 1:58:34 AM',
  },
  {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoyLCJmaXJzdE5hbWUiOiJBZGViYXlvIiwibGFzdE5hbWUiOiJEYXJhbW9sYSIsImVtYWlsIjoiZGFyYW1vbGFAcXVpY2suY29tIiwiaXNBZG1pbiI6ZmFsc2V9LCJpYXQiOjE1NTc3MDAzNzksImV4cCI6MTU1ODMwNTE3OX0.QGKC_-X-CDOcP0CJb98f3JS8Ojt2kane9iJ98hh-G30',
    id: 2,
    firstName: 'Adebayo',
    lastName: 'Daramola',
    email: 'daramola@quick.com',
    password: '$2b$08$6pJ4i4sn.zoG7VfqaqbNE.7yYEDmnVD.Dh0IRtRK1p17RqmBWcHKq',
    phoneNo: 2347012345678,
    homeAddress: '1, osbourne, lagos',
    workAddress: '5, dolphin, lagos',
    status: 'unverified',
    isAdmin: false,
    createdOn: '5/12/2019, 11:32:59 PM',
  },
  {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjozLCJmaXJzdE5hbWUiOiJBZGViYXlvIiwibGFzdE5hbWUiOiJTdGV2ZSIsImVtYWlsIjoiZGFyYW1vbGFAcXVpYy5jb20iLCJpc0FkbWluIjpmYWxzZX0sImlhdCI6MTU1NzcwMzg1OSwiZXhwIjoxNTU4MzA4NjU5fQ.sEUfy1oxhiaGi7PKVaOuuROkDfluLMAIFCEoVUhSzko',
    id: 3,
    firstName: 'Adebayo',
    lastName: 'Steve',
    email: 'daramola@quic.com',
    password: '$2b$08$SkTR1xPRMDoPV7GPjeAUCOjaVtFkYHAeBSU/lBySF0kJ86d8ARByi',
    phoneNo: 2347012345678,
    homeAddress: '1, flint Street, Ikeja',
    workAddress: '2, Ilupeju close',
    status: 'unverified',
    isAdmin: false,
    createdOn: '5/13/2019, 12:30:59 AM',
  },
  {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo0LCJmaXJzdE5hbWUiOiJBZGViYXlvIiwibGFzdE5hbWUiOiJKb25lcyIsImVtYWlsIjoiZGFyYW1vbGEuc3RldmVAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2V9LCJpYXQiOjE1NTc3MDQyODEsImV4cCI6MTU1ODMwOTA4MX0.tpy_T9OkBKfUB0CA1WcfZMmda0g7NZkjTZ4MRYoPT6U',
    id: 4,
    firstName: 'Adebayo',
    lastName: 'Jones',
    email: 'daramola.steve@gmail.com',
    password: '$2b$08$BLfY6FUWe023PTgTSDQ8W.5XaGm3nhdHOF.X2eH9uDfDwSFHoAL.G',
    phoneNo: 2347012345678,
    homeAddress: '1, flint Street, Ikeja',
    workAddress: '2, Ilupeju close',
    status: 'unverified',
    isAdmin: false,
    createdOn: '5/13/2019, 12:38:01 AM',
  },
];

export const loans = [
  {
    id: 1,
    user: 'daramola.steve@gmail.com',
    loanAmount: 50000,
    tenor: 5,
    status: 'approved',
    repaid: false,
    interest: 2500,
    paymentInstallment: 10500,
    balance: 52500,
    createdOn: '5/6/2019, 1:37:13 PM',
  },
  {
    id: 2,
    user: 'daramola@quic.com',
    loanAmount: 100000,
    tenor: 7,
    status: 'pending',
    repaid: false,
    interest: 5000,
    paymentInstallment: 15000,
    balance: 105000,
    createdOn: '5/6/2019, 1:42:42 PM',
  },
  {
    id: 3,
    user: 'daramola@quick.com',
    loanAmount: 100000,
    tenor: 7,
    status: 'pending',
    repaid: false,
    interest: 5000,
    paymentInstallment: 15000,
    balance: 105000,
    createdOn: '5/6/2019, 1:42:42 PM',
  },
  {
    id: 4,
    user: 'daramola@yahoo.com',
    loanAmount: 100000,
    tenor: 7,
    status: 'approved',
    repaid: true,
    interest: 5000,
    paymentInstallment: 15000,
    balance: 105000,
    createdOn: '5/6/2019, 1:42:42 PM',
  },
  {
    id: 5,
    user: 'daramola@hotmail.com',
    loanAmount: 100000,
    tenor: 7,
    status: 'approved',
    repaid: true,
    interest: 5000,
    paymentInstallment: 15000,
    balance: 105000,
    createdOn: '5/6/2019, 1:42:42 PM',
  },
];

export const repayments = [
  {
    id: 1,
    loanId: 2,
    createdOn: '5/6/2019, 1:42:42 PM',
    amount: 100000,
    monthlyInstallment: 15000,
    paidAmount: 30000,
    balance: 75000,
  },
  {
    id: 2,
    loanId: 1,
    createdOn: '5/6/2019, 1:37:13 PM',
    amount: 50000,
    monthlyInstallment: 10500,
    paidAmount: 10500,
    balance: 42000,
  },
];