// Cart functionality
let cart = [];
let cartCount = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners();
  initializeAnimations();
  updateCartDisplay();
});

// Initialize all event listeners
function initializeEventListeners() {
  // Add to cart button
  const addToCartBtn = document.querySelector('.overlap');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', addToCart);
  }

  // Product cards hover effects
  const productCards = document.querySelectorAll('.overlap-group-2');
  productCards.forEach(card => {
    card.addEventListener('mouseenter', handleProductHover);
    card.addEventListener('mouseleave', handleProductLeave);
  });

  // Navigation menu items
  const navItems = document.querySelectorAll('.text-wrapper-26, .text-wrapper-27, .text-wrapper-28, .text-wrapper-29, .text-wrapper-31');
  navItems.forEach(item => {
    item.addEventListener('click', handleNavigation);
  });

  // Search functionality
  const searchBar = document.querySelector('.rectangle-8');
  if (searchBar) {
    searchBar.addEventListener('click', focusSearch);
  }

  // Social media icons
  const socialIcons = document.querySelectorAll('.vector-16, .d, .vector-17, .image-3, .image-4, .image-5');
  socialIcons.forEach(icon => {
    icon.addEventListener('click', handleSocialClick);
  });

  // App store buttons
  const appStoreButtons = document.querySelectorAll('.mobile-app-store, .mobile-app-store-2, .mobile-app-store-3');
  appStoreButtons.forEach(button => {
    button.addEventListener('click', handleAppStoreClick);
  });

  // Product action buttons (heart and share)
  const actionButtons = document.querySelectorAll('.div-2, .div-3, .img-wrapper, .overlap-6');
  actionButtons.forEach(button => {
    button.addEventListener('click', handleProductAction);
  });

  // Logo click
  const logo = document.querySelector('.text-wrapper-25');
  if (logo) {
    logo.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Add product to cart
function addToCart() {
  const product = {
    id: 1,
    name: 'ცაცხვის თაფლი 1კგ',
    price: 22.0,
    image: 'honey-image.jpg'
  };

  cart.push(product);
  cartCount++;
  
  // Add animation class
  const button = document.querySelector('.overlap');
  button.classList.add('cart-animation');
  
  // Remove animation class after animation completes
  setTimeout(() => {
    button.classList.remove('cart-animation');
  }, 300);

  updateCartDisplay();
  showNotification('პროდუქტი დაემატა კალათაში!');
}

// Update cart display
function updateCartDisplay() {
  const cartIcon = document.querySelector('.vector-3');
  if (cartIcon && cartCount > 0) {
    // Create or update cart badge
    let badge = document.querySelector('.cart-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'cart-badge';
      badge.style.cssText = `
        position: absolute;
        top: -5px;
        right: -5px;
        background-color: #ff4444;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      `;
      cartIcon.parentElement.style.position = 'relative';
      cartIcon.parentElement.appendChild(badge);
    }
    badge.textContent = cartCount;
  }
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
      notification.remove();
    }, 300);
  }, 3000);
}

// Handle product hover
function handleProductHover(event) {
  const card = event.currentTarget;
  card.style.transform = 'translateY(-10px) scale(1.02)';
  card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
}

// Handle product leave
function handleProductLeave(event) {
  const card = event.currentTarget;
  card.style.transform = 'translateY(0) scale(1)';
  card.style.boxShadow = 'none';
}

// Handle navigation clicks
function handleNavigation(event) {
  const text = event.target.textContent;
  console.log(`Navigating to: ${text}`);
  
  // Add ripple effect
  createRippleEffect(event.target, event);
  
  // Simulate navigation (in a real app, this would route to different pages)
  showNotification(`გადასვლა: ${text}`);
}

// Handle social media clicks
function handleSocialClick(event) {
  const socialPlatforms = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube'];
  const randomPlatform = socialPlatforms[Math.floor(Math.random() * socialPlatforms.length)];
  
  createRippleEffect(event.target, event);
  showNotification(`გადასვლა ${randomPlatform}-ზე`);
}

