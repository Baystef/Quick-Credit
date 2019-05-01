export const users = [
  {
    id: 1,
    firstName: 'Adebayo',
    lastName: 'Daramola',
    email: 'daramola@quick.com',
    password: 'quickcredit',
    phoneNo: 2347012345678,
    homeAddress: '1, osbourne, lagos',
    workAddress: '5, dolphin, lagos',
    status: 'verified',
    isAdmin: true,
    createdAt: '5/3/2019, 8:07:46 AM',
  },
];

export const loans = [
  {
    id: 1,
    user: 'daramola@quick.com',
    status: 'approved',
    loanAmount: 50000,
    tenor: 5,
    repaid: false,
    get interest() {
      return (0.05 * this.loanAmount);
    },
    get monthlyInstall() {
      return (this.loanAmount + this.interest) / this.tenor;
    },
    get balance() {
      return (this.loanAmount + this.interest);
    },
    createdAt: new Date(),
  },
];

// export const repayments = [
//   {
//     id: 1,
//     loanId: loans.find(x => x.user === 'daramola@quick.com').id,
//     loanAmount: loans.find(x => x.user === 'daramola@quick.com').loanAmount,
//     createdOn: new Date(),
//   },
// ];
