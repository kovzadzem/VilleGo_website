// Category interaction functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get all category elements
  const categories = document.querySelectorAll('.group, .group-2, .group-3, .group-4, .group-5, .group-6, .group-7, .group-8, .group-9, .group-10, .group-11, .group-12, .group-13, .group-14, .group-15, .div-wrapper');
  
  // Get navigation elements
  const backButton = document.querySelector('.overlap-group');
  const categoriesButton = document.querySelector('.rectangle');
  const navLinks = document.querySelectorAll('.text-wrapper-19, .text-wrapper-20, .text-wrapper-21, .text-wrapper-22, .text-wrapper-24');
  
  // Category data mapping
  const categoryData = {
    'group': { name: 'ხილი', icon: '🍎' },
    'group-2': { name: 'ხორცეული', icon: '🥩' },
    'group-3': { name: 'კვერცხი', icon: '🥚' },
    'group-4': { name: 'ბოსტნეული', icon: '🥔' },
    'group-5': { name: 'თევზი', icon: '🐟' },
    'group-6': { name: 'რძის ნაწარმი', icon: '🥛' },
    'group-7': { name: 'მარცვლეული და პარკოსნები', icon: '🌾' },
    'group-8': { name: 'თესლები და ნერგები', icon: '🌱' },
    'group-9': { name: 'თაფლი და ფუტკრის პროდუქტები', icon: '🍯' },
    'group-10': { name: 'ღვინო და ალკოჰოლური სასმელები', icon: '🍷' },
    'group-11': { name: 'ყვავილები', icon: '🌸' },
    'group-12': { name: 'ჩირი', icon: '🥜' },
    'group-13': { name: 'მწნილი', icon: '🥫' },
    'group-14': { name: 'მურაბა', icon: '🍯' },
    'group-15': { name: 'რეცეპტები', icon: '📖' },
    'div-wrapper': { name: 'ბუნებრივი წვენები', icon: '🧃' }
  };

  // Add click handlers to categories
  categories.forEach(category => {
    category.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get category class name
      const className = Array.from(this.classList).find(cls => 
        cls.startsWith('group') || cls === 'div-wrapper'
      );
      
      const data = categoryData[className];
      if (data) {
        handleCategoryClick(data.name, data.icon);
      }
    });

    // Add keyboard navigation
    category.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });

    // Make categories focusable
    category.setAttribute('tabindex', '0');
    category.setAttribute('role', 'button');
    category.setAttribute('aria-label', `კატეგორია: ${categoryData[Array.from(this.classList).find(cls => cls.startsWith('group') || cls === 'div-wrapper')]?.name || 'უცნობი'}`);
  });

  // Back button functionality
  if (backButton) {
    backButton.addEventListener('click', function(e) {
      e.preventDefault();
      showNotification('უკან დაბრუნება', '⬅️');
      // Add your back navigation logic here
    });
  }

  // Categories button functionality
  if (categoriesButton) {
    categoriesButton.addEventListener('click', function(e) {
      e.preventDefault();
      showNotification('კატეგორიები', '📂');
      // Add your categories navigation logic here
    });
  }

  // Navigation links functionality
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const text = this.textContent.trim();
      showNotification(`${text} გვერდზე გადასვლა`, '🔗');
      // Add your navigation logic here
    });
  });

  // Search functionality
  const searchBar = document.querySelector('.rectangle-7');
  if (searchBar) {
    searchBar.addEventListener('click', function(e) {
      e.preventDefault();
      showSearchModal();
    });
  }

  // Handle category selection
  function handleCategoryClick(categoryName, icon) {
    showNotification(`${categoryName} კატეგორია არჩეულია`, icon);
    
    // Add visual feedback
    const clickedCategory = event.currentTarget;
    clickedCategory.style.transform = 'scale(0.95)';
    setTimeout(() => {
      clickedCategory.style.transform = '';
    }, 150);

    // Here you would typically navigate to the category page
    // For demo purposes, we'll just show a notification
    setTimeout(() => {
      showCategoryDetails(categoryName, icon);
    }, 500);
  }

  // Show notification function
  function showNotification(message, icon = '✅') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
      <span class="notification-icon">${icon}</span>
      <span class="notification-text">${message}</span>
    `;

    // Add notification styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #007f5f;
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: "Poppins", Helvetica;
      font-weight: 500;
      font-size: 16px;
      transform: translateX(100%);  transition: transform 0.3s ease;
      animation: slideIn 0.3s ease forwards;
    `;

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        @keyframes slideIn {
          to { transform: translateX(0); }
        }
        @keyframes slideOut {
          to { transform: translateX(100%); }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 3000);
  }

  // Show category details modal
  function showCategoryDetails(categoryName, icon) {
    // Remove existing modal
    const existingModal = document.querySelector('.category-modal');
    if (existingModal) {
      existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'category-modal';
    modal.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <span class="modal-icon">${icon}</span>
            <h2 class="modal-title">${categoryName}</h2>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <p>ამ კატეგორიაში თქვენ იპოვით ყველაზე ხარისხიან პროდუქტებს.</p>
            <div class="modal-actions">
              <button class="btn-primary">პროდუქტების ნახვა</button>
              <button class="btn-secondary">ფერმერების ნახვა</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add modal styles
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

    // Add modal CSS
    if (!document.querySelector('#modal-styles')) {
      const style = document.createElement('style');
      style.id = 'modal-styles';
      style.textContent = `
        .modal-overlay {
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .modal-content {
          background: white;
          border-radius: 15px;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          transform: scale(0.9);
          transition: transform 0.3s ease;
        }
        .category-modal[data-visible="true"] .modal-content {
          transform: scale(1);
        }
        .modal-header {
          padding: 30px;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
          gap: 15px;
          position: relative;
        }
        .modal-icon {
          font-size: 40px;
        }
        .modal-title {
          font-family: "Poppins", Helvetica;
          font-weight: 700;
          font-size: 24px;
          color: #333;
          margin: 0;
          flex: 1;
        }
        .modal-close {
          position: absolute;
          top: 15px;
          right: 20px;
          background: none;
          border: none;
          font-size: 30px;
          color: #999;
          cursor: pointer;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .modal-close:hover {
          background: #f5f5f5;
          color: #333;
        }
        .modal-body {
          padding: 30px;
        }
        .modal-body p {
          font-family: "Poppins", Helvetica;
          font-size: 16px;
          color: #666;
          line-height: 1.6;
          margin: 0 0 25px 0;
        }
        .modal-actions {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }
        .btn-primary, .btn-secondary {
          padding: 12px 24px;
          border-radius: 8px;
          font-family: "Poppins", Helvetica;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          flex: 1;
          min-width: 140px;
        }
        .btn-primary {
          background: #007f5f;
          color: white;
        }
        .btn-primary:hover {
          background: #005a43;
          transform: translateY(-2px);
        }
        .btn-secondary {
          background: #f8f9fa;
          color: #333;
          border: 2px solid #dee2e6;
        }
        .btn-secondary:hover {
          background: #e9ecef;
          border-color: #adb5bd;
          transform: translateY(-2px);
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(modal);

    // Show modal with animation
    setTimeout(() => {
      modal.style.opacity = '1';
      modal.setAttribute('data-visible', 'true');
    }, 10);

    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    function closeModal() {
      modal.style.opacity = '0';
      modal.removeAttribute('data-visible');
      setTimeout(() => {
        if (modal.parentNode) {
          modal.remove();
        }
      }, 300);
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });

    // ESC key to close
    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    });

    // Button actions
    const primaryBtn = modal.querySelector('.btn-primary');
    const secondaryBtn = modal.querySelector('.btn-secondary');

    primaryBtn.addEventListener('click', () => {
      showNotification(`${categoryName} პროდუქტების ნახვა`, '🛍️');
      closeModal();
    });

    secondaryBtn.addEventListener('click', () => {
      showNotification(`${categoryName} ფერმერების ნახვა`, '👨‍🌾');
      closeModal();
    });
  }

  // Show search modal
  function showSearchModal() {
    const searchModal = document.createElement('div');
    searchModal.className = 'search-modal';
    searchModal.innerHTML = `
      <div class="modal-overlay">
        <div class="search-modal-content">
          <div class="search-header">
            <h3>პროდუქტის ძებნა</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="search-body">
            <input type="text" class="search-input" placeholder="შეიყვანეთ პროდუქტის სახელი..." autofocus>
            <div class="search-suggestions">
              <div class="suggestion-item" data-category="ხილი">🍎 ვაშლი</div>
              <div class="suggestion-item" data-category="ბოსტნეული">🥔 კარტოფილი</div>
              <div class="suggestion-item" data-category="რძის ნაწარმი">🧀 ყველი</div>
              <div class="suggestion-item" data-category="ხორცეული">🥩 ხორცი</div>
              <div class="suggestion-item" data-category="თევზი">🐟 თევზი</div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add search modal styles
    if (!document.querySelector('#search-modal-styles')) {
      const style = document.createElement('style');
      style.id = 'search-modal-styles';
      style.textContent = `
        .search-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2000;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .search-modal-content {
          background: white;
          border-radius: 15px;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          transform: translateY(-20px);
          transition: transform 0.3s ease;
        }
        .search-modal[data-visible="true"] .search-modal-content {
          transform: translateY(0);
        }
        .search-header {
          padding: 25px 30px;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .search-header h3 {
          font-family: "Poppins", Helvetica;
          font-weight: 700;
          font-size: 20px;
          color: #333;
          margin: 0;
        }
        .search-body {
          padding: 30px;
        }
        .search-input {
          width: 100%;
          padding: 15px 20px;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          font-family: "Poppins", Helvetica;
          font-size: 16px;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .search-input:focus {
          border-color: #007f5f;
        }
        .search-suggestions {
          margin-top: 20px;
        }
        .suggestion-item {
          padding: 12px 15px;
          border-radius: 8px;
          cursor: pointer;
          font-family: "Poppins", Helvetica;
          font-size: 14px;
          color: #666;
          transition: all 0.3s ease;
          margin-bottom: 5px;
        }
        .suggestion-item:hover {
          background: #f8f9fa;
          color: #007f5f;
          transform: translateX(5px);
        }
      `;
      document.head.appendChild(style);
    }

    searchModal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

    document.body.appendChild(searchModal);

    // Show search modal
    setTimeout(() => {
      searchModal.style.opacity = '1';
      searchModal.setAttribute('data-visible', 'true');
    }, 10);

    // Close functionality
    const closeBtn = searchModal.querySelector('.modal-close');
    const overlay = searchModal.querySelector('.modal-overlay');
    
    function closeSearchModal() {
      searchModal.style.opacity = '0';
      searchModal.removeAttribute('data-visible');
      setTimeout(() => {
        if (searchModal.parentNode) {
          searchModal.remove();
        }
      }, 300);
    }

    closeBtn.addEventListener('click', closeSearchModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeSearchModal();
      }
    });

    // Search input functionality
    const searchInput = searchModal.querySelector('.search-input');
    const suggestions = searchModal.querySelectorAll('.suggestion-item');

    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      suggestions.forEach(suggestion => {
        const text = suggestion.textContent.toLowerCase();
        if (text.includes(query)) {
          suggestion.style.display = 'block';
        } else {
          suggestion.style.display = 'none';
        }
      });
    });

    // Suggestion click handlers
    suggestions.forEach(suggestion => {
      suggestion.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        const product = this.textContent;
        showNotification(`${product} ძებნა დაწყებულია`, '🔍');
        closeSearchModal();
      });
    });

    // Enter key to search
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        const query = this.value.trim();
        if (query) {
          showNotification(`"${query}" ძებნა დაწყებულია`, '🔍');
          closeSearchModal();
        }
      }
    });
  }

  // Add loading animation for better UX
  function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'loading-overlay';
    loader.innerHTML = `
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>იტვირთება...</p>
      </div>
    `;

    // Add loading styles
    if (!document.querySelector('#loading-styles')) {
      const style = document.createElement('style');
      style.id = 'loading-styles';
      style.textContent = `
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3000;
        }
        .loading-spinner {
          text-align: center;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #007f5f;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }
        .loading-spinner p {
          font-family: "Poppins", Helvetica;
          font-size: 16px;
          color: #666;
          margin: 0;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(loader);
    return loader;
  }

  // Initialize tooltips for better accessibility
  function initializeTooltips() {
    categories.forEach(category => {
      const className = Array.from(category.classList).find(cls => 
        cls.startsWith('group') || cls === 'div-wrapper'
      );
      const data = categoryData[className];
      
      if (data) {
        category.setAttribute('title', `${data.icon} ${data.name} - დააჭირეთ დეტალებისთვის`);
      }
    });
  }

  // Initialize all functionality
  initializeTooltips();

  // Add smooth scrolling for better UX
  document.documentElement.style.scrollBehavior = 'smooth';

  // Add focus management for accessibility
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      // Ensure proper focus management
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });

  console.log('VilleGo category interface initialized successfully! 🚀');
});
