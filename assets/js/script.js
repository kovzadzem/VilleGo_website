// Global variables
let cart = [];
let favorites = [];
let selectedCategory = null;
let selectedRegion = null;
let currentCarouselIndex = 0;
let currentProductIndex = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  console.log('VilleGo application initialized');
  loadUserData();
  initializeAnimations();
});

// Navigation functions
function navigateTo(page) {
  console.log(`Navigating to: ${page}`);
  showNotification(`გადავდივართ ${page} გვერდზე`);
  
  
  // Simulate navigation
  setTimeout(() => {
    switch(page) {
      case 'blog':
        window.location.href = '#blog';
        break;
      case 'farmers':
        window.location.href = '#farmers';
        break;
      case 'about':
        window.location.href = '#about';
        break;
      case 'contact':
        window.location.href = '#contact';
        break;
      case 'map':
        window.location.href = '#map';
        break;
      default:
        console.log(`Page ${page} not implemented yet`);
    }
  }, 500);
}

// Carousel navigation
function navigateCarousel(direction) {
  const carouselItems = document.querySelectorAll('.overlap-9, .overlap-10, .overlap-11');
  
  if (direction === 'left') {
    currentCarouselIndex = currentCarouselIndex > 0 ? currentCarouselIndex - 1 : carouselItems.length - 1;
  } else {
    currentCarouselIndex = currentCarouselIndex < carouselItems.length - 1 ? currentCarouselIndex + 1 : 0;
  }
  
  // Add visual feedback
  carouselItems.forEach((item, index) => {
    if (index === currentCarouselIndex) {
      item.style.transform = 'scale(1.05)';
      item.style.zIndex = '10';
    } else {
      item.style.transform = 'scale(1)';
      item.style.zIndex = '1';
    }
  });
  
  showNotification(`ფერმერი ${currentCarouselIndex + 1}/${carouselItems.length}`);
}

// Product navigation
function navigateProducts(direction) {
  const productCards = document.querySelectorAll('.product-card');
  
  if (direction === 'left') {
    currentProductIndex = currentProductIndex > 0 ? currentProductIndex - 1 : productCards.length - 1;
  } else {
    currentProductIndex = currentProductIndex < productCards.length - 1 ? currentProductIndex + 1 : 0;
  }
  
  // Scroll to the current product
  if (productCards[currentProductIndex]) {
    productCards[currentProductIndex].scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }
  
  showNotification(`პროდუქტი ${currentProductIndex + 1}/${productCards.length}`);
}

// Category selection
function selectCategory(category) {
  selectedCategory = category;
  
  // Remove previous selection styling
  document.querySelectorAll('.group, .group-2, .group-3, .group-5, .group-6, .group-7, .overlap-wrapper, .overlap-group-wrapper').forEach(el => {
    el.style.border = 'none';
  });
  
  // Add selection styling to clicked category
  event.currentTarget.style.border = '3px solid #007f5f';
  event.currentTarget.style.borderRadius = '12px';
  
  const categoryNames = {
    'nuts': 'მარცვლეული და პარკოსნები',
    'fish': 'თევზი',
    'dairy': 'რძის ნაწარმი',
    'eggs': 'კვერცხი',
    'meat': 'ხორცეული',
    'vegetables': 'ბოსტნეული',
    'fruits': 'ხილი',
    'honey': 'თაფლი და ფუტკრის პროდუქტები'
  };
  
  showNotification(`არჩეული კატეგორია: ${categoryNames[category]}`);
  filterProducts(category);
}

// Region selection
function selectRegion(region) {
  selectedRegion = region;
  
  const regionNames = {
    'adjara': 'აჭარა',
    'guria': 'გურია',
    'imereti': 'იმერეთი',
    'racha': 'რაჭა-ლეჩხუმი',
    'samegrelo': 'სამეგრელო',
    'svaneti': 'სვანეთი',
    'abkhazia': 'აფხაზეთი',
    'samtskhe': 'სამცხე-ჯავახეთი',
    'shida-kartli': 'შიდა ქართლი',
    'kvemo-kartli': 'ქვემო ქართლი',
    'kakheti': 'კახეთი',
    'mtskheta': 'მცხეთა-მთიანეთი',
    'tbilisi': 'თბილისი'
  };
  
  showNotification(`არჩეული რეგიონი: ${regionNames[region]}`);
  filterByRegion(region);
}

// Product functions
function viewProduct(productId) {
  console.log(`Viewing product: ${productId}`);
  showNotification('პროდუქტის დეტალები იტვირთება...');
  
  // Simulate product view
  setTimeout(() => {
    showNotification('პროდუქტის გვერდი გაიხსნა');
  }, 1000);
}

