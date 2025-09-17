// Farm data
const farmData = {
  'ფერმა ,,ჯეჯილი"': {
    location: 'სოფელი გომბორი, კაიკაცელის ქუჩა N2',
    products: ['რძის პროდუქტი'],
    rating: 'SUPER VIP',
    description: 'ჯეჯილი ფერმა არის ერთ-ერთი საუკეთესო რძის პროდუქტების მწარმოებელი რეგიონში. ჩვენ ვიყენებთ მხოლოდ ბუნებრივ საკვებს და ტრადიციულ მეთოდებს.'
  },
  'ფერმა ,,ლანუ"': {
    location: 'სოფელი გომბორი, კაიკაცელის ქუჩა N2',
    products: ['რძის პროდუქტი'],
    rating: 'SUPER VIP',
    description: 'ლანუ ფერმა სპეციალიზირებულია მაღალი ხარისხის რძის პროდუქტების წარმოებაში. ჩვენი ცხოველები იზრდებიან ეკოლოგიურად სუფთა გარემოში.'
  },
  'ფერმა ,,აზნაურთა"': {
    location: 'სოფელი გომბორი, კაიკაცელის ქუჩა N2',
    products: ['რძის პროდუქტი'],
    rating: 'SUPER VIP',
    description: 'აზნაურთა ფერმა ცნობილია თავისი ტრადიციული მეთოდებით და მაღალი ხარისხის პროდუქტებით. ჩვენ ვზრუნავთ ცხოველების კეთილდღეობაზე.'
  },
  'ფერმა ,,რაისი"': {
    location: 'სოფელი გომბორი, კაიკაცელის ქუჩა N2',
    products: ['რძის პროდუქტი', 'თაფლი'],
    rating: 'SUPER VIP',
    description: 'რაისი ფერმა მრავალპროფილიანი ფერმაა, რომელიც აწარმოებს როგორც რძის პროდუქტებს, ასევე ბუნებრივ თაფლს. ჩვენი პროდუქტები 100% ორგანულია.',
    contact: {
      phone: '555 88 88 88',
      email: 'raisiLLC@gmail.com'
    }
  },
  'ფერმა ,,რიკი"': {
    location: 'სოფელი გომბორი, კაიკაცელის ქუჩა N2',
    products: ['რძის პროდუქტი'],
    rating: 'VIP +',
    description: 'რიკი ფერმა ახალი ფერმაა, რომელიც სწრაფად იკვეჩს რეპუტაციას მაღალი ხარისხის რძის პროდუქტების წარმოებაში.'
  }
};

// Product data
const productData = [
  {
    name: 'აკაციის თაფლი 1 კგ',
    category: 'თაფლი',
    farm: 'რაისი',
    price: '20.0 ლ'
  }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners();
  initializeSearch();
  initializeAnimations();
});

// Event listeners
function initializeEventListeners() {
  // Farm card click events
  const farmCards = document.querySelectorAll('.rectangle, .rectangle-4, .rectangle-8, .rectangle-12, .rectangle-16, .rectangle-20');
  farmCards.forEach(card => {
    card.addEventListener('click', handleFarmCardClick);
  });

  // Product card click events
  const productCards = document.querySelectorAll('.element, .element-3, .element-4, .element-5, .element-6');
  productCards.forEach(card => {
    card.addEventListener('click', handleProductCardClick);
  });

  // Navigation menu clicks
  const navItems = document.querySelectorAll('.text-wrapper-34, .text-wrapper-35, .text-wrapper-36, .text-wrapper-37, .text-wrapper-39');
  navItems.forEach(item => {
    item.addEventListener('click', handleNavClick);
  });

  // Social media icons
  const socialIcons = document.querySelectorAll('.vector-16, .vector-17, .vector-18, .plus-circle, .ellipse-7');
  socialIcons.forEach(icon => {
    icon.addEventListener('click', handleSocialClick);
  });

  // Action buttons (like, share, etc.)
  const actionButtons = document.querySelectorAll('.vector, .img, .vector-2, .vector-3, .vector-4, .vector-5, .vector-6, .vector-7, .vector-8, .vector-9, .vector-10, .vector-11');
  actionButtons.forEach(button => {
    button.addEventListener('click', handleActionClick);
  });

  // "View All" button
  const viewAllBtn = document.querySelector('.view-3');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', showAllProducts);
  }

  // Product action buttons
  const productActions = document.querySelectorAll('.vector-wrapper, .overlap-group-2');
  productActions.forEach(action => {
    action.addEventListener('click', handleProductAction);
  });
}

