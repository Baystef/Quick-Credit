const menuButton = document.querySelector('.menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

menuButton.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  menuButton.classList.toggle('close');
});
