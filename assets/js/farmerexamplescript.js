// Global variables
let currentSlide = 0;
let currentPage = 1;
let sortAscending = true;
let activeCategory = 'honey';
let favorites = [];
let cart = [];

// Slider functionality
function nextSlide() {
  const slides = ['slide1', 'slide2', 'slide3'];
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlider();
}

function previousSlide() {
  const slides = ['slide1', 'slide2', 'slide3'];
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlider();
}

function updateSlider() {
  const slideImages = [
    'https://c.animaapp.com/mfia09i7TtmkvZ/img/rectangle-2321.png',
    'https://c.animaapp.com/mfia09i7TtmkvZ/img/rectangle-2362-1.png',
    'https://c.animaapp.com/mfia09i7TtmkvZ/img/rectangle-2362-2.png'
  ];
  
  const mainImage = document.querySelector('.overlap-group .img');
  if (mainImage) {
    mainImage.src = slideImages[currentSlide];
    mainImage.style.opacity = '0';
    setTimeout(() => {
      mainImage.style.opacity = '1';
    }, 100);
  }
}

// Filter functionality
function initializeFilters() {
  const filterItems = document.querySelectorAll('.filter-item');
  
  filterItems.forEach(item => {
    item.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      if (category) {
        setActiveFilter(category);
        filterProducts(category);
      }
    });
  });
}

function setActiveFilter(category) {
  const filterItems = document.querySelectorAll('.filter-item');
  filterItems.forEach(item => {
    item.classList.remove('active');
  });
  
  const activeItems = document.querySelectorAll(`[data-category="${category}"]`);
  activeItems.forEach(item => {
    item.classList.add('active');
  });
  
  activeCategory = category;
}

function filterProducts(category) {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    const productCategory = card.getAttribute('data-category');
    if (category === 'all' || productCategory === category) {
      card.style.display = 'block';
      card.style.animation = 'fadeIn 0.5s ease-in';
    } else {
      card.style.display = 'none';
    }
  });
}

// Pagination functionality
function nextPage() {
  if (currentPage < 3) {
    currentPage++;
    updatePagination();
  }
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    updatePagination();
  }
}

function updatePagination() {
  const pageNumbers = document.querySelectorAll('.page-number');
  pageNumbers.forEach(page => {
    page.classList.remove('active');
    const pageNum = parseInt(page.getAttribute('data-page'));
    if (pageNum === currentPage) {
      page.classList.add('active');
    }
  });
  
  // Simulate loading different page content
  showNotification(`გვერდი ${currentPage} ჩაიტვირთა`);
}

// Sort functionality
function toggleSort() {
  sortAscending = !sortAscending;
  const sortText = document.querySelector('.text-wrapper-49');
  const arrow = document.querySelector('.arrow');
  
  if (sortText) {
    sortText.textContent = sortAscending ? 'დალაგება ფასის ზრდით' : 'დალაგება ფასის კლებით';
  }
  
  if (arrow) {
    arrow.style.transform = sortAscending ? 'rotate(0deg)' : 'rotate(180deg)';
  }
  
  sortProducts();
}

function sortProducts() {
  const productsGrid = document.querySelector('.products-grid');
  const productCards = Array.from(document.querySelectorAll('.product-card'));
  
  productCards.sort((a, b) => {
    const priceA = parseFloat(a.querySelector('.text-wrapper-36, .text-wrapper-40')?.textContent.replace(' ლ', '') || 0);
    const priceB = parseFloat(b.querySelector('.text-wrapper-36, .text-wrapper-40')?.textContent.replace(' ლ', '') || 0);
    
    return sortAscending ? priceA - priceB : priceB - priceA;
  });
  
  productCards.forEach(card => {
    productsGrid.appendChild(card);
  });
  
  showNotification(sortAscending ? 'პროდუქტები დალაგდა ფასის ზრდით' : 'პროდუქტები დალაგდა ფასის კლებით');
}

// Cart and favorites functionality
function addToCart(element) {
  const productCard = element.closest('.product-card');
  const productName = productCard.querySelector('.element, .text-wrapper-38, .text-wrapper-41, .text-wrapper-43, .text-wrapper-44, .text-wrapper-48')?.textContent;
  const productPrice = productCard.querySelector('.text-wrapper-36, .text-wrapper-40')?.textContent;
  
  if (productName && productPrice) {
    cart.push({ name: productName, price: productPrice });
    element.style.background = '#4CAF50';
    element.style.transform = 'scale(1.2)';
    
    setTimeout(() => {
      element.style.background = '#ffffff';
      element.style.transform = 'scale(1)';
    }, 300);
    
    showNotification(`${productName} კალათაში დაემატა`);
    updateCartCount();
  }
}

