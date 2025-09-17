// VilleGo Interactive Features
class VilleGoApp {
  constructor() {
    this.init();
    this.setupEventListeners();
    this.setupMobileMenu();
    this.setupNotifications();
    this.loadUserData();
  }

  init() {
    // Initialize app state
    this.userBalance = 0.00;
    this.userPoints = 0;
    this.isLoggedIn = false;
    this.messages = [];
    
    // Add loading animation
    setTimeout(() => {
      document.querySelector('.loading').style.opacity = '1';
    }, 100);
  }

  setupEventListeners() {
    // Profile card interactions
    const profileCard = document.getElementById('profileCard');
    if (profileCard) {
      profileCard.addEventListener('click', () => this.showProfileDetails());
    }

    // Balance card interactions
    const balanceCard = document.getElementById('balanceCard');
    const topUpBtn = document.getElementById('topUpBtn');
    if (balanceCard) {
      balanceCard.addEventListener('click', () => this.showBalanceDetails());
    }
    if (topUpBtn) {
      topUpBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.showTopUpModal();
      });
    }

    // Points card interactions
    const pointsCard = document.getElementById('pointsCard');
    if (pointsCard) {
      pointsCard.addEventListener('click', () => this.showPointsDetails());
    }

    // Menu item interactions
    const menuItems = document.querySelectorAll('[data-action]');
    menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const action = item.getAttribute('data-action');
        this.handleMenuAction(action);
      });
    });

    // Message panel interactions
    const sendBtn = document.getElementById('sendBtn');
    const messageText = document.getElementById('messageText');
    if (sendBtn && messageText) {
      sendBtn.addEventListener('click', () => this.sendMessage());
      messageText.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });
    }

    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    const searchUser = document.getElementById('searchUser');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => this.showSearchModal());
    }
    if (searchUser) {
      searchUser.addEventListener('click', () => this.showUserSearchModal());
    }

    // App store buttons
    const appStore = document.getElementById('appStore');
    const googlePlay = document.getElementById('googlePlay');
    const microsoftStore = document.getElementById('microsoftStore');
    
    if (appStore) {
      appStore.addEventListener('click', () => this.openAppStore('ios'));
    }
    if (googlePlay) {
      googlePlay.addEventListener('click', () => this.openAppStore('android'));
    }
    if (microsoftStore) {
      microsoftStore.addEventListener('click', () => this.openAppStore('windows'));
    }

    // Phone preview interaction
    const phonePreview = document.getElementById('phonePreview');
    if (phonePreview) {
      phonePreview.addEventListener('click', () => this.showMobilePreview());
    }

    // Logo interaction
    const logoMain = document.getElementById('logoMain');
    if (logoMain) {
      logoMain.addEventListener('click', () => this.goToHome());
    }

    // Contact info interactions
    const phoneNumber = document.getElementById('phoneNumber');
    const emailAddress = document.getElementById('emailAddress');
    if (phoneNumber) {
      phoneNumber.addEventListener('click', () => this.callPhone());
    }
    if (emailAddress) {
      emailAddress.addEventListener('click', () => this.sendEmail());
    }

    // Profile image interaction
    const profileImage = document.getElementById('profileImage');
    if (profileImage) {
      profileImage.addEventListener('click', () => this.changeProfileImage());
    }

    // Blocked tab interaction
    const blockedTab = document.getElementById('blockedTab');
    if (blockedTab) {
      blockedTab.addEventListener('click', () => this.showBlockedMessages());
    }
  }

  setupMobileMenu() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    if (hamburgerMenu && mobileMenu) {
      hamburgerMenu.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeMenu) {
      closeMenu.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    }

    if (menuOverlay) {
      menuOverlay.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    }

    // Mobile menu items
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
    mobileMenuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const action = item.getAttribute('data-action');
        this.handleMenuAction(action);
        this.closeMobileMenu();
      });
    });
  }

  closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (menuOverlay) menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  setupNotifications() {
    // Create notification container if it doesn't exist
    if (!document.querySelector('.notification-container')) {
      const container = document.createElement('div');
      container.className = 'notification-container';
      document.body.appendChild(container);
    }
  }

  showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    // Hide notification
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, duration);
  }

  loadUserData() {
    // Simulate loading user data
    setTimeout(() => {
      this.updateBalance(125.50);
      this.updatePoints(340);
      this.showNotification('მომხმარებლის მონაცემები ჩაიტვირთა', 'success');
    }, 1000);
  }

  updateBalance(amount) {
    this.userBalance = amount;
    const balanceElement = document.getElementById('balanceAmount');
    if (balanceElement) {
      balanceElement.textContent = amount.toFixed(2);
      balanceElement.style.animation = 'fadeIn 0.5s ease';
    }
  }

  updatePoints(points) {
    this.userPoints = points;
    const pointsElement = document.getElementById('pointsAmount');
    if (pointsElement) {
      pointsElement.textContent = `${points} ქულა`;
      pointsElement.style.animation = 'fadeIn 0.5s ease';
    }
  }

  showProfileDetails() {
    this.showNotification('პროფილის დეტალები იხსნება...', 'info');
    // Simulate profile details modal
    setTimeout(() => {
      alert('პროფილის დეტალები:\n\nსახელი: Mari888\nID: 9192679121\nსტატუსი: აქტიური\nრეგისტრაციის თარიღი: 2024-01-15');
    }, 500);
  }

  showBalanceDetails() {
    this.showNotification('ბალანსის ისტორია იხსნება...', 'info');
    setTimeout(() => {
      alert(`ბალანსის დეტალები:\n\nმიმდინარე ბალანსი: ${this.userBalance.toFixed(2)} ლარი\nბოლო ტრანზაქცია: +25.00 ლარი\nთარიღი: 2024-12-20`);
    }, 500);
  }

  showTopUpModal() {
    const amount = prompt('შეიყვანეთ თანხა (ლარი):');
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
      const newBalance = this.userBalance + parseFloat(amount);
      this.updateBalance(newBalance);
      this.showNotification(`ბალანსი შეივსო ${amount} ლარით`, 'success');
    } else if (amount !== null) {
      this.showNotification('გთხოვთ შეიყვანოთ სწორი თანხა', 'error');
    }
  }

  showPointsDetails() {
    this.showNotification('ქულების ისტორია იხსნება...', 'info');
    setTimeout(() => {
      alert(`ქულების დეტალები:\n\nმიმდინარე ქულები: ${this.userPoints}\nბოლო მოპოვება: +50 ქულა\nთარიღი: 2024-12-19`);
    }, 500);
  }

  handleMenuAction(action) {
    const actions = {
      'add-listing': () => this.showNotification('განცხადების დამატება...', 'info'),
      'my-listings': () => this.showNotification('ჩემი განცხადებები იხსნება...', 'info'),
      'my-cards': () => this.showNotification('ჩემი ბარათები იხსნება...', 'info'),
      'my-orders': () => this.showNotification('ჩემი შეკვეთები იხსნება...', 'info'),
      'offers': () => this.showNotification('შეთავაზებები იხსნება...', 'info'),
      'addresses': () => this.showNotification('მისამართები იხსნება...', 'info'),
      'messages': () => this.showNotification('წერილები იხსნება...', 'info'),
      'cart': () => this.showNotification('კალათა იხსნება...', 'info'),
      'settings': () => this.showNotification('პარამეტრები იხსნება...', 'info'),
      'logout': () => this.logout(),
      'blog': () => this.showNotification('ბლოგი იხსნება...', 'info'),
      'farmers': () => this.showNotification('ფერმერები იხსნება...', 'info'),
      'about': () => this.showNotification('ჩვენს შესახებ იხსნება...', 'info'),
      'contact': () => this.showNotification('კონტაქტი იხსნება...', 'info'),
      'map': () => this.showNotification('რუკა იხსნება...', 'info'),
      'search': () => this.showSearchModal()
    };

    if (actions[action]) {
      actions[action]();
    } else {
      this.showNotification('ფუნქცია მალე დაემატება...', 'info');
    }
  }

  sendMessage() {
    const messageText = document.getElementById('messageText');
    if (messageText && messageText.textContent.trim()) {
      const message = messageText.textContent.trim();
      this.messages.push({
        text: message,
        timestamp: new Date(),
        sender: 'user'
      });
      
      this.showNotification('შეტყობინება გაიგზავნა', 'success');
      messageText.textContent = 'მე: ';
      
      // Simulate response
      setTimeout(() => {
        this.showNotification('პასუხი მიღებულია', 'info');
      }, 2000);
    }
  }

  showSearchModal() {
    const query = prompt('რას ეძებთ?');
    if (query) {
      this.showNotification(`ძებნა: "${query}"...`, 'info');
      setTimeout(() => {
        this.showNotification('ძებნის შედეგები მზადაა', 'success');
      }, 1500);
    }
  }

  showUserSearchModal() {
    const username = prompt('შეიყვანეთ მომხმარებლის სახელი:');
    if (username) {
      this.showNotification(`მომხმარებლის ძებნა: "${username}"...`, 'info');
      setTimeout(() => {
        this.showNotification('მომხმარებელი ნაპოვნია', 'success');
      }, 1000);
    }
  }

  openAppStore(platform) {
    const urls = {
      ios: 'https://apps.apple.com/app/villego',
      android: 'https://play.google.com/store/apps/details?id=com.villego',
      windows: 'https://www.microsoft.com/store/apps/villego'
    };
    
    this.showNotification(`${platform.toUpperCase()} აპლიკაცია იხსნება...`, 'info');
    
    // Simulate opening app store
    setTimeout(() => {
      if (confirm(`გსურთ ${platform.toUpperCase()} აპლიკაციის ჩამოტვირთვა?`)) {
        window.open(urls[platform] || '#', '_blank');
      }
    }, 500);
  }

  showMobilePreview() {
    this.showNotification('მობილური აპლიკაციის პრევიუ...', 'info');
    setTimeout(() => {
      alert('მობილური აპლიკაცია:\n\n✓ სწრაფი და მარტივი\n✓ ყველა ფუნქცია ხელმისაწვდომია\n✓ ოფლაინ რეჟიმი\n✓ Push შეტყობინებები');
    }, 500);
  }

  goToHome() {
    this.showNotification('მთავარ გვერდზე გადასვლა...', 'info');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  }

  callPhone() {
    const phone = '+995555888888';
    this.showNotification('ზარის განხორციელება...', 'info');
    if (confirm(`გსურთ ზარი: ${phone}?`)) {
      window.location.href = `tel:${phone}`;
    }
  }

  sendEmail() {
    const email = 'VilleGoLLC@gmail.com';
    this.showNotification('ელ-ფოსტის გახსნა...', 'info');
    if (confirm(`გსურთ წერილის გაგზავნა: ${email}?`)) {
      window.location.href = `mailto:${email}?subject=VilleGo - კითხვა&body=გამარჯობა,%0D%0A%0D%0A`;
    }
  }

  changeProfileImage() {
    this.showNotification('პროფილის სურათის შეცვლა...', 'info');
    if (confirm('გსურთ პროფილის სურათის შეცვლა?')) {
      // Simulate file upload
      setTimeout(() => {
        this.showNotification('პროფილის სურათი განახლდა', 'success');
      }, 1000);
    }
  }

  showBlockedMessages() {
    this.showNotification('დაბლოკილი შეტყობინებები იხსნება...', 'info');
    setTimeout(() => {
      alert('დაბლოკილი შეტყობინებები:\n\n• სპამ შეტყობინება #1\n• სპამ შეტყობინება #2\n• დაბლოკილი მომხმარებელი: user123');
    }, 500);
  }

  logout() {
    if (confirm('დარწმუნებული ხართ, რომ გსურთ გასვლა?')) {
      this.showNotification('სისტემიდან გასვლა...', 'info');
      setTimeout(() => {
        this.isLoggedIn = false;
        this.userBalance = 0;
        this.userPoints = 0;
        this.updateBalance(0);
        this.updatePoints(0);
        this.showNotification('წარმატებით გავიდით სისტემიდან', 'success');
      }, 1000);
    }
  }

  // Utility methods
  formatCurrency(amount) {
    return `${amount.toFixed(2)} ლარი`;
  }

  formatDate(date) {
    return date.toLocaleDateString('ka-GE');
  }

  // Animation helpers
  animateElement(element, animation) {
    element.style.animation = animation;
    element.addEventListener('animationend', () => {
      element.style.animation = '';
    }, { once: true });
  }

  // Scroll to element
  scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Local storage helpers
  saveToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }

  loadFromStorage(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('Could not load from localStorage:', e);
      return null;
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.villeGoApp = new VilleGoApp();
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
  // Close mobile menu on resize to desktop
  if (window.innerWidth > 768) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (menuOverlay) menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Handle scroll events for header effects
window.addEventListener('scroll', () => {
  const header = document.querySelector('.overlap-group-3');
  if (header) {
    if (window.scrollY > 100) {
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K for search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    if (window.villeGoApp) {
      window.villeGoApp.showSearchModal();
    }
  }
  
  // Escape to close mobile menu
  if (e.key === 'Escape') {
    if (window.villeGoApp) {
      window.villeGoApp.closeMobileMenu();
    }
  }
});

// Service Worker registration for PWA features
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VilleGoApp;
}
