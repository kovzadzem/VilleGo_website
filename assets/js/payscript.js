// Payment method selection functionality
let selectedPaymentMethod = null;

// Get all payment option elements
const paymentOptions = document.querySelectorAll('.payment-option');
const continueBtn = document.getElementById('continue-btn');
const backBtn = document.getElementById('back-btn');

// Add click event listeners to payment options
paymentOptions.forEach(option => {
  option.addEventListener('click', function() {
    // Remove selected class from all options
    paymentOptions.forEach(opt => opt.classList.remove('selected'));
    
    // Add selected class to clicked option
    this.classList.add('selected');
    
    // Store selected payment method
    selectedPaymentMethod = this.dataset.method;
    
    // Enable continue button
    continueBtn.style.opacity = '1';
    continueBtn.style.pointerEvents = 'auto';
    
    console.log('Selected payment method:', selectedPaymentMethod);
  });
});

// Continue button functionality
continueBtn.addEventListener('click', function() {
  if (selectedPaymentMethod) {
    // Show confirmation message
    showNotification(`Processing payment with ${selectedPaymentMethod}...`, 'success');
    
    // Simulate payment processing
    setTimeout(() => {
      showNotification('Payment processed successfully!', 'success');
    }, 2000);
  } else {
    showNotification('Please select a payment method first', 'error');
  }
});

// Back button functionality
backBtn.addEventListener('click', function() {
  // Reset selection
  paymentOptions.forEach(opt => opt.classList.remove('selected'));
  selectedPaymentMethod = null;
  continueBtn.style.opacity = '0.7';
  continueBtn.style.pointerEvents = 'none';
  
  showNotification('Selection cleared', 'info');
});

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Add notification styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 8px;
    color: white;
    font-family: "Inria Sans", Helvetica;
    font-weight: 700;
    font-size: 16px;
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
    max-width: 300px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `;
  
  // Set background color based on type
  switch (type) {
    case 'success':
      notification.style.backgroundColor = '#007f5f';
      break;
    case 'error':
      notification.style.backgroundColor = '#dc3545';
      break;
    case 'info':
      notification.style.backgroundColor = '#17a2b8';
      break;
    default:
      notification.style.backgroundColor = '#6c757d';
  }
  
  // Add to document
  document.body.appendChild(notification);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
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
  
  .payment-option.selected {
    border-color: #007f5f !important;
    background-color: #f0f8f5 !important;
    transform: scale(1.02);
  }
  
  .payment-option {
    transition: all 0.3s ease;
  }
  
  #continue-btn {
    opacity: 0.7;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
`;
document.head.appendChild(style);

// Initialize continue button state
continueBtn.style.opacity = '0.7';
continueBtn.style.pointerEvents = 'none';

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && selectedPaymentMethod) {
    continueBtn.click();
  } else if (e.key === 'Escape') {
    backBtn.click();
  }
});

console.log('VilleGo Payment System Initialized');
