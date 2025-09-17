// Global state management
let currentPage = 1;
let currentCategory = 'all';
let favorites = JSON.parse(localStorage.getItem('villego_favorites') || '[]');
let cart = JSON.parse(localStorage.getItem('villego_cart') || '[]');
let priceRange = { min: 1, max: 1000 };
let quantityRange = { min: 1, max: 1000 };
let discountFilter = false;
let sortBy = 'price_asc';

// Product data
const products = {
  honey1: { id: 'honey1', name: 'აკაციის თაფლი 1 კგ', brand: 'გულა', category: 'honey', price: 22.0, image: 'rectangle-2362.png' },
  honey2: { id: 'honey2', name: 'ჟოლო 1 კგ', brand: 'ჟორჟოლა', category: 'honey', price: 20.0, image: 'rectangle-2362-1.png' },
  honey3: { id: 'honey3', name: 'მოცვი 1 კგ', brand: 'სამეფო', category: 'honey', price: 12.0, image: 'rectangle-2362-2.png' },
  fruit1: { id: 'fruit1', name: 'ალუჩა 1 კგ', brand: 'აპდუ', category: 'fruits', price: 8.0, image: 'rectangle-2577.png' },
  fruit2: { id: 'fruit2', name: 'შინდი 1კგ', brand: 'გულო', category: 'fruits', price: 6.0, image: 'rectangle-2362-3.png' },
  fruit3: { id: 'fruit3', name: 'ფიჭა 1 კგ', brand: 'სკა', category: 'fruits', price: 27.0, image: 'rectangle-2362-4.png' }
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  updateCartCount();
  updateFavoritesCount();
});

function initializeApp() {
  // Add loading animation
  setTimeout(() => {
    document.querySelector('.loading').style.opacity = '1';
  }, 100);

  // Initialize search functionality
  setupSearch();
  
  // Initialize filters
  setupFilters();
  
  // Initialize responsive behavior
  setupResponsive();
  
  console.log('VilleGo application initialized');
}

// Search functionality
function setupSearch() {
  const searchBox = document.querySelector('.overlap');
  if (searchBox) {
    searchBox.addEventListener('click', focusSearch);
  }
}

function focusSearch() {
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'ძებნა...';
  searchInput.className = 'search-input';
  searchInput.style.cssText = `
    position: absolute;
    top: 2px;
    left: 20px;
    right: 20px;
    bottom: 2px;
    border: none;
    background: transparent;
    color: white;
    font-size: 12px;
    outline: none;
  `;
  
  const searchBox = document.querySelector('.overlap');
  const searchText = searchBox.querySelector('.text-wrapper-2');
  
  searchText.style.display = 'none';
  searchBox.appendChild(searchInput);
  searchBox.classList.add('search-focused');
  
  searchInput.focus();
  
  searchInput.addEventListener('blur', function() {
    searchText.style.display = 'block';
    searchBox.removeChild(searchInput);
    searchBox.classList.remove('search-focused');
  });
  
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch(this.value);
    }
  });
}

function performSearch(query) {
  console.log('Searching for:', query);
  // Implement search logic here
  showNotification(`ძებნა: "${query}"`);
}

// Category filtering
function filterByCategory(category) {
  currentCategory = category;
  console.log('Filtering by category:', category);
  
  // Add visual feedback
  const categoryElements = document.querySelectorAll('[onclick*="filterByCategory"]');
  categoryElements.forEach(el => el.classList.remove('filter-active'));
  
  event.target.classList.add('filter-active');
  
  // Filter products (in a real app, this would update the product grid)
  showNotification(`კატეგორია: ${getCategoryName(category)}`);
}

function getCategoryName(category) {
  const categoryNames = {
    fruits: 'ხილი და კენკრა',
    vegetables: 'ბოსტნეული და მწვანილი',
    meat: 'ხორცისა და ფრინველის პროდუქტები',
    fish: 'თევზეული',
    dairy: 'რძის პროდუქტები',
    eggs: 'კვერცხი',
    grains: 'მარცვლეული და პარკოსნები',
    seeds: 'თესლები და ნერგები',
    honey: 'თაფლი და ფუტკრის პროდუქტები',
    juices: 'ბუნებრივი წვენები',
    wine: 'ღვინო და ალკოჰოლური სასმელები',
    flowers: 'ყვავილები'
  };
  return categoryNames[category] || category;
}

// Product interactions
function viewProduct(productId) {
  const product = products[productId];
  if (product) {
    console.log('Viewing product:', product);
    showNotification(`პროდუქტი: ${product.name}`);
    // In a real app, this would open a product detail modal or navigate to product page
  }
}

