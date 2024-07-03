export const initBurgerMenu = () => {
	const burgerBtn = document.querySelector('.burger-btn');
	const closeNavBtn = document.querySelector('.close-nav-btn');
	const mobileMenu = document.querySelector('.nav__mobile');

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
	burgerBtn.addEventListener('click', showMobileMenu);
	closeNavBtn.addEventListener('click', checkAndCloseMenu);
	document.addEventListener('click', checkAndCloseMenu);
};
