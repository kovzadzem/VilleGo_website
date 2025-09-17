document.addEventListener('DOMContentLoaded', function() {
  // Navigation functionality
  const navItems = document.querySelectorAll('.nav-item');
  const searchInput = document.querySelector('.search-input');
  const searchIcon = document.querySelector('.search-icon');
  const regionButton = document.querySelector('.view');
  const addButton = document.querySelector('.add-btn');
  const profileButton = document.querySelector('.profile-btn');
  const socialIcons = document.querySelectorAll('.social-icon');
  const logo = document.querySelector('.logo');

  // Navigation click handlers
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const page = this.getAttribute('data-page');
      console.log(`Navigating to ${page} page`);
      
      // Remove active class from all nav items
      navItems.forEach(nav => nav.classList.remove('active'));
      
      // Add active class to clicked item
      this.classList.add('active');
      
      // Simulate page navigation
      switch(page) {
        case 'blog':
          alert('ბლოგის გვერდზე გადასვლა');
          break;
        case 'farmers':
          alert('ფერმერების გვერდზე გადასვლა');
          break;
        case 'about':
          alert('ჩვენს შესახებ გვერდზე გადასვლა');
          break;
        case 'contact':
          alert('კონტაქტის გვერდზე გადასვლა');
          break;
        case 'map':
          alert('რუკის გვერდზე გადასვლა');
          break;
      }
    });
  });

  // Search functionality
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  searchIcon.addEventListener('click', performSearch);

  function performSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      console.log(`Searching for: ${searchTerm}`);
      alert(`ძებნა: "${searchTerm}"`);
      // Here you would typically send the search query to your backend
    }
  }

  // Region selection button
  regionButton.addEventListener('click', function() {
    console.log('Region selection clicked');
    showRegionModal();
  });

  function showRegionModal() {
    const regions = [
      'თბილისი',
      'ბათუმი', 
      'ქუთაისი',
      'რუსთავი',
      'გორი',
      'ზუგდიდი',
      'ფოთი',
      'ხაშური'
    ];

    const regionList = regions.map(region => `<li style="padding: 10px; cursor: pointer; border-bottom: 1px solid #eee;" onclick="selectRegion('${region}')">${region}</li>`).join('');
    
    const modalHTML = `
      <div id="regionModal" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      ">
        <div style="
          background: white;
          padding: 20px;
          border-radius: 10px;
          max-width: 400px;
          width: 90%;
        ">
          <h3 style="margin-top: 0; color: #007f5f;">აირჩიე რეგიონი</h3>
          <ul style="list-style: none; padding: 0; margin: 0; max-height: 300px; overflow-y: auto;">
            ${regionList}
          </ul>
          <button onclick="closeRegionModal()" style="
            margin-top: 15px;
            padding: 10px 20px;
            background: #007f5f;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          ">დახურვა</button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // Global functions for modal
  window.selectRegion = function(region) {
    console.log(`Selected region: ${region}`);
    document.querySelector('.text-wrapper').textContent = region;
    closeRegionModal();
  };

  window.closeRegionModal = function() {
    const modal = document.getElementById('regionModal');
    if (modal) {
      modal.remove();
    }
  };

  // Add button functionality
  addButton.addEventListener('click', function() {
    console.log('Add button clicked');
    alert('ახალი ელემენტის დამატება');
  });

  // Profile button functionality
  profileButton.addEventListener('click', function() {
    console.log('Profile button clicked');
    showProfileMenu();
  });

  function showProfileMenu() {
    const menuHTML = `
      <div id="profileMenu" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      ">
        <div style="
          background: white;
          padding: 20px;
          border-radius: 10px;
          max-width: 300px;
          width: 90%;
        ">
          <h3 style="margin-top: 0; color: #007f5f;">პროფილი</h3>
          <div style="margin: 15px 0;">
            <button onclick="alert('პროფილის რედაქტირება')" style="
              width: 100%;
              padding: 10px;
              margin: 5px 0;
              background: #007f5f;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            ">პროფილის რედაქტირება</button>
            <button onclick="alert('პარამეტრები')" style="
              width: 100%;
              padding: 10px;
              margin: 5px 0;
              background: #7fbf8e;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            ">პარამეტრები</button>
            <button onclick="alert('გამოსვლა')" style="
              width: 100%;
              padding: 10px;
              margin: 5px 0;
              background: #dc3545;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            ">გამოსვლა</button>
          </div>
          <button onclick="closeProfileMenu()" style="
            width: 100%;
            padding: 10px;
            background: #6c757d;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          ">დახურვა</button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', menuHTML);
  }

  window.closeProfileMenu = function() {
    const menu = document.getElementById('profileMenu');
    if (menu) {
      menu.remove();
    }
  };

  // Social media icons
  socialIcons.forEach((icon, index) => {
    icon.addEventListener('click', function() {
      const socialPlatforms = ['Facebook', 'Twitter', 'Instagram'];
      const platform = socialPlatforms[index] || 'Social Media';
      console.log(`${platform} clicked`);
      alert(`${platform}-ზე გადასვლა`);
    });
  });

  // Logo click - go to home
  logo.addEventListener('click', function() {
    console.log('Logo clicked - going home');
    // Remove active class from all nav items
    navItems.forEach(nav => nav.classList.remove('active'));
    alert('მთავარ გვერდზე დაბრუნება');
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search focus
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
      closeRegionModal();
      closeProfileMenu();
    }
  });

  // Smooth scrolling for better UX
  document.documentElement.style.scrollBehavior = 'smooth';

  // Add loading animation
  window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  });

  console.log('VilleGo application initialized successfully!');
});
