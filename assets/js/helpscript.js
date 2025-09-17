// Search functionality
function handleSearch() {
  const searchInput = document.getElementById('searchInput');
  const query = searchInput.value.toLowerCase();
  
  if (query.length > 0) {
    showSearchSuggestions();
    filterSuggestions(query);
  } else {
    hideSearchSuggestions();
  }
}

function showSearchSuggestions() {
  const suggestions = document.getElementById('searchSuggestions');
  suggestions.style.display = 'block';
}

function hideSearchSuggestions() {
  setTimeout(() => {
    const suggestions = document.getElementById('searchSuggestions');
    suggestions.style.display = 'none';
  }, 200);
}

function filterSuggestions(query) {
  const suggestions = document.querySelectorAll('.search-suggestion');
  suggestions.forEach(suggestion => {
    const text = suggestion.textContent.toLowerCase();
    if (text.includes(query)) {
      suggestion.style.display = 'block';
    } else {
      suggestion.style.display = 'none';
    }
  });
}

function selectSuggestion(type) {
  const searchInput = document.getElementById('searchInput');
  hideSearchSuggestions();
  
  switch(type) {
    case 'FAQ':
      searchInput.value = 'FAQ';
      handleFAQClick();
      break;
    case 'Support':
      searchInput.value = 'სუპორტი';
      handleSupportClick();
      break;
    case 'Guide':
      searchInput.value = 'სახელმძღვანელო';
      handleUserGuideClick();
      break;
    case 'Contact':
      searchInput.value = 'კონტაქტი';
      scrollToContact();
      break;
    case 'Feedback':
      searchInput.value = 'გამოხმაურება';
      handleFeedbackClick();
      break;
  }
}

function focusSearch() {
  document.getElementById('searchInput').focus();
}

// Support functionality
function handleSupportClick() {
  showNotification('სუპორტთან დაკავშირება...', 'success');
  // Simulate opening support chat or email
  setTimeout(() => {
    showNotification('სუპორტი მალე დაგიკავშირდებათ!', 'info');
  }, 1500);
}

// FAQ functionality
function handleFAQClick() {
  showNotification('FAQ გვერდზე გადასვლა...', 'info');
  // Simulate navigation to FAQ page
  setTimeout(() => {
    showModal('FAQ', 'ხშირად დასმული კითხვები:\n\n1. როგორ დავარეგისტრირდე?\n2. როგორ შევუკვეთო პროდუქტი?\n3. როგორ გავაუქმო შეკვეთა?\n4. რა არის მიწოდების ვადები?');
  }, 500);
}

// User Guide functionality
function handleUserGuideClick() {
  showNotification('მომხმარებლის სახელმძღვანელო იტვირთება...', 'info');
  setTimeout(() => {
    showModal('მომხმარებლის სახელმძღვანელო', 'სახელმძღვანელო:\n\n1. რეგისტრაცია და ავტორიზაცია\n2. პროდუქტების ძიება\n3. შეკვეთის გაფორმება\n4. გადახდის მეთოდები\n5. მიწოდების ინფორმაცია');
  }, 500);
}

// Feedback functionality
function handleFeedbackClick() {
  toggleFeedbackForm();
}

function toggleFeedbackForm() {
  const feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm.style.display === 'none' || feedbackForm.style.display === '') {
    feedbackForm.style.display = 'block';
    showNotification('გამოხმაურების ფორმა გაიხსნა', 'info');
  } else {
    feedbackForm.style.display = 'none';
  }
}

function submitFeedback() {
  const feedbackText = document.getElementById('feedbackText');
  const text = feedbackText.value.trim();
  
  if (text === '') {
    showNotification('გთხოვთ შეიყვანოთ თქვენი გამოხმაურება', 'error');
    return;
  }
  
  // Simulate feedback submission
  showNotification('გამოხმაურება იგზავნება...', 'info');
  
  setTimeout(() => {
    showNotification('მადლობთ თქვენი გამოხმაურებისთვის!', 'success');
    feedbackText.value = '';
    document.getElementById('feedbackForm').style.display = 'none';
  }, 1000);
}

