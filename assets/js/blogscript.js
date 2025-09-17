// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('VilleGo website loaded successfully!');
    
    // Add loading animation
    document.body.classList.add('loading');
    
    // Initialize all interactive features
    initializeNavigation();
    initializePagination();
    initializeImageHovers();
    initializeSearch();
    initializeMobileAppButtons();
    initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.text-wrapper-12, .text-wrapper-13, .text-wrapper-14, .text-wrapper-15, .text-wrapper-17');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Smooth scroll to relevant section
            const text = this.textContent.trim();
            scrollToSection(text);
        });
    });
}

// Pagination controls
function initializePagination() {
    const leftArrow = document.querySelector('.fill-with-left-arrow');
    const rightArrow = document.querySelector('.fill-with-right');
    const pageNumbers = document.querySelectorAll('.text-wrapper-8, .text-wrapper-9, .text-wrapper-10');
    
    let currentPage = 1;
    const totalPages = 3;
    
    // Left arrow click
    if (leftArrow) {
        leftArrow.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                updatePagination(currentPage, pageNumbers);
                showPage(currentPage);
            }
        });
    }
    
    // Right arrow click
    if (rightArrow) {
        rightArrow.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                updatePagination(currentPage, pageNumbers);
                showPage(currentPage);
            }
        });
    }
    
    // Page number clicks
    pageNumbers.forEach((pageNum, index) => {
        pageNum.addEventListener('click', function() {
            currentPage = index + 1;
            updatePagination(currentPage, pageNumbers);
            showPage(currentPage);
        });
    });
}

// Update pagination visual state
function updatePagination(currentPage, pageNumbers) {
    pageNumbers.forEach((pageNum, index) => {
        if (index + 1 === currentPage) {
            pageNum.style.color = '#007f5f';
            pageNum.style.fontWeight = '900';
        } else {
            pageNum.style.color = '#000000';
            pageNum.style.fontWeight = '700';
        }
    });
}

// Show different content based on page
function showPage(pageNumber) {
    const articles = document.querySelectorAll('.overlap, .overlap-2');
    
    articles.forEach((article, index) => {
        if (index + 1 === pageNumber) {
            article.style.opacity = '1';
            article.style.transform = 'translateY(0)';
        } else {
            article.style.opacity = '0.3';
            article.style.transform = 'translateY(20px)';
        }
    });
}

// Image hover effects
function initializeImageHovers() {
    const images = document.querySelectorAll('.rectangle, .img, .rectangle-3');
    
    images.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) contrast(1.1)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) contrast(1)';
        });
        
        // Click to expand image
        image.addEventListener('click', function() {
            expandImage(this);
        });
    });
}

