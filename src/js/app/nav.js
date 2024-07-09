export const initNav = () => {
	const navMobile = document.querySelector('.nav-mobile');
	const navBurgerBtn = document.querySelector('.topbar__burger-btn');
	const navHome = document.querySelector('.nav__item--home');
	const navShoppingList = document.querySelector('.nav__item--shopping-list');
	const navNotes = document.querySelector('.nav__item--notes');
	const navTodoList = document.querySelector('.nav__item--todo-list');
	const navProfile = document.querySelector('.nav__item--profile');
	const navSettings = document.querySelector('.nav__item--settings');
	const navOverlay = document.querySelector('.nav__overlay');

	const allSections = document.querySelectorAll('.section');
	const homeSection = document.querySelector('#home');
	const shoppingListSection = document.querySelector('#shopping-list');
	const notesSection = document.querySelector('#notes');
	const todoListSection = document.querySelector('#todo-list');
	const profileSection = document.querySelector('#profile');
	const settingsSection = document.querySelector('#settings');

	const navItems = [
		{ button: navHome, section: homeSection },
		{ button: navShoppingList, section: shoppingListSection },
		{ button: navNotes, section: notesSection },
		{ button: navTodoList, section: todoListSection },
		{ button: navProfile, section: profileSection },
		{ button: navSettings, section: settingsSection },
	];
	let startX;
	let endX;
	let currentNavPosition = -100;
	const handleMobileMenu = () => {
		if (navMobile.classList.contains('nav-mobile-active')) {
			closeMobileNav();
		} else {
			showNav();
		}
	};
	const showNav = () => {
		navMobile.classList.add('nav-mobile-active');
		navOverlay.classList.add('nav-mobile-active');
		navMobile.style.transform = 'translateX(0)';
		currentNavPosition = 0;
	};

	const closeMobileNav = () => {
		navMobile.classList.remove('nav-mobile-active');
		navOverlay.classList.remove('nav-mobile-active');
		navMobile.style.transform = 'translateX(-100%)';
		currentNavPosition = -100;
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
		if (e.target === navOverlay) {
			closeMobileNav();
		}
	};

	const moveToSection = section => {
		allSections.forEach(item => {
			item.classList.add('hidden');
		});
		setTimeout(() => {
			section.classList.remove('hidden');
			section.classList.add('flex');
		}, 400);
	};
    navItems.forEach(item=>{
        item.button.addEventListener('click',()=>{
            moveToSection(item.section)
        })
    })

	navBurgerBtn.addEventListener('click', handleMobileMenu);
	navMobile.addEventListener('touchstart', handleTouchStart);
	navMobile.addEventListener('touchmove', handleTouchMove);
	navMobile.addEventListener('touchend', handleTouchEnd);
	document.addEventListener('click', handleClickOutside);
};
