// Calculate loan repayment on the fly

const getAmount = document.querySelector('#amount');
const getTenor = document.querySelector('#tenor');

function estimateRepayment() {
  const amount = getAmount.value;
  const tenor = getTenor.value;
  const monthlyInstallment = document.querySelector('#installment');
  const interestAccrued = document.querySelector('#interest-accr');
  const totalPayment = document.querySelector('#total-repayment');
  const interestRate = 0.05;
  const interest = parseFloat(((amount * interestRate) / tenor).toFixed(2));
  const payment = ((amount / tenor) + interest).toFixed(2);
  const total = Number(amount) + interest;

  const amountError = document.querySelector('.amountError');
  const tenorError = document.querySelector('.tenorError');
  if (amount < 5000 || amount > 500000) {
    amountError.textContent = 'Amount must be within 5000 - 500000';
    amountError.style.fontSize = '0.6rem';
    amountError.style.color = 'red';
    monthlyInstallment.innerHTML = '';
    interestAccrued.innerHTML = '';
    totalPayment.innerHTML = '';
  } else
  if (tenor < 1 || tenor > 12) {
    tenorError.textContent = 'Tenor must be within 1 - 12 months';
    tenorError.style.fontSize = '0.6rem';
    tenorError.style.color = 'red';
    monthlyInstallment.innerHTML = '';
    interestAccrued.innerHTML = '';
    totalPayment.innerHTML = '';
  } else {
    tenorError.textContent = '';
    tenorError.style.backgroundColor = '';
    amountError.textContent = '';
    amountError.style.backgroundColor = '';
    monthlyInstallment.innerHTML = payment;
    interestAccrued.innerHTML = interest;
    totalPayment.innerHTML = total;
  }
}

getAmount.addEventListener('input', estimateRepayment);
getTenor.addEventListener('input', estimateRepayment);


// Modal Script
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
const table = document.querySelector('.dashboard-table');
const input = document.querySelector('.dashboard-search-input');
const column = document.getElementsByTagName('thead')[0];
const heading = column.rows[0].cells[1].textContent;

function filterTable() {
  let td;
  let txtValue;
  const filter = input.value.toUpperCase();
  const tr = table.getElementsByTagName('tr');
  for (let i = 0; i < tr.length; i += 1) {
    if (heading === 'First Name') {
      // eslint-disable-next-line prefer-destructuring
      td = tr[i].getElementsByTagName('td')[3];
    } else if (heading === 'User') {
      // eslint-disable-next-line prefer-destructuring
      td = tr[i].getElementsByTagName('td')[0];
    }
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
}

input.addEventListener('input', filterTable);
