import { validEmail } from '../validation.js';
import { closePopup, showPopup } from '../pageFunctions.js';
export const initNewsletter = () => {
	const newsletterInput = document.querySelector('.newsletter__input');
	const newsletterBtn = document.querySelector('.newsletter-btn');
	const newsletterErrorMsg = document.querySelector('.newsletter-error-msg');
	const newsletterSuccessInfo = document.querySelector(
		'.newsletter-success-info'
	);

	const saveOnMailingList = async email => {
		try {
			// Server URL
			const response = await fetch('URL', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(email),
			});
			if (!response.ok) {
				throw new Error('Network is not responsing');
			}
			//
			// Uncomment when I'll be done with server setup
			//
			// showPopup(newsletterSuccessInfo);
			// newsletterInput.value = '';
			const result = await response.json();
			console.log('sent', result);
		} catch (error) {
			console.error('Error during sending', error);
		}
		console.log(email);
	};

	const addEmailToMailingList = async () => {
		const emailDate = {
			email: newsletterInput.value,
			timestamp: new Date().toISOString(),
		};
		await saveOnMailingList(emailDate);
		//
		// Delete popup when I'll be done with server setup
		//
		showPopup(newsletterSuccessInfo);
		newsletterInput.value = '';
	};

	closePopup('.newsletter-success-info');
	newsletterBtn.addEventListener('click', event => {
		event.preventDefault();
		validEmail(newsletterInput, newsletterErrorMsg, addEmailToMailingList);
	});
};
