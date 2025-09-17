// Farm data
const farmData = {
  'რაისი': {
    name: 'ფერმა "რაისი"',
    location: 'სოფელი გომბორი, კაიკაცელის ქუჩა N2',
    type: 'რძის პროდუქტი',
    status: 'SUPER VIP',
    description: 'ეს არის ერთ-ერთი საუკეთესო ფერმა რეგიონში. ჩვენ ვაწარმოებთ მაღალი ხარისხის რძის პროდუქტებს.',
    products: ['რძე', 'ყველი', 'იოგურტი', 'კარაქი'],
    contact: '+995 555 123 456',
    rating: 4.8
  },
  'გლამური': {
    name: 'ფერმა "გლამური"',
    location: 'სოფელი გომბორი, კაიკაცელის ქუჩა N2',
    type: 'რძის პროდუქტი',
    status: 'VIP',
    description: 'ტრადიციული მეთოდებით მომზადებული რძის პროდუქტები.',
    products: ['რძე', 'ყველი', 'მაცონი'],
    contact: '+995 555 234 567',
    rating: 4.5
  },
  'დოქდოქი': {
    name: 'ფერმა "დოქდოქი"',
    location: 'სოფელი გომბორი, კაიკაცელის ქუჩა N2',
    type: 'რძის პროდუქტი',
    status: 'SUPER VIP',
    description: 'ორგანული რძის პროდუქტების მწარმოებელი ფერმა.',
    products: ['ორგანული რძე', 'ბიო ყველი', 'ნატურალური იოგურტი'],
    contact: '+995 555 345 678',
    rating: 4.9
  },
  'დრიმი': {
    name: 'ფერმა "დრიმი"',
    location: 'სოფელი გომბორი, კაიკაცელის ქუჩა N2',
    type: 'რძის პროდუქტი',
    status: 'SUPER VIP',
    description: 'თანამედროვე ტექნოლოგიებით აღჭურვილი ფერმა.',
    products: ['რძე', 'ყველი', 'კრემი', 'სმეტანა'],
    contact: '+995 555 456 789',
    rating: 4.7
  },
  'ნინოწმინდა': {
    name: 'ფერმა "ნინოწმინდა"',
    location: 'სოფელი გომბორი, კაიკაცელის ქუჩა N2',
    type: 'რძის პროდუქტი',
    status: 'VIP +',
    description: 'ოჯახური ტიპის ფერმა მაღალი ხარისხის პროდუქტებით.',
    products: ['რძე', 'ყველი', 'ნაძვი'],
    contact: '+995 555 567 890',
    rating: 4.6
  }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners();
  initializeSearch();
  initializeAnimations();
});

// Event listeners
function initializeEventListeners() {
  // Farm card clicks
  const farmCards = document.querySelectorAll('[data-farm]');
  farmCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (!e.target.classList.contains('heart-icon') && !e.target.classList.contains('share-icon')) {
        const farmName = this.getAttribute('data-farm');
        showFarmModal(farmName);
      }
    });
  });

  // Heart icons (like functionality)
  const heartIcons = document.querySelectorAll('.heart-icon');
  heartIcons.forEach(icon => {
    icon.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleLike(this);
    });
  });

  // Share icons
  const shareIcons = document.querySelectorAll('.share-icon');
  shareIcons.forEach(icon => {
    icon.addEventListener('click', function(e) {
      e.stopPropagation();
      const farmCard = this.closest('[data-farm]');
      const farmName = farmCard.getAttribute('data-farm');
      shareFarm(farmName);
    });
  });

  // Navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const page = this.getAttribute('data-page');
      navigateToPage(page);
    });
  });

  // Add farm button
  const addFarmBtn = document.querySelector('.add-farm-btn');
  if (addFarmBtn) {
    addFarmBtn.addEventListener('click', function() {
      showNotification('ფერმის დამატების ფუნქცია მალე იქნება ხელმისაწვდომი!');
    });
  }

  // Profile button
  const profileBtn = document.querySelector('.profile-btn');
  if (profileBtn) {
    profileBtn.addEventListener('click', function() {
      showNotification('პროფილის გვერდი მალე იქნება ხელმისაწვდომი!');
    });
  }

  // Search icon
  const searchIcon = document.querySelector('.search-icon');
  if (searchIcon) {
    searchIcon.addEventListener('click', function() {
      const searchInput = document.querySelector('.search-input');
      if (searchInput) {
        searchInput.focus();
      }
    });
  }

  // Modal close
  const modal = document.getElementById('farmModal');
  const closeBtn = document.querySelector('.close');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  }

  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Search functionality
