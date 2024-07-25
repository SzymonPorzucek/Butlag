import { debounce } from "../pageFunctions";
export const initShopsAccordion = () => {
	const fadeShop = document.querySelector('.fade-shop');
	const shopsList = document.querySelector('.shops__box');
	const shopsItemsToHide = shopsList.querySelectorAll('div:nth-child(n+4)');
	const showShopsBtn = document.querySelector('.chevron-down-shop');

	const hideShops = () => {
		fadeShop.classList.add('half-visible');
		showShopsBtn.classList.remove('hidden');

		shopsItemsToHide.forEach(element => {
			element.style.display = 'none';
			element.classList.remove('visible');
			element.classList.add('shop-hide');
		});
	};

	const showShops = () => {
		fadeShop.classList.remove('half-visible');
		shopsItemsToHide.forEach((element, index) => {
			showShopsBtn.classList.add('hidden');
			element.style.display = 'flex';
			setTimeout(() => {
				element.classList.add('visible');
				element.classList.remove('shop-hide');
			}, 300 * index);
		});
	};

	const handleShops = () => {
		if (window.innerWidth < 768) {
			hideShops();
		} else {
			showShops();
		}
	};


	handleShops();

	window.addEventListener('resize', debounce(handleShops, 200));
	showShopsBtn.addEventListener('click', showShops);
};