function addToCart(productId) {
  event.stopPropagation(); // Prevent triggering viewProduct
  
  if (!cart.includes(productId)) {
    cart.push(productId);
    updateCartUI();
    showNotification('პროდუქტი დაემატა კალათაში');
    
    // Add visual feedback
    const cartIcon = document.querySelector('.vector-11');
    if (cartIcon) {
      cartIcon.style.transform = 'scale(1.3)';
      setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
      }, 200);
    }
  } else {
    showNotification('პროდუქტი უკვე არის კალათაში');
  }
}

function addToFavorites(productId) {
  if (!favorites.includes(productId)) {
    favorites.push(productId);
    updateFavoritesUI();
    showNotification('პროდუქტი დაემატა ფავორიტებში');
  } else {
    favorites = favorites.filter(id => id !== productId);
    updateFavoritesUI();
    showNotification('პროდუქტი ამოიშალა ფავორიტებიდან');
  }
}

// Farmer functions
function viewFarmer(farmerId) {
  console.log(`Viewing farmer: ${farmerId}`);
  showNotification('ფერმერის გვერდი იტვირთება...');
  
  setTimeout(() => {
    showNotification('ფერმერის გვერდი გაიხსნა');
  }, 1000);
}

// UI toggle functions
function toggleCart() {
  console.log('Toggle cart');
  showNotification(`კალათაში ${cart.length} პროდუქტია`);
  // Implement cart modal/sidebar
}

function toggleFavorites() {
  console.log('Toggle favorites');
  showNotification(`ფავორიტებში ${favorites.length} პროდუქტია`);
  // Implement favorites modal/sidebar
}

function toggleNotifications() {
  console.log('Toggle notifications');
  showNotification('შეტყობინებები');
  // Implement notifications dropdown
}

function toggleProfile() {
  console.log('Toggle profile');
  showNotification('პროფილის მენიუ');
  // Implement profile dropdown
}

// Search function
function performSearch() {
  const searchTerm = prompt('ძებნა:');
  if (searchTerm) {
    console.log(`Searching for: ${searchTerm}`);
    showNotification(`ძებნა: "${searchTerm}"`);
    // Implement search functionality
  }
}

// App download functions
function downloadApp(platform) {
  const urls = {
    'microsoft': 'https://www.microsoft.com/store',
    'apple': 'https://apps.apple.com',
    'google': 'https://play.google.com'
  };
  
  showNotification(`გადმოწერა ${platform} პლატფორმიდან...`);
  
  setTimeout(() => {
    window.open(urls[platform], '_blank');
  }, 500);
}

// Contact functions
function callPhone() {
  window.location.href = 'tel:+995555888888';
  showNotification('ზარის განხორციელება...');
}

function sendEmail() {
  window.location.href = 'mailto:VilleGoLLC@gmail.com';
  showNotification('ელ.ფოსტის გახსნა...');
}

// Social media functions
function openSocialMedia(platform) {
  const urls = {
    'facebook': 'https://facebook.com/villego',
    'instagram': 'https://instagram.com/villego',
    'twitter': 'https://twitter.com/villego',
    'linkedin': 'https://linkedin.com/company/villego',
    'youtube': 'https://youtube.com/villego',
    'tiktok': 'https://tiktok.com/@villego'
  };
  
  showNotification(`${platform} გვერდის გახსნა...`);
  
  setTimeout(() => {
    window.open(urls[platform], '_blank');
  }, 500);
}

// Utility functions
function showMoreProducts() {
  console.log('Show more products');
  showNotification('მეტი პროდუქტის ჩატვირთვა...');
  
  // Simulate loading more products
  setTimeout(() => {
    showNotification('ახალი პროდუქტები ჩაიტვირთა');
  }, 1500);
}

function addProduct() {
  console.log('Add new product');
  showNotification('ახალი პროდუქტის დამატება');
  // Implement add product functionality
}

function filterProducts(category) {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    // Simple filter simulation - in real app, this would filter based on actual product data
    card.style.display = 'block';
    card.style.opacity = '0.5';
    
    setTimeout(() => {
      card.style.opacity = '1';
    }, 300);
  });
}

function filterByRegion(region) {
  console.log(`Filtering by region: ${region}`);
  // Implement region-based filtering
}

function updateCartUI() {
  // Update cart icon badge
  const cartIcon = document.querySelector('.vector-11');
  if (cartIcon && cart.length > 0) {
    // Add badge or update existing one
    let badge = cartIcon.parentElement.querySelector('.cart-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'cart-badge';
      badge.style.cssText = `
        position: absolute;
        top: -5px;
        right: -5px;
        background: #ff4444;
        color: white;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        font-size: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      `;
      cartIcon.parentElement.appendChild(badge);
    }
    badge.textContent = cart.length;
  }
}

