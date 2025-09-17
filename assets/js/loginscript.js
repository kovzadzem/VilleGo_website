// Login Form Functionality
class LoginForm {
  constructor() {
    this.emailInput = document.getElementById('emailInput');
    this.passwordInput = document.getElementById('passwordInput');
    this.loginButton = document.getElementById('loginButton');
    this.googleLogin = document.getElementById('googleLogin');
    this.facebookLogin = document.getElementById('facebookLogin');
    this.backButton = document.getElementById('backButton');
    this.rememberMe = document.getElementById('rememberMe');
    this.languageToggle = document.getElementById('languageToggle');
    this.registerLink = document.getElementById('registerLink');
    
    this.isRemembered = false;
    this.currentLanguage = 'ge';
    
    this.initializeEventListeners();
    this.setupResponsiveScaling();
  }

  initializeEventListeners() {
    // Login button functionality
    this.loginButton.addEventListener('click', () => this.handleLogin());
    
    // Social login buttons
    this.googleLogin.addEventListener('click', () => this.handleGoogleLogin());
    this.facebookLogin.addEventListener('click', () => this.handleFacebookLogin());
    
    // Back button
    this.backButton.addEventListener('click', () => this.handleBack());
    
    // Remember me checkbox
    this.rememberMe.addEventListener('click', () => this.toggleRememberMe());
    
    // Language toggle
    this.languageToggle.addEventListener('click', () => this.toggleLanguage());
    
    // Register link
    this.registerLink.addEventListener('click', () => this.handleRegister());
    
    // Enter key support for form submission
    this.emailInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.passwordInput.focus();
    });
    
    this.passwordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleLogin();
    });
    
    // Input validation
    this.emailInput.addEventListener('input', () => this.validateEmail());
    this.passwordInput.addEventListener('input', () => this.validatePassword());
  }

  handleLogin() {
    const email = this.emailInput.value.trim();
    const password = this.passwordInput.value.trim();
    
    if (!email || !password) {
      this.showNotification('გთხოვთ შეავსოთ ყველა ველი', 'error');
      return;
    }
    
    if (!this.isValidEmail(email)) {
      this.showNotification('გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა', 'error');
      return;
    }
    
    // Simulate login process
    this.showNotification('შესვლა...', 'loading');
    
    setTimeout(() => {
      // Simulate successful login
      this.showNotification('წარმატებით შეხვედით!', 'success');
      
      if (this.isRemembered) {
        localStorage.setItem('rememberedEmail', email);
      }
      
      // Redirect or perform login action
      setTimeout(() => {
        console.log('Login successful for:', email);
      }, 1500);
    }, 2000);
  }

  handleGoogleLogin() {
    this.showNotification('Google-ით შესვლა...', 'loading');
    
    setTimeout(() => {
      this.showNotification('Google შესვლა წარმატებული!', 'success');
      console.log('Google login initiated');
    }, 1500);
  }

  handleFacebookLogin() {
    this.showNotification('Facebook-ით შესვლა...', 'loading');
    
    setTimeout(() => {
      this.showNotification('Facebook შესვლა წარმატებული!', 'success');
      console.log('Facebook login initiated');
    }, 1500);
  }

  handleBack() {
    this.showNotification('უკან დაბრუნება...', 'info');
    
    setTimeout(() => {
      console.log('Navigating back');
      // Add navigation logic here
    }, 500);
  }

  toggleRememberMe() {
    this.isRemembered = !this.isRemembered;
    
    // Visual feedback
    if (this.isRemembered) {
      this.rememberMe.style.filter = 'brightness(0.7)';
      this.showNotification('დამახსოვრება ჩართულია', 'info');
    } else {
      this.rememberMe.style.filter = 'brightness(1)';
      this.showNotification('დამახსოვრება გამორთულია', 'info');
    }
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'ge' ? 'en' : 'ge';
    
    // Visual feedback
    this.languageToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
      this.languageToggle.style.transform = 'scale(1)';
    }, 150);
    
    this.showNotification(
      this.currentLanguage === 'ge' ? 'ენა: ქართული' : 'Language: English', 
      'info'
    );
  }

  handleRegister() {
    this.showNotification('რეგისტრაციის გვერდზე გადასვლა...', 'info');
    
    setTimeout(() => {
      console.log('Navigating to registration');
      // Add navigation logic here
    }, 500);
  }

  validateEmail() {
    const email = this.emailInput.value.trim();
    const emailField = this.emailInput.parentElement;
    
    if (email && !this.isValidEmail(email)) {
      emailField.style.borderColor = '#ff4444';
    } else {
      emailField.style.borderColor = email ? '#007f5f' : 'transparent';
    }
  }

  validatePassword() {
    const password = this.passwordInput.value.trim();
    const passwordField = this.passwordInput.parentElement;
    
    if (password.length > 0 && password.length < 6) {
      passwordField.style.borderColor = '#ff4444';
    } else {
      passwordField.style.borderColor = password ? '#007f5f' : 'transparent';
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '12px 24px',
      borderRadius: '8px',
      color: 'white',
      fontFamily: '"Inria Sans", Helvetica',
      fontWeight: '700',
      fontSize: '16px',
      zIndex: '1000',
      opacity: '0',
      transition: 'all 0.3s ease'
    });
    
    // Set background color based on type
    const colors = {
      success: '#007f5f',
      error: '#ff4444',
      loading: '#4460a0',
      info: '#767676'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to DOM and animate
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // Auto remove after 3 seconds (except loading)
    if (type !== 'loading') {
      setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }
  }

  setupResponsiveScaling() {
    const updateScale = () => {
      const container = document.querySelector('.screen .div');
      const scaleX = window.innerWidth / 1920;
      const scaleY = window.innerHeight / 1080;
      const scale = Math.min(scaleX, scaleY);
      
      if (scale < 1) {
        container.style.transform = `scale(${scale})`;
        container.style.transformOrigin = 'top left';
      } else {
        container.style.transform = 'scale(1)';
      }
    };
    
    window.addEventListener('resize', updateScale);
    updateScale(); // Initial call
  }

  // Load remembered email on page load
  loadRememberedData() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      this.emailInput.value = rememberedEmail;
      this.isRemembered = true;
      this.rememberMe.style.filter = 'brightness(0.7)';
    }
  }
}

// Initialize the login form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = new LoginForm();
  loginForm.loadRememberedData();
  
  // Add some interactive animations
  const addHoverEffects = () => {
    const interactiveElements = document.querySelectorAll(
      '.overlap-group, .group-wrapper, .div-wrapper, .overlap-wrapper, .group-3, .group-4, .text-wrapper-4'
    );
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.style.transform = element.style.transform + ' scale(1.02)';
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = element.style.transform.replace(' scale(1.02)', '');
      });
    });
  };
  
  addHoverEffects();
});

// Add some keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // ESC key to clear form
  if (e.key === 'Escape') {
    document.getElementById('emailInput').value = '';
    document.getElementById('passwordInput').value = '';
  }
  
  // Ctrl/Cmd + Enter to submit form
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    document.getElementById('loginButton').click();
  }
});
