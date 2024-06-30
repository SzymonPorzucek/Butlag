import { initSlider } from './slider.js';
document.addEventListener('DOMContentLoaded', () => {
	const burgerBtn = document.querySelector('.burger-btn');
	const closeNavBtn = document.querySelector('.close-nav-btn');
	const mobileMenu = document.querySelector('.nav__mobile');

	const languageBtn = document.querySelector('.flag-btn');
	const languageListClosingBtn = document.querySelector('.chevron-up');
	const languageList = document.querySelector('.lang-list');

	const body = document.querySelector('body');
	const lightThemeBtn = document.querySelector('.light-theme');
	const darkThemeBtn = document.querySelector('.dark-theme');
	const chevronDown = document.querySelector('.chevron-down');
	const aboutSection = document.querySelector('#about');

	const fadeShop = document.querySelector('.fade-shop');
	const shopsList = document.querySelector('.shops__box');
	const shopsItemsToHide = shopsList.querySelectorAll('div:nth-child(n+4)');
	const showShopsBtn = document.querySelector('.chevron-down-shop');


	

	
	initSlider(); 

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
		handleCurrentTheme();
	};
	const moveToSection = () => {
		aboutSection.scrollIntoView();
	};

	const hideShops = () => {
		fadeShop.classList.add('half-visible');
		showShopsBtn.classList.remove('hidden');

		shopsItemsToHide.forEach(element => {
			element.style.display = 'none';
			element.classList.remove('visible');
			element.classList.add('shop-hide');
		});
	};

	const showShops = () => {
		fadeShop.classList.remove('half-visible');
		shopsItemsToHide.forEach((element, index) => {
			showShopsBtn.classList.add('hidden');
			element.style.display = 'flex';
			setTimeout(() => {
				element.classList.add('visible');
				element.classList.remove('shop-hide');
			}, 300 * index);
		});
	};

	const handleShops = () => {
		if (window.innerWidth < 768) {
			hideShops();
		} else {
			showShops();
		}
	};

	const debounce = (func, wait) => {
		let timeout;
		return function (...args) {
			const context = this;

			const later = () => {
				clearTimeout(timeout);
				func.apply(context, args);
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	};

	handleShops();
	window.addEventListener('resize', debounce(handleShops, 200));
	burgerBtn.addEventListener('click', showMobileMenu);
	document.addEventListener('click', checkAndCloseMenu);
	languageListClosingBtn.addEventListener('click', checkAndCloseLanguageList);
	languageBtn.addEventListener('click', showLanguages);
	document.addEventListener('click', checkAndCloseLanguageList);
	lightThemeBtn.addEventListener('click', handleDarkMode);
	darkThemeBtn.addEventListener('click', handleDarkMode);
	chevronDown.addEventListener('click', moveToSection);
	showShopsBtn.addEventListener('click', showShops);
});
