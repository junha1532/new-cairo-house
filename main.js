const toggleBtn = document.querySelector('.navbar__toggleBtn');
const languageSelector = document.querySelector('.language__selector');
const navMenu = document.querySelector('.navbar__menu');
const languageMenu = document.querySelector('.language__menu');
// const icons = document.querySelector('.navbar__icons');

toggleBtn.addEventListener('click', () =>{
    navMenu.classList.toggle('active');
    // icons.classList.toggle('active');
});

languageSelector.addEventListener('click', () =>{
    languageSelector.classList.toggle('pressed');
    languageMenu.classList.toggle('pressed');
});