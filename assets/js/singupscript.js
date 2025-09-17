// Form validation and interaction functionality
class RegistrationForm {
  constructor() {
    this.initializeElements();
    this.bindEvents();
    this.formData = {};
  }

  initializeElements() {
    // Form inputs
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.confirmPasswordInput = document.getElementById('confirmPassword');
    this.usernameInput = document.getElementById('username');
    this.cityInput = document.getElementById('city');
    this.phoneInput = document.getElementById('phone');

    // Checkboxes
    this.rememberMeCheckbox = document.getElementById('rememberMe');
    this.privacyPolicyCheckbox = document.getElementById('privacyPolicy');
    this.termsOfUseCheckbox = document.getElementById('termsOfUse');

    // Buttons
    this.registerBtn = document.getElementById('registerBtn');
    this.googleBtn = document.getElementById('googleBtn');
    this.facebookBtn = document.getElementById('facebookBtn');
    this.backBtn = document.getElementById('backBtn');
    this.loginLink = document.getElementById('loginLink');
  }

  bindEvents() {
    // Register button click
    this.registerBtn.addEventListener('click', () => this.handleRegistration());

    // Social login buttons
    this.googleBtn.addEventListener('click', () => this.handleGoogleLogin());
    this.facebookBtn.addEventListener('click', () => this.handleFacebookLogin());

    // Navigation
    this.backBtn.addEventListener('click', () => this.handleBack());
    this.loginLink.addEventListener('click', () => this.handleLoginRedirect());

    // Form validation on input
    this.emailInput.addEventListener('blur', () => this.validateEmail());
    this.passwordInput.addEventListener('input', () => this.validatePassword());
    this.confirmPasswordInput.addEventListener('blur', () => this.validatePasswordMatch());
    this.usernameInput.addEventListener('blur', () => this.validateUsername());
    this.phoneInput.addEventListener('blur', () => this.validatePhone());

    // Checkbox interactions
    this.privacyPolicyCheckbox.addEventListener('change', () => this.updateRegistrationState());
    this.termsOfUseCheckbox.addEventListener('change', () => this.updateRegistrationState());

    // Enter key submission
    document.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleRegistration();
      }
    });
  }

  validateEmail() {
    const email = this.emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      this.showFieldError(this.emailInput, 'Email is required');
      return false;
    }
    
    if (!emailRegex.test(email)) {
      this.showFieldError(this.emailInput, 'Please enter a valid email');
      return false;
    }
    
    this.clearFieldError(this.emailInput);
    return true;
  }

  validatePassword() {
    const password = this.passwordInput.value;
    
    if (password.length < 6) {
      this.showFieldError(this.passwordInput, 'Password must be at least 6 characters');
      return false;
    }
    
    this.clearFieldError(this.passwordInput);
    
    // Re-validate password match if confirm password has value
    if (this.confirmPasswordInput.value) {
      this.validatePasswordMatch();
    }
    
    return true;
  }

  validatePasswordMatch() {
    const password = this.passwordInput.value;
    const confirmPassword = this.confirmPasswordInput.value;
    
    if (password !== confirmPassword) {
      this.showFieldError(this.confirmPasswordInput, 'Passwords do not match');
      return false;
    }
    
    this.clearFieldError(this.confirmPasswordInput);
    return true;
  }

  validateUsername() {
    const username = this.usernameInput.value.trim();
    
    if (!username) {
      this.showFieldError(this.usernameInput, 'Username is required');
      return false;
    }
    
    if (username.length < 3) {
      this.showFieldError(this.usernameInput, 'Username must be at least 3 characters');
      return false;
    }
    
    this.clearFieldError(this.usernameInput);
    return true;
  }

  validatePhone() {
    const phone = this.phoneInput.value.trim();
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    
    if (!phone) {
      this.showFieldError(this.phoneInput, 'Phone number is required');
      return false;
    }
    
    if (!phoneRegex.test(phone)) {
      this.showFieldError(this.phoneInput, 'Please enter a valid phone number');
      return false;
    }
    
    this.clearFieldError(this.phoneInput);
    return true;
  }

  showFieldError(field, message) {
    const parent = field.closest('.overlap-3, .overlap-4, .overlap-5, .overlap-6, .overlap-7, .overlap-8');
    if (parent) {
      parent.style.borderColor = '#ff4444';
      
      // Remove existing error message
      const existingError = parent.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }
      
      // Add new error message
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.style.cssText = `
        position: absolute;
        bottom: -25px;
        left: 0;
        color: #ff4444;
        font-size: 14px;
        font-family: "Inria Sans", Helvetica;
      `;
      errorDiv.textContent = message;
      parent.appendChild(errorDiv);
    }
  }

  clearFieldError(field) {
    const parent = field.closest('.overlap-3, .overlap-4, .overlap-5, .overlap-6, .overlap-7, .overlap-8');
    if (parent) {
      parent.style.borderColor = '#e0e0e0';
      const errorMessage = parent.querySelector('.error-message');
      if (errorMessage) {
        errorMessage.remove();
      }
    }
  }

  updateRegistrationState() {
    const canRegister = this.privacyPolicyCheckbox.checked && this.termsOfUseCheckbox.checked;
    this.registerBtn.style.opacity = canRegister ? '1' : '0.6';
    this.registerBtn.style.cursor = canRegister ? 'pointer' : 'not-allowed';
  }

  handleRegistration() {
    // Validate all fields
    const isEmailValid = this.validateEmail();
    const isPasswordValid = this.validatePassword();
    const isPasswordMatchValid = this.validatePasswordMatch();
    const isUsernameValid = this.validateUsername();
    const isPhoneValid = this.validatePhone();
    
    // Check required checkboxes
    if (!this.privacyPolicyCheckbox.checked) {
      this.showNotification('Please accept the privacy policy', 'error');
      return;
    }
    
    if (!this.termsOfUseCheckbox.checked) {
      this.showNotification('Please accept the terms of use', 'error');
      return;
    }
    
    if (!isEmailValid || !isPasswordValid || !isPasswordMatchValid || !isUsernameValid || !isPhoneValid) {
      this.showNotification('Please fix the errors above', 'error');
      return;
    }
    
    // Collect form data
    this.formData = {
      email: this.emailInput.value.trim(),
      password: this.passwordInput.value,
      username: this.usernameInput.value.trim(),
      city: this.cityInput.value.trim(),
      phone: this.phoneInput.value.trim(),
      rememberMe: this.rememberMeCheckbox.checked,
      privacyPolicy: this.privacyPolicyCheckbox.checked,
      termsOfUse: this.termsOfUseCheckbox.checked
    };
    
    // Simulate registration process
    this.showNotification('Registration in progress...', 'info');
    this.registerBtn.style.opacity = '0.6';
    
    setTimeout(() => {
      this.showNotification('Registration successful! Welcome to VilleGo!', 'success');
      this.registerBtn.style.opacity = '1';
      console.log('Registration data:', this.formData);
      
      // Simulate redirect after successful registration
      setTimeout(() => {
        this.showNotification('Redirecting to dashboard...', 'info');
      }, 2000);
    }, 1500);
  }

  handleGoogleLogin() {
    this.showNotification('Redirecting to Google login...', 'info');
    // Simulate Google OAuth
    setTimeout(() => {
      this.showNotification('Google login would open here', 'info');
    }, 1000);
  }

  handleFacebookLogin() {
    this.showNotification('Redirecting to Facebook login...', 'info');
    // Simulate Facebook OAuth
    setTimeout(() => {
      this.showNotification('Facebook login would open here', 'info');
    }, 1000);
  }

  handleBack() {
    this.showNotification('Going back to previous page...', 'info');
    // Simulate navigation
    setTimeout(() => {
      window.history.back();
    }, 500);
  }

  handleLoginRedirect() {
    this.showNotification('Redirecting to login page...', 'info');
    // Simulate redirect to login
    setTimeout(() => {
      this.showNotification('Login page would load here', 'info');
    }, 1000);
  }

  showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    const colors = {
      success: '#007f5f',
      error: '#ff4444',
      info: '#4460a0'
    };
    
    notification.style.cssText = `
      position: fixed;
      top: 30px;
      right: 30px;
      background-color: ${colors[type]};
      color: white;
      padding: 15px 25px;
      border-radius: 8px;
      font-family: "Inria Sans", Helvetica;
      font-weight: 700;
      font-size: 16px;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 4000);
  }
}

// Initialize the form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new RegistrationForm();
});

// Add some interactive animations
document.addEventListener('DOMContentLoaded', () => {
  // Add hover effects to form fields
  const formFields = document.querySelectorAll('.overlap-3, .overlap-4, .overlap-5, .overlap-6, .overlap-7, .overlap-8');
  
  formFields.forEach(field => {
    const input = field.querySelector('.form-input');
    
    field.addEventListener('mouseenter', () => {
      if (field.style.borderColor !== 'rgb(255, 68, 68)') { // Don't override error state
        field.style.borderColor = '#007f5f';
      }
    });
    
    field.addEventListener('mouseleave', () => {
      if (!input.matches(':focus') && field.style.borderColor !== 'rgb(255, 68, 68)') {
        field.style.borderColor = '#e0e0e0';
      }
    });
  });
  
  // Add loading animation to buttons
  const buttons = document.querySelectorAll('.overlap-group, .group-wrapper, .view-wrapper, .div-wrapper');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });
});