// Handle farm card clicks
function handleFarmCardClick(event) {
  const farmCard = event.currentTarget;
  const farmNameElement = farmCard.parentElement.querySelector('[class*="text-wrapper"]');
  
  if (farmNameElement) {
    const farmName = farmNameElement.textContent.trim();
    const farm = farmData[farmName];
    
    if (farm) {
      showFarmModal(farmName, farm);
    }
  }
}

// Handle product card clicks
function handleProductCardClick(event) {
  const productCard = event.currentTarget;
  showProductModal(productData[0]); // For demo, showing first product
}

// Handle navigation clicks
function handleNavClick(event) {
  const navItem = event.currentTarget;
  const text = navItem.textContent.trim();
  
  // Add active state
  document.querySelectorAll('.text-wrapper-34, .text-wrapper-35, .text-wrapper-36, .text-wrapper-37, .text-wrapper-39').forEach(item => {
    item.style.fontWeight = '400';
  });
  navItem.style.fontWeight = '700';
  
  // Handle different navigation items
  switch(text) {
    case 'ბლოგი':
      showNotification('ბლოგი გვერდი მალე იქნება ხელმისაწვდომი');
      break;
    case 'ფერმერები':
      scrollToFarms();
      break;
    case 'ჩვენს შესახებ':
      showAboutModal();
      break;
    case 'კონტაქტი':
      showContactModal();
      break;
    case 'რუკა':
      showMapModal();
      break;
  }
}

// Handle social media clicks
function handleSocialClick(event) {
  const icon = event.currentTarget;
  showNotification('სოციალური მედია ლინკები მალე იქნება ხელმისაწვდომი');
}

// Handle action button clicks (like, share, etc.)
function handleActionClick(event) {
  event.stopPropagation();
  const button = event.currentTarget;
  
  // Add animation
  button.style.transform = 'scale(1.2)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 200);
  
  showNotification('მოქმედება წარმატებით შესრულდა!');
}

// Handle product actions (add to cart, favorite)
function handleProductAction(event) {
  event.stopPropagation();
  const action = event.currentTarget;
  
  // Add animation
  action.style.transform = 'scale(1.1)';
  setTimeout(() => {
    action.style.transform = 'scale(1)';
  }, 200);
  
  if (action.classList.contains('vector-wrapper')) {
    showNotification('პროდუქტი დაემატა ფავორიტებში!');
  } else {
    showNotification('პროდუქტი დაემატა კალათაში!');
  }
}

// Show farm modal
function showFarmModal(farmName, farm) {
  const modal = createModal();
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>${farmName}</h2>
      <p><strong>მდებარეობა:</strong> ${farm.location}</p>
      <p><strong>პროდუქტები:</strong> ${farm.products.join(', ')}</p>
      <p><strong>რეიტინგი:</strong> ${farm.rating}</p>
      <p><strong>აღწერა:</strong> ${farm.description}</p>
      ${farm.contact ? `
        <p><strong>კონტაქტი:</strong></p>
        <p>📞 ${farm.contact.phone}</p>
        <p>📧 ${farm.contact.email}</p>
      ` : ''}
    </div>
  `;
  
  showModal(modal);
}

// Show product modal
function showProductModal(product) {
  const modal = createModal();
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>${product.name}</h2>
      <p><strong>კატეგორია:</strong> ${product.category}</p>
      <p><strong>ფერმა:</strong> ${product.farm}</p>
      <p><strong>ფასი:</strong> ${product.price}</p>
      <p><strong>აღწერა:</strong> ბუნებრივი და ორგანული პროდუქტი, რომელიც მზადდება ტრადიციული მეთოდებით.</p>
      <button onclick="addToCart('${product.name}')" style="background: #007f5f; color: white; padding: 10px 20px; border: none; border-radius: 10px; cursor: pointer; margin-top: 15px;">კალათაში დამატება</button>
    </div>
  `;
  
  showModal(modal);
}

