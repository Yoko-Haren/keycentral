document.addEventListener('DOMContentLoaded', function () {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab
            btn.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Quantity selector
    const quantityValue = document.querySelector('.quantity-value');
    const decreaseBtn = document.querySelector('.quantity-btn.decrease');
    const increaseBtn = document.querySelector('.quantity-btn.increase');
    let quantity = 1;

    decreaseBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            updateQuantity();
        }
    });

    increaseBtn.addEventListener('click', () => {
        quantity++;
        updateQuantity();
    });

    function updateQuantity() {
        quantityValue.textContent = quantity;
        const addToCartBtn = document.querySelector('.add-to-cart-btn');
        const totalPrice = (89.99 * quantity).toFixed(2);
        addToCartBtn.innerHTML = `<i class="fas fa-shopping-cart"></i> Add to Cart - $${totalPrice}`;
    }

    // Favorite button
    const favoriteBtn = document.querySelector('.favorite-btn');
    let isFavorited = false;

    favoriteBtn.addEventListener('click', () => {
        isFavorited = !isFavorited;
        favoriteBtn.classList.toggle('active', isFavorited);

        if (isFavorited) {
            favoriteBtn.innerHTML = `<i class="fas fa-heart"></i> Added to Favorites`;
            showToast('Added to Favorites', 'Product has been added to your favorites list.');
        } else {
            favoriteBtn.innerHTML = `<i class="fas fa-heart"></i> Add to Favorites`;
            showToast('Removed from Favorites', 'Product has been removed from your favorites list.');
        }
    });

    // Add to cart functionality
    const addToCartBtn = document.querySelector('.add-to-cart-btn');

    addToCartBtn.addEventListener('click', () => {
        const totalPrice = (89.99 * quantity).toFixed(2);
        showToast('Added to Cart', `Microsoft Office 2021 Pro Plus (x${quantity}) has been added to your cart. Total: $${totalPrice}`);

        // Update cart badge
        const cartBadge = document.querySelector('.nav-badge');
        const currentCount = parseInt(cartBadge.textContent);
        cartBadge.textContent = currentCount + quantity;
    });

    // Toast notification function
    function showToast(title, message) {
        const toastContainer = document.querySelector('.toast-container');
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

        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        // Hide and remove toast after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 4000);
    }

    // Related products add to cart
    const productCardBtns = document.querySelectorAll('.product-card-btn');
    productCardBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productName = btn.closest('.product-card').querySelector('.product-card-name').textContent;
            const productPrice = btn.closest('.product-card').querySelector('.product-card-price').textContent;
            showToast('Added to Cart', `${productName} has been added to your cart.`);

            // Update cart badge
            const cartBadge = document.querySelector('.nav-badge');
            const currentCount = parseInt(cartBadge.textContent);
            cartBadge.textContent = currentCount + 1;
        });
    });
});
