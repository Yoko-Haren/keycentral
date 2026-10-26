// Sign Up Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.querySelector('.signup-form');
    const signupBtn = document.querySelector('.signup-btn');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordStrength = document.getElementById('password-strength');
    
    // Password strength indicator
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if (password.match(/\d/)) strength++;
        if (password.match(/[^a-zA-Z\d]/)) strength++;
        
        // Update strength indicator
        passwordStrength.className = 'password-strength';
        if (password.length > 0) {
            if (strength <= 1) {
                passwordStrength.classList.add('weak');
            } else if (strength <= 3) {
                passwordStrength.classList.add('medium');
            } else {
                passwordStrength.classList.add('strong');
            }
        }
    });
    
    // Real-time password confirmation validation
    confirmPasswordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword && password !== confirmPassword) {
            confirmPasswordInput.style.borderColor = 'var(--error)';
            confirmPasswordInput.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
        } else {
            confirmPasswordInput.style.borderColor = 'var(--gray)';
            confirmPasswordInput.style.boxShadow = 'none';
        }
    });
    
    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const terms = document.getElementById('terms').checked;
        
        // Validation
        if (!firstname || !lastname || !email || !password || !confirmPassword) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showMessage('Passwords do not match', 'error');
            return;
        }
        
        if (password.length < 8) {
            showMessage('Password must be at least 8 characters long', 'error');
            return;
        }
        
        if (!terms) {
            showMessage('Please agree to the Terms & Privacy Policy', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate signup process
        signupBtn.textContent = 'Creating Account...';
        signupBtn.disabled = true;
        
        setTimeout(() => {
            showMessage('Account created successfully! Redirecting to login...', 'success');
            
            // Reset form
            setTimeout(() => {
                signupForm.reset();
                passwordStrength.className = 'password-strength';
                signupBtn.textContent = 'Create Account';
                signupBtn.disabled = false;
                
                // Redirect to login page
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }, 1000);
        }, 1500);
    });
    
    // Social login buttons
    document.querySelector('.social-btn.google').addEventListener('click', function() {
        showMessage('Google sign up coming soon!', 'success');
    });
    
    document.querySelector('.social-btn.microsoft').addEventListener('click', function() {
        showMessage('Microsoft sign up coming soon!', 'success');
    });
    
    // Show message function
    function showMessage(message, type) {
        // Remove any existing messages
        const existingMessage = document.querySelector('.toast-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `toast-message ${type}`;
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
    
    // Form input validation styling
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = 'var(--error)';
                this.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
            } else {
                this.style.borderColor = 'var(--gray)';
                this.style.boxShadow = 'none';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary)';
            this.style.boxShadow = '0 0 0 3px rgba(255, 122, 0, 0.2)';
        });
    });
});