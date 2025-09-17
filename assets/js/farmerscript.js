// Main application JavaScript
class VilleGoApp {
  constructor() {
    this.currentPage = 1;
    this.totalPages = 3;
    this.selectedFilters = new Set();
    this.priceRange = { min: 1, max: 1000 };
    this.quantityRange = { min: 1, max: 1000 };
    this.sortOrder = 'price-asc';
    this.products = this.initializeProducts();
    this.filteredProducts = [...this.products];
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupSliders();
    this.renderProducts();
    this.updatePagination();
  }

  initializeProducts() {
    return [
      {
        id: 1,
        name: 'აკაციის თაფლი 1 კგ',
        farm: '"რაისი"',
        price: 22.0,
        image: 'https://c.animaapp.com/mfi79y0gsd5KQQ/img/rectangle-2362.png',
        category: 'honey',
        inStock: true,
        rating: 4.5
      },
      {
        id: 2,
        name: 'ალუჩა 1 კგ',
        farm: '"რაისი"',
        price: 8.0,
        image: 'https://c.animaapp.com/mfi79y0gsd5KQQ/img/rectangle-2577.png',
        category: 'fruits',
        inStock: true,
        rating: 4.2
      },
      {
        id: 3,
        name: 'ჟოლო 1 კგ',
        farm: '"რაისი"',
        price: 20.0,
        image: 'https://c.animaapp.com/mfi79y0gsd5KQQ/img/rectangle-2362-1.png',
        category: 'fruits',
        inStock: true,
        rating: 4.7
      },
      {
        id: 4,
        name: 'მოცვი 1 კგ',
        farm: '"რაისი"',
        price: 12.0,
        image: 'https://c.animaapp.com/mfi79y0gsd5KQQ/img/rectangle-2362-2.png',
        category: 'fruits',
        inStock: true,
        rating: 4.3
      },
      {
        id: 5,
        name: 'შინდი 1კგ',
        farm: '"რაისი"',
        price: 6.0,
        image: 'https://c.animaapp.com/mfi79y0gsd5KQQ/img/rectangle-2362-3.png',
        category: 'fruits',
        inStock: true,
        rating: 4.1
      },
      {
        id: 6,
        name: 'ფიჭა 1 კგ',
        farm: '"რაისი"',
        price: 27.0,
        image: 'https://c.animaapp.com/mfi79y0gsd5KQQ/img/rectangle-2362-4.png',
        category: 'fruits',
        inStock: true,
        rating: 4.8
      }
    ];
  }

