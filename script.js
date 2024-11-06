const products = [
	{
		title: "Tennis Racket",
		imageUrl:
			"https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		msrp: 8500,
		price: 7500,
		discount: 10,
		description:
			"High-quality tennis racket for professional players. Lightweight and durable.",
		rating: 4.5
	},
	{
		title: "Football",
		imageUrl:
			"https://images.unsplash.com/photo-1486286701208-1d58e9338013?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		msrp: 4000,
		price: 3500,
		discount: 5,
		description:
			"Official size and weight football. Perfect for matches and training.",
		rating: 4.0
	},
	{
		title: "Basketball",
		imageUrl:
			"https://images.unsplash.com/photo-1608270310720-1ab85574b779?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFza2V0YmFsbCUyMGJhbGx8ZW58MHx8MHx8fDA%3D",
		msrp: 5000,
		price: 4500,
		discount: 15,
		description:
			"Durable basketball for indoor and outdoor play. Excellent grip and control.",
		rating: 3.2
	},
	{
		title: "Cricket Bat",
		imageUrl:
			"https://cdnmedia.dsc-cricket.com/media/catalog/product/cache/6d9f53a3f26f3a62c1c1c9add7c6ad94/d/s/dsc-spliit-ply-ed-english-willow-cricket-bat-au-david-2.jpg",
		msrp: 11000,
		price: 9000,
		discount: 20,
		description:
			"Professional grade cricket bat. Made from high-quality willow for superior performance.",
		rating: 4.8
	},
	{
		title: "Volleyball",
		imageUrl:
			"https://images.unsplash.com/photo-1689786430806-3596cfd788b3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHZvbGxleWJhbGwlMjBiYWxsfGVufDB8fDB8fHww",
		msrp: 3000,
		price: 2500,
		discount: 17,
		description:
			"High-quality volleyball for professional and recreational play. Durable and lightweight.",
		rating: 4.1
	},
	{
		title: "Baseball Glove",
		imageUrl:
			"https://images.unsplash.com/photo-1590502160462-58b41354f588?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFzZWJhbGwlMjBnbG92ZXxlbnwwfHwwfHx8MA%3D%3D",
		msrp: 6000,
		price: 5000,
		discount: 17,
		description:
			"Professional-grade baseball glove. Made from high-quality leather for superior performance.",
		rating: 4.3
	},
	{
		title: "Hockey Stick",
		imageUrl:
			"https://plus.unsplash.com/premium_photo-1719318341300-2951fd01bc66?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		msrp: 7000,
		price: 6000,
		discount: 14,
		description:
			"High-performance hockey stick for professional players. Lightweight and durable.",
		rating: 4.6
	},
	{
		title: "Golf Club",
		imageUrl:
			"https://images.unsplash.com/photo-1530028828-25e8270793c5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z29sZiUyMGNsdWJ8ZW58MHx8MHx8fDA%3D",
		msrp: 15000,
		price: 13000,
		discount: 13,
		description:
			"Premium golf club for professional golfers. Made from high-quality materials for superior performance.",
		rating: 4.7
	},
];

function addToCart(title, imageUrl, price, msrp, discount, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.title === title);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity += quantity;
    } else {
        cart.push({ title, imageUrl, price, msrp, discount, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${quantity} x ${title} added to cart!`);
}


function createProductHTML(product) {
    const titleParts = product.title.split(' ');
    const firstTag = titleParts[0];
    const secondTag = titleParts[1] || '';
    const ratingStars = Array.from({ length: 5 }, (_, i) => i < Math.floor(product.rating) ? '★' : '☆').join('');
    return `
        <img src="${product.imageUrl}" alt="${product.title}" class="pic">
        <div class="tags">
            <button class="list-item">${firstTag}</button>
            ${secondTag ? `<button class="list-item">${secondTag}</button>` : ''}
            <button class="list-item msrp">MSRP: ₹${product.msrp}</button>
            <button class="list-item offer-price">Price: ₹${product.price}</button>
            <button class="list-item discount">Discount: ${product.discount}%</button>
        </div>
        <div class="title">${product.title}</div>
        <p>${product.description}</p>
        <div class="rating">${ratingStars}</div>
        <input type="number" min="1" value="1" id="quantity-${product.title.replace(/\s+/g, '-')}">
        <button class="read" onclick="addToCart('${product.title}', '${product.imageUrl}', ${product.price}, ${product.msrp}, ${product.discount}, parseInt(document.getElementById('quantity-${product.title.replace(/\s+/g, '-')}').value))">Add to Cart</button>
    `;
}

function renderProducts() {
    const productsSection = document.getElementById('products-section');
    products.forEach(product => {
        const productContainer = document.createElement('div');
        productContainer.className = 'container';
        productContainer.innerHTML = createProductHTML(product);
        productsSection.appendChild(productContainer);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    checkCart();
});
