// Product data
const products = {
  apple: { name: 'ვაშლატამი', price: 22.5, weight: 15 },
  raspberry: { name: 'მალინა', price: 125, weight: 25 },
  potato: { name: 'კარტოფილი', price: 16, weight: 20 },
  cucumber: { name: 'კიტრი', price: 8, weight: 10 },
  tomato: { name: 'პომიდორი', price: 15, weight: 10 }
};

// Cart state
let cart = {
  apple: 1,
  raspberry: 1,
  potato: 1,
  cucumber: 1,
  tomato: 1
};

// Form state
let saveInfo = false;
let selectedPayment = 'cash';
let deliveryFee = 5;
let discount = 0;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  updateCartTotals();
  selectPayment('cash'); // Default to cash payment
});

// Quantity management
function changeQuantity(productId, change) {
  const currentQty = cart[productId];
  const newQty = Math.max(0, currentQty + change);
  
  cart[productId] = newQty;
  
  // Update display
  const qtyElement = document.getElementById(productId + '-qty');
  if (qtyElement) {
    qtyElement.textContent = newQty;
  }
  
  // Update cart totals
  updateCartTotals();
  
  // Add visual feedback
  qtyElement.style.transform = 'scale(1.2)';
  setTimeout(() => {
    qtyElement.style.  transform = 'scale(1)';
  }, 200);
}

// Update cart totals
function updateCartTotals() {
  let subtotal = 0;
  
  // Calculate subtotal
  for (const [productId, quantity] of Object.entries(cart)) {
    if (quantity > 0 && products[productId]) {
      subtotal += products[productId].price * quantity;
    }
  }
  
  // Apply discount
  const discountedSubtotal = subtotal - discount;
  const total = discountedSubtotal + deliveryFee;
  
  // Update display
  const subtotalElement = document.getElementById('subtotal');
  const totalElement = document.getElementById('total');
  
  if (subtotalElement) {
    subtotalElement.innerHTML = `<span class="text-wrapper-20">${discountedSubtotal.toFixed(1)}</span> <span class="text-wrapper-21">₾</span>`;
  }
  
  if (totalElement) {
    totalElement.innerHTML = `<span class="text-wrapper-20">${total.toFixed(1)}</span> <span class="text-wrapper-21">₾</span>`;
  }
}

// Payment method selection
function selectPayment(method) {
  selectedPayment = method;
  
  const bankRadio = document.getElementById('bank-radio');
  const cashRadio = document.getElementById('cash-radio');
  
  // Reset all radio buttons
  if (bankRadio) {
    bankRadio.classList.remove('selected');
    bankRadio.innerHTML = '';
  }
  if (cashRadio) {
    cashRadio.classList.remove('selected');
    cashRadio.innerHTML = '<div class="ellipse" style="display: none;"></div>';
  }
  
  // Select the chosen method
  if (method === 'bank' && bankRadio) {
    bankRadio.classList.add('selected');
    bankRadio.innerHTML = '<div class="ellipse"></div>';
  } else if (method === 'cash' && cashRadio) {
    cashRadio.classList.add('selected');
    cashRadio.querySelector('.ellipse').style.display = 'block';
  }
}

// Promo code application
function applyPromoCode() {
  const promoInput = document.getElementById('promoCode');
  const promoCode = promoInput ? promoInput.value.trim().toLowerCase() : '';
  
  // Simple promo code logic
  const promoCodes = {
    'villego10': 10,
    'save5': 5,
    'welcome': 15,
    'farmer': 20
  };
  
  if (promoCodes[promoCode]) {
    discount = promoCodes[promoCode];
    updateCartTotals();
    
    // Show success message
    showNotification(`პრომო კოდი გამოყენებულია! ფასდაკლება: ${discount}₾`, 'success');
    
    // Disable the input
    if (promoInput) {
      promoInput.disabled = true;
      promoInput.style.backgroundColor = '#e8f5e8';
    }
  } else if (promoCode) {
    showNotification('არასწორი პრომო კოდი', 'error');
  } else {
    showNotification('შეიყვანეთ პრომო კოდი', 'warning');
  }
}

// Save info checkbox toggle
function toggleSaveInfo() {
  saveInfo = !saveInfo;
  const checkbox = document.getElementById('saveInfoCheckbox');
  
  if (checkbox) {
    if (saveInfo) {
      checkbox.style.filter = 'brightness(0.7) sepia(1) hue-rotate(90deg)';
    } else {
      checkbox.style.filter = 'none';
    }
  }
}

// Form validation
function validateForm() {
  const requiredFields = ['firstName', 'lastName', 'address', 'city', 'phone', 'email'];
  const errors = [];
  
  for (const fieldId of requiredFields) {
    const field = document.getElementById(fieldId);
    if (field && !field.value.trim()) {
      errors.push(`${getFieldLabel(fieldId)} სავალდებულოა`);
      field.style.borderColor = '#ff4444';
    } else if (field) {
      field.style.borderColor = '';
    }
  }
  
  // Email validation
  const emailField = document.getElementById('email');
  if (emailField && emailField.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value.trim())) {
      errors.push('ელფოსტის ფორმატი არასწორია');
      emailField.style.borderColor = '#ff4444';
    }
  }
  
  // Phone validation
  const phoneField = document.getElementById('phone');
  if (phoneField && phoneField.value.trim()) {
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (!phoneRegex.test(phoneField.value.trim()) || phoneField.value.trim().length < 9) {
      errors.push('ტელეფონის ნომრის ფორმატი არასწორია');
      phoneField.style.borderColor = '#ff4444';
    }
  }
  
  return errors;
}

