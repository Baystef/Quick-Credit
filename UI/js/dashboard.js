// Calculate loan repayment on the fly
// eslint-disable-next-line no-unused-vars
function estimateRepayment() {
  const amount = document.querySelector('#amount').value;
  const tenor = document.querySelector('#tenor').value;
  const monthlyInstallment = document.querySelector('#installment');
  const interestAccrued = document.querySelector('#interest-accr');
  const totalPayment = document.querySelector('#total-repayment');
  const interestRate = 0.05;
  const interest = parseFloat(((amount * interestRate) / tenor).toFixed(2));
  const payment = ((amount / tenor) + interest).toFixed(2);
  const total = Number(amount) + interest;

  if (!tenor) return 0;

  const error = document.querySelector('.tenorError');
  if (tenor < 1 || tenor > 12) {
    error.textContent = 'Tenor must be within 1 - 12 months';
    error.style.fontSize = '0.5rem';
    error.style.padding = '0.5rem';
    error.style.marginBottom = '0.5rem';
    error.style.color = 'red';
    error.style.backgroundColor = 'orange';
    monthlyInstallment.innerHTML = 0;
    interestAccrued.innerHTML = 0;
    totalPayment.innerHTML = 0;
  } else {
    error.textContent = '';
    error.style.backgroundColor = '';
    monthlyInstallment.innerHTML = payment;
    interestAccrued.innerHTML = interest;
    totalPayment.innerHTML = total;
  }
}

const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
const modalNo = document.querySelector('.modal__action--negative');
const logOut = document.querySelector('.logout');

// This opens the modal
logOut.addEventListener('click', () => {
  modal.classList.add('open');
  setTimeout(() => {
    backdrop.classList.add('open');
  }, 300);
});

// The function that closes the modal
function closeModal() {
  if (modal) {
    modal.classList.remove('open');
  }
  setTimeout(() => {
    backdrop.classList.remove('open');
  }, 300);
}

// When the option No is clicked on the modal, modal closes
if (modalNo) modalNo.addEventListener('click', closeModal);

// When backdrop is clicked on, close modal and remove backdrop
backdrop.addEventListener('click', closeModal);

// Dashboard sidebar
const closeSide = document.querySelector('.close-sidebar');
const sideBar = document.querySelector('aside');
const menu = document.querySelector('.menu-btn');

closeSide.addEventListener('click', () => {
  sideBar.classList.add('close-side');
  sideBar.classList.remove('open-side');
});

// When hamburger menu is clicked on
menu.addEventListener('click', () => {
  sideBar.classList.add('open-side');
  sideBar.classList.remove('close-side');
});

// Searching a table
// const table = document.querySelector('.dashboard-table');
// const search = document.querySelector('dashboard-search-input');

// table.forEach(row => )

// console.log(table.rows[1].cells[0].textContent);