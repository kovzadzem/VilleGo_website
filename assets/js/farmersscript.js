document.addEventListener('DOMContentLoaded', function() {
  // Filter functionality
  const filterItems = document.querySelectorAll('.group .vector-4, .group .vector-5, .group .vector-6, .group .vector-7, .group .vector-8, .group .vector-9, .group .vector-10, .group .vector-11, .group .vector-12, .group .vector-13, .group .vector-14, .group .vector-15');
  const productCards = document.querySelectorAll('.img, .rectangle-5, .rectangle-9, .rectangle-13, .rectangle-17, .rectangle-21, .rectangle-25, .rectangle-29, .rectangle-33, .rectangle-37, .rectangle-41, .rectangle-45, .rectangle-49, .rectangle-53, .rectangle-57, .rectangle-61, .rectangle-65, .rectangle-69, .rectangle-73, .rectangle-77, .rectangle-81, .rectangle-85, .rectangle-89, .rectangle-93');

  // Add click handlers to filter items
  filterItems.forEach((item, index) => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function() {
      // Remove active class from all filters
      filterItems.forEach(f => f.classList.remove('active-filter'));
      // Add active class to clicked filter
      this.classList.add('active-filter');
      
      // Filter products based on selection
      filterProducts(index);
    });
  });

  // Pagination functionality
  const paginationNumbers = document.querySelectorAll('.text-wrapper-112, .text-wrapper-113, .text-wrapper-114');
  const leftArrow = document.querySelector('.fill-with-left-arrow');
  const rightArrow = document.querySelector('.fill-with-right');
  let currentPage = 1;

  // Add click handlers to pagination
  paginationNumbers.forEach((num, index) => {
    num.style.cursor = 'pointer';
    num.addEventListener('click', function() {
      currentPage = index + 1;
      updatePagination();
      loadPage(currentPage);
    });
  });

  leftArrow.style.cursor = 'pointer';
  leftArrow.addEventListener('click', function() {
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
      loadPage(currentPage);
    }
  });

  rightArrow.style.cursor = 'pointer';
  rightArrow.addEventListener('click', function() {
    if (currentPage < 3) {
      currentPage++;
      updatePagination();
      loadPage(currentPage);
    }
  });

  // Search functionality
  const searchInput = document.querySelector('.rectangle-102');
  if (searchInput) {
    searchInput.style.cursor = 'text';
    searchInput.addEventListener('click', function() {
      const searchTerm = prompt('Enter search term:');
      if (searchTerm) {
        searchProducts(searchTerm);
      }
    });
  }

  // Back button functionality
  const backButton = document.querySelector('.div-wrapper');
  if (backButton) {
    backButton.style.cursor = 'pointer';
    backButton.addEventListener('click', function() {
      // Simulate going back
      window.history.back();
    });
  }

  // Product card hover effects
  productCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = 'none';
    });
    
    card.addEventListener('click', function() {
      // Simulate product details view
      showProductDetails(this);
    });
  });

  // Navigation menu interactions
  const navItems = document.querySelectorAll('.text-wrapper-116, .text-wrapper-117, .text-wrapper-118, .text-wrapper-119');
  navItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function() {
      // Simulate navigation
      console.log('Navigating to:', this.textContent);
    });
  });

  // Social media links
  const socialLinks = document.querySelectorAll('.vector-23, .d, .image-3, .image-4, .image-5');
  socialLinks.forEach(link => {
    link.style.cursor = 'pointer';
    link.addEventListener('click', function() {
      // Simulate social media navigation
      console.log('Opening social media link');
    });
  });

  // Mobile app store buttons
  const appStoreButtons = document.querySelectorAll('.mobile-app-store, .mobile-app-store-2, .mobile-app-store-3');
  appStoreButtons.forEach(button => {
    button.style.cursor = 'pointer';
    button.addEventListener('click', function() {
      // Simulate app store navigation
      console.log('Opening app store');
    });
  });

  // Helper functions
  function filterProducts(filterIndex) {
    productCards.forEach((card, cardIndex) => {
      if (filterIndex === 0 || cardIndex % 4 === filterIndex - 1) {
        card.style.display = 'block';
        card.style.opacity = '1';
      } else {
        card.style.opacity = '0.3';
      }
    });
  }

  function updatePagination() {
    paginationNumbers.forEach((num, index) => {
      if (index + 1 === currentPage) {
        num.style.fontWeight = 'bold';
        num.style.color = '#007f5f';
      } else {
        num.style.fontWeight = 'normal';
        num.style.color = '#000000';
      }
    });
  }

  function loadPage(page) {
    // Simulate page loading with smooth scroll
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Show loading animation
    document.body.style.opacity = '0.8';
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 300);
  }

  function searchProducts(term) {
    const searchTerm = term.toLowerCase();
    productCards.forEach(card => {
      const cardText = card.nextElementSibling?.textContent?.toLowerCase() || '';
      if (cardText.includes(searchTerm)) {
        card.style.display = 'block';
        card.style.border = '2px solid #007f5f';
      } else {
        card.style.opacity = '0.3';
        card.style.border = 'none';
      }
    });
  }

  function showProductDetails(card) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background: white;
      padding: 40px;
      border-radius: 20px;
      max-width: 600px;
      width: 90%;
      text-align: center;
    `;
    
    modalContent.innerHTML = `
      <h2 style="color: #007f5f; margin-bottom: 20px;">Product Details</h2>
      <img src="${card.src}" style="max-width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 20px;">
      <p style="margin-bottom: 20px;">რანჩო ვარიანში მებაღე, მევენახე ვარიანი</p>
      <div style="display: flex; gap: 10px; justify-content: center; margin-bottom: 20px;">
        <span style="background: #d9d9d9; padding: 5px 15px; border-radius: 25px; font-size: 12px;">ბოსტნეული</span>
        <span style="background: #d9d9d9; padding: 5px 15px; border-radius: 25px; font-size: 12px;">ხილი</span>
        <span style="background: #d9d9d9; padding: 5px 15px; border-radius: 25px; font-size: 12px;">ღვინო</span>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" style="background: #007f5f; color: white; border: none; padding: 10px 30px; border-radius: 25px; cursor: pointer; font-size: 16px;">Close</button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  // Add smooth scrolling to all internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Add loading animation on page load
  window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
    }, 100);
  });

  // Add responsive behavior for smaller screens
  function handleResize() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 1920) {
      document.querySelector('.screen .div').style.transform = `scale(${screenWidth / 1920})`;
      document.querySelector('.screen .div').style.transformOrigin = 'top left';
    } else {
      document.querySelector('.screen .div').style.transform = 'none';
    }
  }

  window.addEventListener('resize', handleResize);
  handleResize(); // Call on initial load
});
