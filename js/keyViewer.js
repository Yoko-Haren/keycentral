// DOM Elements
const licenseKeyElement = document.getElementById('licenseKey');
const copyKeyBtn = document.getElementById('copyKeyBtn');
const revealKeyBtn = document.getElementById('revealKeyBtn');
const regenerateKeyBtn = document.getElementById('regenerateKeyBtn');
const toastContainer = document.getElementById('toast-container');
const regenerateModal = document.getElementById('regenerateModal');
const closeRegenerateModal = document.getElementById('closeRegenerateModal');
const cancelRegenerate = document.getElementById('cancelRegenerate');
const confirmRegenerate = document.getElementById('confirmRegenerate');

// State
let isKeyRevealed = false;
const actualLicenseKey = "N7XK2-9F4P8-Q3R6T-1W5Y7-8Z9B2";

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Copy key button
    copyKeyBtn.addEventListener('click', copyLicenseKey);
    
    // Reveal key button
    revealKeyBtn.addEventListener('click', toggleKeyVisibility);
    
    // Regenerate key button
    regenerateKeyBtn.addEventListener('click', openRegenerateModal);
    
    // Modal event listeners
    closeRegenerateModal.addEventListener('click', closeModal);
    cancelRegenerate.addEventListener('click', closeModal);
    confirmRegenerate.addEventListener('click', regenerateLicenseKey);
    
    // Close modal when clicking outside
    regenerateModal.addEventListener('click', function(e) {
        if (e.target === regenerateModal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && regenerateModal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Copy License Key to Clipboard
function copyLicenseKey() {
    if (!isKeyRevealed) {
        showToast('Key Hidden', 'Please reveal the key first before copying.');
        return;
    }
    
    navigator.clipboard.writeText(actualLicenseKey)
        .then(() => {
            copyKeyBtn.innerHTML = '<i class="fas fa-check"></i>Copied!';
            copyKeyBtn.classList.add('copied');
            showToast('Key Copied', 'License key copied to clipboard.');
            
            setTimeout(() => {
                copyKeyBtn.innerHTML = '<i class="fas fa-copy"></i>Copy Key';
                copyKeyBtn.classList.remove('copied');
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy key: ', err);
            showToast('Copy Failed', 'Failed to copy key to clipboard.');
        });
}

// Toggle Key Visibility
function toggleKeyVisibility() {
    isKeyRevealed = !isKeyRevealed;
    
    if (isKeyRevealed) {
        licenseKeyElement.textContent = actualLicenseKey;
        licenseKeyElement.classList.add('revealed');
        revealKeyBtn.innerHTML = '<i class="fas fa-eye-slash"></i>Hide Key';
        showToast('Key Revealed', 'Your license key is now visible.');
    } else {
        licenseKeyElement.textContent = 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX';
        licenseKeyElement.classList.remove('revealed');
        revealKeyBtn.innerHTML = '<i class="fas fa-eye"></i>Reveal Key';
        showToast('Key Hidden', 'Your license key is now hidden.');
    }
}

// Open Regenerate Modal
function openRegenerateModal() {
    regenerateModal.classList.add('active');
}

// Close Modal
function closeModal() {
    regenerateModal.classList.remove('active');
}

// Regenerate License Key
function regenerateLicenseKey() {
    // Simulate API call to regenerate key
    showToast('Regenerating Key', 'Please wait while we generate a new key...');
    
    setTimeout(() => {
        // In a real application, this would come from the server
        const newKey = generateNewLicenseKey();
        
        // Update the displayed key
        actualLicenseKey = newKey;
        if (isKeyRevealed) {
            licenseKeyElement.textContent = newKey;
        }
        
        closeModal();
        showToast('Key Regenerated', 'Your new license key has been generated successfully.');
        
        // Reset reveal state
        isKeyRevealed = false;
        licenseKeyElement.classList.remove('revealed');
        revealKeyBtn.innerHTML = '<i class="fas fa-eye"></i>Reveal Key';
    }, 2000);
}

// Generate New License Key (Simulation)
function generateNewLicenseKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let key = '';
    
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        if (i < 4) key += '-';
    }
    
    return key;
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