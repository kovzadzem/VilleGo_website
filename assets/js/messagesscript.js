// VilleGo Interactive Features
document.addEventListener('DOMContentLoaded', function() {
  console.log('VilleGo loaded successfully!');
  
  // Add loading animation
  document.body.classList.add('loading');
  
  // Initialize interactive features
  initializeNavigation();
  initializeChatFeatures();
  initializeSearchFeatures();
  initializeAppDownloads();
  initializeAnimations();
  initializeSocialMedia();
});

// Navigation functionality
function initializeNavigation() {
  const navItems = document.querySelectorAll('.text-wrapper-10, .text-wrapper-11, .text-wrapper-12, .text-wrapper-13, .text-wrapper-15');
  const backButton = document.querySelector('.overlap-group');
  const logo = document.querySelector('.text-wrapper-9');
  
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const text = this.textContent.trim();
      console.log(`Navigating to: ${text}`);
      
      // Simulate navigation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
        showNotification(`გადავდივართ: ${text}`);
      }, 150);
    });
  });
  
  // Back button functionality
  if (backButton) {
    backButton.addEventListener('click', function() {
      console.log('Going back...');
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
        showNotification('უკან დაბრუნება...');
      }, 150);
    });
  }
  
  // Logo click
  if (logo) {
    logo.addEventListener('click', function() {
      console.log('Logo clicked - going to home');
      showNotification('მთავარ გვერდზე გადასვლა');
    });
  }
}

// Chat functionality
function initializeChatFeatures() {
  const chatMessages = document.querySelectorAll('.text-wrapper-2, .p, .text-wrapper-3, .text-wrapper-4, .text-wrapper-5');
  const textBar = document.querySelector('.TEXT-BAR');
  const sendButton = document.querySelector('.TEXT-BAR-2');
  const sendIcon = document.querySelector('.vector');
  
  // Add chat message class for animations
  chatMessages.forEach((message, index) => {
    message.classList.add('chat-message');
  });
  
  // Send button functionality
  if (sendButton && textBar) {
    sendButton.addEventListener('click', function() {
      sendMessage();
    });
    
    // Enter key to send message
    textBar.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
  
  // Send icon click
  if (sendIcon) {
    sendIcon.addEventListener('click', function() {
      sendMessage();
    });
  }
  
  function sendMessage() {
    const messageText = document.querySelector('.text-wrapper-7');
    if (messageText) {
      console.log('Sending message:', messageText.textContent);
      
      // Animation effect
      sendButton.style.transform = 'scale(0.9)';
      setTimeout(() => {
        sendButton.style.transform = 'scale(1)';
        showNotification('შეტყობინება გაიგზავნა!');
      }, 150);
    }
  }
}

// Search functionality
function initializeSearchFeatures() {
  const searchBar = document.querySelector('.rectangle-5');
  const searchIcon = document.querySelector('.vector-3');
  const searchText = document.querySelector('.text-wrapper-14');
  
  if (searchBar && searchIcon) {
    searchBar.addEventListener('click', function() {
      console.log('Search activated');
      this.style.backgroundColor = '#5fa86e';
      setTimeout(() => {
        this.style.backgroundColor = '#7fbf8e';
      }, 200);
    });
    
    searchIcon.addEventListener('click', function() {
      console.log('Search icon clicked');
      showNotification('ძებნის ფუნქცია გააქტიურდა');
    });
  }
}

// App download functionality
function initializeAppDownloads() {
  const appStores = document.querySelectorAll('.mobile-app-store, .mobile-app-store-2, .mobile-app-store-3');
  const phonePreview = document.querySelector('.generic-phone-mock');
  
  appStores.forEach((store, index) => {
    store.addEventListener('click', function() {
      const storeNames = ['Microsoft Store', 'App Store', 'Google Play'];
      console.log(`Downloading from: ${storeNames[index]}`);
      
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1.05)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
          showNotification(`${storeNames[index]}-დან ჩამოტვირთვა დაიწყო`);
        }, 150);
      }, 150);
    });
  });
  
  // Phone preview interaction
  if (phonePreview) {
    phonePreview.addEventListener('click', function() {
      console.log('Phone preview clicked');
      this.style.transform = 'scale(1.1) rotate(5deg)';
      setTimeout(() => {
        this.style.transform = 'scale(1.05) rotate(0deg)';
      }, 300);
    });
  }
}

