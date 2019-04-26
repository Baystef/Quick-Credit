// Give current link an active class
// document.querySelectorAll(`a[href=${document.URL}]`)
//   // eslint-disable-next-line no-param-reassign
//   .forEach((link) => { link.className += 'active'; });
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
  let payment = ((amount / tenor) + interest).toFixed(2);
  payment = payment.toLocaleString('en');
  const total = Number(amount) + interest;

  monthlyInstallment.innerHTML = payment;
  interestAccrued.innerHTML = interest;
  totalPayment.innerHTML = total;
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
