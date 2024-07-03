const clearErrorMsg = (input, errorMsg) => {
	input.addEventListener('input', () => {
		errorMsg.textContent = '';
	});
};

export const validName = (input, errorMsg, func) => {
	clearErrorMsg(input, errorMsg);
	if (input.value !== '') {
		func();
		errorMsg.textContent = '';
	} else {
		errorMsg.textContent = 'Enter your name.';
	}
};

export const validEmail = (input, errorMsg, func) => {
	clearErrorMsg(input, errorMsg);
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (emailRegex.test(input.value)) {
		func();
		errorMsg.textContent = '';
	} else {
		errorMsg.textContent = 'Enter correct e-mail.';
	}
};

export const validMsg = (input, errorMsg, func) => {
	clearErrorMsg(input, errorMsg);
	if (input.value !== '') {
		func();
		errorMsg.textContent = '';
	} else {
		errorMsg.textContent = 'Enter your message.';
	}
};
