import { debounce } from '../pageFunctions';
export const initNav = () => {
	const navMobile = document.querySelector('.nav-mobile');
	const topbar = document.querySelector('.topbar');
	const navBurgerBtn = document.querySelector('.topbar__burger-btn');
	const navHome = document.querySelector('.nav__item--home');
	const navShoppingList = document.querySelector('.nav__item--shopping-list');
	const navNotes = document.querySelector('.nav__item--notes');
	const navTodoList = document.querySelector('.nav__item--todo-list');
	const navProfile = document.querySelector('.nav__item--profile');

	const navOverlay = document.querySelector('.overlay');

	const shortcutShoppingList = document.querySelector(
		'.home-section__shortcuts--shopping-list'
	);
	const shortcutNotes = document.querySelector(
		'.home-section__shortcuts--notes'
	);
	const shortcutTodoList = document.querySelector(
		'.home-section__shortcuts--todo-list'
	);

	const allSections = document.querySelectorAll('.section');
	const homeSection = document.querySelector('#home');
	const shoppingListSection = document.querySelector('#shopping-list');
	const notesSection = document.querySelector('#notes');
	const todoListSection = document.querySelector('#todo-list');
	const profileSection = document.querySelector('#profile');

	const notifications = document.querySelector('.notifications');

	const navItems = [
		{ button: navHome, section: homeSection },
		{ button: navShoppingList, section: shoppingListSection },
		{ button: navNotes, section: notesSection },
		{ button: navTodoList, section: todoListSection },
		{ button: navProfile, section: profileSection },

		{ button: shortcutShoppingList, section: shoppingListSection },
		{ button: shortcutNotes, section: notesSection },
		{ button: shortcutTodoList, section: todoListSection },
	];

	let startX;
	let endX;
	let currentNavPosition = -100;

	const setScrollbarWidth = () => {
		const getScrollbarWidth = () => {
			const scrollDiv = document.createElement('div');
			scrollDiv.style.visibility = 'hidden';
			scrollDiv.style.overflow = 'scroll';
			scrollDiv.style.width = '100px';
			scrollDiv.style.height = '100px';
			document.body.appendChild(scrollDiv);

			const scrollbarWidth = 8 + scrollDiv.offsetWidth - scrollDiv.clientWidth;
			document.body.removeChild(scrollDiv);
			return scrollbarWidth;
		};
		const scrollbarWidth = getScrollbarWidth();
		document.documentElement.style.setProperty(
			'--scrollbar-width',
			`${scrollbarWidth}px`
		);
	};

	const handleMobileMenu = () => {
		if (navMobile.classList.contains('nav-mobile-active')) {
			closeMobileNav();
		} else {
			showNav();
		}
	};

	const showNav = () => {
		if (notifications.classList.contains('notifications-active')) {
			return;
		}
		navMobile.classList.add('nav-mobile-active');
		navOverlay.classList.add('nav-mobile-active');
		navMobile.style.transform = 'translateX(0)';
		currentNavPosition = 0;

		topbar.classList.add('lock-scroll');
		document.body.style.overflow = 'hidden';
	};

	const closeMobileNav = () => {
		navMobile.classList.remove('nav-mobile-active');
		navOverlay.classList.remove('nav-mobile-active');
		navMobile.style.transform = 'translateX(-100%)';
		currentNavPosition = -100;
		topbar.classList.remove('lock-scroll');
		document.body.style.overflow = 'visible';
	};

	const handleTouchStart = e => {
		startX = e.touches[0].clientX;
		navMobile.style.transition = 'none';
	};
	const handleTouchMove = e => {
		endX = e.touches[0].clientX;
		const translateX = Math.min(
			0,
			currentNavPosition + ((endX - startX) / navMobile.offsetWidth) * 100
		);

		navMobile.style.transform = `translateX(${translateX}%)`;
	};

	const handleTouchEnd = () => {
		const translateX =
			currentNavPosition + ((endX - startX) / navMobile.offsetWidth) * 100;
		navMobile.style.transition = 'transform 0.5s ease';
		if (translateX > -50) {
			showNav();
		} else {
			closeMobileNav();
		}
	};
	const handleClickOutside = e => {
		if (
			navMobile.classList.contains('nav-mobile-active') &&
			!navMobile.contains(e.target) &&
			!navBurgerBtn.contains(e.target)
		) {
			closeMobileNav();
		}
	};

	const moveToSection = section => {
		allSections.forEach(item => {
			item.classList.add('hidden');
			section.classList.remove('hidden');
			section.classList.add('flex');
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		});
	};
	navItems.forEach(item => {
		item.button.addEventListener('click', () => {
			moveToSection(item.section);
			closeMobileNav();
		});
	});
	setScrollbarWidth();
	window.addEventListener('resize', debounce(setScrollbarWidth, 200));
	navBurgerBtn.addEventListener('click', handleMobileMenu);
	navMobile.addEventListener('touchstart', handleTouchStart);
	navMobile.addEventListener('touchmove', handleTouchMove);
	navMobile.addEventListener('touchend', handleTouchEnd);
	document.addEventListener('click', handleClickOutside);
};
