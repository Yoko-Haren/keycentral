// Order Success Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const viewOrdersBtn = document.getElementById('viewOrdersBtn');
    const successCard = document.querySelector('.success-card');
    const backToDashboard = document.querySelector('.back-to-dashboard');

    // Event Listeners
    if (viewOrdersBtn) {
        viewOrdersBtn.addEventListener('click', function() {
            // In a real application, this would redirect to the orders page
            // For demo purposes, we'll simulate a loading state
            viewOrdersBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            viewOrdersBtn.disabled = true;
            
            setTimeout(() => {
                window.location.href = 'orders.html';
            }, 1500);
        });
    }

    // Add a subtle hover effect to the success card
    if (successCard) {
        successCard.addEventListener('mouseenter', function() {
            successCard.style.transform = 'translateY(-5px)';
        });
        
        successCard.addEventListener('mouseleave', function() {
            successCard.style.transform = 'translateY(0)';
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.padding = '0.5rem 5%';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.padding = '1rem 5%';
                navbar.style.boxShadow = 'none';
            }
        }
    });

    // Add confetti effect on page load
    createConfetti();
});

// Confetti effect for celebration
function createConfetti() {
    const colors = ['#FF7A00', '#2ECC71', '#3498DB', '#F1C40F', '#9B59B6'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}vw;
            opacity: ${Math.random() * 0.5 + 0.5};
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: fall linear forwards;
            animation-duration: ${Math.random() * 3 + 2}s;
            z-index: 9999;
        `;
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Add confetti animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(${Math.random() * 360}deg);
        }
    }
`;
document.head.appendChild(style);

// Optional: Add order details from URL parameters
function getOrderDetailsFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    const total = urlParams.get('total');
    
    if (orderId) {
        const orderIdElement = document.querySelector('.summary-item:nth-child(1) .summary-value');
        if (orderIdElement) {
            orderIdElement.textContent = orderId;
        }
    }
    
    if (total) {
        const totalElement = document.querySelector('.summary-value.total');
        if (totalElement) {
            totalElement.textContent = `$${parseFloat(total).toFixed(2)}`;
        }
    }
}

// Call this function if you want to get order details from URL and display them, maybe this will be useful later in Flutter integration
// getOrderDetailsFromURL();