// Handle app store clicks
function handleAppStoreClick(event) {
  const button = event.currentTarget;
  let storeName = 'App Store';
  
  if (button.classList.contains('mobile-app-store')) {
    storeName = 'Microsoft Store';
  } else if (button.classList.contains('mobile-app-store-3')) {
    storeName = 'Google Play';
  }
  
  createRippleEffect(button, event);
  showNotification(`გადასვლა ${storeName}-ზე`);
}

// Handle product action buttons (like, share, etc.)
function handleProductAction(event) {  event.preventDefault();
  const button = event.currentTarget;
  
  // Determine action type based on button class
  let actionType = 'like';
  if (button.classList.contains('div-3') || button.classList.contains('overlap-6')) {
    actionType = 'share';
  }
  
  // Add visual feedback
  button.style.backgroundColor = actionType === 'like' ? '#ff4444' : '#007f5f';
  button.style.transform = 'scale(1.2)';
  
  // Reset after animation
  setTimeout(() => {
    button.style.backgroundColor = '#ffffff';
    button.style.transform = 'scale(1)';
  }, 200);
  
  const message = actionType === 'like' ? 'პროდუქტი მოწონდა!' : 'პროდუქტი გაზიარდა!';
  showNotification(message);
}

// Create ripple effect
function createRippleEffect(element, event) {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  `;
  
  // Add ripple animation keyframes if not already added
  if (!document.querySelector('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Focus search functionality
function focusSearch() {
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'ძებნა...';
  searchInput.style.cssText = `
    position: absolute;
    top: 68px;
    left: 791px;
    width: 830px;
    height: 34px;
    border: none;
    border-radius: 16px;
    padding: 0 20px;
    font-size: 16px;
    outline: none;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 100;
  `;
  
  document.querySelector('.overlap-9').appendChild(searchInput);
  searchInput.focus();
  
  searchInput.addEventListener('blur', () => {
    setTimeout(() => searchInput.remove(), 200);
  });
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        showNotification(`ძებნა: "${query}"`);
        searchInput.remove();
      }
    }
  });
}

// Initialize animations
function initializeAnimations() {
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe product cards
  const productCards = document.querySelectorAll('.overlap-group-2');
  productCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
  
  // Observe app store buttons
  const appButtons = document.querySelectorAll('.mobile-app-store, .mobile-app-store-2, .mobile-app-store-3');
  appButtons.forEach((button, index) => {
    button.style.opacity = '0';
    button.style.transform = 'translateX(50px)';
    button.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    observer.observe(button);
  });
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

// Quantity selector functionality
function createQuantitySelector() {
  const quantityContainer = document.createElement('div');
  quantityContainer.className = 'quantity-selector';
  quantityContainer.style.cssText = `
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 0;
  `;
  
  const decreaseBtn = document.createElement('button');
  decreaseBtn.textContent = '-';
  decreaseBtn.style.cssText = `
    width: 30px;
    height: 30px;
    border: 1px solid #007f5f;
    background: white;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
  `;
  
  const quantityDisplay = document.createElement('span');
  quantityDisplay.textContent = '1';
  quantityDisplay.style.cssText = `
    font-size: 18px;
    font-weight: bold;
    min-width: 30px;
    text-align: center;
  `;
  
  const increaseBtn = document.createElement('button');
  increaseBtn.textContent = '+';
  increaseBtn.style.cssText = `
    width: 30px;
    height: 30px;
    border: 1px solid #007f5f;
    background: #007f5f;
    color: white;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
  `;
  
  let quantity = 1;
  
  decreaseBtn.addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      quantityDisplay.textContent = quantity;
    }
  });
  
  increaseBtn.addEventListener('click', () => {
    if (quantity < 10) {
      quantity++;
      quantityDisplay.textContent = quantity;
    }
  });
  
  quantityContainer.appendChild(decreaseBtn);
  quantityContainer.appendChild(quantityDisplay);
  quantityContainer.appendChild(increaseBtn);
  
  return { container: quantityContainer, getQuantity: () => quantity };
}

// Product modal functionality
function showProductModal(productData) {
  const modal = document.createElement('div');
  modal.className = 'product-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  
  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    background: white;
    border-radius: 20px;
    padding: 30px;
    max-width: 600px;
    width: 90%;
    max-height: 80%;
    overflow-y: auto;
    transform: scale(0.8);
    transition: transform 0.3s ease;
  `;
  
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '×';
  closeBtn.style.cssText = `
    position: absolute;
    top: 15px;
    right: 20px;
    background: none;
    border: none;
    font-size: 30px;
    cursor: pointer;
    color: #666;
  `;
  
  modalContent.innerHTML = `
    <h2 style="margin-bottom: 20px; color: #007f5f;">${productData.name}</h2>
    <img src="${productData.image}" alt="${productData.name}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 10px; margin-bottom: 20px;">
    <p style="font-size: 24px; font-weight: bold; color: #007f5f; margin-bottom: 15px;">${productData.price} ლ</p>
    <p style="line-height: 1.6; margin-bottom: 20px;">${productData.description}</p>
    <div id="quantity-container"></div>
    <button id="add-to-cart-modal" style="
      width: 100%;
      padding: 15px;
      background: #007f5f;
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 20px;
    ">კალათაში დამატება</button>
  `;
  
  modalContent.appendChild(closeBtn);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  
  // Add quantity selector
  const quantitySelector = createQuantitySelector();
  document.getElementById('quantity-container').appendChild(quantitySelector.container);
  
  // Show modal with animation
  setTimeout(() => {
    modal.style.opacity = '1';
    modalContent.style.transform = 'scale(1)';
  }, 10);
  
  // Close modal functionality
  const closeModal = () => {
    modal.style.opacity = '0';
    modalContent.style.transform = 'scale(0.8)';
    setTimeout(() => modal.remove(), 300);
  };
  
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  // Add to cart from modal
  document.getElementById('add-to-cart-modal').addEventListener('click', () => {
    const quantity = quantitySelector.getQuantity();
    for (let i = 0; i < quantity; i++) {
      cart.push(productData);
      cartCount++;
    }
    updateCartDisplay();
    showNotification(`${quantity} პროდუქტი დაემატა კალათაში!`);
    closeModal();
  });
}

