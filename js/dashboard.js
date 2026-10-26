// Product Data
const products = [
    {
        id: 1,
        name: "Microsoft Office 365",
        image: "../images/microsoft.png",
        features: ["Lifetime License", "Instant Delivery", "Windows/Mac"],
        rating: 4.8,
        reviews: 1247,
        price: 89.99,
        originalPrice: 129.99,
        badge: "Bestseller",
        stock: "In Stock"
    },
    {
        id: 2,
        name: "Adobe Photoshop CC",
        image: "../images/adobePhotoshop.png",
        features: ["Annual Subscription", "Instant Delivery", "All Platforms"],
        rating: 4.9,
        reviews: 892,
        price: 199.99,
        originalPrice: null,
        badge: "Popular",
        stock: "Low Stock"
    },
    {
        id: 3,
        name: "Canva Pro",
        image: "../images/canva.svg",
        features: ["Lifetime License", "Instant Delivery", "Web-Based"],
        rating: 4.7,
        reviews: 567,
        price: 149.99,
        originalPrice: 199.99,
        badge: "Sale",
        stock: "In Stock"
    },
    {
        id: 4,
        name: "Adobe Premiere Pro",
        image: "../images/adobePremiere.png",
        features: ["Annual Subscription", "Instant Delivery", "All Platforms"],
        rating: 4.8,
        reviews: 734,
        price: 239.99,
        originalPrice: null,
        badge: "Professional",
        stock: "In Stock"
    },
    {
        id: 5,
        name: "Notion",
        image: "../images/notion.svg",
        features: ["Lifetime License", "Instant Delivery", "Mac Only"],
        rating: 4.9,
        reviews: 423,
        price: 299.99,
        originalPrice: 399.99,
        badge: "Exclusive",
        stock: "In Stock"
    },
    {
        id: 6,
        name: "Adobe Acrobat Pro",
        image: "../images/adobeAcrobat.svg",
        features: ["Annual License", "Instant Delivery", "Windows/Mac"],
        rating: 4.7,
        reviews: 891,
        price: 349.99,
        originalPrice: null,
        badge: "Professional",
        stock: "In Stock"
    },
    {
        id: 7,
        name: "WPS Office",
        image: "../images/wps.svg",
        features: ["Lifetime License", "Instant Delivery", "Mac Only"],
        rating: 4.8,
        reviews: 312,
        price: 299.99,
        originalPrice: 399.99,
        badge: "Bestseller",
        stock: "Low Stock"
    },
    {
        id: 8,
        name: "Final Cut Pro",
        image: "../images/finalCutPro.webp",
        features: ["Lifetime License", "Instant Delivery", "Mac Only"],
        rating: 4.9,
        reviews: 654,
        price: 499.99,
        originalPrice: null,
        badge: "Exclusive",
        stock: "In Stock"
    }
];

// State Management
let cartCount = 3;
let favorites = new Set();
let recentlyViewed = [];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const toastContainer = document.getElementById('toast-container');
const cartBadge = document.querySelector('.nav-badge');
const searchBox = document.querySelector('.search-box');
const voiceSearch = document.querySelector('.voice-search');

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    renderProducts();
    setupEventListeners();
    showSkeletons();

    // Simulate loading delay
    setTimeout(() => {
        hideSkeletons();
    }, 1500);
});

