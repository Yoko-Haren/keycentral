// Modal functionality for account details
document.addEventListener('DOMContentLoaded', function() {
    const verificationModal = document.getElementById('verification-modal');
    const twoFAModal = document.getElementById('2fa-modal');
    const editEmailBtn = document.getElementById('edit-email');
    const editPhoneBtn = document.getElementById('edit-phone');
    const changePasswordBtn = document.getElementById('change-password');
    const twoFAToggle = document.getElementById('2fa-toggle');
    const verificationMethods = document.getElementById('verification-methods');
    const otpSection = document.getElementById('otp-section');
    const successSection = document.getElementById('success-section');
    const verifyOtpBtn = document.getElementById('verify-otp');
    const changeMethodBtn = document.getElementById('change-method');
    const continueEditingBtn = document.getElementById('continue-editing');
    const otpInputs = document.querySelectorAll('.otp-input');
    const timerElement = document.getElementById('timer');
    const attemptsElement = document.getElementById('attempts');
    const closeVerificationModalBtn = document.getElementById('close-verification-modal');
    const close2FAModalBtn = document.getElementById('close-2fa-modal');
    
    // 2FA Modal Elements
    const twoFASetup = document.getElementById('2fa-setup');
    const twoFAAuthenticator = document.getElementById('2fa-authenticator');
    const twoFASMS = document.getElementById('2fa-sms');
    const twoFASuccess = document.getElementById('2fa-success');
    const continue2FABtn = document.getElementById('continue-2fa');
    const backToMethodsBtn = document.getElementById('back-to-methods');
    const backToMethodsSMSBtn = document.getElementById('back-to-methods-sms');
    const verifyAuthenticatorBtn = document.getElementById('verify-authenticator');
    const verifySMSBtn = document.getElementById('verify-sms');
    const copyCodesBtn = document.getElementById('copy-codes');
    const done2FABtn = document.getElementById('done-2fa');
    const cancel2FABtn = document.getElementById('cancel-2fa');
    
    // State variables
    let currentAction = null; 
    let selectedMethod = null;
    let timerInterval = null;
    let timeLeft = 120; 
    let attemptsLeft = 3;
    
    // Event Listeners
    if (editEmailBtn) editEmailBtn.addEventListener('click', () => openVerificationModal('email'));
    if (editPhoneBtn) editPhoneBtn.addEventListener('click', () => openVerificationModal('phone'));
    if (changePasswordBtn) changePasswordBtn.addEventListener('click', () => openVerificationModal('password'));
    if (twoFAToggle) twoFAToggle.addEventListener('change', handle2FAToggle);
    if (changeMethodBtn) changeMethodBtn.addEventListener('click', showVerificationMethods);
    if (continueEditingBtn) continueEditingBtn.addEventListener('click', closeVerificationModal);
    if (verifyOtpBtn) verifyOtpBtn.addEventListener('click', verifyOTP);
    if (continue2FABtn) continue2FABtn.addEventListener('click', continue2FA);
    if (backToMethodsBtn) backToMethodsBtn.addEventListener('click', show2FAMethods);
    if (backToMethodsSMSBtn) backToMethodsSMSBtn.addEventListener('click', show2FAMethods);
    if (verifyAuthenticatorBtn) verifyAuthenticatorBtn.addEventListener('click', verifyAuthenticator);
    if (verifySMSBtn) verifySMSBtn.addEventListener('click', verifySMS);
    if (copyCodesBtn) copyCodesBtn.addEventListener('click', copyRecoveryCodes);
    if (done2FABtn) done2FABtn.addEventListener('click', close2FAModal);
    if (cancel2FABtn) cancel2FABtn.addEventListener('click', close2FAModal);
    if (closeVerificationModalBtn) closeVerificationModalBtn.addEventListener('click', closeVerificationModal);
    if (close2FAModalBtn) close2FAModalBtn.addEventListener('click', close2FAModal);
    
    // Close modal when clicking outside
    if (verificationModal) {
        verificationModal.addEventListener('click', (e) => {
            if (e.target === verificationModal) {
                closeVerificationModal();
            }
        });
    }
    
    if (twoFAModal) {
        twoFAModal.addEventListener('click', (e) => {
            if (e.target === twoFAModal) {
                close2FAModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (verificationModal && verificationModal.classList.contains('active')) {
                closeVerificationModal();
            }
            if (twoFAModal && twoFAModal.classList.contains('active')) {
                close2FAModal();
            }
        }
    });
    
    // OTP Input handling
    otpInputs.forEach(input => {
        input.addEventListener('input', handleOTPInput);
        input.addEventListener('keydown', handleOTPKeydown);
        input.addEventListener('paste', handleOTPPaste);
    });
    
    // Method selection in verification modal
    if (verificationMethods) {
        verificationMethods.addEventListener('click', (e) => {
            const methodOption = e.target.closest('.method-option');
            if (methodOption) {
                // Remove selected class from all options
                document.querySelectorAll('.method-option').forEach(option => {
                    option.classList.remove('selected');
                });
                
                methodOption.classList.add('selected');
                selectedMethod = methodOption.dataset.method;
                
                if (continue2FABtn) continue2FABtn.disabled = false;
                
                // For verification modal, proceed directly to OTP
                if (verificationModal && verificationModal.classList.contains('active')) {
                    startOTPProcess();
                }
            }
        });
    }
    
    // Method selection in 2FA modal
    if (twoFASetup) {
        twoFASetup.addEventListener('click', (e) => {
            const methodOption = e.target.closest('.method-option');
            if (methodOption) {
                // Remove selected class from all options
                document.querySelectorAll('.method-option').forEach(option => {
                    option.classList.remove('selected');
                });
                
                // Add selected class to clicked option
                methodOption.classList.add('selected');
                selectedMethod = methodOption.dataset.method;
                
                // Enable continue button
                if (continue2FABtn) continue2FABtn.disabled = false;
            }
        });
    }

    // Functions
    function openVerificationModal(action) {
        currentAction = action;
        selectedMethod = null;
        
        showVerificationMethods();
        resetOTP();
        
        let title = "Secure Verification Required";
        let subtitle = "To change this information, verify your identity. Select a verification method.";
        
        if (action === 'email') {
            title = "Change Email Address";
        } else if (action === 'phone') {
            title = "Change Phone Number";
        } else if (action === 'password') {
            title = "Change Password";
        }
        
        const modalTitle = document.querySelector('#verification-modal .modal-title');
        const modalSubtitle = document.querySelector('#verification-modal .modal-subtitle');
        
        if (modalTitle) modalTitle.textContent = title;
        if (modalSubtitle) modalSubtitle.textContent = subtitle;
        
        // Populate methods
        if (verificationMethods) {
            verificationMethods.innerHTML = '';
            
            if (action === 'email' || action === 'password') {
                verificationMethods.innerHTML += `
                    <div class="method-option" data-method="email">
                        <div class="method-icon">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <div class="method-info">
                            <div class="method-title">Email Code</div>
                            <div class="method-description">Send code to ******@gmail.com</div>
                        </div>
                    </div>
                `;
            }
            
            if (action === 'phone' || action === 'password') {
                verificationMethods.innerHTML += `
                    <div class="method-option" data-method="sms">
                        <div class="method-icon">
                            <i class="fas fa-sms"></i>
                        </div>
                        <div class="method-info">
                            <div class="method-title">SMS Code</div>
                            <div class="method-description">Send code to *******7</div>
                        </div>
                    </div>
                `;
            }
        }
        
        if (verificationModal) verificationModal.classList.add('active');
    }
    
    function showVerificationMethods() {
        if (otpSection) otpSection.style.display = 'none';
        if (successSection) successSection.style.display = 'none';
        if (verificationMethods) verificationMethods.style.display = 'flex';
        resetOTP();
        clearInterval(timerInterval);
    }
    
    function startOTPProcess() {
        if (verificationMethods) verificationMethods.style.display = 'none';
        if (otpSection) otpSection.style.display = 'block';
        
        // Update instruction text
        let instruction = "A verification code was sent to ";
        if (selectedMethod === 'email') {
            instruction += "******@gmail.com";
        } else if (selectedMethod === 'sms') {
            instruction += "*******7";
        }
        instruction += ". Enter it below to continue.";
        
        const otpInstruction = document.getElementById('otp-instruction');
        if (otpInstruction) otpInstruction.textContent = instruction;
        
        startTimer();
        
        if (otpInputs.length > 0) otpInputs[0].focus();
    }
    
    function startTimer() {
        timeLeft = 120;
        updateTimerDisplay();
        
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                if (verifyOtpBtn) verifyOtpBtn.disabled = true;
            }
        }, 1000);
    }
    
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        if (timerElement) {
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    function handleOTPInput(e) {
        const input = e.target;
        const value = input.value;
        const index = parseInt(input.dataset.index);
        
        if (value && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
        
        updateVerifyButtonState();
    }
    
    function handleOTPKeydown(e) {
        const input = e.target;
        const index = parseInt(input.dataset.index);
        
        if (e.key === 'Backspace' && !input.value && index > 0) {
            otpInputs[index - 1].focus();
        }
    }
    
    function handleOTPPaste(e) {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text');
        const digits = pasteData.replace(/\D/g, '').split('').slice(0, 6);
        
        digits.forEach((digit, index) => {
            if (index < otpInputs.length) {
                otpInputs[index].value = digit;
                otpInputs[index].classList.add('filled');
            }
        });
        
        if (digits.length === 6) {
            otpInputs[5].focus();
        } else if (digits.length > 0) {
            otpInputs[digits.length].focus();
        }
        
        updateVerifyButtonState();
    }
    
    function updateVerifyButtonState() {
        const allFilled = Array.from(otpInputs).every(input => input.value);
        if (verifyOtpBtn) {
            verifyOtpBtn.disabled = !allFilled || timeLeft <= 0;
        }
    }
    
    function resetOTP() {
        otpInputs.forEach(input => {
            input.value = '';
            input.classList.remove('filled');
        });
        if (verifyOtpBtn) verifyOtpBtn.disabled = true;
        attemptsLeft = 3;
        if (attemptsElement) attemptsElement.textContent = `${attemptsLeft} attempts remaining`;
    }
    
    function verifyOTP() {
        showSuccess();
    }
    
    function getOTPCode() {
        return Array.from(otpInputs).map(input => input.value).join('');
    }
    
    function showSuccess() {
        if (otpSection) otpSection.style.display = 'none';
        if (successSection) successSection.style.display = 'block';
        clearInterval(timerInterval);
    }
    
    function closeVerificationModal() {
        if (verificationModal) verificationModal.classList.remove('active');
        clearInterval(timerInterval);
        
        currentAction = null;
        selectedMethod = null;
    }
    
    function handle2FAToggle() {
        if (twoFAToggle.checked) {
            open2FAModal();
        } else {
            if (confirm("Are you sure you want to disable Two-Factor Authentication? This will reduce your account security.")) {
                twoFAToggle.checked = false;
            } else {
                twoFAToggle.checked = true;
            }
        }
    }
    
    function open2FAModal() {
        if (twoFAModal) twoFAModal.classList.add('active');
        show2FAMethods();
    }
    
    function show2FAMethods() {
        if (twoFASetup) twoFASetup.style.display = 'block';
        if (twoFAAuthenticator) twoFAAuthenticator.style.display = 'none';
        if (twoFASMS) twoFASMS.style.display = 'none';
        if (twoFASuccess) twoFASuccess.style.display = 'none';
        
        // Reset selection
        selectedMethod = null;
        if (continue2FABtn) continue2FABtn.disabled = true;
        document.querySelectorAll('.method-option').forEach(option => {
            option.classList.remove('selected');
        });
    }
    
    function continue2FA() {
        if (selectedMethod === 'authenticator') {
            if (twoFASetup) twoFASetup.style.display = 'none';
            if (twoFAAuthenticator) twoFAAuthenticator.style.display = 'block';
        } else if (selectedMethod === 'sms') {
            if (twoFASetup) twoFASetup.style.display = 'none';
            if (twoFASMS) twoFASMS.style.display = 'block';
            
            startSMSTimer();
        }
    }
    
    function startSMSTimer() {
        timeLeft = 120;
        updateSMSTimerDisplay();
        
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft--;
            updateSMSTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                if (verifySMSBtn) verifySMSBtn.disabled = true;
            }
        }, 1000);
    }
    
    function updateSMSTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const smsTimer = document.getElementById('sms-timer');
        if (smsTimer) {
            smsTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    function verifyAuthenticator() {
        // For the test only
        show2FASuccess(['A1B2-C3D4', 'E5F6-G7H8', 'I9J0-K1L2', 'M3N4-O5P6', 'Q7R8-S9T0', 'U1V2-W3X4']);
    }
    
    function verifySMS() {
        show2FASuccess(['A1B2-C3D4', 'E5F6-G7H8', 'I9J0-K1L2', 'M3N4-O5P6', 'Q7R8-S9T0', 'U1V2-W3X4']);
    }
    
    function show2FASuccess(recoveryCodes) {
        if (twoFAAuthenticator) twoFAAuthenticator.style.display = 'none';
        if (twoFASMS) twoFASMS.style.display = 'none';
        if (twoFASuccess) twoFASuccess.style.display = 'block';
        
        // Populate recovery codes
        const codeList = document.querySelector('.code-list');
        if (codeList) {
            codeList.innerHTML = '';
            recoveryCodes.forEach(code => {
                const codeElement = document.createElement('div');
                codeElement.className = 'recovery-code';
                codeElement.textContent = code;
                codeList.appendChild(codeElement);
            });
        }
        
        clearInterval(timerInterval);
    }
    
    function copyRecoveryCodes() {
        const codes = Array.from(document.querySelectorAll('.recovery-code'))
            .map(el => el.textContent)
            .join('\n');
        
        navigator.clipboard.writeText(codes)
            .then(() => {
                if (copyCodesBtn) {
                    copyCodesBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyCodesBtn.textContent = 'Copy Codes';
                    }, 2000);
                }
            })
            .catch(err => {
                console.error('Failed to copy codes: ', err);
            });
    }
    
    function close2FAModal() {
        if (twoFAModal) twoFAModal.classList.remove('active');
        clearInterval(timerInterval);
        
        if (!twoFASuccess || twoFASuccess.style.display === 'none') {
            if (twoFAToggle) twoFAToggle.checked = false;
        }
    }
    
    function handleOTPError() {
        attemptsLeft--;
        if (attemptsLeft > 0) {
            if (attemptsElement) attemptsElement.textContent = `${attemptsLeft} attempts remaining`;
            resetOTP();
            if (otpInputs.length > 0) otpInputs[0].focus();
        } else {
            if (attemptsElement) attemptsElement.textContent = "Too many failed attempts. Please try again later.";
            if (verifyOtpBtn) verifyOtpBtn.disabled = true;
        }
    }
});