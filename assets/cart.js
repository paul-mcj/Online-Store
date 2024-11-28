/*
 * Student Name: Paul McJannet
 * Student ID: 41171723
 * Course: CST8117 - Cross-Platform Web Design
 * Semester: Fall 2024
 * Assignment: 4 - Online Store
 * Date Submitted: Nov 24, 2024
 */

// get all html elements that will need to be used for the cart page
const cartDiceLess = document.getElementById("dice-less");
const cartDiceMore = document.getElementById("dice-more");
const cartDiceAmount = document.getElementById("dice-amount");
const cartDiceTotal = document.getElementById("dice-total");

const cartPackLess = document.getElementById("pack-less");
const cartPackMore = document.getElementById("pack-more");
const cartPackAmount = document.getElementById("pack-amount");
const cartPackTotal = document.getElementById("pack-total");

const cartD20Less = document.getElementById("d20-less");
const cartD20More = document.getElementById("d20-more");
const cartD20Amount = document.getElementById("d20-amount");
const cartD20Total = document.getElementById("d20-total");

const cartRemoveDice = document.getElementById("remove-dice");
const cartRemovePack = document.getElementById("remove-pack");
const cartRemoveD20 = document.getElementById("remove-d20");

const cartShippingOption = document.getElementById("shipping-option");
const cartSubtotal = document.getElementById("subtotal");
const cartShippingCost = document.getElementById("shipping-cost");
const cartTax = document.getElementById("tax");
const cartGrandTotal = document.getElementById("grand-total");
const cartCheckoutButton = document.getElementById("checkout-button");

const cartTotalItemsInCart = document.getElementById("total-items-in-cart");

// Helper Functions

// update total for each item depending on number of items
const updateTotal = (totalElement, numberOfItems, pricePerItem) => {
	// round to two digits and return
	totalElement.textContent = `\$${(numberOfItems * pricePerItem).toFixed(
		2
	)}`;
};

// update all order summary amounts
const calculateOrderSummary = (
	amountChange,
	pricePerItem,
	totalElement,
	numberOfItems
) => {
	// if totalElement is passed in, we know to remove all number of items (as opposed to increasing or decreasing by just 1). if so, we need to get the subtotal of all specific items (float)
	let currentItemTotal =
		totalElement && parseFloat(totalElement.textContent.slice(1));

	// get the current subtotal of order summary (float)
	let currentCartSubtotal = parseFloat(cartSubtotal.textContent.slice(1));

	// get the current amount for shipping option selected in order summary (float)
	let currentCartShippingOption =
		cartShippingOption.value === "standard" ? 0 : 4.5;

	// get the current amount of tax in order summary (float)
	let currentCartTax = parseFloat(cartTax.textContent.slice(1));

	// get current grand total in order summary (float)
	let currentCartGrandtotal = parseFloat(
		cartGrandTotal.textContent.slice(1)
	);

	// get current total number of items in cart (int)
	let currentCartTotalItemsInCart = parseFloat(
		cartTotalItemsInCart.textContent
	);

	// update order summary subtotal value first (float) and update total number of items in cart
	if (amountChange === "less") {
		currentCartSubtotal -= pricePerItem;
		currentCartTotalItemsInCart--;
	} else if (amountChange === "more") {
		currentCartSubtotal += pricePerItem;
		currentCartTotalItemsInCart++;
	}
	// remove all items
	else {
		currentCartSubtotal -= currentItemTotal;
		currentCartTotalItemsInCart -= numberOfItems;
	}

	// update subtotal in html
	cartSubtotal.textContent = `\$${currentCartSubtotal.toFixed(2)}`;

	// then update tax value (float)
	currentCartTax = (currentCartSubtotal + currentCartShippingOption) * 0.13;

	// update tax in html
	cartTax.textContent = `\$${currentCartTax.toFixed(2)}`;

	// update grand total value (float)
	currentCartGrandtotal =
		currentCartSubtotal + currentCartShippingOption + currentCartTax;

	// update grand total in html
	cartGrandTotal.textContent = `\$${currentCartGrandtotal.toFixed(2)}`;

	// update number of items in cart in html
	cartTotalItemsInCart.textContent = currentCartTotalItemsInCart;
};

