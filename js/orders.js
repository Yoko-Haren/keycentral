document.addEventListener('DOMContentLoaded', function() {
    // View toggle functionality
    const viewBtns = document.querySelectorAll('.view-btn');
    const ordersContainer = document.getElementById('orders-container');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.getAttribute('data-view');
            
            // Update active state
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            showToast('View Changed', `Switched to ${view} view`);
        });
    });
    
    // Copy order ID functionality
    const copyBtns = document.querySelectorAll('.copy-btn');
    
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const orderId = btn.closest('.order-id').textContent.trim();
            
            // Copy to clipboard
            navigator.clipboard.writeText(orderId)
                .then(() => {
                    showToast('Copied!', 'Order ID copied to clipboard');
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        });
    });
    
    // Filter functionality
    const filterSelects = document.querySelectorAll('.filter-select');
    const searchInput = document.querySelector('.search-box input');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', applyFilters);
    });
    
    searchInput.addEventListener('input', applyFilters);
    
    function applyFilters() {
        // In a real app, this would filter the orders
        const timeFilter = document.getElementById('time-filter').value;
        const statusFilter = document.getElementById('status-filter').value;
        const categoryFilter = document.getElementById('category-filter').value;
        const searchTerm = searchInput.value.toLowerCase();
        
        // Show loading state
        showToast('Filters Applied', 'Updated order list based on your filters');
    }
    
    // Order action buttons
    const viewLicenseBtns = document.querySelectorAll('.action-primary');
    const receiptBtns = document.querySelectorAll('.action-secondary');
    const buyAgainBtns = document.querySelectorAll('.action-tertiary');
    
    viewLicenseBtns.forEach(btn => {
        if (!btn.disabled) {
            btn.addEventListener('click', () => {
                const orderCard = btn.closest('.order-card');
                const orderId = orderCard.querySelector('.order-id').textContent.trim();
                showToast('License Key', `Showing license keys for ${orderId}`);
                
                // In a real app, this would open a modal with license keys
            });
        }
    });
    
    receiptBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const orderCard = btn.closest('.order-card');
            const orderId = orderCard.querySelector('.order-id').textContent.trim();
            showToast('Receipt Downloaded', `Receipt for ${orderId} has been downloaded`);
            
            // In a real app, this would download the receipt PDF
        });
    });
    
    buyAgainBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const orderCard = btn.closest('.order-card');
            const productNames = Array.from(orderCard.querySelectorAll('.product-name'))
                .map(el => el.textContent.trim())
                .join(', ');
            
            showToast('Added to Cart', `Products from this order have been added to your cart`);
            
            // In a real app, this would add the products to the cart
        });
    });
    
    // Toast notification function
    function showToast(title, message) {
        const toastContainer = document.getElementById('toast-container');
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
});