export const initTheme = () => {
	const body = document.querySelector('body');
	const lightThemeBtn = document.querySelector('.light-theme');
	const darkThemeBtn = document.querySelector('.dark-theme');

	const applyTheme = theme => {
		body.setAttribute('data-mode', theme);
		localStorage.setItem('theme', theme);
		handleCurrentTheme(theme);
	};

	const handleCurrentTheme = theme => {
		if (theme === 'dark') {
			darkThemeBtn.classList.add('current-theme');
			lightThemeBtn.classList.remove('current-theme');
		} else {
			darkThemeBtn.classList.remove('current-theme');
			lightThemeBtn.classList.add('current-theme');
		}
	};
	const toogleTheme = () => {
		const currentMode = body.getAttribute('data-mode');
		if (currentMode === 'light') {
			applyTheme('dark');
		} else {
			applyTheme('light');
		}
	};

	lightThemeBtn.addEventListener('click', toogleTheme);
	darkThemeBtn.addEventListener('click', toogleTheme);

	const savedTheme = localStorage.getItem('theme') || 'light';
	applyTheme(savedTheme);
};
