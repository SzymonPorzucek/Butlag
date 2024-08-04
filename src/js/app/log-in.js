import { initTheme } from '../theme.js';
import { validEmail } from '../validation.js';
import { closePopup } from '../pageFunctions.js';
document.addEventListener('DOMContentLoaded', () => {
	initTheme();

	const logInEmailInput = document.querySelector('.log-in__email-input');
	const logInEmailError = document.querySelector('.log-in-error-email');
	const logInPasswordInput = document.querySelector('.log-in__password-input');
	const logInPasswordError = document.querySelector('.log-in-error-password');

	const logInErrorInfo = document.querySelector('.error-info');
	const logInBtn = document.querySelector('.log-in__btn');
	let userPassword;
	const validAndLogIn = () => {
		validEmail(logInEmailInput, logInEmailError);
		if (logInEmailError.textContent === '') {
			loadUserData();
		}
		if (
			logInEmailError.textContent === '' &&
			logInPasswordError.textContent === ''
		) {
			validUserPassword(logInPasswordInput, userPassword, logInPasswordError);
			if (logInPasswordError.textContent === '') {
				logIn();
			}
		}
	};

	const validUserPassword = (input, userpassword, errorMsg) => {
		if (input.value === userpassword) {
			errorMsg.textContent = '';
		} else {
			errorMsg.textContent = 'Password is incorrect.';
		}
	};

	const loadUserData = () => {
		const email = logInEmailInput.value;
		const user = JSON.parse(sessionStorage.getItem('userData'));
		if (user && user.email === email) {
			userPassword = user.password;
		} else {
			logInEmailError.textContent = 'Email not found.';
			logInPasswordError.textContent = '';
		}
	};

	const logIn = () => {
		sessionStorage.setItem('authToken', 'userLoggedIn');
		window.location.href = 'app.html';
	};

	// const validAndLogIn = async () => {
	// 	validEmail(logInEmailInput, logInEmailError);
	// 	if (logInEmailInput.textContent === '') {
	// 		await logIn();
	// 	}
	// };

	// const logIn = async () => {
	// 	const email = logInEmailInput.value;
	// 	const password = logInPasswordInput.value;
	// 	try {
	// 		const response = await fetch('api/login', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify({ email, password }),
	// 		});
	// 		const data = await response.json();
	// 		if (response.ok) {
	// 			localStorage.setItem('token', data.token);
	// 			window.location.href = 'app.html';
	// 		} else {
	// 			if (data.errorField === 'email') {
	// 				logInEmailError.textContent = data.message;
	// 			} else if (data.errorField === 'password') {
	// 				logInPasswordError.textContent = data.message;
	// 			} else {
	// 				console.log(`Login failed`);
	// 				showPopup(logInErrorInfo);
	// 			}
	// 		}
	// 	} catch (error) {
	// 		console.error('Error:', error);
	// 		showPopup(logInErrorInfo);
	// 	}
	// };

	closePopup('.error-info');

	logInPasswordInput.addEventListener('input', () => {
		errorMsg.textContent = '';
	});

	logInBtn.addEventListener('click', event => {
		event.preventDefault();

		validAndLogIn();
	});
});
