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
