// Global variables
let cartCount = 1;
let favorites = new Set();

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners();
  initializeSearch();
  initializeQuantityControls();
  initializeProductCards();
  initializeAppStoreButtons();
  initializeNavigation();
});

// Initialize all event listeners
function initializeEventListeners() {
  // Add to cart button
  const addToCartBtn = document.querySelector('.overlap');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', addToCart);
  }

  // Favorite button
  const favoriteBtn = document.querySelector('.vector-wrapper');
  if (favoriteBtn) {
    favoriteBtn.addEventListener('click', toggleFavorite);
  }

  // Quantity controls
  const increaseBtn = document.querySelector('.polygon');
  const decreaseBtn = document.querySelector('.img');
  
  if (increaseBtn) {
    increaseBtn.addEventListener('click', increaseQuantity);
  }
  
  if (decreaseBtn) {
    decreaseBtn.addEventListener('click', decreaseQuantity);
  }
}

// Initialize search functionality
function initializeSearch() {
  const searchContainer = document.querySelector('.rectangle-5');
  if (searchContainer) {
    // Create search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'ძებნა...';
    searchInput.className = 'search-input';
    searchContainer.appendChild(searchInput);

    // Add search functionality
    searchInput.addEventListener('input', function(e) {
      performSearch(e.target.value);
    });

    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch(e.target.value);
      }
    });
  }
}

// Initialize quantity controls
function initializeQuantityControls() {
  updateQuantityDisplay();
}

// Initialize product cards
function initializeProductCards() {
  const productCards = document.querySelectorAll('.overlap-group-2');
  
  productCards.forEach(card => {
    // Add click event for product selection
    card.addEventListener('click', function() {
      selectProduct(card);
    });

    // Add favorite buttons to product cards
    const favoriteBtn = card.querySelector('.img-wrapper');
    if (favoriteBtn) {
      favoriteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleProductFavorite(card);
      });
    }

    // Add compare buttons to product cards
    const compareBtn = card.querySelector('.overlap-group-3');
    if (compareBtn) {
      compareBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        addToCompare(card);
      });
    }
  });
}

// Initialize app store buttons
function initializeAppStoreButtons() {
  const appStoreButtons = document.querySelectorAll('.mobile-app-store, .mobile-app-store-2, .mobile-app-store-3');
  
  appStoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const storeName = this.classList.contains('mobile-app-store-2') ? 'App Store' :
                       this.classList.contains('mobile-app-store-3') ? 'Google Play' : 'Microsoft Store';
      showNotification(`გადამისამართება ${storeName}-ზე...`);
    });
  });
}

// Initialize navigation
function initializeNavigation() {
  const navItems = document.querySelectorAll('.text-wrapper-19, .text-wrapper-20, .text-wrapper-21, .text-wrapper-22, .text-wrapper-24');
  
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const text = this.textContent;
      showNotification(`გადასვლა "${text}" გვერდზე...`);
      
      // Remove active class from all nav items
      navItems.forEach(nav => nav.classList.remove('active'));
      
      // Add active class to clicked item
      this.classList.add('active');
    });
  });

  // Logo click
  const logo = document.querySelector('.text-wrapper-18');
  if (logo) {
    logo.addEventListener('click', function() {
      showNotification('მთავარ გვერდზე დაბრუნება...');
      // Remove active class from all nav items
      navItems.forEach(nav => nav.classList.remove('active'));
    });
  }
}

// Add to cart functionality
function addToCart() {
  const productName = document.querySelector('.element').textContent;
  const price = document.querySelector('.text-wrapper-3').textContent;
  
  showNotification(`${productName} დაემატა კალათაში! (${price})`);
  
  // Add animation to button
  const button = document.querySelector('.overlap');
  button.style.transform = 'scale(0.95)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 150);
}