// Show about modal
function showAboutModal() {
  const modal = createModal();
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>ჩვენს შესახებ</h2>
      <p>VilleGo არის ონლაინ პლატფორმა, რომელიც აკავშირებს ფერმერებს მომხმარებლებთან.</p>
      <p>ჩვენი მიზანია ხელი შევუწყოთ ადგილობრივი, ორგანული და მაღალი ხარისხის პროდუქტების გავრცელებას.</p>
      <p>ჩვენ ვზრუნავთ ფერმერების მხარდაჭერაზე და მომხმარებლების ჯანმრთელობაზე.</p>
    </div>
  `;
  
  showModal(modal);
}

// Show contact modal
function showContactModal() {
  const modal = createModal();
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>კონტაქტი</h2>
      <p><strong>ტელეფონი:</strong> +995 555 123 456</p>
      <p><strong>ელ-ფოსტა:</strong> info@villego.ge</p>
      <p><strong>მისამართი:</strong> თბილისი, საქართველო</p>
      <p><strong>სამუშაო საათები:</strong> ორშაბათი-პარასკევი 9:00-18:00</p>
    </div>
  `;
  
  showModal(modal);
}

// Show map modal
function showMapModal() {
  const modal = createModal();
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>რუკა</h2>
      <p>ინტერაქტიული რუკა მალე იქნება ხელმისაწვდომი.</p>
      <p>აქ შეძლებთ იხილოთ ყველა რეგისტრირებული ფერმის მდებარეობა.</p>
      <div style="width: 100%; height: 300px; background: #f0f0f0; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-top: 20px;">
        <p style="color: #666;">რუკა ჩაიტვირთება...</p>
      </div>
    </div>
  `;
  
  showModal(modal);
}

// Show all products
function showAllProducts() {
  const modal = createModal();
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>ყველა პროდუქტი</h2>
      <p>აქ იქნება ყველა ხელმისაწვდომი პროდუქტის სია.</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
        ${productData.map(product => `
          <div style="border: 1px solid #ddd; border-radius: 10px; padding: 15px; text-align: center;">
            <h4>${product.name}</h4>
            <p>${product.category}</p>
            <p><strong>${product.price}</strong></p>
            <button onclick="addToCart('${product.name}')" style="background: #007f5f; color: white; padding: 8px 16px; border: none; border-radius: 5px; cursor: pointer;">დამატება</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  showModal(modal);
}

// Utility functions
function createModal() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  return modal;
}

function showModal(modal) {
  document.body.appendChild(modal);
  modal.style.display = 'block';
  
  // Close modal events
  const closeBtn = modal.querySelector('.close');
  closeBtn.onclick = () => closeModal(modal);
  
  modal.onclick = (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  };
  
  // Close on Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeModal(modal);
    }
  });
}

function closeModal(modal) {
  modal.style.display = 'none';
  document.body.removeChild(modal);
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #007f5f;
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    z-index: 1001;
    font-family: "Poppins", Helvetica;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideInRight 0.3s ease-out;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

function scrollToFarms() {
  const farmsSection = document.querySelector('.rectangle');
  if (farmsSection) {
    farmsSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function addToCart(productName) {
  showNotification(`${productName} დაემატა კალათაში!`);
}

// Search functionality
function initializeSearch() {
  const searchInput = document.querySelector('.text-wrapper-38');
  if (searchInput && searchInput.textContent === 'ძებნა') {
    // Convert to input field
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'ძებნა...';
    input.style.cssText = `
      background: transparent;
      border: none;
      color: white;
      font-family: "Roboto", Helvetica;
      font-size: 18px;
      width: 200px;
      outline: none;
    `;
    
    input.addEventListener('input', handleSearch);
    searchInput.parentElement.replaceChild(input, searchInput);
  }
}

function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  const farmNames = document.querySelectorAll('[class*="text-wrapper"]:not(.text-wrapper-33):not(.text-wrapper-34):not(.text-wrapper-35):not(.text-wrapper-36):not(.text-wrapper-37):not(.text-wrapper-39)');
  
  farmNames.forEach(element => {
    const text = element.textContent.toLowerCase();
    if (searchTerm && text.includes(searchTerm)) {
      element.innerHTML = highlightText(element.textContent, searchTerm);
    } else {
      element.innerHTML = element.textContent;
    }
  });
}

function highlightText(text, searchTerm) {
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<span class="search-highlight">$1</span>');
}

// Initialize animations
function initializeAnimations() {
  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .pulse {
      animation: pulse 2s infinite;
    }
  `;
  document.head.appendChild(style);
  
  // Add intersection observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }  });
  }, { threshold: 0.1 });

  // Observe farm cards for scroll animations
  const farmCards = document.querySelectorAll('.rectangle, .rectangle-4, .rectangle-8, .rectangle-12, .rectangle-16');
  farmCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });

  // Observe product cards
  const productCards = document.querySelectorAll('.element, .element-3, .element-4, .element-5, .element-6');
  productCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
  if (event.ctrlKey || event.metaKey) {
    switch(event.key) {
      case 'f':
        event.preventDefault();
        const searchInput = document.querySelector('input[placeholder="ძებნა..."]');
        if (searchInput) {
          searchInput.focus();
        }
        break;
      case 'h':
        event.preventDefault();
        scrollToTop();
        break;
    }
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add loading animation
window.addEventListener('load', function() {
  const loader = document.createElement('div');
  loader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
  `;
  
  loader.innerHTML = `
    <div style="text-align: center;">
      <div style="width: 50px; height: 50px; border: 5px solid #f3f3f3; border-top: 5px solid #007f5f; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
      <p style="font-family: 'Poppins', Helvetica; color: #007f5f; font-size: 18px;">იტვირთება...</p>
    </div>
  `;
  
  const spinStyle = document.createElement('style');
  spinStyle.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(spinStyle);
  
  document.body.appendChild(loader);
  
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      if (document.body.contains(loader)) {
        document.body.removeChild(loader);
      }
    }, 500);
  }, 1500);
});

