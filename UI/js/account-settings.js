const password = document.querySelector('.new-password');
const confirmPassword = document.querySelector('.confirm-password');

const validatePassword = () => {
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords don't match");
  } else {
    confirmPassword.setCustomValidity('');
  }
};

password.onchange = validatePassword;
confirmPassword.onkeyup = validatePassword;