  setupEventListeners() {
    // Navigation arrows
    document.querySelector('.fill-with-left-arrow')?.addEventListener('click', () => {
      this.previousImage();
    });

    document.querySelector('.fill-with-right')?.addEventListener('click', () => {
      this.nextImage();
    });

    // Filter buttons
    document.querySelectorAll('.overlap, .div-wrapper, .overlap-group-2').forEach(button => {
      button.addEventListener('click', (e) => {
        this.handleFilterClick(e);
      });
    });

    // Sort dropdown
    document.querySelector('.group .overlap-group-2')?.addEventListener('click', () => {
      this.toggleSortDropdown();
    });

    // Pagination
    document.querySelector('.icons-arrow-left-wrapper')?.addEventListener('click', () => {
      this.previousPage();
    });

    document.querySelector('.icons-arrow-right-wrapper')?.addEventListener('click', () => {
      this.nextPage();
    });

    document.querySelectorAll('.text-wrapper-37, .text-wrapper-38, .text-wrapper-39').forEach((pageBtn, index) => {
      pageBtn.addEventListener('click', () => {
        this.goToPage(index + 1);
      });
    });

    // Product cards
    document.querySelectorAll('.overlap-10, .overlap-12, .overlap-13, .overlap-14, .overlap-15, .overlap-16').forEach(card => {
      card.addEventListener('click', (e) => {
        this.handleProductClick(e);
      });
    });

    // Filter sidebar items
    document.querySelectorAll('.apple, .potato, .pork, .fish, .milk-carton, .eggs, .cashew, .seed, .layer, .page, .group-4, .overlap-group-3').forEach(item => {
      item.addEventListener('click', (e) => {
        this.handleSidebarFilterClick(e);
      });
    });

    // Back button
    document.querySelector('.view .overlap-9')?.addEventListener('click', () => {
      this.goBack();
    });

    // Add to cart buttons
    document.querySelectorAll('.img-wrapper, .overlap-11').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.addToCart(e);
      });
    });

    // Search functionality
    document.querySelector('.rectangle-5')?.addEventListener('click', () => {
      this.handleSearch();
    });

    // Mobile menu toggle
    document.querySelector('.image')?.addEventListener('click', () => {
      this.toggleMobileMenu();
    });
  }

  setupSliders() {
    // Price range slider
    this.setupRangeSlider('.overlap-2', this.priceRange, (values) => {
      this.priceRange = values;
      this.filterProducts();
    });

    // Quantity range slider
    this.setupRangeSlider('.overlap-7', this.quantityRange, (values) => {
      this.quantityRange = values;
      this.filterProducts();
    });
  }

  setupRangeSlider(selector, range, callback) {
    const slider = document.querySelector(selector);
    if (!slider) return;

    const leftHandle = slider.querySelector('.ellipse');
    const rightHandle = slider.querySelector('.ellipse-2');
    const track = slider.querySelector('.rectangle-2');

    if (!leftHandle || !rightHandle || !track) return;

    let isDragging = false;
    let currentHandle = null;

    const updateSlider = (handle, clientX) => {
      const rect = track.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const value = Math.round(range.min + percentage * (range.max - range.min));

      if (handle === leftHandle) {
        range.min = Math.min(value, range.max - 1);
        leftHandle.style.left = `${(range.min - 1) / (1000 - 1) * 100}%`;
      } else {
        range.max = Math.max(value, range.min + 1);
        rightHandle.style.left = `${(range.max - 1) / (1000 - 1) * 100}%`;
      }

      callback(range);
    };

    [leftHandle, rightHandle].forEach(handle => {
      handle.addEventListener('mousedown', (e) => {
        isDragging = true;
        currentHandle = handle;
        e.preventDefault();
      });
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging && currentHandle) {
        updateSlider(currentHandle, e.clientX);
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      currentHandle = null;
    });
  }

  previousImage() {
    const images = [
      'https://c.animaapp.com/mfi79y0gsd5KQQ/img/rectangle-2321.png',
      'https://c.animaapp.com/mfi79y0gsd5KQQ/img/rectangle-2362.png',
      'https://c.animaapp.com/mfi79y0gsd5KQQ/img/rectangle-2577.png'
    ];
    
    const currentImg = document.querySelector('.overlap-group .img');
    if (currentImg) {
      const currentIndex = images.indexOf(currentImg.src);
      const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
      currentImg.src = images[newIndex];
      
      // Add animation
      currentImg.style.opacity = '0';
      setTimeout(() => {
        currentImg.style.opacity = '1';
      }, 150);
    }
  }

  nextImage() {
    const images = [
      'https://c.animaapp.com/mfi79y0gsd5KQQ/img/rectangle-2321.png',
      'https://c.animaapp.com/mfi79y0gsd5KQQ/img/rectangle-2362.png',
      'https://c.animaapp.com/mfi79y0gsd5KQQ/img/rectangle-2577.png'
    ];
    
    const currentImg = document.querySelector('.overlap-group .img');
    if (currentImg) {
      const currentIndex = images.indexOf(currentImg.src);
      const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
      currentImg.src = images[newIndex];
      
      // Add animation
      currentImg.style.opacity = '0';
      setTimeout(() => {
        currentImg.style.opacity = '1';
      }, 150);
    }
  }

  handleFilterClick(e) {
    const button = e.currentTarget;
    button.classList.toggle('active');
    
    // Add visual feedback
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = 'scale(1)';
    }, 150);

    this.filterProducts();
  }

  handleSidebarFilterClick(e) {
    const item = e.currentTarget;
    item.classList.toggle('active');
    
    // Get filter category from class name
    const filterMap = {
      'apple': 'fruits',
      'potato': 'vegetables',
      'pork': 'meat',
      'fish': 'fish',
      'milk-carton': 'dairy',
      'eggs': 'eggs',
      'cashew': 'grains',
      'seed': 'seeds',
      'layer': 'juices',
      'page': 'wine',
      'group-4': 'honey',
      'overlap-group-3': 'flowers'
    };

    const category = filterMap[item.className.split(' ')[1]];
    if (category) {
      if (this.selectedFilters.has(category)) {
        this.selectedFilters.delete(category);
      } else {
        this.selectedFilters.add(category);
      }
    }

    this.filterProducts();
  }

  toggleSortDropdown() {
    // Create dropdown if it doesn't exist
    let dropdown = document.querySelector('.sort-dropdown');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.className = 'sort-dropdown';
      dropdown.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 2px solid black;
        border-radius: 10px;
        z-index: 1000;
        display: none;
      `;
      
      const options = [
        { value: 'price-asc', text: 'ფასით ზრდადობით' },
        { value: 'price-desc', text: 'ფასით კლებადობით' },
        { value: 'name-asc', text: 'სახელით A-Z' },
        { value: 'rating-desc', text: 'რეიტინგით' }
      ];

      options.forEach(option => {
        const item = document.createElement('div');
        item.textContent = option.text;
        item.style.cssText = `
          padding: 10px;
          cursor: pointer;
          border-bottom: 1px solid #eee;
        `;
        item.addEventListener('click', () => {
          this.sortOrder = option.value;
          this.sortProducts();
          dropdown.style.display = 'none';
        });
        dropdown.appendChild(item);
      });

      document.querySelector('.group').appendChild(dropdown);
    }

    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      // Price filter
      if (product.price < this.priceRange.min || product.price > this.priceRange.max) {
        return false;
      }

      // Category filter
      if (this.selectedFilters.size > 0 && !this.selectedFilters.has(product.category)) {
        return false;
      }

      return true;
    });

    this.sortProducts();
    this.renderProducts();
    this.updatePagination();
  }

  sortProducts() {
    this.filteredProducts.sort((a, b) => {
      switch (this.sortOrder) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'rating-desc':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }

  renderProducts() {
    const productContainers = [
      '.overlap-10', '.overlap-13', '.overlap-14',
      '.overlap-12', '.overlap-15', '.overlap-16'
    ];

    const startIndex = (this.currentPage - 1) * 6;
    const endIndex = startIndex + 6;
    const pageProducts = this.filteredProducts.slice(startIndex, endIndex);

    productContainers.forEach((selector, index) => {
      const container = document.querySelector(selector);
      if (!container) return;

      if (index < pageProducts.length) {
        const product = pageProducts[index];
        
        // Update product image
        const img = container.querySelector('.rectangle-3');
        if (img) img.src = product.image;

        // Update product name
        const nameEl = container.querySelector('.text-wrapper-40');
        if (nameEl) nameEl.textContent = product.name;

        // Update farm name
        const farmEl = container.querySelector('.text-wrapper-41, .text-wrapper-43, .text-wrapper-44, .text-wrapper-45');
        if (farmEl) farmEl.textContent = product.farm;

        // Update price
        const priceEl = container.querySelector('.text-wrapper-42');
        if (priceEl) priceEl.textContent = `${product.price.toFixed(1)} ლ`;

        container.style.display = 'block';
        container.dataset.productId = product.id;
      } else {
        container.style.display = 'none';
      }
    });
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderProducts();
      this.updatePagination();
    }
  }

  nextPage() {
    const maxPages = Math.ceil(this.filteredProducts.length / 6);
    if (this.currentPage < maxPages) {
      this.currentPage++;
      this.renderProducts();
      this.updatePagination();
    }
  }

  goToPage(page) {
    const maxPages = Math.ceil(this.filteredProducts.length / 6);
    if (page >= 1 && page <= maxPages) {
      this.currentPage = page;
      this.renderProducts();
      this.updatePagination();
    }
  }

  updatePagination() {
    const maxPages = Math.ceil(this.filteredProducts.length / 6);
    
    // Update page numbers
    document.querySelectorAll('.text-wrapper-37, .text-wrapper-38, .text-wrapper-39').forEach((pageBtn, index) => {
      const pageNum = index + 1;
      if (pageNum <= maxPages) {
        pageBtn.style.display = 'block';
        pageBtn.style.opacity = pageNum === this.currentPage ? '1' : '0.5';
        pageBtn.style.fontWeight = pageNum === this.currentPage ? '900' : '700';
      } else {
        pageBtn.style.display = 'none';
      }
    });

    // Update arrow states
    const leftArrow = document.querySelector('.icons-arrow-left-wrapper');
    const rightArrow = document.querySelector('.icons-arrow-right-wrapper');
    
    if (leftArrow) {
      leftArrow.style.opacity = this.currentPage > 1 ? '1' : '0.5';
      leftArrow.style.pointerEvents = this.currentPage > 1 ? 'auto' : 'none';
    }
    
    if (rightArrow) {
      rightArrow.style.opacity = this.currentPage < maxPages ? '1' : '0.5';
      rightArrow.style.pointerEvents = this.currentPage < maxPages ? 'auto' : 'none';
    }
  }

  handleProductClick(e) {
    const productId = e.currentTarget.dataset.productId;
    if (productId) {
      // Simulate navigation to product detail page
      console.log(`Navigating to product ${productId}`);
      
      // Add click animation
      e.currentTarget.style.transform = 'scale(0.98)';
      setTimeout(() => {
        e.currentTarget.style.transform = 'scale(1)';
      }, 150);
    }
  }

  addToCart(e) {
    const productCard = e.currentTarget.closest('[data-product-id]');
    const productId = productCard?.dataset.productId;
    
    if (productId) {
      const product = this.products.find(p => p.id == productId);
      if (product) {
        // Add to cart logic here
        console.log(`Added ${product.name} to cart`);
        
        // Visual feedback
        const button = e.currentTarget;
        const originalBg = button.style.backgroundColor;
        button.style.backgroundColor = '#4CAF50';
        button.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
          button.style.backgroundColor = originalBg;
          button.style.transform = 'scale(1)';
        }, 300);

        // Show notification
        this.showNotification(`${product.name} დაემატა კალათაში`);
      }
    }
  }

  showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 15px 20px;
      border-radius: 5px;
      z-index: 10000;
      font-family: 'Poppins', sans-serif;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  goBack() {
    // Simulate navigation back
    console.log('Going back to previous page');
    
    // Add visual feedback
    const button = document.querySelector('.view .overlap-9');
    if (button) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 150);
    }
  }

  handleSearch() {
    // Simulate search functionality
    console.log('Opening search');
    
    // Create search modal
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    `;

    const searchBox = document.createElement('div');
    searchBox.style.cssText = `
      background: white;
      padding: 30px;
      border-radius: 10px;
      width: 400px;
      max-width: 90vw;
    `;

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'ძებნა...';
    input.style.cssText = `
      width: 100%;
      padding: 15px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
      margin-bottom: 15px;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'დახურვა';
    closeBtn.style.cssText = `
      background: #007f5f;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
    `;

    closeBtn.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });

    searchBox.appendChild(input);
    searchBox.appendChild(closeBtn);
    modal.appendChild(searchBox);
    document.body.appendChild(modal);

    input.focus();
  }

  toggleMobileMenu() {
    // Mobile menu toggle functionality
    console.log('Toggling mobile menu');
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new VilleGoApp();
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  const app = window.villeGoApp;
  if (!app) return;

  switch (e.key) {
    case 'ArrowLeft':
      if (e.ctrlKey) {
        app.previousPage();
      } else {
        app.previousImage();
      }
      break;
    case 'ArrowRight':
      if (e.ctrlKey) {
        app.nextPage();
      } else {
        app.nextImage();
      }
      break;
    case 'Escape':
      // Close any open modals
      document.querySelectorAll('.sort-dropdown').forEach(dropdown => {
        dropdown.style.display = 'none';
      });
      break;
  }
});

// Store app instance globally for keyboard navigation
window.addEventListener('DOMContentLoaded', () => {
  window.villeGoApp = new VilleGoApp();
});
