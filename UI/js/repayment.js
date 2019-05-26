const modalRepay = document.getElementById('myModal');
const btn = document.getElementById('myBtn');
const span = document.getElementsByClassName('close-repay')[0];
const payMore = document.querySelector('#payMore');
const repayInput = document.querySelector('.repay-input');

// When the user clicks the button, open the modal
btn.onclick = function () {
  modalRepay.style.display = 'block';
};

span.onclick = function () {
  modalRepay.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target === modalRepay) {
    modalRepay.style.display = 'none';
  }
};

payMore.onclick = function () {
  repayInput.focus();
}