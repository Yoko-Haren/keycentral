// Products Data
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

// Carousel Variables
let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    initializeNavbar();
    initializeCarousel();
    loadProducts();
    initializeStatsCounter();
    initializeNewsletter();
    initializeAnimations();
    startLicenseAnimation();
});

// Navbar Scroll Effect
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const closeMobileMenu = document.getElementById('closeMobileMenu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeMobileMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    mobileOverlay.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Image Carousel
function initializeCarousel() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        resetInterval();
    });

    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        resetInterval();
    });

    // Auto slide
    startAutoSlide();

    // Pause on hover
    const carousel = document.querySelector('.fullscreen-carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(slideInterval);
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                goToSlide(currentSlide + 1);
            } else {
                // Swipe right - previous slide
                goToSlide(currentSlide - 1);
            }
            resetInterval();
        }
    }
}

function goToSlide(index) {
    // Wrap around
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;

    // Hide current slide
    slides[currentSlide].classList.remove('active');
    document.querySelectorAll('.carousel-dot')[currentSlide].classList.remove('active');

    // Show new slide
    slides[index].classList.add('active');
    document.querySelectorAll('.carousel-dot')[index].classList.add('active');

    currentSlide = index;
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000); // Change slide every 5 seconds
}

function resetInterval() {
    clearInterval(slideInterval);
    startAutoSlide();
}

// Load Products
function loadProducts() {
    const grid = document.getElementById('productsGrid');

    products.forEach(product => {
        // Get badge class
        const badgeClass = `badge-${product.badge.toLowerCase().replace(' ', '-')}`;

        // Format price
        const priceFormatted = `$${product.price.toFixed(2)}`;
        const originalPriceFormatted = product.originalPrice ? `$${product.originalPrice.toFixed(2)}` : '';

        // Stock status
        const stockClass = product.stock.toLowerCase().includes('low') ? 'low' : 'in';
        const stockText = product.stock;

        // Rating stars
        const stars = getStarRating(product.rating);

        const card = document.createElement('div');
        card.className = 'product-card animate-fadeInUp';
        card.style.animationDelay = `${products.indexOf(product) * 0.1}s`;
        card.innerHTML = `
                    <div class="product-badge ${badgeClass}">${product.badge}</div>
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-content">
                        <h3 class="product-title">${product.name}</h3>
                        <ul class="product-features">
                            ${product.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                        </ul>
                        <div class="product-rating">
                            <div class="stars">${stars}</div>
                            <span class="reviews">${product.reviews.toLocaleString()} reviews</span>
                        </div>
                        <div class="product-price">
                            <span class="current-price">${priceFormatted}</span>
                            ${originalPriceFormatted ? `<span class="original-price">${originalPriceFormatted}</span>` : ''}
                        </div>
                        <div class="stock-status">
                            <span class="stock-dot ${stockClass}"></span>
                            <span class="stock-${stockClass}">${stockText}</span>
                        </div>
                        <div class="product-actions">
                            <button class="btn btn-primary btn-small btn-block" onclick="addToCart(${product.id})">
                                <i class="fas fa-shopping-cart"></i>
                                Add to Cart
                            </button>
                            <button class="btn btn-icon btn-icon-small" onclick="addToFavorites(${product.id})">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>
                    </div>
                `;

        grid.appendChild(card);
    });
}

function getStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }

    return stars;
}

// Animated License Key Display
function startLicenseAnimation() {
    const licenseDisplay = document.getElementById('licenseDisplay');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let currentKey = generateRandomKey();
    let isErasing = false;
    let charIndex = 0;

    function generateRandomKey() {
        let key = '';
        for (let i = 0; i < 19; i++) {
            if (i > 0 && i % 5 === 0 && i < 19) {
                key += '-';
            } else {
                key += characters.charAt(Math.floor(Math.random() * characters.length));
            }
        }
        return key;
    }

    function animateKey() {
        if (!isErasing) {
            // Typing animation
            if (charIndex < currentKey.length) {
                licenseDisplay.textContent = currentKey.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(animateKey, 100); // Speed of typing
            } else {
                // Pause at full key
                isErasing = true;
                setTimeout(animateKey, 1500); // Pause before erasing
            }
        } else {
            // Erasing animation
            if (charIndex > 0) {
                licenseDisplay.textContent = currentKey.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(animateKey, 50); // Speed of erasing (faster)
            } else {
                // Generate new key and start over
                isErasing = false;
                currentKey = generateRandomKey();
                setTimeout(animateKey, 500); // Pause before typing new key
            }
        }
    }

    // Start animation
    setTimeout(animateKey, 1000);
}

// Animated Stats Counter
function initializeStatsCounter() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current).toLocaleString();
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };

        // Start counter when in viewport
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        });

        observer.observe(counter);
    });
}

// Newsletter Form
function initializeNewsletter() {
    const form = document.getElementById('newsletterForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input').value;

        // Simulate API call
        showNotification('Subscribing to newsletter...', 'info');

        setTimeout(() => {
            showNotification('Successfully subscribed to newsletter!', 'success');
            form.reset();
        }, 1500);
    });
}

// Initialize Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, observerOptions);

    // Observe elements to animate
    document.querySelectorAll('.step, .testimonial-card, .cta-section').forEach(el => {
        observer.observe(el);
    });
}

// Cart Functions
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const cartCount = document.querySelector('.cart-count');
    let count = parseInt(cartCount.textContent);

    showNotification(`Added ${product.name} to cart!`, 'success');
}

function addToFavorites(id) {
    const product = products.find(p => p.id === id);
    showNotification(`Added ${product.name} to favorites!`, 'success');
}

// Notification System
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
            `;

    // Add styles for notification
    notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: ${type === 'success' ? '#10B981' : type === 'warning' ? '#F59E0B' : '#3B82F6'};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: var(--radius-md);
                display: flex;
                align-items: center;
                gap: 0.75rem;
                box-shadow: var(--shadow-lg);
                z-index: 9999;
                animation: slideIn 0.3s ease-out;
                max-width: 400px;
            `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);

    // Add keyframe animations
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
                    @keyframes slideIn {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                    @keyframes slideOut {
                        from { transform: translateX(0); opacity: 1; }
                        to { transform: translateX(100%); opacity: 0; }
                    }
                `;
        document.head.appendChild(style);
    }
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});