// Initialize product click handlers
document.addEventListener('DOMContentLoaded', function() {
  const productImages = document.querySelectorAll('.rectangle-3, .rectangle-5, .rectangle-6');
  productImages.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      const productData = {
        name: 'ცაცხვის თაფლი 1კგ',
        price: '22.0',
        image: img.src,
        description: 'ბუნებრივი ცაცხვის თაფლი, რომელიც მოპოვებულია ეკოლოგიურად სუფთა რეგიონებში. მდიდარია ვიტამინებითა და მინერალებით.'
      };
      showProductModal(productData);
    });
  });
});

// Lazy loading for images
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        const newImg = new Image();
        newImg.onload = () => {
          img.style.opacity = '1';
        };
        newImg.src = img.src;
        
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initializeLazyLoading();

// Performance optimization: Debounce scroll events
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

// Optimized scroll handler
const handleScroll = debounce(() => {
  const scrolled = window.pageYOffset;
  const header = document.querySelector('.v');
  
  if (header) {
    if (scrolled > 100) {
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      header.style.backgroundColor = 'rgba(255,255,255,0.95)';
    } else {
      header.style.boxShadow = 'none';
      header.style.backgroundColor = 'transparent';
    }
  }
}, 10);

window.addEventListener('scroll', handleScroll);

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
    });
  });
});
