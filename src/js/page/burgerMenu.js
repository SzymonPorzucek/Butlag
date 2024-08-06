export const initBurgerMenu = () => {
	const burgerBtn = document.querySelector('.burger-btn');
	const closeNavBtn = document.querySelector('.close-nav-btn');
	const mobileMenu = document.querySelector('.nav__mobile');
	const navItems = document.querySelectorAll('.nav-item');
	const preventDefaultNav = () => {
		navItems.forEach(link => {
			link.addEventListener('click', function (e) {
				e.preventDefault();
				const targetId = this.getAttribute('href').substring(1);
				const targetElement = document.getElementById(targetId);
				if (targetElement) {
					window.scrollTo({
						top: targetElement.offsetTop,
						behavior: 'smooth',
					});
				}
			});
		});
	};
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
	preventDefaultNav()
	burgerBtn.addEventListener('click', showMobileMenu);
	closeNavBtn.addEventListener('click', checkAndCloseMenu);
	document.addEventListener('click', checkAndCloseMenu);
};
