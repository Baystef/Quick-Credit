export const users = [
  {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo0LCJlbWFpbCI6ImRhcmFtb2xhQHF1aWNrLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU3MTE1OTk4LCJleHAiOjE1NTc3MjA3OTh9.532ILlCS8AG59NSRys3KtQvhW3yfeMw2i-Qj_Sx8EUQ',
    id: 1,
    firstName: 'Adebayo',
    lastName: 'Daramola',
    email: 'daramola@quick.com',
    password: '$2b$08$Z/SwmQA.CfvcYBgF8zRHaO.K1AEPD4TNweEeXq.gqKHoEIGz4fqsu',
    phoneNo: 2347012345678,
    homeAddress: '1, osbourne, lagos',
    workAddress: '5, dolphin, lagos',
    status: 'verified',
    isAdmin: true,
    createdAt: '5/3/2019, 8:07:46 AM',
  },
  {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoyLCJlbWFpbCI6ImRhcmFtb2xhQHF1aWMuY29tIiwiaXNBZG1pbiI6ZmFsc2V9LCJpYXQiOjE1NTcxMDg1MzQsImV4cCI6MTU1NzcxMzMzNH0.ZBXy6CMH_nhG8HqB8NjxkXRj0Dm2qcDEUJDnpXIyGIs',
    id: 2,
    firstName: 'Adebayo',
    lastName: 'Steve',
    email: 'daramola@quic.com',
    password: '$2b$08$B/8sOmXBOfsZO9dnuvRvGu2fKexeApsKKaQ50nM5yidfNFczc1iQe',
    phoneNo: 2347012345678,
    homeAddress: '1, flint Street, Ikeja',
    workAddress: '2, Ilupeju close',
    status: 'unverified',
    isAdmin: false,
    createdAt: '5/6/2019, 3:08:54 AM',
  },
  {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjozLCJlbWFpbCI6ImRhcmFtb2xhLnN0ZXZlQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU3MTE1MzYzLCJleHAiOjE1NTc3MjAxNjN9._vPNp8m2sXwDwZKWWPMge56kFYCwFYE98RNHUC8DJgg',
    id: 3,
    firstName: 'Adebayo',
    lastName: 'Steve',
    email: 'daramola.steve@gmail.com',
    password: '$2b$08$QTZkWhgroLo52j1an9R1rO/HT9zSQRCUoHgW5hNd5E3QfvuoqtmD6',
    phoneNo: 2347012345678,
    homeAddress: '1, flint Street, Ikeja',
    workAddress: '2, Ilupeju close',
    status: 'unverified',
    isAdmin: false,
    createdAt: '5/6/2019, 5:02:43 AM',
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
