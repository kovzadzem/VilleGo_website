// VilleGo Interactive Features
document.addEventListener('DOMContentLoaded', function() {
  
  // Navigation menu items
  const menuItems = document.querySelectorAll('.text-wrapper-9, .text-wrapper-10, .text-wrapper-11, .text-wrapper-12, .text-wrapper-14');
  
  // Category cards
  const categoryCards = document.querySelectorAll('.group, .group-2, .group-3, .group-4, .group-5, .group-6');
  
  // Back button
  const backButton = document.querySelector('.view');
  
  // Search functionality
  const searchBar = document.querySelector('.rectangle-2');
  const searchInput = document.querySelector('.text-wrapper-13');
  
  // Add click handlers for menu items
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      const text = this.textContent;
      console.log(`Navigating to: ${text}`);
      
      // Add visual feedback
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
      
      // Simulate navigation
      showNotification(`გადავდივართ: ${text}`);
    });
    
    // Add hover effects
    item.addEventListener('mouseenter', function() {
      this.style.color = '#00a876';
      this.style.cursor = 'pointer';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.color = '#ffffff';
    });
  });
  
  // Add click handlers for category cards
  categoryCards.forEach((card, index) => {
    card.addEventListener('click', function() {
      const categoryName = this.querySelector('[class*="text-wrapper"]').textContent;
      console.log(`Selected category: ${categoryName}`);
      
      // Add selection effect
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.style.transform = 'translateY(-10px)';
      }, 150);
      
      showNotification(`არჩეული კატეგორია: ${categoryName}`);
      
      // Simulate loading products
      setTimeout(() => {
        loadCategoryProducts(categoryName);
      }, 500);
    });
  });
  
  // Back button functionality
  if (backButton) {
    backButton.addEventListener('click', function() {
      console.log('Going back');
      showNotification('უკან დაბრუნება...');
      
      // Add animation
      this.style.transform = 'scale(0.9)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
        // Simulate going back
        window.history.back();
      }, 200);
    });
  }
  
  // Search functionality
  if (searchBar) {
    searchBar.addEventListener('click', function() {
      const searchTerm = prompt('რას ეძებთ?');
      if (searchTerm) {
        console.log(`Searching for: ${searchTerm}`);
        showNotification(`ძებნა: ${searchTerm}`);
        performSearch(searchTerm);
      }
    });
  }
  
  // Social media icons
  const socialIcons = document.querySelectorAll('.vector-2, .vector-3, .vector-4, .plus-circle');
  socialIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const iconClass = this.className;
      console.log(`Social media clicked: ${iconClass}`);
      showNotification('სოციალური მედია');
    });
    
    icon.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.2)';
      this.style.cursor = 'pointer';
    });
    
    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
  
  // Profile/User icon
  const profileIcon = document.querySelector('.ellipse');
  if (profileIcon) {
    profileIcon.addEventListener('click', function() {
      showNotification('პროფილი');
      console.log('Profile clicked');
    });
    
    profileIcon.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      this.style.cursor = 'pointer';
    });
    
    profileIcon.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  }
  
  // Responsive behavior
  window.addEventListener('resize', function() {
    adjustLayout();
  });
  
  // Initialize layout
  adjustLayout();
});

// Helper functions
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #007f5f;
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    font-family: "Inria Sans", Helvetica;
    font-weight: 700;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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

function loadCategoryProducts(categoryName) {
  console.log(`Loading products for category: ${categoryName}`);
  
  // Simulate loading animation
  const loadingOverlay = document.createElement('div');
  loadingOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 127, 95, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    color: white;
    font-family: "Inria Sans", Helvetica;
    font-size: 24px;
    font-weight: 700;
  `;
  
  loadingOverlay.innerHTML = `
    <div style="text-align: center;">
      <div style="margin-bottom: 20px;">იტვირთება...</div>
      <div style="width: 50px; height: 50px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
    </div>
  `;
  
  // Add spinning animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(loadingOverlay);
  
  // Remove loading after 2 seconds
  setTimeout(() => {
    document.body.removeChild(loadingOverlay);
    showNotification(`${categoryName} პროდუქტები ჩაიტვირთა`);
  }, 2000);
}

function performSearch(searchTerm) {
  console.log(`Performing search for: ${searchTerm}`);
  
  // Highlight search functionality
  const searchBar = document.querySelector('.rectangle-2');
  if (searchBar) {
    const originalColor = searchBar.style.backgroundColor;
    searchBar.style.backgroundColor = '#00a876';
    
    setTimeout(() => {
      searchBar.style.backgroundColor = originalColor || '#7fbf8e';
    }, 1000);
  }
  
  // Simulate search results
  setTimeout(() => {
    showNotification(`ნაპოვნია ${Math.floor(Math.random() * 20) + 1} შედეგი`);
  }, 1500);
}

function adjustLayout() {
  const screenWidth = window.innerWidth;
  
  // Ensure minimum width for proper display
  if (screenWidth < 1920) {
    document.body.style.minWidth = '1920px';
  } else {
    document.body.style.minWidth = '100vw';
  }
  
  console.log(`Screen adjusted for width: ${screenWidth}px`);
}

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Add loading animation on page load
window.addEventListener('load', function() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});
