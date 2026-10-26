// Account Details Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const accountForm = document.querySelector('.account-form');
    if (accountForm) {
        accountForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle form submission
            alert('Account details updated successfully!');
        });
    }

    // Cancel button functionality
    const cancelBtn = document.querySelector('.cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
                window.location.href = 'dashboard.html';
            }
        });
    }

    // Profile picture upload functionality
    const uploadOverlay = document.querySelector('.upload-overlay');
    if (uploadOverlay) {
        uploadOverlay.addEventListener('click', function() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const profileImage = document.querySelector('.profile-image');
                        profileImage.src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            };
            fileInput.click();
        });
    }

    // Delete account functionality
    const deleteLink = document.querySelector('.delete-link');
    if (deleteLink) {
        deleteLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                alert('Account deletion requested. A confirmation email has been sent.');
            }
        });
    }
});