function addToFavorites(productId) {
  event.stopPropagation();
  
  if (!favorites.includes(productId)) {
    favorites.push(productId);
    localStorage.setItem('villego_favorites', JSON.stringify(favorites));
    showNotification('დაემატა ფავორიტებში');
  } else {
    favorites = favorites.filter(id => id !== productId);
    localStorage.setItem('villego_favorites', JSON.stringify(favorites));
    showNotification('ამოიშალა ფავორიტებიდან');
  }
  
  updateFavoritesCount();
  
  // Add visual feedback
  const heartIcon = event.target.closest('.vector-wrapper');
  if (heartIcon) {
    heartIcon.style.backgroundColor = favorites.includes(productId) ? '#ff6b6b' : '#ffffff';
  }
}

function addToCart(productId) {
  event.stopPropagation();
  
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  
  localStorage.setItem('villego_cart', JSON.stringify(cart));
  updateCartCount();
  showNotification('დაემატა კალათაში');
  
  // Add visual feedback
  const cartIcon = event.target.closest('.overlap-group-3');
  if (cartIcon) {
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
      cartIcon.style.transform = 'scale(1)';
    }, 200);
  }
}

// Navigation
function navigateTo(page) {
  console.log('Navigating to:', page);
  showNotification(`გადასვლა: ${page}`);
  
  // Add navigation logic here
  switch(page) {
    case 'blog':
      // Navigate to blog
      break;
    case 'farmers':
      // Navigate to farmers page
      break;
    case 'about':
      // Navigate to about page
      break;
    case 'contact':
      // Navigate to contact page
      break;
    case 'map':
      // Open map view
      break;
    default:
      console.log('Unknown page:', page);
  }
}

// Pagination
function goToPage(page) {
  currentPage = page;
  console.log('Going to page:', page);
  
  // Update page indicators
  const pageNumbers = document.querySelectorAll('.group-8 .text-wrapper-47, .group-8 .text-wrapper-48, .group-8 .text-wrapper-49');
  pageNumbers.forEach((el, index) => {
    if (index + 1 === page) {
      el.style.color = '#007f5f';
      el.style.fontWeight = '900';
    } else {
      el.style.color = '#000000';
      el.style.fontWeight = '700';
    }
  });
  
  showNotification(`გვერდი ${page}`);
}

function previousPage() {
  if (currentPage > 1) {
    goToPage(currentPage - 1);
  }
}

function nextPage() {
  if (currentPage < 3) { // Assuming 3 pages max
    goToPage(currentPage + 1);
  }
}

// Filters
function setupFilters() {
  // Initialize price range sliders
  setupPriceFilter();
  setupQuantityFilter();
}

function setupPriceFilter() {
  const minSlider = document.querySelector('.overlap-9 .ellipse-2');
  const maxSlider = document.querySelector('.overlap-9 .ellipse-3');
  
  if (minSlider && maxSlider) {
    makeDraggable(minSlider, 'price', 'min');
    makeDraggable(maxSlider, 'price', 'max');
  }
}

function setupQuantityFilter() {
  const minSlider = document.querySelector('.overlap-13 .ellipse-2');
  const maxSlider = document.querySelector('.overlap-13 .ellipse-3');
  
  if (minSlider && maxSlider) {
    makeDraggable(minSlider, 'quantity', 'min');
    makeDraggable(maxSlider, 'quantity', 'max');
  }
}

function makeDraggable(element, type, minMax) {
  let isDragging = false;
  
  element.addEventListener('mousedown', function(e) {
    isDragging = true;
    e.preventDefault();
  });
  
  document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      const rect = element.parentElement.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percentage = x / rect.width;
      
      element.style.left = `${x}px`;
      
      if (type === 'price') {
        const value = Math.round(1 + percentage * 999);
        priceRange[minMax] = value;
        updatePriceDisplay();
      } else if (type === 'quantity') {
        const value = Math.round(1 + percentage * 999);
        quantityRange[minMax] = value;
        updateQuantityDisplay();
      }
    }
  });
  
  document.addEventListener('mouseup', function() {
    isDragging = false;
  });
}

function updatePriceDisplay() {
  console.log('Price range updated:', priceRange);
  // Update price display elements
}

function updateQuantityDisplay() {
  console.log('Quantity range updated:', quantityRange);
  // Update quantity display elements
}

function toggleDiscount() {
  discountFilter = !discountFilter;
  const discountElement = event.target;
  
  if (discountFilter) {
    discountElement.style.backgroundColor = '#007f5f';
    discountElement.style.color = '#ffffff';
  } else {
    discountElement.style.backgroundColor = 'transparent';
    discountElement.style.color = '#000000';
  }
  
  console.log('Discount filter:', discountFilter);
  showNotification(discountFilter ? 'ფასდაკლება ჩართულია' : 'ფასდაკლება გამორთულია');
}

// Sorting
function toggleSortMenu() {
  const sortOptions = ['ფასის ზრდით', 'ფასის კლებით', 'ალფაბეტურად', 'პოპულარობით'];
  const currentIndex = sortOptions.findIndex(option => 
    document.querySelector('.text-wrapper-29').textContent.includes(option)
  );
  
  const nextIndex = (currentIndex + 1) % sortOptions.length;
  const nextOption = sortOptions[nextIndex];
  
  document.querySelector('.text-wrapper-29').textContent = `დალაგება ${nextOption}`;
  
  console.log('Sort changed to:', nextOption);
  showNotification(`დალაგება: ${nextOption}`);
}

