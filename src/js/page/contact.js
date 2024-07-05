import { validName, validEmail, validMsg } from '../validation.js';
import { closePopup, showPopup } from '../pageFunctions.js';
export const initContact = () => {
	const contactNameInput = document.querySelector('.contact-name-input');
	const contactEmailInput = document.querySelector('.contact-email-input');
	const contactMsgTextaera = document.querySelector('.contact-msg');
	const contactSendBtn = document.querySelector('.contact-send-btn');
	const contactErrorName = document.querySelector('.contact-error-name');
	const contactErrorEmail = document.querySelector('.contact-error-email');
	const contactErrorMsg = document.querySelector('.contact-error-msg');
	const contactSuccessInfo = document.querySelector('.contact-success-info');


	
	const sendMsg = async contactData => {
		//
		// Delete popup when I'll be done with server setup
		//
		showPopup(contactSuccessInfo);
		contactNameInput.value = '';
		contactEmailInput.value = '';
		contactMsgTextaera.value = '';

		try {
			// Server URL
			const response = await fetch('URL', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(contactData),
			});
			if (!response.ok) {
				throw new Error('Network is not responsing');
			}
			//
			// Uncomment when I'll be done with server setup
			//
			// showPopup(contactSuccessInfo);
			// contactNameInput.value = '';
			// contactEmailInput.value = '';
			// contactMsgTextaera.value = '';

			const result = await response.json();
			console.log('sent', result);
		} catch (error) {
			console.error('Error during sending', error);
		}
		console.log(contactData);
	};

	const validAndSend = () => {
		validName(contactNameInput, contactErrorName);
		validEmail(contactEmailInput, contactErrorEmail);
		validMsg(contactMsgTextaera, contactErrorMsg);
		if (
			contactErrorName.textContent === '' &&
			contactErrorMsg.textContent === '' &&
			contactErrorEmail.textContent === ''
		) {
			const contactData = {
				name: contactNameInput.value,
				email: contactEmailInput.value,
				message: contactMsgTextaera.value,
				timestamp: new Date().toISOString(),
			};
			sendMsg(contactData);
		}
	};

	contactSendBtn.addEventListener('click', event => {
		event.preventDefault();
		validAndSend();
	});

	closePopup('.contact-success-info');
};