// Toggle favorite functionality
function toggleFavorite() {
  const productName = document.querySelector('.element').textContent;
  const favoriteBtn = document.querySelector('.vector-wrapper');
  
  if (favorites.has(productName)) {
    favorites.delete(productName);
    favoriteBtn.style.backgroundColor = '#ffffff';
    showNotification(`${productName} ამოღებულია ფავორიტებიდან`);
  } else {
    favorites.add(productName);
    favoriteBtn.style.backgroundColor = '#ff6b6b';
    showNotification(`${productName} დაემატა ფავორიტებში`);
  }
}

// Increase quantity
function increaseQuantity() {
  cartCount++;
  updateQuantityDisplay();
  showNotification(`რაოდენობა: ${cartCount}`);
}

// Decrease quantity
function decreaseQuantity() {
  if (cartCount > 1) {
    cartCount--;
    updateQuantityDisplay();
    showNotification(`რაოდენობა: ${cartCount}`);
  }
}

// Update quantity display
function updateQuantityDisplay() {
  const quantityDisplay = document.querySelector('.text-wrapper');
  if (quantityDisplay) {
    quantityDisplay.textContent = cartCount;
  }
}

// Perform search
function performSearch(query) {
  if (query.trim() === '') {
    showNotification('შეიყვანეთ საძიებო სიტყვა');
    return;
  }
  
  showNotification(`ძებნა: "${query}"`);
  
  // Simulate search results
  setTimeout(() => {
    const resultCount = Math.floor(Math.random() * 20) + 1;
    showNotification(`ნაპოვნია ${resultCount} შედეგი "${query}"-სთვის`);
  }, 1000);
}

// Select product
function selectProduct(card) {
  // Remove selection from all cards
  document.querySelectorAll('.overlap-group-2').forEach(c => {
    c.style.border = 'none';
  });
  
  // Add selection to clicked card
  card.style.border = '3px solid #007f5f';
  
  const productName = card.querySelector('.element-2').textContent;
  showNotification(`არჩეულია: ${productName}`);
}

// Toggle product favorite
function toggleProductFavorite(card) {
  const productName = card.querySelector('.element-2').textContent;
  const favoriteBtn = card.querySelector('.img-wrapper');
  
  if (favorites.has(productName)) {
    favorites.delete(productName);
    favoriteBtn.style.backgroundColor = '#ffffff';
    showNotification(`${productName} ამოღებულია ფავორიტებიდან`);
  } else {
    favorites.add(productName);
    favoriteBtn.style.backgroundColor = '#ff6b6b';
    showNotification(`${productName} დაემატა ფავორიტებში`);
  }
}

// Add to compare
function addToCompare(card) {
  const productName = card.querySelector('.element-2').textContent;
  const compareBtn = card.querySelector('.overlap-group-3');
  
  compareBtn.style.backgroundColor = '#007f5f';
  showNotification(`${productName} დაემატა შედარებისთვის`);
  
  setTimeout(() => {
    compareBtn.style.backgroundColor = '#ffffff';
  }, 2000);
}

// Show notification
function showNotification(message) {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create new notification
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 3000);
}

// Smooth scrolling for navigation
function smoothScrollTo(targetY, duration = 1000) {
  const startY = window.pageYOffset;
  const difference = targetY - startY;
  const startTime = performance.now();

  function step() {
    const progress = (performance.now() - startTime) / duration;
    const ease = easeInOutCubic(progress);
    
    window.scrollTo(0, startY + (difference * ease));
    
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  
  requestAnimationFrame(step);
}

// Easing function
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// Initialize animations on scroll
function initializeScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });

  // Observe product cards
  document.querySelectorAll('.overlap-group-2').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
  });
}

// Initialize scroll animations when page loads
window.addEventListener('load', initializeScrollAnimations);

// Handle window resize
window.addEventListener('resize', function() {
  // Adjust layout if needed
  const screenWidth = window.innerWidth;
  if (screenWidth < 1920) {
    document.body.style.overflow = 'auto';
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Ctrl/Cmd + K for search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.focus();
    }
  }
  
  // Escape to clear search
  if (e.key === 'Escape') {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.value = '';
      searchInput.blur();
    }
  }
});
