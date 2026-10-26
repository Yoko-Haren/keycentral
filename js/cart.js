// Cart Data (Sample)
const cartItems = [
    {
        id: 1,
        name: "Microsoft Office 365",
        image: "../images/microsoft.png",
        description: "Lifetime License • Instant Delivery",
        price: 89.99,
        quantity: 1
    },
    {
        id: 2,
        name: "Adobe Photoshop CC",
        image: "../images/adobePhotoshop.png",
        description: "Annual Subscription • All Platforms",
        price: 199.99,
        quantity: 1
    },
    {
        id: 3,
        name: "Canva Pro",
        image: "../images/canva.svg",
        description: "Lifetime License • Web-Based",
        price: 149.99,
        quantity: 1
    }
];

// State Management
let cart = [...cartItems];

// DOM Elements
const cartItemsContainer = document.getElementById('cart-items-container');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const toastContainer = document.getElementById('toast-container');
const cartBadge = document.querySelector('.nav-badge');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderCart();
    updateCartSummary();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Continue shopping
    document.querySelector('.continue-shopping').addEventListener('click', function(e) {
        e.preventDefault();
        showToast('Continue Shopping', 'Redirecting to product catalog...');
    });

    // Checkout button
    document.querySelector('.checkout-btn').addEventListener('click', function() {
        if (cart.length === 0) {
            showToast('Empty Cart', 'Please add items to your cart before checkout.');
            return;
        }
        showToast('Proceed to Checkout', 'Redirecting to secure checkout...');
    });
}

// Render Cart Items
function renderCart() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <h2 class="empty-title">Your cart is empty</h2>
                <p class="empty-description">Browse our software catalog and add license keys to your cart.</p>
                <a href="dashboard.html" class="browse-btn">Browse Products</a>
            </div>
        `;
        return;
    }

    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-description">${item.description}</div>
            </div>
            <div class="quantity-selector">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <button class="cart-item-remove" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Add event listeners for quantity buttons and remove
    document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.dataset.id);
            updateQuantity(itemId, -1);
        });
    });

    document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.dataset.id);
            updateQuantity(itemId, 1);
        });
    });

    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.dataset.id);
            removeFromCart(itemId);
        });
    });
}

// Update Cart Summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;

    // Update cart badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartBadge) {
        cartBadge.textContent = totalItems;
    }
}

// Update Item Quantity
function updateQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (!item) return;

    const newQuantity = item.quantity + change;
    
    if (newQuantity < 1) {
        removeFromCart(itemId);
        return;
    }

    item.quantity = newQuantity;
    renderCart();
    updateCartSummary();
    showToast('Quantity Updated', `${item.name} quantity updated to ${newQuantity}`);
}

// Remove from Cart
function removeFromCart(itemId) {
    const item = cart.find(item => item.id === itemId);
    if (!item) return;

    cart = cart.filter(item => item.id !== itemId);
    renderCart();
    updateCartSummary();
    showToast('Removed from Cart', `${item.name} has been removed from your cart`);
}

// Toast Notifications
function showToast(title, message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-check"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 4000);
}