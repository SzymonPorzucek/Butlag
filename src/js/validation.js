const clearErrorMsg = (input, errorMsg) => {
	input.addEventListener('input', () => {
		errorMsg.textContent = '';
	});
};

export const validName = (input, errorMsg) => {
	clearErrorMsg(input, errorMsg);
	if (input.value !== '') {
		errorMsg.textContent = '';
	} else {
		errorMsg.textContent = 'Enter your name.';
	}
};

export const validLastname = (input, errorMsg) => {
	clearErrorMsg(input, errorMsg);
	if (input.value !== '') {
		errorMsg.textContent = '';
	} else {
		errorMsg.textContent = 'Enter your last name.';
	}
};

export const validEmail = (input, errorMsg) => {
	clearErrorMsg(input, errorMsg);
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (emailRegex.test(input.value)) {
		errorMsg.textContent = '';
	} else {
		errorMsg.textContent = 'Enter correct e-mail.';
	}
};

export const validMsg = (input, errorMsg) => {
	clearErrorMsg(input, errorMsg);
	if (input.value !== '') {
		errorMsg.textContent = '';
	} else {
		errorMsg.textContent = 'Enter your message.';
	}
};
export const validNewPassword = (
	input,
	errorMsg,
	inputRepeat,
	errorMsgRepeat
) => {
	clearErrorMsg(input, errorMsg);
	clearErrorMsg(inputRepeat, errorMsgRepeat);
	const password = input.value;
	const passwordRepeat = inputRepeat.value;
	const minLength = password.length >= 8;
	const hasUpperCase = /[A-Z]/.test(password);
	const hasTwoDigits = /(\d.*){2,}/.test(password);
	const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
	const onlyEnglishChars = /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>]*$/.test(password);
	if (
		minLength &&
		hasUpperCase &&
		hasTwoDigits &&
		hasSpecialChars &&
		onlyEnglishChars
	) {
		errorMsg.textContent = '';
	} else {
		errorMsg.textContent =
			'Password is not strong enough. Check question mark up there.';
	}
	if (password === passwordRepeat) {
		errorMsgRepeat.textContent = '';
	} else {
		errorMsgRepeat.textContent = 'Passwords are not the same.';
	}
};
export const validCheckBox = (checkbox, errorMsg, event) => {
	if (!checkbox.checked) {
		event.preventDefault();
		errorMsg.textContent = 'Accept terms and conditions!';
	} else {
		errorMsg.textContent = '';
	}
};