// Animation effects
function initializeAnimations() {
  const profileImage = document.querySelector('.profile');
  const adSection = document.querySelector('.text-wrapper-6');
  const userAvatars = document.querySelectorAll('.img, .rectangle-3');
  
  // Profile image interaction
  if (profileImage) {
    profileImage.addEventListener('click', function() {
      console.log('Profile clicked');
      this.style.filter = 'brightness(1.1)';
      setTimeout(() => {
        this.style.filter = 'brightness(1)';
      }, 300);
    });
  }
  
  // Ad section interaction
  if (adSection) {
    adSection.addEventListener('click', function() {
      console.log('Ad section clicked');
      showNotification('რეკლამის განთავსება');
    });
  }
  
  // User avatar interactions
  userAvatars.forEach(avatar => {
    avatar.addEventListener('click', function() {
      console.log('User avatar clicked');
      this.style.borderColor = '#007f5f';
      setTimeout(() => {
        this.style.borderColor = '#000000';
      }, 500);
    });
  });
}

// Social media and footer links
function initializeSocialMedia() {
  const socialIcons = document.querySelectorAll('.vector-8, .d, .vector-9, .image-3, .image-4, .image-5');
  const footerLinks = document.querySelectorAll('.text-wrapper-17, .text-wrapper-18, .text-wrapper-19, .text-wrapper-20, .text-wrapper-21, .text-wrapper-22, .text-wrapper-23, .text-wrapper-24, .text-wrapper-25');
  const headerIcons = document.querySelectorAll('.vector-4, .vector-5, .vector-6, .plus-circle, .ellipse');
  
  // Social media icons
  socialIcons.forEach((icon, index) => {
    icon.addEventListener('click', function() {
      const platforms = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube', 'TikTok'];
      console.log(`Opening: ${platforms[index] || 'Social Media'}`);
      
      this.style.transform = 'scale(1.3) rotate(360deg)';
      setTimeout(() => {
        this.style.transform = 'scale(1.2)';
        showNotification(`${platforms[index] || 'სოციალური მედია'} გაიხსნა`);
      }, 300);
    });
  });
  
  // Footer links
  footerLinks.forEach(link => {
    link.addEventListener('click', function() {
      const linkText = this.textContent.trim();
      console.log(`Footer link clicked: ${linkText}`);
      showNotification(`გვერდი: ${linkText}`);
    });
  });
  
  // Header icons
  headerIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      console.log('Header icon clicked');
      this.style.filter = 'brightness(1.5)';
      setTimeout(() => {
        this.style.filter = 'brightness(1)';
      }, 200);
    });
  });
}

// Notification system
function showNotification(message) {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #007f5f;
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    z-index: 10000;
    box-shadow: 0 4px 15px rgba(0, 127, 95, 0.3);
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Smooth scrolling for internal links
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Ctrl/Cmd + K for search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchBar = document.querySelector('.rectangle-5');
    if (searchBar) {
      searchBar.click();
      showNotification('ძებნის ფუნქცია გააქტიურდა (Ctrl+K)');
    }
  }
  
  // Escape to close notifications
  if (e.key === 'Escape') {
    const notification = document.querySelector('.notification');
    if (notification) {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }
  }
});

// Performance monitoring
function logPerformance() {
  if (window.performance && window.performance.timing) {
    const timing = window.performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    console.log(`Page load time: ${loadTime}ms`);
  }
}

// Initialize performance monitoring
window.addEventListener('load', logPerformance);

// Error handling
window.addEventListener('error', function(e) {
  console.error('JavaScript error:', e.error);
});

// Console welcome message
console.log(`
🌟 VilleGo - ფერმერიდან მომხმარებლამდე! 🌟
Version: 2.0
Loaded at: ${new Date().toLocaleString('ka-GE')}
Features: Interactive UI, Animations, Chat, Search, Social Media
`);