// Get field label for validation messages
function getFieldLabel(fieldId) {
  const labels = {
    firstName: 'სახელი',
    lastName: 'გვარი',
    address: 'მისამართი',
    city: 'ქალაქი',
    phone: 'ტელეფონი',
    email: 'ელფოსტა'
  };
  return labels[fieldId] || fieldId;
}

// Place order
function placeOrder() {
  const errors = validateForm();
  
  if (errors.length > 0) {
    showNotification(errors.join('\n'), 'error');
    return;
  }
  
  // Check if cart has items
  const hasItems = Object.values(cart).some(qty => qty > 0);
  if (!hasItems) {
    showNotification('კალათა ცარიელია', 'warning');
    return;
  }
  
  // Collect form data
  const orderData = {
    customer: {
      firstName: document.getElementById('firstName').value.trim(),
      lastName: document.getElementById('lastName').value.trim(),
      address: document.getElementById('address').value.trim(),
      apartment: document.getElementById('apartment').value.trim(),
      city: document.getElementById('city').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      email: document.getElementById('email').value.trim()
    },
    cart: cart,
    paymentMethod: selectedPayment,
    promoCode: document.getElementById('promoCode').value.trim(),
    saveInfo: saveInfo,
    totals: {
      subtotal: calculateSubtotal(),
      discount: discount,
      deliveryFee: deliveryFee,
      total: calculateSubtotal() - discount + deliveryFee
    }
  };
  
  // Simulate order processing
  showNotification('შეკვეთა მუშავდება...', 'info');
  
  setTimeout(() => {
    showNotification('შეკვეთა წარმატებით განთავსდა! \nშეკვეთის ნომერი: #VG' + Date.now().toString().slice(-6), 'success');
    
    // Save info if requested
    if (saveInfo) {
      localStorage.setItem('villegoCustomerInfo', JSON.stringify(orderData.customer));
    }
    
    // Reset form after successful order
    setTimeout(() => {
      resetForm();
    }, 3000);
  }, 2000);
}

// Calculate subtotal
function calculateSubtotal() {
  let subtotal = 0;
  for (const [productId, quantity] of Object.entries(cart)) {
    if (quantity > 0 && products[productId]) {
      subtotal += products[productId].price * quantity;
    }
  }
  return subtotal;
}

// Reset form
function resetForm() {
  // Reset form fields
  const formFields = ['firstName', 'lastName', 'address', 'apartment', 'city', 'phone', 'email', 'promoCode'];
  formFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.value = '';
      field.disabled = false;
      field.style.backgroundColor = '';
      field.style.borderColor = '';
    }
  });
  
  // Reset cart
  cart = {
    apple: 1,
    raspberry: 1,
    potato: 1,
    cucumber: 1,
    tomato: 1
  };
  
  // Update quantity displays
  Object.keys(cart).forEach(productId => {
    const qtyElement = document.getElementById(productId + '-qty');
    if (qtyElement) {
      qtyElement.textContent = cart[productId];
    }
  });
  
  // Reset other states
  discount = 0;
  saveInfo = false;
  selectPayment('cash');
  
  // Update totals
  updateCartTotals();
  
  // Reset checkbox
  const checkbox = document.getElementById('saveInfoCheckbox');
  if (checkbox) {
    checkbox.style.filter = 'none';
  }
}

// Show notification
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    z-index: 10000;
    max-width: 300px;
    word-wrap: break-word;
    white-space: pre-line;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  // Set background color based on type
  const colors = {
    success: '#007f5f',
    error: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8'
  };
  notification.style.backgroundColor = colors[type] || colors.info;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// Load saved customer info on page load
document.addEventListener('DOMContentLoaded', function() {
  const savedInfo = localStorage.getItem('villegoCustomerInfo');
  if (savedInfo) {
    try {
      const customerInfo = JSON.parse(savedInfo);
      
      // Fill form fields
      Object.keys(customerInfo).forEach(key => {
        const field = document.getElementById(key);
        if (field && customerInfo[key]) {
          field.value = customerInfo[key];
        }
      });
      
      // Check save info checkbox
      saveInfo = true;
      toggleSaveInfo();
    } catch (error) {
      console.error('Error loading saved customer info:', error);
    }
  }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(event) {
  // Ctrl/Cmd + Enter to place order
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    event.preventDefault();
    placeOrder();
  }
  
  // Escape to clear notifications
  if (event.key === 'Escape') {
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(notification => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    });
  }
});

// Add smooth scrolling for better UX
function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
}

// Add input validation on blur
document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll('.form-input');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.value.trim()) {
        this.style.borderColor = '#007f5f';
      } else {
        this.style.borderColor = '';
      }
    });
    
    input.addEventListener('focus', function() {
      this.style.borderColor = '#007f5f';
    });
  });
});
