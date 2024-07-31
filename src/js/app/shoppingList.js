import { debounce } from '../pageFunctions';
import { addExternalNotification } from './notifications';
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
	//prettier-ignore
	const shoppingListAddNew = document.querySelector('#sl-card-add-new');

	//prettier-ignore
	const shoppingListsContainer = document.querySelector('#shopping-lists-container');
	const searchingBox = document.querySelector(
		'.shopping-list-item__search-box'
	);

	const saveBtn = document.querySelector('.save');
	const closeBtn = document.querySelector('.arrow-left');

	const saveAddNewBtn = document.querySelector('.save');
	const productsInput = document.querySelector('.search-input');
	const resultsBox = document.querySelector('.search-results-box');
	const searchResultsError = document.querySelector('.search-results-error');
	//prettier-ignore
	const chosenProductsBox=document.querySelector('.shopping-list-to-save-box')
	const chosenProductsDeleteAllBtn = document.querySelector('.delete-all-btn');
	const chosenProductsInfoArea = document.querySelector('.info-area');
	//prettier-ignore
	const deleteAllShoppingListsBtn = document.querySelector('#sl-card-delete-all');
	let productsToSaveArr = [];
	let currentListId = null;

	const showShoppingList = listId => {
		window.scrollTo({
			top: 0,
			behavior: 'instant',
		});
		currentListId = listId;
		if (listId === null) {
			productsToSaveArr = [];
		} else {
			const shoppingListArr = getShoppingList();
			const selectedList = shoppingListArr.find(list => list.id === listId);
			productsToSaveArr = selectedList ? selectedList.products : [];
		}
		searchingBox.classList.add('active');
		displayChosenProducts();
	};

	const hideShoppingList = () => {
		currentListId = null;
		searchingBox.classList.remove('active');
		productsInput.value = '';
		clearResultsArea();
		chosenProductsDeleteAll();
		chosenProductsInfoArea.textContent = '';
	};

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
				serwerErrorsMsg();
				throw new Error('Network response was not ok ' + response.statusText);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
			serwerErrorsMsg();
		}
	};
	const serwerErrorsMsg = () => {
		searchResultsError.textContent = 'Somethning went wrong';
	};
	const findProducts = async () => {
		chosenProductsInfoArea.textContent = '';
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
				chosenProductsInfoArea.textContent = '';
				saveProductToArray({
					id: item.id,
					productName: productName,
					storeName: storeName,
					productPrice: productPrice,
					image: item.image,
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
			const productName = item.productName;
			const storeName = item.storeName;
			const productPrice = item.productPrice;
			const slID = `sl-${item.id}`;
			const chosenProduct = document.createElement('div');
			chosenProduct.classList.add('product-to-save');
			chosenProduct.id = slID;
			chosenProduct.innerHTML = `
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
            <div class="delete-btn ui-icon" data-id="${item.id}"></div>`;
			chosenProductsBox.prepend(chosenProduct);
		});
		const deleteBtn = document.querySelectorAll('.delete-btn');
		deleteBtn.forEach(btn => {
			btn.addEventListener('click', handleDeleteProduct);
		});
	};
	const handleDeleteProduct = e => {
		const productId = Number(e.target.getAttribute('data-id'));
		productsToSaveArr = productsToSaveArr.filter(
			product => product.id !== productId
		);
		displayChosenProducts();
	};
	const chosenProductsDeleteAll = () => {
		if (productsToSaveArr.length > 0) {
			chosenProductsInfoArea.textContent = 'All items had benn deleted.';
			productsToSaveArr.length = 0;
			displayChosenProducts();
		} else {
			chosenProductsInfoArea.textContent = 'List is already empty!';
		}
	};

	const getShoppingList = () => {
		const shoppingList = localStorage.getItem('shoppingLists');
		return shoppingList ? JSON.parse(shoppingList) : [];
	};
	const saveShoppingLists = listsArr => {
		localStorage.setItem('shoppingLists', JSON.stringify(listsArr));
	};
	const getNextListID = () => {
		const shoppingListsArr = getShoppingList();
		return shoppingListsArr.length
			? shoppingListsArr[shoppingListsArr.length - 1].id + 1
			: 1;
	};

	const saveNewList = () => {
		const shoppingListsArr = getShoppingList();
		const wasEmpty = shoppingListsArr.length === 0;
		const firstNotification = localStorage.getItem(
			'hasAddedshoppingListFirstNotification'
		);
		if (productsToSaveArr.length > 0) {
			if (currentListId === null) {
				const newListID = getNextListID();
				const newShoppingList = {
					id: newListID,
					products: [...productsToSaveArr],
				};
				chosenProductsInfoArea.textContent = 'Your list has been created.';
				shoppingListsArr.push(newShoppingList);
				productsToSaveArr.length = 0;
			} else {
				const listIndex = shoppingListsArr.findIndex(
					list => list.id === currentListId
				);
				if (listIndex !== -1) {
					shoppingListsArr[listIndex].products = [...productsToSaveArr];
					chosenProductsInfoArea.textContent = 'Your list has been edited.';
				}
			}
			saveShoppingLists(shoppingListsArr);
			createNewList();
			displayChosenProducts();
		} else {
			chosenProductsInfoArea.textContent = 'List is empty!';
		}
		if (wasEmpty && !firstNotification) {
			addExternalNotification(
				'Your first shopping list!',
				'Congratulations! You have successfully created your first shopping list.'
			);
			localStorage.setItem('hasAddedshoppingListFirstNotification', 'true');
		}
	};

	const createNewList = () => {
		const shoppingListArr = getShoppingList();
		shoppingListsContainer.textContent = '';
		shoppingListArr.forEach((item, index) => {
			const shoppingListItem = document.createElement('div');
			shoppingListItem.classList.add('shopping-list-item');
			shoppingListItem.id = `sl-card-${item.id}`;
			shoppingListItem.innerHTML = `
			
			<p class="shopping-list-item__title">LIST #${index + 1}</p>
			<div class="delete-btn ui-icon delete-list-btn" data-list-id="${item.id}"></div>
			
			`;
			const deleteBtn = shoppingListItem.querySelector('.delete-btn');
			deleteBtn.addEventListener('click', handleDeleteList);
			shoppingListItem.addEventListener('click', e => {
				if (!e.target.classList.contains('delete-btn')) {
					showShoppingList(item.id);
				}
			});
			shoppingListsContainer.appendChild(shoppingListItem);
		});
	};
	const handleDeleteList = e => {
		e.stopPropagation();
		const listId = Number(e.target.getAttribute('data-list-id'));
		let shoppingListsArr = getShoppingList();
		shoppingListsArr = shoppingListsArr.filter(list => list.id !== listId);
		saveShoppingLists(shoppingListsArr);
		loadExistingLists();
	};

	const loadExistingLists = () => {
		createNewList();
	};
	const deleteAllShoppingLists = () => {
		const shoppingListsArr = getShoppingList();
		shoppingListsArr.length = 0;
		saveShoppingLists(shoppingListsArr);
		loadExistingLists();
	};

	loadExistingLists();

	productsInput.addEventListener('focus', () => {
		productsInput.select();
	});
	shoppingListAddNew.addEventListener('click', () => showShoppingList(null));
	closeBtn.addEventListener('click', hideShoppingList);
	saveAddNewBtn.addEventListener('click', saveNewList);
	productsInput.addEventListener('input', debounce(findProducts, 300));
	chosenProductsDeleteAllBtn.addEventListener('click', chosenProductsDeleteAll);
	deleteAllShoppingListsBtn.addEventListener('click', deleteAllShoppingLists);
};