// Render Products
function renderProducts() {
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-badge ${product.stock === 'Low Stock' ? 'warning' : ''}">${product.badge}</div>
        <button class="favorite-btn ${favorites.has(product.id) ? 'active' : ''}" data-id="${product.id}">
            <i class="fas fa-heart"></i>
        </button>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-features">
                ${product.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>
            <div class="product-rating">
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <span class="rating-count">(${product.reviews})</span>
            </div>
            <div class="product-pricing">
                <span class="current-price">$${product.price}</span>
                ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
            </div>
            <div class="product-actions">
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
                <button class="quick-view" data-id="${product.id}">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
    `;

    return card;
}

// Generate Star Rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
}

// Setup Event Listeners
function setupEventListeners() {
    // Add to cart
    document.addEventListener('click', (e) => {
        if (e.target.closest('.add-to-cart')) {
            const productId = parseInt(e.target.closest('.add-to-cart').dataset.id);
            addToCart(productId);
        }
    });

    // Favorite toggle
    document.addEventListener('click', (e) => {
        if (e.target.closest('.favorite-btn')) {
            const button = e.target.closest('.favorite-btn');
            const productId = parseInt(button.dataset.id);
            toggleFavorite(productId, button);
        }
    });

    // Quick view
    document.addEventListener('click', (e) => {
        if (e.target.closest('.quick-view')) {
            const productId = parseInt(e.target.closest('.quick-view').dataset.id);
            quickView(productId);
            window.location.href = 'productDetails.html?id=' + productId; // Redirect to product details page
        }
    });

    // Search functionality with debounce
    let searchTimeout;

    searchBox.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value);
        }, 300);
    });

    // Voice search simulation
    voiceSearch.addEventListener('click', () => {
        showToast('Voice Search', 'Listening for your search query...');

        // Simulate voice recognition
        setTimeout(() => {
            searchBox.value = 'creative software licenses';
            performSearch('creative software licenses');
        }, 2000);
    });
}

// Cart Management
function addToCart(productId) {
    cartCount++;
    updateCartBadge();

    const product = products.find(p => p.id === productId);
    showToast('Added to Cart', `${product.name} has been added to your cart.`);

    // Add pulse animation to cart
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 300);
    }
}

function updateCartBadge() {
    if (cartBadge) {
        cartBadge.textContent = cartCount;
    }
}

// Favorites Management
function toggleFavorite(productId, button) {
    if (favorites.has(productId)) {
        favorites.delete(productId);
        button.classList.remove('active');
        showToast('Removed from Favorites', 'Item removed from your favorites.');
    } else {
        favorites.add(productId);
        button.classList.add('active');
        showToast('Added to Favorites', 'Item added to your favorites.');

        // Heart animation
        button.style.transform = 'scale(1.3)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 300);
    }
}

// Quick View
function quickView(productId) {
    const product = products.find(p => p.id === productId);
    showToast('Quick View', `Opening ${product.name} details...`);

    // In a real implementation, this would open a modal with product details
    console.log('Quick view for:', product.name);
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

// Loading Skeletons
function showSkeletons() {
    productsGrid.innerHTML = '';

    for (let i = 0; i < 6; i++) {
        const skeletonCard = document.createElement('div');
        skeletonCard.className = 'skeleton-card';
        skeletonCard.innerHTML = `
            <div class="skeleton skeleton-image"></div>
            <div class="skeleton-content">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton-features">
                    <div class="skeleton skeleton-feature"></div>
                    <div class="skeleton skeleton-feature"></div>
                </div>
                <div class="skeleton skeleton-rating"></div>
                <div class="skeleton skeleton-price"></div>
                <div class="skeleton-actions">
                    <div class="skeleton skeleton-button"></div>
                    <div class="skeleton skeleton-button-small"></div>
                </div>
            </div>
        `;
        productsGrid.appendChild(skeletonCard);
    }
}

function hideSkeletons() {
    renderProducts();
}

// Search functionality
function performSearch(query) {
    if (!query.trim()) {
        renderProducts();
        return;
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.features.some(feature => feature.toLowerCase().includes(query.toLowerCase()))
    );

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <div style="font-size: 4rem; color: var(--light-gray); margin-bottom: 1rem;">
                    <i class="fas fa-search"></i>
                </div>
                <h3 style="margin-bottom: 0.5rem;">No products found</h3>
                <p style="color: var(--text-secondary);">Try adjusting your search terms</p>
            </div>
        `;
    } else {
        productsGrid.innerHTML = '';
        filteredProducts.forEach(product => {
            const productCard = createProductCard(product);
            productsGrid.appendChild(productCard);
        });
    }
}