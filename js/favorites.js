// Sample Favorites Data
const favoriteItems = [
    {
        id: 1,
        name: "Microsoft Office 365",
        image: "../images/microsoft.png",
        description: "Professional office suite with lifetime license and instant delivery",
        price: 89.99
    },
    {
        id: 2,
        name: "Adobe Photoshop CC",
        image: "../images/adobePhotoshop.png",
        description: "Industry-standard photo editing software with annual subscription",
        price: 199.99
    },
    {
        id: 3,
        name: "Canva Pro",
        image: "../images/canva.svg",
        description: "Advanced graphic design platform with lifetime access",
        price: 149.99
    },
    {
        id: 4,
        name: "Adobe Premiere Pro",
        image: "../images/adobePremiere.png",
        description: "Professional video editing software for all platforms",
        price: 239.99
    },
    {
        id: 5,
        name: "Final Cut Pro",
        image: "../images/finalCutPro.webp",
        description: "Professional video editing for Mac with lifetime license",
        price: 299.99
    }
];

// State Management
let favorites = [...favoriteItems];

// DOM Elements
const favoritesContainer = document.getElementById('favorites-container');
const toastContainer = document.getElementById('toast-container');
const favoritesBadge = document.querySelector('.nav-badge');

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    renderFavorites();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Add any additional event listeners here
}

// Render Favorites
function renderFavorites() {
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-heart"></i>
                </div>
                <h2 class="empty-title">You haven't saved any products yet</h2>
                <p class="empty-description">Save your favorite software licenses for quick access later.</p>
                <a href="dashboard.html" class="browse-btn">Browse Products</a>
            </div>
        `;
        return;
    }

    favoritesContainer.innerHTML = '';

    favorites.forEach(item => {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item';
        favoriteItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="favorite-image">
            <button class="favorite-remove" data-id="${item.id}">
                <i class="fas fa-times"></i>
            </button>
            <div class="favorite-info">
                <h3 class="favorite-name">${item.name}</h3>
                <p class="favorite-description">${item.description}</p>
                <div class="favorite-price">$${item.price.toFixed(2)}</div>
                <div class="favorite-actions">
                    <button class="add-to-cart-btn" data-id="${item.id}">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                    <button class="remove-favorite-btn" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        favoritesContainer.appendChild(favoriteItem);
    });

    // Add event listeners for favorite actions
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const itemId = parseInt(this.dataset.id);
            addToCartFromFavorites(itemId);
        });
    });

    document.querySelectorAll('.remove-favorite-btn, .favorite-remove').forEach(btn => {
        btn.addEventListener('click', function () {
            const itemId = parseInt(this.dataset.id);
            removeFromFavorites(itemId);
        });
    });
}

// Add to Cart from Favorites
function addToCartFromFavorites(itemId) {
    const item = favorites.find(item => item.id === itemId);
    if (!item) return;

    showToast('Added to Cart', `${item.name} has been added to your cart`);
}

// Remove from Favorites
function removeFromFavorites(itemId) {
    const item = favorites.find(item => item.id === itemId);
    if (!item) return;

    favorites = favorites.filter(item => item.id !== itemId);
    renderFavorites();

    // Update favorites badge
    if (favoritesBadge) {
        favoritesBadge.textContent = favorites.length;
    }

    showToast('Removed from Favorites', `${item.name} has been removed from your favorites`);
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