import { initTheme } from '../theme.js';
import { validEmail } from '../validation.js';
document.addEventListener('DOMContentLoaded', () => {
	initTheme();

	const logInEmailInput = document.querySelector('.log-in__email-input');
	const logInEmailError = document.querySelector('.log-in-error-email');
	const logInBtn = document.querySelector('.log-in__btn');

	const validAndLogIn = () => {
		validEmail(logInEmailInput, logInEmailError);
		if (logInEmailError.textContent === '') {
			window.location.href = 'app.html';
		}
	};

	logInBtn.addEventListener('click', event => {
		event.preventDefault()
		validAndLogIn();
	});
});
