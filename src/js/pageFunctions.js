export const initPageFunctions = () => {
	const chevronDown = document.querySelector('.chevron-down');
	const aboutSection = document.querySelector('#about');
	const footerYear = document.querySelector('.footer__year');

	const moveToSection = () => {
		aboutSection.scrollIntoView();
	};

	const getYear = () => {
		const year = new Date().getFullYear();
		footerYear.textContent = year;
	};
	getYear();
	chevronDown.addEventListener('click', moveToSection);
};

export function closePopup(ancestorClass, redirect = false, href) {
	const closeBtns = document.querySelectorAll('.close-btn');
	closeBtns.forEach(function (button) {
		button.addEventListener('click', function () {
			const ancestor = this.closest(ancestorClass);
			if (ancestor) {
				ancestor.style.opacity = '0';
				ancestor.style.visibility = 'hidden';
				setTimeout(() => {
					ancestor.style.display = 'none';
					document.body.style.overflow = 'visible';
					if (redirect && href) {
						window.location.href = `${href}`;
					}
				}, 100);
			}
		});
	});
}
export const showPopup = popupClass => {
	popupClass.style.display = 'flex';
	setTimeout(() => {
		popupClass.style.opacity = '1';
		popupClass.style.visibility = 'visible';
	}, 100);
	document.body.style.overflow = 'hidden';
};
