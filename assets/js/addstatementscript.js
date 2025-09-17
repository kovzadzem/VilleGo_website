// VilleGo Interactive Features
class VilleGoApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupNotifications();
    this.setupModal();
    this.setupFormValidation();
  }

  setupEventListeners() {
    // Navigation menu interactions
    const navItems = document.querySelectorAll('.text-wrapper-10, .text-wrapper-11, .text-wrapper-12, .text-wrapper-13, .text-wrapper-15');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        this.handleNavigation(e.target.textContent);
      });
    });

    // Category buttons
    const categoryButtons = document.querySelectorAll('.overlap-group, .overlap-6, .overlap-7, .overlap-8, .overlap-9, .overlap-10, .overlap-11, .overlap-12, .overlap-13, .overlap-14, .overlap-15, .overlap-16, .overlap-17, .overlap-18, .overlap-19, .overlap-20');
    categoryButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.handleCategorySelection(e.currentTarget);
      });
    });

    // Action buttons
    const saveButton = document.querySelector('.div-wrapper');
    const publishButton = document.querySelector('.overlap-21');
    const cancelButton = document.querySelector('.overlap-group-2');
    const resetButton = document.querySelector('.overlap-22');

    if (saveButton) {
      saveButton.addEventListener('click', () => this.handleSave());
    }
    if (publishButton) {
      publishButton.addEventListener('click', () => this.handlePublish());
    }
    if (cancelButton) {
      cancelButton.addEventListener('click', () => this.handleCancel());
    }
    if (resetButton) {
      resetButton.addEventListener('click', () => this.handleReset());
    }

    // Icon buttons in header
    const iconButtons = document.querySelectorAll('.vector-5, .vector-6, .vector-7, .plus-circle, .ellipse');
    iconButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.handleIconClick(e.currentTarget);
      });
    });

    // App store buttons
    const appStoreButtons = document.querySelectorAll('.mobile-app-store, .mobile-app-store-2, .mobile-app-store-3');
    appStoreButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.handleAppStoreClick(e.currentTarget);
      });
    });

    // Social media icons
    const socialIcons = document.querySelectorAll('.vector-9, .d, .group-7, .image-3, .image-4, .image-5');
    socialIcons.forEach(icon => {
      icon.addEventListener('click', (e) => {
        this.handleSocialClick(e.currentTarget);
      });
    });

    // Search functionality
    const searchBar = document.querySelector('.rectangle-3');
    if (searchBar) {
      searchBar.addEventListener('click', () => {
        this.handleSearch();
      });
    }
  }

  setupNotifications() {
    // Create notification container
    if (!document.querySelector('.notification-container')) {
      const container = document.createElement('div');
      container.className = 'notification-container';
      document.body.appendChild(container);
    }
  }

  setupModal() {
    // Create modal HTML
    const modalHTML = `
      <div id="appModal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2 id="modalTitle">Modal Title</h2>
          <p id="modalMessage">Modal message content</p>
          <div id="modalActions"></div>
        </div>
      </div>
    `;
    
    if (!document.querySelector('#appModal')) {
      document.body.insertAdjacentHTML('beforeend', modalHTML);
      
      // Setup modal close functionality
      const modal = document.getElementById('appModal');
      const closeBtn = document.querySelector('.close');
      
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
      
      window.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    }
  }

  setupFormValidation() {
    // Add form validation for recipe content
    const recipeTitle = document.querySelector('.text-wrapper');
    const recipeContent = document.querySelector('.p');
    
    if (recipeTitle && recipeContent) {
      recipeTitle.addEventListener('blur', () => {
        this.validateField(recipeTitle, 'Title is required');
      });
      
      recipeContent.addEventListener('blur', () => {
        this.validateField(recipeContent, 'Recipe content is required');
      });
    }
  }

  handleNavigation(itemText) {
    this.showNotification(`Navigating to ${itemText}`, 'info');
    
    // Simulate navigation
    setTimeout(() => {
      this.showNotification(`Welcome to ${itemText} section!`, 'success');
    }, 1000);
  }

  handleCategorySelection(button) {
    // Remove active class from all category buttons
    const allCategories = document.querySelectorAll('.overlap-group, .overlap-6, .overlap-7, .overlap-8, .overlap-9, .overlap-10, .overlap-11, .overlap-12, .overlap-13, .overlap-14, .overlap-15, .overlap-16, .overlap-17, .overlap-18, .overlap-19, .overlap-20');
    allCategories.forEach(cat => cat.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    button.style.backgroundColor = '#126a3a';
    button.style.color = '#ffffff';
    
    this.showNotification('Category selected successfully!', 'success');
  }

  handleSave() {
    const loading = this.showLoading('Saving...');
    
    setTimeout(() => {
      this.hideLoading(loading);
      this.showNotification('Recipe saved successfully!', 'success');
    }, 2000);
  }

  handlePublish() {
    const title = document.querySelector('.text-wrapper').textContent;
    const content = document.querySelector('.p').textContent;
    
    if (!title || !content) {
      this.showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    this.showModal(
      'Confirm Publication',
      'Are you sure you want to publish this recipe? It will be visible to all users.',
      [
        {
          text: 'Cancel',
          class: 'btn-secondary',
          action: () => this.hideModal()
        },
        {
          text: 'Publish',
          class: 'btn-primary',
          action: () => this.confirmPublish()
        }
      ]
    );
  }

  confirmPublish() {
    this.hideModal();
    const loading = this.showLoading('Publishing...');
    
    setTimeout(() => {
      this.hideLoading(loading);
      this.showNotification('Recipe published successfully!', 'success');
    }, 2500);
  }

  handleCancel() {
    this.showModal(
      'Confirm Cancellation',
      'Are you sure you want to cancel? All unsaved changes will be lost.',
      [
        {
          text: 'Continue Editing',
          class: 'btn-secondary',
          action: () => this.hideModal()
        },
        {
          text: 'Cancel & Exit',
          class: 'btn-danger',
          action: () => this.confirmCancel()
        }
      ]
    );
  }

  confirmCancel() {
    this.hideModal();
    this.showNotification('Recipe creation cancelled', 'warning');
    
    // Reset form
    setTimeout(() => {
      this.resetForm();
    }, 1000);
  }

  handleReset() {
    this.showModal(
      'Reset Form',
      'This will clear all content and start over. Are you sure?',
      [
        {
          text: 'Keep Content',
          class: 'btn-secondary',
          action: () => this.hideModal()
        },
        {
          text: 'Reset',
          class: 'btn-warning',
          action: () => this.confirmReset()
        }
      ]
    );
  }

  confirmReset() {
    this.hideModal();
    this.resetForm();
    this.showNotification('Form reset successfully', 'info');
  }

  resetForm() {
    // Reset category selections
    const allCategories = document.querySelectorAll('.overlap-group, .overlap-6, .overlap-7, .overlap-8, .overlap-9, .overlap-10, .overlap-11, .overlap-12, .overlap-13, .overlap-14, .overlap-15, .overlap-16, .overlap-17, .overlap-18, .overlap-19, .overlap-20');
    allCategories.forEach(cat => {
      cat.classList.remove('active');
      cat.style.backgroundColor = '#d9d9d9';
      cat.style.color = '#000000';
    });
  }

  handleIconClick(icon) {
    const iconClasses = icon.className;
    let action = '';
    
    if (iconClasses.includes('vector-5')) action = 'Profile';
    else if (iconClasses.includes('vector-6')) action = 'Messages';
    else if (iconClasses.includes('vector-7')) action = 'Notifications';
    else if (iconClasses.includes('plus-circle')) action = 'Add New';
    else if (iconClasses.includes('ellipse')) action = 'Menu';
    
    this.showNotification(`${action} clicked!`, 'info');
  }

  handleAppStoreClick(button) {
    let store = '';
    if (button.classList.contains('mobile-app-store')) store = 'Microsoft Store';
    else if (button.classList.contains('mobile-app-store-2')) store = 'App Store';
    else if (button.classList.contains('mobile-app-store-3')) store = 'Google Play';
    
    this.showNotification(`Redirecting to ${store}...`, 'info');
    
    // Simulate app store redirect
    setTimeout(() => {
      window.open('#', '_blank');
    }, 1000);
  }

  handleSocialClick(icon) {
    const socialPlatforms = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube', 'TikTok'];
    const randomPlatform = socialPlatforms[Math.floor(Math.random() * socialPlatforms.length)];
    
    this.showNotification(`Opening ${randomPlatform}...`, 'info');
  }

  handleSearch() {
    const searchTerm = prompt('Enter search term:');
    if (searchTerm) {
      this.showNotification(`Searching for "${searchTerm}"...`, 'info');
      
      setTimeout(() => {
        this.showNotification(`Found ${Math.floor(Math.random() * 50) + 1} results for "${searchTerm}"`, 'success');
      }, 1500);
    }
  }

  validateField(field, message) {
    if (!field.textContent.trim()) {
      field.style.border = '2px solid #ff0000';
      this.showNotification(message, 'error');
      return false;
    } else {
      field.style.border = '2px solid #126a3a';
      return true;
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {  notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  showLoading(message) {
    const loading = document.createElement('div');
    loading.className = 'notification info';
    loading.innerHTML = `${message} <div class="loading"></div>`;
    
    document.body.appendChild(loading);
    
    setTimeout(() => {
      loading.classList.add('show');
    }, 100);
    
    return loading;
  }

  hideLoading(loadingElement) {
    if (loadingElement && loadingElement.parentNode) {
      loadingElement.classList.remove('show');
      setTimeout(() => {
        if (loadingElement.parentNode) {
          loadingElement.parentNode.removeChild(loadingElement);
        }
      }, 300);
    }
  }

  showModal(title, message, actions = []) {
    const modal = document.getElementById('appModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalActions = document.getElementById('modalActions');
    
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    
    // Clear previous actions
    modalActions.innerHTML = '';
    
    // Add action buttons
    actions.forEach(action => {
      const button = document.createElement('button');
      button.textContent = action.text;
      button.className = action.class || 'btn-default';
      button.style.margin = '5px';
      button.style.padding = '10px 20px';
      button.style.border = 'none';
      button.style.borderRadius = '5px';
      button.style.cursor = 'pointer';
      
      if (action.class === 'btn-primary') {
        button.style.backgroundColor = '#126a3a';
        button.style.color = 'white';
      } else if (action.class === 'btn-danger') {
        button.style.backgroundColor = '#ff0000';
        button.style.color = 'white';
      } else if (action.class === 'btn-warning') {
        button.style.backgroundColor = '#ff5d00';
        button.style.color = 'white';
      } else {
        button.style.backgroundColor = '#d9d9d9';
        button.style.color = 'black';
      }
      
      button.addEventListener('click', action.action);
      modalActions.appendChild(button);
    });
    
    modal.style.display = 'block';
  }

  hideModal() {
    const modal = document.getElementById('appModal');
    modal.style.display = 'none';
  }
}

// Recipe Management System
class RecipeManager {
  constructor() {
    this.recipes = this.loadRecipes();
    this.currentRecipe = null;
  }

  loadRecipes() {
    const stored = localStorage.getItem('villego_recipes');
    return stored ? JSON.parse(stored) : [];
  }

  saveRecipes() {
    localStorage.setItem('villego_recipes', JSON.stringify(this.recipes));
  }

  createRecipe(title, content, categories = []) {
    const recipe = {
      id: Date.now(),
      title: title,
      content: content,
      categories: categories,
      createdAt: new Date().toISOString(),
      published: false,
      views: 0,
      likes: 0
    };
    
    this.recipes.push(recipe);
    this.saveRecipes();
    return recipe;
  }

  updateRecipe(id, updates) {
    const index = this.recipes.findIndex(recipe => recipe.id === id);
    if (index !== -1) {
      this.recipes[index] = { ...this.recipes[index], ...updates };
      this.saveRecipes();
      return this.recipes[index];
    }
    return null;
  }

  deleteRecipe(id) {
    const index = this.recipes.findIndex(recipe => recipe.id === id);
    if (index !== -1) {
      this.recipes.splice(index, 1);
      this.saveRecipes();
      return true;
    }
    return false;
  }

  publishRecipe(id) {
    return this.updateRecipe(id, { published: true, publishedAt: new Date().toISOString() });
  }

  getRecipes(filters = {}) {
    let filtered = [...this.recipes];
    
    if (filters.published !== undefined) {
      filtered = filtered.filter(recipe => recipe.published === filters.published);
    }
    
    if (filters.category) {
      filtered = filtered.filter(recipe => recipe.categories.includes(filters.category));
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.content.toLowerCase().includes(searchTerm)
      );
    }
    
    return filtered;
  }
}

// User Management System
class UserManager {
  constructor() {
    this.currentUser = this.loadCurrentUser();
    this.users = this.loadUsers();
  }

  loadCurrentUser() {
    const stored = localStorage.getItem('villego_current_user');
    return stored ? JSON.parse(stored) : null;
  }

  loadUsers() {
    const stored = localStorage.getItem('villego_users');
    return stored ? JSON.parse(stored) : [];
  }

  saveCurrentUser() {
    localStorage.setItem('villego_current_user', JSON.stringify(this.currentUser));
  }

  saveUsers() {
    localStorage.setItem('villego_users', JSON.stringify(this.users));
  }

  login(username, password) {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = user;
      this.saveCurrentUser();
      return true;
    }
    return false;
  }

  register(userData) {
    const existingUser = this.users.find(u => u.username === userData.username || u.email === userData.email);
    if (existingUser) {
      return { success: false, message: 'User already exists' };
    }
    
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString(),
      recipes: [],
      favorites: []
    };
    
    this.users.push(newUser);
    this.saveUsers();
    return { success: true, user: newUser };
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('villego_current_user');
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }
}

// Analytics System
class AnalyticsManager {
  constructor() {
    this.events = this.loadEvents();
  }

  loadEvents() {
    const stored = localStorage.getItem('villego_analytics');
    return stored ? JSON.parse(stored) : [];
  }

  saveEvents() {
    localStorage.setItem('villego_analytics', JSON.stringify(this.events));
  }

  trackEvent(eventType, data = {}) {
    const event = {
      id: Date.now(),
      type: eventType,
      data: data,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    this.events.push(event);
    this.saveEvents();
    
    // Keep only last 1000 events to prevent storage overflow
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000);
      this.saveEvents();
    }
  }

  getAnalytics(timeRange = '7d') {
    const now = new Date();
    const cutoff = new Date();
    
    switch (timeRange) {
      case '1d':
        cutoff.setDate(now.getDate() - 1);
        break;
      case '7d':
        cutoff.setDate(now.getDate() - 7);
        break;
      case '30d':
        cutoff.setDate(now.getDate() - 30);
        break;
      default:
        cutoff.setDate(now.getDate() - 7);
    }
    
    const recentEvents = this.events.filter(event => new Date(event.timestamp) >= cutoff);
    
    return {
      totalEvents: recentEvents.length,
      eventTypes: this.groupBy(recentEvents, 'type'),
      dailyActivity: this.getDailyActivity(recentEvents),
      topPages: this.getTopPages(recentEvents)
    };
  }

  groupBy(array, key) {
    return array.reduce((result, item) => {
      const group = item[key];
      result[group] = result[group] || [];
      result[group].push(item);
      return result;
    }, {});
  }

  getDailyActivity(events) {
    const daily = {};
    events.forEach(event => {
      const date = new Date(event.timestamp).toDateString();
      daily[date] = (daily[date] || 0) + 1;
    });
    return daily;
  }

  getTopPages(events) {
    const pages = {};
    events.forEach(event => {
      const url = event.url;
      pages[url] = (pages[url] || 0) + 1;
    });
    return Object.entries(pages)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  // Initialize managers
  window.villeGoApp = new VilleGoApp();
  window.recipeManager = new RecipeManager();
  window.userManager = new UserManager();
  window.analyticsManager = new AnalyticsManager();
  
  // Track page load
  window.analyticsManager.trackEvent('page_load', {
    page: 'recipe_editor',
    timestamp: new Date().toISOString()
  });
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Ctrl+S to save
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      window.villeGoApp.handleSave();
      window.analyticsManager.trackEvent('keyboard_shortcut', { action: 'save' });
    }
    
    // Ctrl+Enter to publish
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      window.villeGoApp.handlePublish();
      window.analyticsManager.trackEvent('keyboard_shortcut', { action: 'publish' });
    }
    
    // Escape to cancel
    if (e.key === 'Escape') {
      const modal = document.getElementById('appModal');
      if (modal && modal.style.display === 'block') {
        window.villeGoApp.hideModal();
      }
    }
  });
  
  // Add scroll tracking
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      window.analyticsManager.trackEvent('scroll', { percent: scrollPercent });
    }, 250);
  });
  
  // Add visibility change tracking
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      window.analyticsManager.trackEvent('page_hidden');
    } else {
      window.analyticsManager.trackEvent('page_visible');
    }
  });
  
  // Add beforeunload tracking
  window.addEventListener('beforeunload', function() {
    window.analyticsManager.trackEvent('page_unload');
  });
  
  console.log('VilleGo application initialized successfully!');
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    VilleGoApp,
    RecipeManager,
    UserManager,
    AnalyticsManager
  };
}