// Add smooth scrolling for all internal links
document.addEventListener('click', function(event) {
  const target = event.target;
  if (target.tagName === 'A' && target.getAttribute('href') && target.getAttribute('href').startsWith('#')) {
    event.preventDefault();
    const targetId = target.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

// Add touch gestures for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(event) {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchend', function(event) {
  const touchEndX = event.changedTouches[0].clientX;
  const touchEndY = event.changedTouches[0].clientY;
  
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;
  
  // Swipe detection
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
    if (deltaX > 0) {
      // Swipe right
      showNotification('გადაფურცვლა მარჯვნივ');
    } else {
      // Swipe left
      showNotification('გადაფურცვლა მარცხნივ');
    }
  }
});

// Performance optimization
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

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
  // Handle scroll events here if needed
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// Add error handling
window.addEventListener('error', function(event) {
  console.error('JavaScript error:', event.error);
  showNotification('მოხდა შეცდომა. გთხოვთ, განაახლოთ გვერდი.');
});

// Add online/offline detection
window.addEventListener('online', function() {
  showNotification('ინტერნეტ კავშირი აღდგა');
});

window.addEventListener('offline', function() {
  showNotification('ინტერნეტ კავშირი გაწყდა');
});

// Initialize tooltips
function initializeTooltips() {
  const elements = document.querySelectorAll('[title]');
  elements.forEach(element => {
    element.addEventListener('mouseenter', showTooltip);
    element.addEventListener('mouseleave', hideTooltip);
  });
}

function showTooltip(event) {
  const element = event.target;
  const title = element.getAttribute('title');
  
  if (title) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = title;
    tooltip.style.cssText = `
      position: absolute;
      background: #333;
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 14px;
      z-index: 1000;
      pointer-events: none;
      white-space: nowrap;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
    
    element.tooltipElement = tooltip;
    element.removeAttribute('title');
    element.setAttribute('data-original-title', title);
  }
}

function hideTooltip(event) {
  const element = event.target;
  if (element.tooltipElement) {
    document.body.removeChild(element.tooltipElement);
    element.tooltipElement = null;
    
    const originalTitle = element.getAttribute('data-original-title');
    if (originalTitle) {
      element.setAttribute('title', originalTitle);
      element.removeAttribute('data-original-title');
    }
  }
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTooltips);
} else {
  initializeTooltips();
}

// Add resize handler for responsive behavior
window.addEventListener('resize', debounce(function() {
  // Handle window resize
  const width = window.innerWidth;
  if (width < 1200) {
    // Mobile optimizations
    document.body.classList.add('mobile-view');
  } else {
    document.body.classList.remove('mobile-view');
  }
}, 250));

// Initialize theme handling
function initializeTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  function handleThemeChange(e) {
    if (e.matches) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
  
  prefersDark.addListener(handleThemeChange);
  handleThemeChange(prefersDark);
}

// Call theme initialization
initializeTheme();

// Add print styles handling
window.addEventListener('beforeprint', function() {
  document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
  document.body.classList.remove('printing');
});