// update number of items in the cart depending on user clicking less or more buttons, or if removing all items completely
const updateAmount = (amountElement, totalElement, amountChange, remove) => {
	// convert amount to integer
	let numberOfItems = parseInt(amountElement.textContent);

	// remove all items of specific product
	if (remove) {
		// update all order summary values and html text content
		calculateOrderSummary(null, null, totalElement, numberOfItems);
	}

	// else check if user tries to have less than zero items in cart
	else if (numberOfItems < 1 && amountChange === "less" && !remove) {
		window.alert(
			"Can't have less than zero items. Please remove item from cart instead by clicking the trash icon."
		);
	} else {
		// increase or decrease in number of items
		amountChange === "less" ? (numberOfItems -= 1) : (numberOfItems += 1);

		// remove the $ symbol from the <p> element and convert to float to get the price per item by DOM walking (float)
		let pricePerItem = parseFloat(
			totalElement.parentElement.previousElementSibling.previousElementSibling.lastElementChild.textContent.slice(
				1
			)
		);

		// update the total price for the item based on the amount of items and the price for each item
		updateTotal(totalElement, numberOfItems, pricePerItem);

		// update the amount of items by 1 less
		amountElement.textContent = numberOfItems;

		// update all order summary values and html text content
		calculateOrderSummary(amountChange, pricePerItem);
	}
};

// remove item from cart
const removeItem = (itemElement) => {
	// DOM walk to remove element from html
	itemElement.parentElement.parentElement.classList.add("hide-terms");

	// Get name of item (used to return name for alert message)
	let itemName;

	// need to remove all items and update values for order summary
	if (itemElement.id === "remove-dice") {
		itemName = itemElement.previousElementSibling.textContent;
		updateAmount(cartDiceAmount, cartDiceTotal, "less", true);
	}
	if (itemElement.id === "remove-d20") {
		itemName = itemElement.previousElementSibling.textContent;
		updateAmount(cartD20Amount, cartD20Total, "less", true);
	}
	if (itemElement.id === "remove-pack") {
		// there's a glitch on my local machine causing this text to appear with extra whitespace, so I've included some logic just in case to output a cleaner message for this item
		itemName = "Magic: the Gathering Booster Pack";
		updateAmount(cartPackAmount, cartPackTotal, "less", true);
	}

	// alert user that specific item was removed from cart
	window.alert(`${itemName} have been removed from your cart`);
};

// Event Listeners

cartDiceLess.addEventListener("click", (e) => {
	updateAmount(cartDiceAmount, cartDiceTotal, "less");
});

cartDiceMore.addEventListener("click", (e) => {
	updateAmount(cartDiceAmount, cartDiceTotal, "more");
});

cartPackLess.addEventListener("click", (e) => {
	updateAmount(cartPackAmount, cartPackTotal, "less");
});

cartPackMore.addEventListener("click", (e) => {
	updateAmount(cartPackAmount, cartPackTotal, "more");
});

cartD20Less.addEventListener("click", (e) => {
	updateAmount(cartD20Amount, cartD20Total, "less");
});

cartD20More.addEventListener("click", (e) => {
	updateAmount(cartD20Amount, cartD20Total, "more");
});

cartRemoveDice.addEventListener("click", (e) => {
	removeItem(cartRemoveDice);
});

cartRemovePack.addEventListener("click", (e) => {
	removeItem(cartRemovePack);
});

cartRemoveD20.addEventListener("click", (e) => {
	removeItem(cartRemoveD20);
});

// update shipping in order summary
cartShippingOption.addEventListener("click", (e) => {
	// shipping cost is either 0 or 4.5, depending on option selected
	let currentCartShippingOption = e.target.value === "standard" ? 0 : 4.5;

	// update shipping in html
	cartShippingCost.textContent = `\$${currentCartShippingOption.toFixed(2)}`;

	// get the current subtotal of order summary (float)
	let currentCartSubtotal = parseFloat(cartSubtotal.textContent.slice(1));

	// then update tax value (float)
	let currentCartTax =
		(currentCartSubtotal + currentCartShippingOption) * 0.13;

	// update tax in html
	cartTax.textContent = `\$${currentCartTax.toFixed(2)}`;

	// update grand total value (float)
	let currentCartGrandtotal =
		currentCartSubtotal + currentCartShippingOption + currentCartTax;

	// update grand total in html
	cartGrandTotal.textContent = `\$${currentCartGrandtotal.toFixed(2)}`;
});

// let user know their order has been placed and show the total
cartCheckoutButton.addEventListener("click", (e) => {
	let total = cartGrandTotal.textContent;
	window.alert(`Thank-you for your purchase! \nYour total is: ${total}`);
});
