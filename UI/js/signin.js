const email = document.querySelector('.email');
const signIn = document.querySelector('.signin-button');

signIn.onclick = (e) => {
  if (email.value === 'admin@quick.com') {
    window.location.href = 'admin.html';
  }

  if (email.value === 'user@quick.com') {
    window.location.href = 'dashboard.html';
  }

  e.preventDefault();
};