function addToFavorites(element) {
  const productCard = element.closest('.product-card');
  const productName = productCard.querySelector('.element, .text-wrapper-38, .text-wrapper-41, .text-wrapper-43, .text-wrapper-44, .text-wrapper-48')?.textContent;
  
  if (productName) {
    const heartIcon = element.querySelector('.vector-17');
    
    if (favorites.includes(productName)) {
      favorites = favorites.filter(item => item !== productName);
      heartIcon.style.fill = '#000000';
      showNotification(`${productName} ფავორიტებიდან ამოიშალა`);
    } else {
      favorites.push(productName);
      heartIcon.style.fill = '#ff4757';
      showNotification(`${productName} ფავორიტებში დაემატა`);
    }
    
    element.style.transform = 'scale(1.2)';
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 200);
  }
}

function updateCartCount() {
  // This would update a cart counter if it existed in the UI
  console.log(`კალათაში არის ${cart.length} პროდუქტი`);
}

// Price range slider functionality
function initializePriceSliders() {
  const priceMinHandle = document.getElementById('price-min-handle');
  const priceMaxHandle = document.getElementById('price-max-handle');
  const quantityMinHandle = document.getElementById('quantity-min-handle');
  const quantityMaxHandle = document.getElementById('quantity-max-handle');
  
  if (priceMinHandle && priceMaxHandle) {
    makeDraggable(priceMinHandle, 'price', 'min');
    makeDraggable(priceMaxHandle, 'price', 'max');
  }
  
  if (quantityMinHandle && quantityMaxHandle) {
    makeDraggable(quantityMinHandle, 'quantity', 'min');
    makeDraggable(quantityMaxHandle, 'quantity', 'max');
  }
}

function makeDraggable(element, type, minMax) {
  let isDragging = false;
  
  element.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
  });
  
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const rect = element.parentElement.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      
      element.style.left = `${percentage}%`;
      
      // Update display values based on type
      if (type === 'price') {
        const value = Math.round((percentage / 100) * 1000);
        showNotification(`ფასი: ${value}ლ`);
      } else if (type === 'quantity') {
        const value = Math.round((percentage / 100) * 1000);
        showNotification(`რაოდენობა: ${value}კგ`);
      }
    }
  });
  
  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

// Navigation functionality
function goBack() {
  showNotification('უკან დაბრუნება...');
  // This would typically navigate to the previous page
  setTimeout(() => {
    window.history.back();
  }, 500);
}

