import { showPopup, closePopup } from '../pageFunctions.js';
import { validEmail } from '../validation.js';
import { initTheme } from '../theme.js';
document.addEventListener('DOMContentLoaded', () => {
	initTheme();
	//prettier-ignore

	const nextBtn = document.querySelector('.next-btn');
	const remindPasswordInput = document.querySelector('.remind-password-input');
	//prettier-ignore
	const remindPasswordErrorMsg = document.querySelector('.remind-password-error-email');
	//prettier-ignore
	const remindPasswordSuccessInfo = document.querySelector('.success-info');
	const remindPasswordErrorInfo = document.querySelector('.error-info');

	const validForm = () => {
		validEmail(remindPasswordInput, remindPasswordErrorMsg);
		if (remindPasswordErrorMsg.textContent === '') {
			sendMsg();
		}
	};

	const sendMsg = async () => {

		
		try {
			const response = await fetch('URL', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: remindPasswordInput.value,
					timestamp: new Date().toISOString(),
				}),
			});
			if (response.ok) {
				const data = await response.json();
				if (data.success) {
					showPopup(remindPasswordSuccessInfo);
				} else {
					showPopup(remindPasswordErrorInfo);
				}
			} else {
				showPopup(remindPasswordErrorInfo);
			}
		} catch (error) {
			console.error('Error:', error);
			showPopup(remindPasswordErrorInfo);
		}
	};

	closePopup('.success-info', true, 'log-in.html');
	closePopup('.error-info')

	nextBtn.addEventListener('click', event => {
		event.preventDefault();
		validForm();
	});
});
