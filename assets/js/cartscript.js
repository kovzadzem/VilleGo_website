class CartManager {
  constructor() {
    this.cart = [];
    this.deliveryFee = 5;
    this.init();
  }

  init() {
    this.bindEvents();
    this.calculateTotal();
  }

  bindEvents() {
    // Quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target.dataset.target;
        const action = e.target.dataset.action;
        this.updateQuantity(target, action);
      });
    });

    // Remove item buttons
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = e.target.dataset.item;
        this.removeItem(itemId);
      });
    });

    // Back button
    document.getElementById('back-btn').addEventListener('click', () => {
      this.showNotification('უკან დაბრუნება...');
      setTimeout(() => {
        window.history.back();
      }, 1000);
    });

    // Refresh cart button
    document.getElementById('refresh-cart').addEventListener('click', () => {
      this.refreshCart();
    });

    // Apply promo code
    document.getElementById('apply-promo').addEventListener('click', () => {
      this.applyPromoCode();
    });

    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', () => {
      this.checkout();
    });

    // Search functionality
    document.getElementById('search-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.search(e.target.value);
      }
    });

    // Promo input enter key
    document.getElementById('promo-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.applyPromoCode();
      }
    });
  }

  updateQuantity(targetId, action) {
    const qtyElement = document.getElementById(targetId);
    let currentQty = parseInt(qtyElement.textContent);
    
    if (action === 'decrease' && currentQty > 1) {
      currentQty--;
      qtyElement.textContent = currentQty;
      this.calculateTotal();
      this.showNotification('რაოდენობა შეცვლილია');
    } else if (action === 'increase') {
      currentQty++;
      qtyElement.textContent = currentQty;
      this.calculateTotal();
      this.showNotification('რაოდენობა შეცვლილია');
    }
  }

  removeItem(itemId) {
    const itemElement = document.getElementById(itemId);
    if (itemElement) {
      itemElement.classList.add('hidden');
      this.calculateTotal();
      this.showNotification('პროდუქტი წაშლილია კალათიდან');
    }
  }

  refreshCart() {
    // Reset all quantities to 1
    document.querySelectorAll('[id^="qty-"]').forEach(qty => {
      qty.textContent = '1';
    });

    // Show all hidden items
    document.querySelectorAll('[id^="item-"]').forEach(item => {
      item.classList.remove('hidden');
    });

    // Clear promo code
    document.getElementById('promo-input').value = '';

    this.calculateTotal();
    this.showNotification('კალათა განახლებულია');
  }

  calculateTotal() {
    let subtotal = 0;
    
    // Calculate subtotal from visible items
    document.querySelectorAll('[data-price]').forEach(priceElement => {
      const itemContainer = priceElement.closest('[id^="item-"], .overlap-2');
      if (itemContainer && !itemContainer.classList.contains('hidden')) {
        const price = parseFloat(priceElement.dataset.price);
        const qtyElement = itemContainer.querySelector('[id^="qty-"]');
        const quantity = qtyElement ? parseInt(qtyElement.textContent) : 1;
        subtotal += price * quantity;
      }
    });

    const total = subtotal + this.deliveryFee;

    // Update display
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    if (subtotalElement) {
      subtotalElement.innerHTML = `<span class="text-wrapper-20">${subtotal.toFixed(1)}</span> <span class="text-wrapper-21">₾</span>`;
    }
    
    if (totalElement) {
      totalElement.innerHTML = `<span class="text-wrapper-20">${total.toFixed(1)}</span> <span class="text-wrapper-21">₾</span>`;
    }
  }

  applyPromoCode() {
    const promoInput = document.getElementById('promo-input');
    const promoCode = promoInput.value.trim().toLowerCase();
    
    const validCodes = {
      'discount10': 0.1,
      'save20': 0.2,
      'welcome': 0.15,
      'villego': 0.25
    };

    if (validCodes[promoCode]) {
      const discount = validCodes[promoCode];
      this.showNotification(`პრომო კოდი გააქტიურებულია! ${(discount * 100)}% ფასდაკლება`);
      
      // Apply discount to total
      const totalElement = document.getElementById('total');
      const currentTotal = parseFloat(totalElement.querySelector('.text-wrapper-20').textContent);
      const discountedTotal = currentTotal * (1 - discount);
      totalElement.innerHTML = `<span class="text-wrapper-20">${discountedTotal.toFixed(1)}</span> <span class="text-wrapper-21">₾</span>`;
      
      promoInput.style.borderColor = '#28a745';
    } else if (promoCode) {
      this.showNotification('არასწორი პრომო კოდი', 'error');
      promoInput.style.borderColor = '#dc3545';
    } else {
      this.showNotification('გთხოვთ შეიყვანოთ პრომო კოდი', 'error');
    }
  }

  checkout() {
    const totalElement = document.getElementById('total');
    const total = totalElement.querySelector('.text-wrapper-20').textContent;
    
    this.showNotification(`გადახდაზე გადასვლა... ჯამი: ${total} ₾`);
    
    // Simulate checkout process
    setTimeout(() => {
      this.showNotification('გადახდა წარმატებით დასრულდა!');
    }, 2000);
  }

  search(query) {
    if (query.trim()) {
      this.showNotification(`ძებნა: "${query}"`);
      // Here you would typically filter products or redirect to search results
    }
  }

  showNotification(message, type = 'success') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    if (type === 'error') {
      notification.style.backgroundColor = '#dc3545';
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// Initialize cart manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CartManager();
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

// Add loading animation for buttons
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function() {
    const originalText = this.textContent;
    this.style.opacity = '0.7';
    
    setTimeout(() => {
      this.style.opacity = '1';
    }, 200);
  });
});

// Add hover effects for interactive elements
document.querySelectorAll('.quantity-btn, .remove-item, button').forEach(element => {
  element.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
    this.style.transition = 'transform 0.2s ease';
  });
  
  element.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close any open modals or notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
  }
  
  if (e.ctrlKey && e.key === 'f') {
    // Focus search input
    e.preventDefault();
    document.getElementById('search-input').focus();
  }
});

// Add responsive behavior
window.addEventListener('resize', () => {
  // Adjust layout if needed for different screen sizes
  const screenWidth = window.innerWidth;
  if (screenWidth < 1920) {
    document.body.style.transform = `scale(${screenWidth / 1920})`;
    document.body.style.transformOrigin = 'top left';
  } else {
    document.body.style.transform = 'none';
  }
});

// Initialize responsive scaling
window.dispatchEvent(new Event('resize'));
