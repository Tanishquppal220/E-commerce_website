let cart = {};

function addToCart(
	itemName,
	itemImage,
	itemPrice,
	itemOriginalPrice,
	itemDiscount,
	itemQuantity
) {
	// Add item to cart
	if (!cart[itemName]) {
		cart[itemName] = {
			image: itemImage,
			price: itemPrice,
			originalPrice: itemOriginalPrice,
			discount: itemDiscount,
			quantity: itemQuantity,
		};
	} else {
		cart[itemName].quantity += itemQuantity;
	}

	// Update the UI
	const addToCartButton = document.querySelector(
		`button[onclick*="addToCart('${itemName}'"]`
	);
	const disabledDiv = addToCartButton.nextElementSibling;
	const itmCartButton = disabledDiv.querySelector(".itm_cart");

	addToCartButton.style.display = "none";
	disabledDiv.style.display = "block";
	itmCartButton.textContent = cart[itemName].quantity;

	// Save cart to localStorage
	localStorage.setItem("cart", JSON.stringify(cart));
}

function increaseQuantity(event) {
	const itemName = getItemNameFromEvent(event);
	if (cart[itemName]) {
		cart[itemName].quantity += 1;
		updateCartUI(itemName);
		localStorage.setItem("cart", JSON.stringify(cart));
	}
}

function decreaseQuantity(event) {
	const itemName = getItemNameFromEvent(event);
	if (cart[itemName]) {
		if (cart[itemName].quantity > 1) {
			cart[itemName].quantity -= 1;
		} else {
			delete cart[itemName];
			const addToCartButton = document.querySelector(
				`button[onclick*="addToCart('${itemName}'"]`
			);
			const disabledDiv = addToCartButton.nextElementSibling;
			addToCartButton.style.display = "block";
			disabledDiv.style.display = "none";
		}
		updateCartUI(itemName);
		localStorage.setItem("cart", JSON.stringify(cart));
	}
}

function updateCartUI(itemName) {
	const addToCartButton = document.querySelector(
		`button[onclick*="addToCart('${itemName}'"]`
	);
	const disabledDiv = addToCartButton.nextElementSibling;
	const itmCartButton = disabledDiv.querySelector(".itm_cart");

	if (cart[itemName]) {
		itmCartButton.textContent = cart[itemName].quantity;
	} else {
		addToCartButton.style.display = "block";
		disabledDiv.style.display = "none";
		itmCartButton.textContent = "";
	}
}

function getItemNameFromEvent(event) {
	const button = event.target;
	const disabledDiv = button.closest(".disabled");
	const addToCartButton = disabledDiv.previousElementSibling;
	const onclickAttr = addToCartButton.getAttribute("onclick");
	const itemName = onclickAttr.match(/addToCart\('([^']+)'/)[1];
	return itemName;
}

function loadCart() {
	const storedCart = localStorage.getItem("cart");
	if (storedCart) {
		cart = JSON.parse(storedCart);
		for (const itemName in cart) {
			updateCartUI(itemName);
		}
	}

	// Populate cart items in cart.html
	const cartContainer = document.getElementById("cart-container");
	const totalAmountElement = document.getElementById("total-amount");
	let totalAmount = 0;

	for (const itemName in cart) {
		const item = cart[itemName];
		const cartItemDiv = document.createElement("div");
		cartItemDiv.className = "cart-item";
		cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${itemName}">
            <div class="title">${itemName}</div>
            <div class="price-details">
                <div class="msrp">MSRP: ₹${item.originalPrice}</div>
                <div class="offer-price">Price: ₹${item.price}</div>
                <div class="discount">Discount: ${item.discount}%</div>
            </div>
            <div class="quantity">Quantity: ${item.quantity}</div>
            <button class="remove-btn" onclick="removeFromCart('${itemName}')">Remove</button>
        `;
		cartContainer.appendChild(cartItemDiv);
		totalAmount += item.price * item.quantity;
	}

	totalAmountElement.textContent = `Total Amount: ₹${totalAmount}`;
}

function removeFromCart(itemName) {
	delete cart[itemName];
	localStorage.setItem("cart", JSON.stringify(cart));
	loadCart();
}

// Call loadCart when the page loads
window.onload = loadCart;
