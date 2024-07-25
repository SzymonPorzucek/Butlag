import { initTheme } from '../theme.js';
import { initNav } from './nav.js';
import { initNotifications } from './notifications.js';
import { initShoppingList } from './shoppingList.js';
document.addEventListener('DOMContentLoaded', () => {
	initTheme();
	initNav()
	initNotifications()
	initShoppingList()

	

});
