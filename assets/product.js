/*
 * Student Name: Paul McJannet
 * Student ID: 41171723
 * Course: CST8117 - Cross-Platform Web Design
 * Semester: Fall 2024
 * Assignment: 4 - Online Store
 * Date Submitted: Nov 24, 2024
 */

// get all html elements that will need to be used for the product page
const productQuantity = document.getElementById("quantity");
const productAddToCart = document.getElementById("add-to-cart");
let quantity = 1; // default on webpage

productQuantity.addEventListener("change", (e) => {
	quantity = e.target.value;
});

productAddToCart.addEventListener("click", (e) => {
	if (quantity === 1) {
		window.alert("1 pack added to your cart");
	} else {
		window.alert(`${quantity} packs added to your cart`);
	}
});