// Profile and user actions
function toggleProfile() {
  console.log('Profile menu toggled');
  showNotification('პროფილის მენიუ');
  
  // Create and show profile dropdown
  const profileMenu = document.createElement('div');
  profileMenu.className = 'profile-menu';
  profileMenu.style.cssText = `
    position: fixed;
    top: 100px;
    right: 50px;
    background: white;
    border: 2px solid #007f5f;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    z-index: 1000;
  `;
  
  profileMenu.innerHTML = `
    <div style="margin-bottom: 10px; cursor: pointer;" onclick="navigateTo('profile')">პროფილი</div>
    <div style="margin-bottom: 10px; cursor: pointer;" onclick="navigateTo('orders')">ჩემი შეკვეთები</div>
    <div style="margin-bottom: 10px; cursor: pointer;" onclick="navigateTo('settings')">პარამეტრები</div>
    <div style="cursor: pointer;" onclick="logout()">გასვლა</div>
  `;
  
  document.body.appendChild(profileMenu);
  
  // Remove menu when clicking outside
  setTimeout(() => {
    document.addEventListener('click', function removeMenu(e) {
      if (!profileMenu.contains(e.target)) {
        document.body.removeChild(profileMenu);
        document.removeEventListener('click', removeMenu);
      }
    });
  }, 100);
}

function logout() {
  console.log('User logged out');
  showNotification('გამოსვლა წარმატებით');
  // Clear user data and redirect to login
}

function addProduct() {
  console.log('Add new product');
  showNotification('ახალი პროდუქტის დამატება');
  // Open add product modal
}

function showFavorites() {
  console.log('Showing favorites');
  showNotification(`ფავორიტები (${favorites.length})`);
  // Navigate to favorites page
}

// App downloads
function downloadApp(store) {
  console.log('Download app from:', store);
  
  const urls = {
    microsoft: 'https://www.microsoft.com/store',
    apple: 'https://apps.apple.com',
    google: 'https://play.google.com/store'
  };
  
  showNotification(`გადმოწერა ${store} მაღაზიიდან`);
  
  // In a real app, this would open the respective app store
  // window.open(urls[store], '_blank');
}

// Contact actions
function callPhone() {
  console.log('Calling phone number');
  showNotification('ზარი: 555 88 88 88');
  // window.location.href = 'tel:+995555888888';
}

function sendEmail() {
  console.log('Sending email');
  showNotification('ელ-ფოსტა: VilleGoLLC@gmail.com');
  // window.location.href = 'mailto:VilleGoLLC@gmail.com';
}

function showLocation() {
  console.log('Showing location');
  showNotification('მისამართი: მიცკევიჩის N25');
  // Open maps application
}

// Utility functions
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  console.log('Cart items:', totalItems);
  
  // Update cart badge (if exists)
  const cartBadge = document.querySelector('.cart-badge');
  if (cartBadge) {
    cartBadge.textContent = totalItems;
  }
}

function updateFavoritesCount() {
  console.log('Favorites count:', favorites.length);
  
  // Update favorites badge (if exists)
  const favoritesBadge = document.querySelector('.favorites-badge');
  if (favoritesBadge) {
    favoritesBadge.textContent = favorites.length;
  }
}

function showNotification(message) {
  // Create notification element
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
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 10000;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    max-width: 300px;
    animation: slideIn 0.3s ease-out;
  `;
  
  // Add animation keyframes
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

function setupResponsive() {
  // Handle window resize
  window.addEventListener('resize', function() {
    // Adjust layout for different screen sizes
    const container = document.querySelector('.screen .div');
    if (container && window.innerWidth < 1920) {
      const scale = window.innerWidth / 1920;
      container.style.transform = `scale(${scale})`;
      container.style.transformOrigin = 'top center';
    } else if (container) {
      container.style.transform = 'none';
    }
  });
  
  // Initial resize check
  window.dispatchEvent(new Event('resize'));
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Ctrl/Cmd + K for search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    focusSearch();
  }
  
  // Escape to close modals/menus
  if (e.key === 'Escape') {
    const profileMenu = document.querySelector('.profile-menu');
    if (profileMenu) {
      document.body.removeChild(profileMenu);
    }
  }
  
  // Arrow keys for pagination
  if (e.key === 'ArrowLeft') {
    previousPage();
  } else if (e.key === 'ArrowRight') {
    nextPage();
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

// Export functions for global access (if needed)
window.VilleGo = {
  filterByCategory,
  viewProduct,
  addToFavorites,
  addToCart,
  navigateTo,
  goToPage,
  previousPage,
  nextPage,
  toggleProfile,
  showFavorites,
  downloadApp,
  callPhone,
  sendEmail,
  showLocation,
  focusSearch,
  toggleDiscount,
  toggleSortMenu,
  addProduct
};

console.log('VilleGo JavaScript loaded successfully');