// Navigation functionality
function handleNavClick(section) {
  showNotification(`${section} სექციაზე გადასვლა...`, 'info');
  
  switch(section) {
    case 'blog':
      setTimeout(() => showNotification('ბლოგი მალე იქნება ხელმისაწვდომი', 'info'), 500);
      break;
    case 'farmers':
      setTimeout(() => showNotification('ფერმერების სექცია იტვირთება...', 'info'), 500);
      break;
    case 'about':
      setTimeout(() => showModal('ჩვენს შესახებ', 'VilleGo არის ინოვაციური პლატფორმა, რომელიც აკავშირებს ფერმერებს მომხმარებლებთან პირდაპირ, შუამავლების გარეშე.'), 500);
      break;
    case 'contact':
      scrollToContact();
      break;
    case 'map':
      setTimeout(() => showNotification('რუკა იტვირთება...', 'info'), 500);
      break;
  }
}

// App Store functionality
function handleAppStoreClick(store) {
  showNotification(`${store} App Store-ზე გადასვლა...`, 'info');
  
  const urls = {
    'microsoft': 'https://www.microsoft.com/store',
    'apple': 'https://apps.apple.com',
    'google': 'https://play.google.com'
  };
  
  setTimeout(() => {
    showNotification(`${store} Store გაიხსნება ახალ ფანჯარაში`, 'success');
    // window.open(urls[store], '_blank');
  }, 500);
}

// Utility functions
function scrollToContact() {
  const contactSection = document.querySelector('.text-wrapper-36');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
    showNotification('კონტაქტის ინფორმაციაზე გადასვლა', 'success');
  }
}

function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Styling
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 5px;
    color: white;
    font-family: "Roboto", Helvetica;
    font-size: 14px;
    z-index: 10000;
    max-width: 300px;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.3);
    animation: slideIn 0.3s ease-out;
  `;
  
  // Set background color based on type
  const colors = {
    'success': '#007f5f',
    'error': '#dc3545',
    'info': '#17a2b8',
    'warning': '#ffc107'
  };
  
  notification.style.backgroundColor = colors[type] || colors.info;
  
  document.body.appendChild(notification);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => notification.remove(), 300);
    }
  }, 3000);
}

function showModal(title, content) {
  // Remove existing modals
  const existingModals = document.querySelectorAll('.modal');
  existingModals.forEach(modal => modal.remove());
  
  const modal = document.createElement('div');
  modal.className = 'modal';
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
    z-index: 10001;
    animation: fadeIn 0.3s ease-out;
  `;
  
  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    background: white;
    padding: 30px;
    border-radius: 10px;
    max-width: 500px;
    max-height: 70vh;
    overflow-y: auto;
    box-shadow: 0px 8px 16px rgba(0,0,0,0.3);
    animation: scaleIn 0.3s ease-out;
  `;
  
  const modalTitle = document.createElement('h2');
  modalTitle.textContent = title;
  modalTitle.style.cssText = `
    margin: 0 0 20px 0;
    color: #007f5f;
    font-family: "Roboto", Helvetica;
    font-size: 24px;
  `;
  
  const modalText = document.createElement('p');
  modalText.textContent = content;
  modalText.style.cssText = `
    margin: 0 0 20px 0;
    color: #333;
    font-family: "Roboto", Helvetica;
    font-size: 16px;
    line-height: 1.5;
    white-space: pre-line;
  `;
  
  const closeButton = document.createElement('button');
  closeButton.textContent = 'დახურვა';
  closeButton.style.cssText = `
    background: #007f5f;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-family: "Roboto", Helvetica;
    font-size: 14px;
    transition: background-color 0.2s ease;
  `;
  
  closeButton.onmouseover = () => closeButton.style.backgroundColor = '#005a43';
  closeButton.onmouseout = () => closeButton.style.backgroundColor = '#007f5f';
  closeButton.onclick = () => closeModal(modal);
  
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalText);
  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);
  
  // Close modal when clicking outside
  modal.onclick = (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  };
  
  document.body.appendChild(modal);
}

function closeModal(modal) {
  modal.style.animation = 'fadeOut 0.3s ease-in';
  setTimeout(() => modal.remove(), 300);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  @keyframes scaleIn {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;
document.head.appendChild(style);

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  showNotification('VilleGo დახმარების გვერდი ჩაიტვირთა', 'success');
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      focusSearch();
    }
    
    // Escape to close modals and forms
    if (e.key === 'Escape') {
      const modals = document.querySelectorAll('.modal');
      modals.forEach(modal => closeModal(modal));
      
      const feedbackForm = document.getElementById('feedbackForm');
      if (feedbackForm.style.display === 'block') {
        feedbackForm.style.display = 'none';
      }
      
      hideSearchSuggestions();
    }
  });
});
