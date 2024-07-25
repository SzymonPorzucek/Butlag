// key e6SAjab3AwEfwTlzUo6C2i8aZ7GpIma71AbQJPNe
import { debounce } from '../pageFunctions';
export const initShoppingList = () => {
	const API_KEY = 'Bearer e6SAjab3AwEfwTlzUo6C2i8aZ7GpIma71AbQJPNe';
	const ALLOWED_STORES = [
		'MENY_NO',
		'KIWI',
		'REMA_1000',
		'SPAR_NO',
		'EUROPRIS_NO',
		'COOP_NO',
		'JOKER_NO',
		null,
	];
	const productsInput = document.querySelector('.search-input');
	const resultsBox = document.querySelector('.search-results-box');
	const searchResultsError = document.querySelector('.search-results-error');
	//prettier-ignore
	const chosenProductsBox=document.querySelector('.shopping-list-to-save-box')
	let productsToSaveArr = [];
	const fetchDataWithOptions = async url => {
		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: API_KEY,
				},
			});

			if (!response.ok) {
				throw new Error('Network response was not ok ' + response.statusText);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	};
	const findProducts = async () => {
		const query = productsInput.value.toLowerCase();
		if (query.length < 3) {
			clearResultsArea();
			return;
		}
		const [nameResults, vendorResults, brandResults] = await Promise.all([
			fetchDataWithOptions(
				`https://kassal.app/api/v1/products?search=${query}&size=15`
			),
			fetchDataWithOptions(
				`https://kassal.app/api/v1/products?vendor=${query}&size=15`
			),
			fetchDataWithOptions(
				`https://kassal.app/api/v1/products?brand=${query}&size=15`
			),
		]);
		const combinedResults = [
			...nameResults.data,
			...vendorResults.data,
			...brandResults.data,
		];
		const uniqueResults = combinedResults.reduce((acc, product) => {
			if (!acc.find(p => p.id === product.id)) {
				acc.push(product);
			}
			return acc;
		}, []);
		if (uniqueResults.length > 0) {
			displayResults(uniqueResults);
		} else {
			resultsBox.textContent = '';
			setTimeout(() => {
				searchResultsError.textContent = 'No Results';
			}, 200);
		}
	};

	const displayResults = data => {
		const filteredDataArr = data.filter(item => {
			const storeCode = item.store ? item.store.code : null;
			return ALLOWED_STORES.includes(storeCode);
		});

		showProductsDropdown(filteredDataArr);
	};
	const showProductsDropdown = productsArr => {
		clearResultsArea();
		productsArr.forEach((item, index) => {
			const productName = item.name || 'Unknown';
			const storeName =
				item.store && item.store.name ? item.store.name : 'Unknown';
			const productPrice =
				item.current_price !== null ? `${item.current_price} ,-` : 'N/A';
			const product = document.createElement('div');
			const rID = `r-${item.id}`;
			product.classList.add('result');
			product.id = rID;
			product.innerHTML = `
				<div class="image-box">
					<img class="result-img" src="${item.image}" alt="Product Image">
				</div>
                <div class="result-info">
                    <p class="result-info-name">${productName}</p>
                	<div>
                         <p class="result-info-store">Store: ${storeName}</p>
                         <p class="result-info-price">${productPrice}</p>
                    </div>
                </div>
			`;
			resultsBox.appendChild(product);
			product.style.animationDelay = `${index * 0.1}s`;
			product.addEventListener('click', () => {
				saveProductToArray({
					id: item.id,
					productName: productName,
					storeName: storeName,
					productPrice: productPrice,
				});
			});
		});
	};
	const clearResultsArea = () => {
		resultsBox.textContent = '';
		searchResultsError.textContent = '';
	};
	const saveProductToArray = product => {
		if (!productsToSaveArr.some(p => p.id === product.id))
			productsToSaveArr.push(product);
		displayChosenProducts();
	};
	const displayChosenProducts = () => {
		chosenProductsBox.textContent = '';
		productsToSaveArr.forEach(item => {
			console.log(item);
		});
	};

	productsInput.addEventListener('input', debounce(findProducts, 300));
};
