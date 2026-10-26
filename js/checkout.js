document.addEventListener('DOMContentLoaded', function () {
    // Payment method selection
    const paymentOptions = document.querySelectorAll('.payment-option');
    const cardDetails = document.getElementById('card-details');

    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all options
            paymentOptions.forEach(opt => opt.classList.remove('selected'));

            // Add selected class to clicked option
            option.classList.add('selected');

            const method = option.getAttribute('data-method');

            // Show/hide card details based on selection
            if (method === 'card') {
                cardDetails.classList.add('active');
            } else {
                cardDetails.classList.remove('active');
            }
        });
    });

    // Promo code functionality
    const promoCodeInput = document.getElementById('promo-code');
    const applyPromoBtn = document.getElementById('apply-promo');
    const promoMessage = document.getElementById('promo-message');
    const discountElement = document.getElementById('discount');
    const totalElement = document.getElementById('total');

    // Define valid promo codes and their discounts
    const promoCodes = {
        'WELCOME10': 0.1,  // 10% off
        'SAVE15': 0.15,    // 15% off
        'KEYCENTRAL20': 0.2 // 20% off
    };

    let currentDiscount = 0;
    let subtotal = 169.98;
    let tax = 13.60;

    applyPromoBtn.addEventListener('click', () => {
        const code = promoCodeInput.value.trim().toUpperCase();

        if (code === '') {
            promoMessage.textContent = 'Please enter a promo code';
            promoMessage.className = 'promo-message error';
            return;
        }

        if (promoCodes[code]) {
            currentDiscount = subtotal * promoCodes[code];
            updateTotals();
            promoMessage.textContent = `Promo code applied! ${promoCodes[code] * 100}% discount added.`;
            promoMessage.className = 'promo-message success';
            applyPromoBtn.disabled = true;
            promoCodeInput.disabled = true;
        } else {
            promoMessage.textContent = 'Invalid promo code. Please try again.';
            promoMessage.className = 'promo-message error';
        }
    });

    // Update totals function
    function updateTotals() {
        const total = subtotal + tax - currentDiscount;

        discountElement.textContent = `-$${currentDiscount.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;

        // Update place order button
        const placeOrderBtn = document.querySelector('.place-order-btn');
        placeOrderBtn.innerHTML = `<i class="fas fa-lock"></i> Place Order - $${total.toFixed(2)}`;
    }

    // Card number formatting
    const cardNumberInput = document.getElementById('card-number');

    cardNumberInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = '';

        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }

        e.target.value = formattedValue;
    });

    // Expiry date formatting
    const expiryInput = document.getElementById('expiry');

    expiryInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }

        e.target.value = value;
    });

    // CVV formatting
    const cvvInput = document.getElementById('cvv');

    cvvInput.addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    });

    // Place order button
    const placeOrderBtn = document.querySelector('.place-order-btn');

    placeOrderBtn.addEventListener('click', function () {
        // Simple validation
        const cardNumber = document.getElementById('card-number').value;
        const expiry = document.getElementById('expiry').value;
        const cvv = document.getElementById('cvv').value;
        const cardName = document.getElementById('card-name').value;

        if (!cardNumber || !expiry || !cvv || !cardName) {
            alert('Please fill in all card details before placing your order.');
            return;
        }

        window.location.href = 'orderSuccess.html';

        // Reset form
        document.getElementById('card-number').value = '';
        document.getElementById('expiry').value = '';
        document.getElementById('cvv').value = '';
        document.getElementById('card-name').value = '';
        document.getElementById('address').value = '';

        // Reset promo code
        promoCodeInput.value = '';
        promoCodeInput.disabled = false;
        applyPromoBtn.disabled = false;
        promoMessage.textContent = '';
        currentDiscount = 0;
        updateTotals();
    });
});