// Expand image functionality
function expandImage(imageElement) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        cursor: pointer;
    `;
    
    // Create expanded image
    const expandedImg = document.createElement('img');
    expandedImg.src = imageElement.src;
    expandedImg.style.cssText = `
        max-width: 90vw;
        max-height: 90vh;
        object-fit: contain;
        border-radius: 10px;
        box-shadow: 0 0 50px rgba(255, 255, 255, 0.3);
    `;
    
    modal.appendChild(expandedImg);
    document.body.appendChild(modal);
    
    // Close modal on click
    modal.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
    });
}

// Search functionality
function initializeSearch() {
    const searchBar = document.querySelector('.rectangle-7');
    const searchIcon = document.querySelector('.vector-3');
    
    if (searchBar && searchIcon) {
        searchBar.addEventListener('click', function() {
            // Create search input
            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.placeholder = 'ძებნა...';
            searchInput.style.cssText = `
                position: absolute;
                top: 66px;
                left: 823px;
                width: 400px;
                height: 34px;
                border: none;
                border-radius: 16px;
                padding: 0 40px 0 20px;
                font-size: 16px;
                background: white;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                z-index: 100;
            `;
            
            document.querySelector('.overlap-group-2').appendChild(searchInput);
            searchInput.focus();
            
            // Handle search input
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch(this.value);
                    this.remove();
                }
            });
            
            // Remove input on blur
            searchInput.addEventListener('blur', function() {
                setTimeout(() => this.remove(), 200);
            });
        });
    }
}

// Perform search function
function performSearch(query) {
    if (!query.trim()) return;
    
    console.log('Searching for:', query);
    
    // Highlight matching text
    const textElements = document.querySelectorAll('p, .text-wrapper, .element');
    textElements.forEach(element => {
        const text = element.textContent;
        if (text.toLowerCase().includes(query.toLowerCase())) {
            element.style.backgroundColor = '#ffff99';
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
    
    // Clear highlights after 3 seconds
    setTimeout(() => {
        textElements.forEach(element => {
            element.style.backgroundColor = '';
        });
    }, 3000);
}

// Mobile app store buttons
function initializeMobileAppButtons() {
    const appStoreButtons = document.querySelectorAll('.mobile-app-store, .mobile-app-store-2, .mobile-app-store-3');
    
    appStoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 100);
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Simulate app store redirect
            const buttonClass = this.className;
            if (buttonClass.includes('mobile-app-store-2')) {
                console.log('Redirecting to App Store...');
                // window.open('https://apps.apple.com/', '_blank');
            } else if (buttonClass.includes('mobile-app-store-3')) {
                console.log('Redirecting to Google Play...');
                // window.open('https://play.google.com/', '_blank');
            } else {
                console.log('Redirecting to Microsoft Store...');
                // window.open('https://www.microsoft.com/store/', '_blank');
            }
        });
    });
}

// Scroll effects
function initializeScrollEffects() {
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
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.overlap, .overlap-2, .overlap-5, .group, .v-2');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Scroll to section helper
function scrollToSection(sectionName) {
    let targetElement;
    
    switch(sectionName) {
        case 'ბლოგი':
            targetElement = document.querySelector('.overlap');
            break;
        case 'ფერმერები':
            targetElement = document.querySelector('.overlap-2');
            break;
        case 'ჩვენს შესახებ':
            targetElement = document.querySelector('.v-2');
            break;
        case 'კონტაქტი':
            targetElement = document.querySelector('.group-5');
            break;
        case 'რუკა':
            targetElement = document.querySelector('.overlap-5');
            break;
        default:
            targetElement = document.querySelector('.v');
    }
    
    if (targetElement) {
        targetElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Add click handlers for "Read More" links
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('text-wrapper-2') || 
        e.target.classList.contains('text-wrapper-3') || 
        e.target.classList.contains('text-wrapper-4')) {
        
        e.preventDefault();
        
        // Expand the article content
        const parentOverlap = e.target.closest('.overlap, .overlap-2, .overlap-3');
        if (parentOverlap) {
            const textContent = parentOverlap.querySelector('.element, .p');
            if (textContent) {
                if (textContent.style.maxHeight) {
                    textContent.style.maxHeight = '';
                    e.target.textContent = 'ნახეთ სრულიად';
                } else {
                    textContent.style.maxHeight = '200px';
                    textContent.style.overflow = 'hidden';
                    e.target.textContent = 'ნაკლები';
                }
            }
        }
    }
});

// Add smooth hover effects for buttons
const buttons = document.querySelectorAll('.rectangle-2, .rectangle-4, .rectangle-5');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 4px 15px rgba(0, 127, 95, 0.3)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Add parallax effect to background elements
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.rectangle, .img, .rectangle-3');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowLeft':
            document.querySelector('.fill-with-left-arrow')?.click();
            break;
        case 'ArrowRight':
            document.querySelector('.fill-with-right')?.click();
            break;
        case '/':
            e.preventDefault();
            document.querySelector('.rectangle-7')?.click();
            break;
    }
});

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s';
                
                const newImg = new Image();
                newImg.onload = function() {
                    img.style.opacity = '1';
                };
                newImg.src = img.src;
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Add resize handler to maintain aspect ratio
window.addEventListener('resize', function() {
    const container = document.querySelector('.screen .div');
    if (container && window.innerWidth < 1920) {
        const scale = window.innerWidth / 1920;
        container.style.transform = `scale(${scale})`;
        container.style.transformOrigin = 'top center';
    }
});

console.log('VilleGo JavaScript initialized successfully!');
