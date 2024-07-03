export const initLangList = () => {
	const languageBtn = document.querySelector('.flag-btn');
	const languageListClosingBtn = document.querySelector('.chevron-up');
	const languageList = document.querySelector('.lang-list');

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

	languageListClosingBtn.addEventListener('click', checkAndCloseLanguageList);
	languageBtn.addEventListener('click', showLanguages);
	document.addEventListener('click', checkAndCloseLanguageList);
};
