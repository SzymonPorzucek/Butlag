export const initTheme = () => {
    const body = document.querySelector('body');
	const lightThemeBtn = document.querySelector('.light-theme');
	const darkThemeBtn = document.querySelector('.dark-theme');
	

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
	lightThemeBtn.addEventListener('click', handleDarkMode);
	darkThemeBtn.addEventListener('click', handleDarkMode);
}