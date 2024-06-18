const burgerBtn = document.querySelector('.burger-btn');
const closeNavBtn = document.querySelector('.close-nav-btn');
const mobileMenu = document.querySelector('.nav__mobile');
const languageBtn = document.querySelector('.flag-trigger');
const languageListClosingBtn = document.querySelector('.chevron-up');
const languageList = document.querySelector('.lang-list');
const body = document.querySelector('body');
const lightThemeBtn = document.querySelector('.light-theme');
const darkThemeBtn = document.querySelector('.dark-theme');

const showMobileMenu = () => {
	mobileMenu.classList.add('active');
};
const checkAndCloseMenu = e => {
	if (
		mobileMenu.classList.contains('active') &&
		!e.target.closest('.burger-btn')
	) {
		mobileMenu.classList.remove('active');
	}
};

const showLanguages = () => {
	languageList.classList.toggle('hidden');
};

const checkAndCloseLanguageList = e => {
	if (
		!languageList.classList.contains('hidden') &&
		!e.target.closest('.flag-trigger')
	) {
		languageList.classList.add('hidden');
	}
};
const handleCurrentTheme = () => {
	darkThemeBtn.classList.toggle('current-theme');
	lightThemeBtn.classList.toggle('current-theme');
};
const handleDarkMode = () => {
	const currentMode = body.getAttribute('data-mode');
	if (currentMode === 'light') {
		body.setAttribute('data-mode', 'dark');
	} else {
		body.setAttribute('data-mode', 'light');
	}
	handleCurrentTheme()
};

burgerBtn.addEventListener('click', showMobileMenu);
document.addEventListener('click', checkAndCloseMenu);
languageBtn.addEventListener('click', showLanguages);
document.addEventListener('click', checkAndCloseLanguageList);
lightThemeBtn.addEventListener('click', handleDarkMode);
darkThemeBtn.addEventListener('click', handleDarkMode);
