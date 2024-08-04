import { initTheme } from '../theme.js';
import {
	validName,
	validLastname,
	validEmail,
	validNewPassword,
	validCheckBox,
} from '../validation.js';
import { showPopup, closePopup } from '../pageFunctions.js';

document.addEventListener('DOMContentLoaded', () => {
	initTheme();

	const signUpNameInput = document.querySelector('.sign-up__name-input');
	const signUpNameError = document.querySelector('.sign-up-error-name');
	//prettier-ignore
	const signUpLastnameInput = document.querySelector('.sign-up__lastname-input');
	const signUpLastnameError = document.querySelector('.sign-up-error-lastname');

	const signUpEmailInput = document.querySelector('.sign-up__email-input');
	const signUpEmailError = document.querySelector('.sign-up-error-email');
	//prettier-ignore
	const signUpPasswordInput = document.querySelector('.sign-up__password-input');
	const signUpPasswordError = document.querySelector('.sign-up-error-password');
	//prettier-ignore
	const signUpRepeatPasswordInput = document.querySelector('.sign-up__repeat-password-input');
	//prettier-ignore
	const signUpRepeatPasswordError = document.querySelector('.sign-up-error-repeat-password');
	const signUpSuccesInfo = document.querySelector('.success-info');
	const signUpErrorInfo = document.querySelector('.error-info');

	const signUpBtn = document.querySelector('.sign-up__register');

	const singUpTermsCheckBox = document.querySelector('.terms-check-box');
	const singUpTermsErrorMsg = document.querySelector('.terms-error-msg');

	const validForm = () => {
		validName(signUpNameInput, signUpNameError);
		validLastname(signUpLastnameInput, signUpLastnameError);
		validEmail(signUpEmailInput, signUpEmailError);
		validNewPassword(
			signUpPasswordInput,
			signUpPasswordError,
			signUpRepeatPasswordInput,
			signUpRepeatPasswordError
		);
		validCheckBox(singUpTermsCheckBox, singUpTermsErrorMsg, event);
		if (
			signUpNameError.textContent === '' &&
			signUpLastnameError.textContent === '' &&
			signUpPasswordError.textContent === '' &&
			signUpEmailError.textContent === '' &&
			singUpTermsErrorMsg.textContent === ''
		) {
			createNewAccount();
		}
	};

	const createNewAccount = async () => {
		const userData = {
			name: signUpNameInput.value,
			lastname: signUpLastnameInput.value,
			email: signUpEmailInput.value,
			password: signUpPasswordInput.value,
			timestamp: new Date().toISOString(),
		};
		try {
			const data = await sendRegistrationData(userData);
			showPopup(signUpSuccesInfo);
			clearForm();
		} catch (error) {
			console.error('Registration failed:', error);
			showPopup(signUpErrorInfo);
		}
	};

	//
	// Change comment/uncomment when serwer will be done
	//

	const sendRegistrationData = async userData => {
		try {
			await new Promise(resolve => setTimeout(resolve, 1000));
			sessionStorage.setItem('userData', JSON.stringify(userData));

			const fakeResponse = {
				message: 'User registered successfully',
				user: userData,
			};

			console.log('Success', fakeResponse);
			return fakeResponse;
		} catch (error) {
			console.error('Error:', error);
			throw error;
		}
	};

	// const sendRegistrationData = async userData => {
	// 	try {
	// 		const response = await fetch('/api/register', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify(userData),
	// 		});
	// 		if (!response.ok) {
	// 			throw new Error('Network response was not ok');
	// 		}
	// 		const data = await response.json();
	// 		return data;
	// 	} catch (error) {
	// 		console.error('Error:', error);
	// 		throw error;
	// 	}
	// };
	const clearForm = () => {
		signUpNameInput.value = '';
		signUpLastnameInput.value = '';
		signUpEmailInput.value = '';
		signUpPasswordInput.value = '';
		signUpRepeatPasswordInput.value = '';
	};

	closePopup('.success-info', true, 'log-in.html');
	closePopup('.error-info');

	signUpBtn.addEventListener('click', event => {
		event.preventDefault();
		validForm();
	});
});
