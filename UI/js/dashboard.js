// Calculate loan repayment on the fly
// eslint-disable-next-line no-unused-vars
function estimateRepayment() {
  const amount = document.querySelector('#amount').value;
  const tenor = document.querySelector('#tenor').value;
  const monthlyInstallment = document.querySelector('#installment');
  const interestAccrued = document.querySelector('#interest-accr');
  const totalPayment = document.querySelector('#total-repayment');
  const interestRate = 0.05;
  console.log(Number(tenor));
  const interest = parseFloat(((amount * interestRate) / tenor).toFixed(2));
  const payment = ((amount / tenor) + interest).toFixed(2);
  // payment = payment.toLocaleString('en');
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

// This opens the modal
const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
const modalNo = document.querySelector('.modal__action--negative');
const logOut = document.querySelector('.logout');

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
