export const initNotifications = () => {
	const topbar = document.querySelector('.topbar');
	const overlay = document.querySelector('.overlay');
	const notificationsBox = document.querySelector('.notifications');
	const notificationsBtn = document.querySelector('.topbar__bell');
	const notificationsIndicator = document.querySelector(
		'.topbar__bell-indicator'
	);
	const navMobile = document.querySelector('.nav-mobile');

	let startX;
	let endX;
	let startY;
	let endY;
	let currentNotificationsPosition = 0;
	const showNotifications = () => {
		if (navMobile.classList.contains('nav-mobile-active')) {
			return;
		}
		notificationsBox.classList.add('notifications-active');
		notificationsBox.style.transform = 'translateX(-100%)';
		overlay.classList.add('notifications-active');
		currentNotificationsPosition = -100;
		topbar.classList.add('lock-scroll');
		document.body.style.overflow = 'hidden';
	};

	const closeNotifications = () => {
		notificationsBox.classList.remove('notifications-active');
		notificationsBox.style.transform = 'translateX(0%)';
		overlay.classList.remove('notifications-active');
		currentNotificationsPosition = 0;
		topbar.classList.remove('lock-scroll');
		document.body.style.overflow = 'visible';
	};
	const handleNotifications = () => {
		if (notificationsBox.classList.contains('notifications-active')) {
			closeNotifications();
		} else {
			showNotifications();
		}
	};
	const handleClickOutside = e => {
		if (
			notificationsBox.classList.contains('notifications-active') &&
			!notificationsBox.contains(e.target) &&
			!notificationsBtn.contains(e.target)
		) {
			closeNotifications();
		}
	};

	const handleTouchStart = e => {
		startX = e.touches[0].clientX;
		startY = e.touches[0].clientY;
		notificationsBox.style.transition = 'none';
	};
	const handleTouchMove = e => {
		endX = e.touches[0].clientX;
		endY = e.touches[0].clientY;
		const diffX = Math.abs(endX - startX);
		const diffY = Math.abs(endY - startY);
		let translateX = Math.min(
			0,
			currentNotificationsPosition +
				((endX - startX) / notificationsBox.offsetWidth) * 100
		);
		if (diffX > diffY) {
			if (translateX < -100) {
				translateX = -100;
			}
			notificationsBox.style.transform = `translateX(${translateX}%)`;
		}
	};

	const handleTouchEnd = () => {
		const translateX =
			currentNotificationsPosition +
			((endX - startX) / notificationsBox.offsetWidth) * 100;

		notificationsBox.style.transition = 'transform 0.5s ease';
		if (translateX < -50) {
			showNotifications();
		} else {
			closeNotifications();
		}
	};

	const createNotificationItem = (
		id,
		title,
		content,
		timestamp,
		read = false
	) => {
		const notificationItem = document.createElement('div');
		notificationItem.className = 'notifications__item';
		notificationItem.id = `${id}`;
		const timeAgo = calculateTimeAgo(timestamp);
		notificationItem.innerHTML = `

		<p class="notifications__title ${
			read ? 'notifications-seen' : ''
		}">${title}<span class="notifications-new ${
			read ? 'hidden' : ''
		}">new</span></p>
        <p class="notifications__content">${content}</p>
        <p class="notifications__timestamp" data-timestamp="${timestamp}">${timeAgo}</p>`;

		notificationItem.addEventListener('click', () => markAsRead(id));
		return notificationItem;
	};

	const calculateTimeAgo = timestamp => {
		const now = new Date();
		const notificationTime = new Date(timestamp);
		const diffInSec = Math.floor((now - notificationTime) / 1000);
		const diffInMins = Math.floor(diffInSec / 60);
		const diffInHrs = Math.floor(diffInMins / 60);
		const diffInDays = Math.floor(diffInHrs / 24);
		const diffInYears = Math.floor(diffInDays / 365);

		if (diffInSec < 60) return 'Just now';
		if (diffInMins < 60)
			return diffInMins === 1 ? '1 min ago' : `${diffInMins} mins ago`;
		if (diffInHrs < 24)
			return diffInHrs === 1 ? '1 hr ago' : `${diffInHrs} hrs ago`;
		if (diffInDays < 365)
			return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
		return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`;
	};

	const addNotification = notification => {
		const { id, title, content, timestamp, read = false } = notification;
		let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
		const existingNotification = notifications.find(notif => notif.id === id);
		if (existingNotification) return;
		const notificationItem = createNotificationItem(
			id,
			title,
			content,
			timestamp,
			read
		);
		notificationsBox.prepend(notificationItem);
		saveNotificationsToStorage(notification);
	};

	const saveNotificationsToStorage = notification => {
		let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
		notifications.push(notification);
		localStorage.setItem('notifications', JSON.stringify(notifications));
		triggerStorageEvent('notifications');
	};
	const fetchNotifications = () => {
		const notifications =
			JSON.parse(localStorage.getItem('notifications')) || [];
		notificationsBox.innerHTML = '';
		notifications.forEach(notification => {
			const { id, title, content, timestamp, read = false } = notification;
			const notificationItem = createNotificationItem(
				id,
				title,
				content,
				timestamp,
				read
			);
			notificationsBox.prepend(notificationItem);
		});
		updateNotificationsBtn();
	};

	const markAsRead = id => {
		const notificationItem = document.getElementById(id);
		const notificationTitle = notificationItem.querySelector(
			'.notifications__title'
		);
		const notificationNewMark =
			notificationItem.querySelector('.notifications-new');
		if (
			notificationItem &&
			!notificationTitle.classList.contains('notifications-seen')
		) {
			notificationItem.style.cursor = 'default';
			notificationTitle.classList.add('notifications-seen');
			notificationNewMark.style.display = 'none';
			updateNotificationInStorage(id, true);
			updateNotificationsBtn();
		}
	};
	const updateNotificationInStorage = (id, readStatus) => {
		let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
		notifications = notifications.map(notification => {
			if (notification.id === id) {
				return { ...notification, read: readStatus };
			}
			return notification;
		});
		localStorage.setItem('notifications', JSON.stringify(notifications));
		triggerStorageEvent('notifications');
	};

	const generateUniqueID = () => {
		return `notification-${Date.now()}-${Math.floor(Math.random() * 10)}`;
	};

	const updateTimes = () => {
		const timestamps = document.querySelectorAll('.notifications__timestamp');
		timestamps.forEach(timestampItems => {
			const timestamp = timestampItems.getAttribute('data-timestamp');
			timestampItems.innerText = calculateTimeAgo(timestamp);
		});
	};

	if (!localStorage.getItem('hasAddedInitialNotification')) {
		const firstNotification = {
			id: generateUniqueID(),
			title: 'Welcome',
			content: 'We are glad you are using this app. Have fun!',
			timestamp: new Date().toISOString(),
		};
		addNotification(firstNotification);
		localStorage.setItem('hasAddedInitialNotification', 'true');
	}
	const handleStorageChange = event => {
		if (event.key === 'notifications') {
			notificationsBox.innerHTML = '';
			fetchNotifications();
		}
	};
	const checkForNewNotifications = () => {
		const newNotifications = document.querySelectorAll(
			'.notifications-new:not(.hidden)'
		);
		return newNotifications.length > 0;
	};
	const updateNotificationsBtn = () => {
		if (checkForNewNotifications()) {
			notificationsIndicator.classList.add('has-new');
			notificationsBtn.classList.add('has-new');
		} else {
			notificationsIndicator.classList.remove('has-new');
			notificationsBtn.classList.remove('has-new');
		}
	};

	setInterval(updateTimes, 60000);
	fetchNotifications();
	notificationsBox.addEventListener('touchstart', handleTouchStart);
	notificationsBox.addEventListener('touchmove', handleTouchMove);
	notificationsBox.addEventListener('touchend', handleTouchEnd);
	notificationsBtn.addEventListener('click', handleNotifications);
	window.addEventListener('storage', handleStorageChange);
	document.addEventListener('click', handleClickOutside);
};
export const addExternalNotification = (title, content) => {
	const generateUniqueID = () => {
		return `notification-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
	};
	const newNotification = {
		id: generateUniqueID(),
		title: title,
		content: content,
		timestamp: new Date().toISOString(),
		read: false,
	};
	let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
	notifications.push(newNotification);
	localStorage.setItem('notifications', JSON.stringify(notifications));
	triggerStorageEvent('notifications');
};

const triggerStorageEvent = key => {
	const event = new Event('storage');
	event.key = key;
	window.dispatchEvent(event);
};