function initializeSearch() {
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      filterFarms(searchTerm);
    });

    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch(this.value);
      }
    });
  }
}

// Filter farms based on search
function filterFarms(searchTerm) {
  const farmCards = document.querySelectorAll('[data-farm]');
  
  farmCards.forEach(card => {
    const farmName = card.getAttribute('data-farm');
    const farmInfo = farmData[farmName];
    
    if (farmInfo) {
      const searchableText = `${farmInfo.name} ${farmInfo.location} ${farmInfo.type}`.toLowerCase();
      
      if (searchableText.includes(searchTerm) || searchTerm === '') {
        card.style.display = 'block';
        card.style.opacity = '1';
      } else {
        card.style.opacity = '0.3';
      }
    }
  });
}

// Perform search
function performSearch(searchTerm) {
  if (searchTerm.trim() === '') {
    showNotification('გთხოვთ შეიყვანოთ საძიებო ტექსტი');
    return;
  }
  
  filterFarms(searchTerm.toLowerCase());
  showNotification(`ძიება: "${searchTerm}"`);
}

// Show farm modal
function showFarmModal(farmName) {
  const modal = document.getElementById('farmModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  
  const farm = farmData[farmName];
  
  if (farm) {
    modalTitle.textContent = farm.name;
    modalBody.innerHTML = `
      <div style="line-height: 1.6;">
        <p><strong>მდებარეობა:</strong> ${farm.location}</p>
        <p><strong>ტიპი:</strong> ${farm.type}</p>
        <p><strong>სტატუსი:</strong> <span style="color: #007f5f; font-weight: bold;">${farm.status}</span></p>
        <p><strong>რეიტინგი:</strong> ${'★'.repeat(Math.floor(farm.rating))} ${farm.rating}/5</p>
        <p><strong>აღწერა:</strong> ${farm.description}</p>
        <p><strong>პროდუქტები:</strong></p>
        <ul style="margin-left: 20px;">
          ${farm.products.map(product => `<li>${product}</li>`).join('')}
        </ul>
        <p><strong>კონტაქტი:</strong> ${farm.contact}</p>
      </div>
    `;
    
    modal.style.display = 'block';
  }
}

// Toggle like functionality
function toggleLike(heartIcon) {
  heartIcon.classList.toggle('liked');
  
  if (heartIcon.classList.contains('liked')) {
    showNotification('დაემატა ფავორიტებში! ❤️');
  } else {
    showNotification('ამოიშალა ფავორიტებიდან');
  }
}

// Share farm
function shareFarm(farmName) {
  const farm = farmData[farmName];
  
  if (navigator.share) {
    navigator.share({
      title: farm.name,
      text: farm.description,
      url: window.location.href
    });
  } else {
    // Fallback for browsers that don't support Web Share API
    const shareText = `${farm.name} - ${farm.description}`;
    navigator.clipboard.writeText(shareText).then(() => {
      showNotification('ინფორმაცია დაკოპირდა! 📋');
    }).catch(() => {
      showNotification('გაზიარება: ' + farm.name);
    });
  }
}

// Navigation
function navigateToPage(page) {
  const pageNames = {
    'blog': 'ბლოგი',
    'farmers': 'ფერმერები',
    'about': 'ჩვენს შესახებ',
    'contact': 'კონტაქტი',
    'map': 'რუკა'
  };
  
  showNotification(`გადასვლა: ${pageNames[page] || page}`);
  
  // Here you would typically handle actual navigation
  // For demo purposes, we're just showing a notification
}

// Show notification
function showNotification(message) {
  const notification = document.getElementById('notification');
  const notificationText = document.getElementById('notificationText');
  
  notificationText.textContent = message;
  notification.style.display = 'block';
  
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

// Initialize animations
function initializeAnimations() {
  // Add scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe farm cards
  const farmCards = document.querySelectorAll('[data-farm]');
  farmCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Ctrl/Cmd + K for search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.focus();
      searchInput.select();
    }
  }
  
  // Escape to close modal
  if (e.key === 'Escape') {
    const modal = document.getElementById('farmModal');
    if (modal.style.display === 'block') {
      modal.style.display = 'none';
    }
  }
});

// Add some dynamic content loading simulation
setTimeout(() => {
  const farmCards = document.querySelectorAll('[data-farm]');
  farmCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 200);
  });
}, 500);