// Notification system
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
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #007f5f;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 1000;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideIn 0.3s ease-out;
  `;
  
  // Add animation keyframes
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
  }, 3000);
}

// Page number click handlers  function initializePageNumbers() {
  const pageNumbers = document.querySelectorAll('.page-number');
  
  pageNumbers.forEach(page => {
    page.addEventListener('click', function() {
      const pageNum = parseInt(this.getAttribute('data-page'));
      if (pageNum && pageNum !== currentPage) {
        currentPage = pageNum;
        updatePagination();
      }
    });
  });


// Search functionality
function initializeSearch() {
  const searchInput = document.querySelector('.rectangle-6');
  if (searchInput) {
    searchInput.addEventListener('click', function() {
      const searchTerm = prompt('ძებნა:');
      if (searchTerm) {
        searchProducts(searchTerm);
      }
    });
  }
}

function searchProducts(searchTerm) {
  const productCards = document.querySelectorAll('.product-card');
  let foundProducts = 0;
  
  productCards.forEach(card => {
    const productName = card.querySelector('.element, .text-wrapper-38, .text-wrapper-41, .text-wrapper-43, .text-wrapper-44, .text-wrapper-48')?.textContent.toLowerCase();
    
    if (productName && productName.includes(searchTerm.toLowerCase())) {
      card.style.display = 'block';
      card.style.border = '2px solid #007f5f';
      foundProducts++;
    } else {
      card.style.display = 'none';
      card.style.border = 'none';
    }
  });
  
  showNotification(`ნაპოვნია ${foundProducts} პროდუქტი "${searchTerm}"-ისთვის`);
}

// Auto-slide functionality
function startAutoSlide() {
  setInterval(() => {
    nextSlide();
  }, 5000); // Change slide every 5 seconds
}

// Smooth scrolling for navigation
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('.text-wrapper-51, .text-wrapper-52, .text-wrapper-53, .text-wrapper-54, .text-wrapper-56');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const linkText = this.textContent;
      
      switch(linkText) {
        case 'ბლოგი':
          showNotification('ბლოგის გვერდზე გადასვლა...');
          break;
        case 'ფერმერები':
          showNotification('ფერმერების გვერდზე გადასვლა...');
          break;
        case 'ჩვენს შესახებ':
          scrollToSection('.profile');
          break;
        case 'კონტაქტი':
          scrollToSection('.overlap-5');
          break;
        case 'რუკა':
          showNotification('რუკის გახსნა...');
          break;
      }
    });
  });
}

function scrollToSection(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Product hover effects
function initializeProductHoverEffects() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
      this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
      this.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = 'none';
    });
  });
}

// Mobile app store links
function initializeMobileAppLinks() {
  const appStoreLinks = document.querySelectorAll('.mobile-app-store, .mobile-app-store-2, .mobile-app-store-3');
  
  appStoreLinks.forEach(link => {
    link.addEventListener('click', function() {
      const storeType = this.classList.contains('mobile-app-store-2') ? 'App Store' : 
                       this.classList.contains('mobile-app-store-3') ? 'Google Play' : 'Microsoft Store';
      showNotification(`${storeType}-ზე გადასვლა...`);
    });
  });
}

// Social media links
function initializeSocialMediaLinks() {
  const socialLinks = document.querySelectorAll('.vector-28, .d, .group-12, .image-3, .image-4, .image-5');
  
  socialLinks.forEach(link => {
    link.addEventListener('click', function() {
      showNotification('სოციალურ ქსელზე გადასვლა...');
    });
  });
}

// Keyboard navigation
function initializeKeyboardNavigation() {
  document.addEventListener('keydown', function(e) {
    switch(e.key) {
      case 'ArrowLeft':
        if (e.ctrlKey) {
          previousSlide();
        } else {
          previousPage();
        }
        break;
      case 'ArrowRight':
        if (e.ctrlKey) {
          nextSlide();
        } else {
          nextPage();
        }
        break;
      case 'Escape':
        goBack();
        break;
      case 'Enter':
        if (e.target.classList.contains('product-card')) {
          const cartButton = e.target.querySelector('.img-wrapper');
          if (cartButton) {
            addToCart(cartButton);
          }
        }
        break;
    }
  });
}

// Price formatting
function formatPrice(price) {
  return `${price.toFixed(1)} ლ`;
}

// Local storage for favorites and cart
function saveToLocalStorage() {
  localStorage.setItem('villego_favorites', JSON.stringify(favorites));
  localStorage.setItem('villego_cart', JSON.stringify(cart));
}

function loadFromLocalStorage() {
  const savedFavorites = localStorage.getItem('villego_favorites');
  const savedCart = localStorage.getItem('villego_cart');
  
  if (savedFavorites) {
    favorites = JSON.parse(savedFavorites);
  }
  
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
  
  updateFavoritesDisplay();
  updateCartCount();
}

function updateFavoritesDisplay() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    const productName = card.querySelector('.element, .text-wrapper-38, .text-wrapper-41, .text-wrapper-43, .text-wrapper-44, .text-wrapper-48')?.textContent;
    const heartIcon = card.querySelector('.vector-17');
    
    if (productName && favorites.includes(productName) && heartIcon) {
      heartIcon.style.fill = '#ff4757';
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Load saved data
  loadFromLocalStorage();
  
  // Initialize all functionality
  initializeFilters();
  initializePriceSliders();
  initializePageNumbers();
  initializeSearch();
  initializeSmoothScrolling();
  initializeProductHoverEffects();
  initializeMobileAppLinks();
  initializeSocialMediaLinks();
  initializeKeyboardNavigation();
  
  // Start auto-slide
  startAutoSlide();
  
  // Set initial active filter
  setActiveFilter('honey');
  
  // Save data when page unloads
  window.addEventListener('beforeunload', saveToLocalStorage);
  
  // Show welcome message
  setTimeout(() => {
    showNotification('მოგესალმებით VilleGo-ზე! 🍯');
  }, 1000);
});

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Performance optimization
const debouncedSearch = debounce(searchProducts, 300);
const throttledScroll = throttle(function() {
  // Handle scroll events if needed
}, 100);

// Error handling
window.addEventListener('error', function(e) {
  console.error('JavaScript error:', e.error);
  showNotification('დაფიქსირდა შეცდომა. გთხოვთ, განაახლოთ გვერდი.');
});

// Responsive behavior
function handleResize() {
  const width = window.innerWidth;
  
  if (width < 1920) {
    document.body.style.fontSize = '14px';
  } else {
    document.body.style.fontSize = '16px';
  }
}

window.addEventListener('resize', debounce(handleResize, 250));

// Initial resize check
handleResize();