function updateFavoritesUI() {
  // Update favorites icon
  const favIcon = document.querySelector('.vector-10');
  if (favIcon) {
    favIcon.style.color = favorites.length > 0 ? '#ff4444' : '';
  }
}

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
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 3000);
}

function loadUserData() {
  // Load user data from localStorage
  const savedCart = localStorage.getItem('villego_cart');
  const savedFavorites = localStorage.getItem('villego_favorites');
  
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
  }
  
  if (savedFavorites) {
    favorites = JSON.parse(savedFavorites);
    updateFavoritesUI();
  }
}

function  saveUserData() {
  // Save user data to localStorage
  localStorage.setItem('villego_cart', JSON.stringify(cart));
  localStorage.setItem('villego_favorites', JSON.stringify(favorites));
}

function initializeAnimations() {
  // Add intersection observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });

  // Observe all product cards and category items
  document.querySelectorAll('.product-card, .group, .group-2, .group-3, .group-5, .group-6, .group-7, .overlap-wrapper, .overlap-group-wrapper').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
  switch(event.key) {
    case 'ArrowLeft':
      if (event.ctrlKey) {
        navigateCarousel('left');
        event.preventDefault();
      }
      break;
    case 'ArrowRight':
      if (event.ctrlKey) {
        navigateCarousel('right');
        event.preventDefault();
      }
      break;
    case 'ArrowUp':
      if (event.ctrlKey) {
        navigateProducts('left');
        event.preventDefault();
      }
      break;
    case 'ArrowDown':
      if (event.ctrlKey) {
        navigateProducts('right');
        event.preventDefault();
      }
      break;
    case 'Escape':
      // Close any open modals or dropdowns
      document.querySelectorAll('.modal, .dropdown').forEach(el => {
        el.style.display = 'none';
      });
      break;
  }
});

// Auto-save user data when page unloads
window.addEventListener('beforeunload', saveUserData);

// Touch/swipe support for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(event) {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchend', function(event) {
  if (!touchStartX || !touchStartY) return;
  
  const touchEndX = event.changedTouches[0].clientX;
  const touchEndY = event.changedTouches[0].clientY;
  
  const deltaX = touchStartX - touchEndX;
  const deltaY = touchStartY - touchEndY;
  
  // Minimum swipe distance
  const minSwipeDistance = 50;
  
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal swipe
    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // Swipe left
        navigateProducts('right');
      } else {
        // Swipe right
        navigateProducts('left');
      }
    }
  } else {
    // Vertical swipe
    if (Math.abs(deltaY) > minSwipeDistance) {
      if (deltaY > 0) {
        // Swipe up
        navigateCarousel('right');
      } else {
        // Swipe down
        navigateCarousel('left');
      }
    }
  }
  
  touchStartX = 0;
  touchStartY = 0;
});

// Search functionality with debouncing
let searchTimeout;
function debounceSearch(searchTerm) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    performActualSearch(searchTerm);
  }, 300);
}

function performActualSearch(searchTerm) {
  console.log(`Performing search for: ${searchTerm}`);
  // Implement actual search logic here
  showNotification(`ძებნის შედეგები: "${searchTerm}"`);
}

// Price formatting
function formatPrice(price) {
  return `${price.toFixed(1)} ლ`;
}

// Date formatting
function formatDate(date) {
  return new Intl.DateTimeFormat('ka-GE').format(date);
}

// Image lazy loading
function initializeLazyLoading() {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Error handling
window.addEventListener('error', function(event) {
  console.error('Application error:', event.error);
  showNotification('შეცდომა მოხდა. გთხოვთ, სცადოთ ხელახლა.');
});

// Performance monitoring
function measurePerformance() {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`Page load time: ${loadTime}ms`);
    });
  }
}

// Initialize performance monitoring
measurePerformance();

// Service worker registration for offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData) {
  console.log(`Analytics event: ${eventName}`, eventData);
  // Implement actual analytics tracking here
}

// Track page interactions
document.addEventListener('click', function(event) {
  const target = event.target;
  
  if (target.closest('.product-card')) {
    trackEvent('product_click', { productId: target.closest('.product-card').id });
  } else if (target.closest('[onclick*="selectCategory"]')) {
    trackEvent('category_click', { category: selectedCategory });
  } else if (target.closest('[onclick*="selectRegion"]')) {
    trackEvent('region_click', { region: selectedRegion });
  }
});

// Export functions for global access
window.VilleGo = {
  navigateTo,
  navigateCarousel,
  navigateProducts,
  selectCategory,
  selectRegion,
  viewProduct,
  addToCart,
  addToFavorites,
  viewFarmer,
  toggleCart,
  toggleFavorites,
  toggleNotifications,
  toggleProfile,
  performSearch,
  downloadApp,
  callPhone,
  sendEmail,
  openSocialMedia,
  showMoreProducts,
  addProduct,
  showNotification
};
