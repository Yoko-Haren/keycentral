// Login functionality
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.login-form');
    const loginBtn = document.querySelector('.login-btn-form');

    // Form submission handler
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;

        // Simple validation
        if (!email || !password) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Simulate login process
        loginBtn.textContent = 'Logging in...';
        loginBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // For demo purposes, always succeed
            showMessage('Login successful! Redirecting...', 'success');

            // Store login state if remember me is checked
            if (rememberMe) {
                localStorage.setItem('userRemembered', 'true');
                localStorage.setItem('userEmail', email);
            }

            // Redirect to dashboard after successful login
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);

        }, 1500);
    });

    // Social login handlers
    document.querySelector('.social-btn.google').addEventListener('click', function () {
        showMessage('Redirecting to Google authentication...', 'success');
        // In a real app, this would redirect to Google OAuth
    });

    document.querySelector('.social-btn.microsoft').addEventListener('click', function () {
        showMessage('Redirecting to Microsoft authentication...', 'success');
        // In a real app, this would redirect to Microsoft OAuth
    });

    // Check if user has saved email
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
        document.getElementById('email').value = savedEmail;
        document.getElementById('remember').checked = true;
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Message display function
    function showMessage(message, type) {
        // Remove any existing messages
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        messageEl.textContent = message;

        document.body.appendChild(messageEl);

        // Remove message after 3 seconds
        setTimeout(() => {
            messageEl.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                messageEl.remove();
            }, 300);
        }, 3000);
    }

    // Form input animations
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});