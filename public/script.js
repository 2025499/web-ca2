// Retrieve cart data from browser localStorage
function getCart() {
    let cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

// Save cart array to localStorage as JSON string
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Update the cart item count displayed in the navigation bar
function updateCartCount() {
    let cart = getCart();
    let count = cart.reduce((total, item) => total + item.quantity, 0);
    let el = document.getElementById("cart-count");
    if (el) el.innerText = count;
}

// Add a product to the cart by product ID
function addToCart(productId) {
    let cart = getCart();

    // Product catalog with ID, name, and price
    const products = [
        { id: 1, name: "Elegant White Wrap Dress", price: 39.99 },
        { id: 2, name: "Vintage Blue Linen Dress", price: 49.99 },
        { id: 3, name: "Off-Shoulder Satin Gown", price: 59.99 },
        { id: 4, name: "Sparkle Glitter Wedding Heels", price: 49.99 },
        { id: 5, name: "Crystal-Strap Pointed Heels", price: 54.99 },
        { id: 6, name: "Pearl-Embellished Lace Heels", price: 59.99 },
        { id: 7, name: "Beige Linen Wide-Leg Trousers", price: 29.99 },
        { id: 8, name: "Taupe Pleated Linen Trousers", price: 39.99 },
        { id: 9, name: "White Straight-Leg Denim Jeans", price: 49.99 }
    ];

    // Find the selected product by ID
    let product = products.find(p => p.id == productId);
    // Check if product already exists in cart
    let item = cart.find(i => i.id == productId);

    if (item) {
        // Increase quantity if item already in cart
        item.quantity++;
    } else {
        // Add new item to cart if not present
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    // Save updated cart and refresh display
    saveCart(cart);
    updateCartCount();

    // ✅ FIXED: Replace alert with in-page message (teacher requirement)
    let msg = document.createElement("div");
    msg.innerText = "✅ Added to cart successfully!";
    msg.style.position = "fixed";
    msg.style.bottom = "20px";
    msg.style.right = "20px";
    msg.style.background = "#28a745";
    msg.style.color = "white";
    msg.style.padding = "12px 20px";
    msg.style.borderRadius = "8px";
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 2000);
}

// Remove an item from the cart by product ID
function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id != id);
    saveCart(cart);
    location.reload();
}

// Update cart count when the page finishes loading
window.onload = function () {
    updateCartCount();
};