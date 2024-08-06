export const initProfile = () => {
	const profileName = document.querySelector('.profile-name');
	const profileLastName = document.querySelector('.profile-last-name');
	const profileEmail = document.querySelector('.profile-email');

	const profileContainer = document.querySelector('.profile-container');
	const isLogInInfoContainer = document.querySelector('.is-log-in-container');

	const getUserData = () => {
		const user = sessionStorage.getItem('userData');
		const userToken = sessionStorage.getItem('authToken');
	
		if (userToken === 'userLoggedIn' && user) {
			return JSON.parse(user);
		}
	};
	const fillUserData = () => {
		const userData = getUserData();
		if (userData) {
			profileContainer.classList.add('flex');
			profileContainer.classList.remove('hidden');
			isLogInInfoContainer.classList.remove('flex');
			isLogInInfoContainer.classList.add('hidden');
			const name = userData.name;
			const lastName = userData.lastname;
			const email = userData.email;
			profileName.textContent = name;
			profileLastName.textContent = lastName;
			profileEmail.textContent = email;
		} else {
			profileContainer.classList.remove('flex');
			profileContainer.classList.add('hidden');
			isLogInInfoContainer.classList.add('flex');
			isLogInInfoContainer.classList.remove('hidden');
		}
	};
	fillUserData();
};
