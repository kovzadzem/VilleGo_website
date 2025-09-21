// VilleGo Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('VilleGo website loaded successfully!');
    
    // Initialize all interactive features
    initSmoothScrolling();
    initHoverEffects();
    initClickHandlers();
    initAnimations();
    initMobileMenu();
    
    // Add fade-in animation to elements
    const elements = document.querySelectorAll('.text-wrapper, .rectangle, .overlap, .overlap-group');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('fade-in');
        }, index * 100);
    });
});



// Scroll to specific section
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Enhanced hover effects
function initHoverEffects() {
    // Team member cards
    const teamCards = document.querySelectorAll('.img, .rectangle-2, .rectangle-3, .rectangle-4, .rectangle-5, .vector-wrapper');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(1deg)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Social media icons
    const socialIcons = document.querySelectorAll('.elements, .elements-2, .vector-2, .elements-3, .elements-4, .elements-5');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.filter = 'brightness(1.2)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.filter = 'brightness(1)';
        });
    });
}

// Click handlers for interactive elements
function initClickHandlers() {
    // Logo click - scroll to top
    const logo = document.querySelector('.text-wrapper-12');
    if (logo) {
        logo.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // About us button
    const aboutBtn = document.querySelector('.overlap');
    if (aboutBtn) {
        aboutBtn.addEventListener('click', function() {
            showModal('ჩვენს შესახებ', 'ჩვენი სტარტაპის მიზანია შეგვექმნა ინოვაციური პლატფორმა, რომელიც აძლევს შესაძლებლობას ქართველ ფერმერებს და მწარმოებლებს მოახდნონ საკუთარი პროდუქტის რეალიზაცია ხელმისაწვდომ ფასად და ამავდროულად მომხმარებელმა შეიძინოს ადგილობრივი წარმოების პროდუქცია.');
        });
    }
    
    // Team members button
    const teamBtn = document.querySelector('.overlap-group');
    if (teamBtn) {
        teamBtn.addEventListener('click', function() {
            scrollToSection('.front-end-UI-UX');
        });
    }
    
    // Help button
    const helpBtn = document.querySelector('.div-wrapper');
    if (helpBtn) {
        helpBtn.addEventListener('click', function() {
            showContactModal();
        });
    }
    
    // App store buttons
    const appStoreButtons = document.querySelectorAll('.mobile-app-store, .mobile-app-store-2, .mobile-app-store-3');
    appStoreButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            showModal('მალე ხელმისაწვდომი!', 'VilleGo აპლიკაცია მალე იქნება ხელმისაწვდომი ყველა პლატფორმაზე. დარეგისტრირდით ჩვენს ვებსაიტზე რომ მიიღოთ შეტყობინება გაშვების შესახებ!');
        });
    });
    
    // Team member photos
    const teamPhotos = document.querySelectorAll('.img, .rectangle-2, .rectangle-3, .rectangle-4, .rectangle-5, .image, .element');
    teamPhotos.forEach(photo => {
        photo.addEventListener('click', function() {
            showTeamMemberInfo(this);
        });
    });
    
    // Social media icons
    const socialLinks = {
        '.elements': 'https://facebook.com/villego',
        '.elements-2': 'https://instagram.com/villego',
        '.vector-2': 'https://linkedin.com/company/villego',
        '.elements-3': 'https://wa.me/995555888888',
        '.elements-4': 'https://t.me/villego',
        '.elements-5': 'https://snapchat.com/add/villego'
    };
    
    Object.entries(socialLinks).forEach(([selector, url]) => {
        const element = document.querySelector(selector);
        if (element) {
            element.addEventListener('click', function() {
                window.open(url, '_blank');
            });
        }
    });
}

// Show modal dialog
function showModal(title, content) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <h2>${title}</h2>
            <p>${content}</p>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background-color: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
    `;
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        color: #aaa;
    `;
    
    document.body.appendChild(modal);
    
    // Close modal handlers
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') modal.remove();
    });
}

// Show contact modal
function showContactModal() {
    const contactInfo = `
        <strong>კონტაქტი:</strong><br>
        📍 მიცკევიჩის N25<br>
        📞 555 88 88 88<br>
        📧 VilleGoLLC@gmail.com<br><br>
        <em>ჩვენ ყოველთვის მზად ვართ დაგეხმაროთ!</em>
    `;
    showModal('დაგვიკავშირდით', contactInfo);
}

// Show team member information
function showTeamMemberInfo(element) {
    let memberInfo = '';
    
    // Determine which team member based on element position or class
    const rect = element.getBoundingClientRect();
    const leftPos = rect.left;
    
    if (leftPos < 400) {
        memberInfo = '<strong>ცოტნე ხუციშვილი</strong><br>Front-end Developer & UI/UX Designer<br>გამოცდილება: 3+ წელი<br>სპეციალიზაცია: React, Vue.js, Figma';
    } else if (leftPos < 800) {
        memberInfo = '<strong>ანა აბულაშვილი</strong><br>Graphic Designer<br>გამოცდილება: 2+ წელი<br>სპეციალიზაცია: Brand Identity, Illustration';
    } else {
        memberInfo = '<strong>მარიამ კოვზაძე</strong><br>Front-end Developer & UI/UX Designer<br>გამოცდილება: 4+ წელი<br>სპეციალიზაცია: JavaScript, CSS, User Research';
    }
    
    showModal('გუნდის წევრი', memberInfo);
}

// Initialize animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.rectangle-6, .overlap-2, .overlap-3, .group');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('div');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        display: none;
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1001;
        background: #007f5f;
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 20px;
    `;
    
    document.body.appendChild(mobileMenuBtn);
    
    // Show mobile menu on small screens
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
        } else {
            mobileMenuBtn.style.display = 'none';
        }
    }
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Mobile menu click handler
    mobileMenuBtn.addEventListener('click', function() {
        const nav = document.querySelector('.rectangle-9');
        if (nav) {
            nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
        }
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.text-wrapper-17');
    if (searchInput) {
        searchInput.addEventListener('click', function() {
            const searchTerm = prompt('რას ეძებთ?');
            if (searchTerm) {
                // Simple search implementation
                const allText = document.body.textContent.toLowerCase();
                if (allText.includes(searchTerm.toLowerCase())) {
                    alert(`"${searchTerm}" ნაპოვნია გვერდზე!`);
                } else {
                    alert(`"${searchTerm}" ვერ მოიძებნა.`);
                }
            }
        });
    }
}

// Initialize search
initSearch();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateY(-50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .pulse {
        animation: pulse 2s infinite;
    }
`;
document.head.appendChild(style);

// Add pulse animation to important elements
setTimeout(() => {
    const importantElements = document.querySelectorAll('.text-wrapper-12, .overlap, .overlap-group');
    importantElements.forEach(el => {
        el.classList.add('pulse');
        setTimeout(() => el.classList.remove('pulse'), 6000);
    });
}, 2000);

console.log('VilleGo interactive features initialized successfully!');
