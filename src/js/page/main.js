import { initBurgerMenu } from './burgerMenu.js';
import { initLangList } from './langList.js';
import { initTheme } from '../theme.js';
import { initShopsAccordion } from './shopsAccordion.js';
import { initSlider } from './slider.js';
import { initPageFunctions } from '../pageFunctions.js';
import { initNewsletter } from './newsletter.js';
import { initContact } from './contact.js';
document.addEventListener('DOMContentLoaded', () => {
	initPageFunctions();
	initLangList();
	initBurgerMenu();
	initTheme();
	initShopsAccordion();
	initSlider();
	initNewsletter();
	initContact();
});
