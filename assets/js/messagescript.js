// Global variables
let currentUser = null;
let notifications = [];
let messages = [];
let favorites = [];
let cart = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('VilleGo application initialized');
    loadUserData();
    setupEventListeners();
});

// User data management
function loadUserData() {
    // Simulate loading user data from localStorage or API
    currentUser = JSON.parse(localStorage.getItem('villegoUser')) || {
        id: 'user123',
        name: 'მომხმარებელი',
        email: 'user@villego.ge',
        phone: '555 88 88 88'
    };
    
    favorites = JSON.parse(localStorage.getItem('villegoFavorites')) || [];
    cart = JSON.parse(localStorage.getItem('villegoCart')) || [];
    messages = JSON.parse(localStorage.getItem('villegoMessages')) || [];
    notifications = JSON.parse(localStorage.getItem('villegoNotifications')) || [];
}

function saveUserData() {
    localStorage.setItem('villegoUser', JSON.stringify(currentUser));
    localStorage.setItem('villegoFavorites', JSON.stringify(favorites));
    localStorage.setItem('villegoCart', JSON.stringify(cart));
    localStorage.setItem('villegoMessages', JSON.stringify(messages));
    localStorage.setItem('villegoNotifications', JSON.stringify(notifications));
}

// Navigation functions
function goHome() {
    showNotification('მთავარ გვერდზე გადასვლა');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateTo(page) {
    const pageNames = {
        'blog': 'ბლოგი',
        'farmers': 'ფერმერები',
        'about': 'ჩვენს შესახებ',
        'contact': 'კონტაქტი',
        'map': 'რუკა',
        'help': 'დახმარება',
        'faq': 'ხშირად დასმული კითხვები',
        'feedback': 'უკუკავშირი',
        'info': 'ინფორმაცია',
        'terms': 'გაყიდვის პირობები',
        'conditions': 'წესები და პირობები',
        'user': 'მომხმარებელი',
        'register': 'რეგისტრაცია',
        'userpage': 'მომხმარებლის გვერდი',
        'helppage': 'დახმარების გვერდი',
        'aboutpage': 'ჩვენს შესახებ',
        'returnpolicy': 'დაბრუნების პოლიტიკა',
        'privacy': 'კონფიდენციალურობის პოლიტიკა'
    };
    
    showNotification(`${pageNames[page] || page} გვერდზე გადასვლა`);
    
    // Simulate page navigation with loading
    showModal(pageNames[page] || page, '<div class="loading"></div>');
    
    setTimeout(() => {
        document.getElementById('modalContent').innerHTML = `
            <p>თქვენ იმყოფებით ${pageNames[page] || page} გვერდზე</p>
            <p>ეს არის დემო ვერსია. რეალურ აპლიკაციაში აქ იქნება ${pageNames[page] || page} გვერდის შინაარსი.</p>
        `;
    }, 1000);
}

// Chat and messaging functions
function openChat(username) {
    showNotification(`${username}-თან ჩატის გახსნა`);
    
    showModal(`ჩატი ${username}-თან`, '<div class="loading"></div>');
    
    setTimeout(() => {
        document.getElementById('modalContent').innerHTML = `
            <div style="max-height: 300px; overflow-y: auto; border: 1px solid #ddd; padding: 10px; margin-bottom: 10px;">
                <div style="margin-bottom: 10px; padding: 8px; background: #f0f0f0; border-radius: 8px;">
                    <strong>${username}:</strong> გამარჯობა ვარ დაინტერესებული კიტრის შეძენით
                </div>
                <div style="margin-bottom: 10px; padding: 8px; background: #007f5f; color: white; border-radius: 8px; text-align: right;">
                    <strong>თქვენ:</strong> გამარჯობა! რა რაოდენობა გჭირდებათ?
                </div>
            </div>
            <div style="display: flex; gap: 10px;">
                <input type="text" placeholder="შეიყვანეთ შეტყობინება..." style="flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                <button onclick="sendMessage('${username}')" style="padding: 8px 16px; background: #007f5f; color: white; border: none; border-radius: 4px; cursor: pointer;">გაგზავნა</button>
            </div>
        `;
    }, 800);
}

function sendMessage(username) {
    const input = document.querySelector('#modalContent input');
    const message = input.value.trim();
    
    if (message) {
        showNotification(`შეტყობინება გაიგზავნა ${username}-ისთვის`);
        input.value = '';
        
        // Add message to messages array
        messages.push({
            to: username,
            message: message,
            timestamp: new Date().toISOString()
        });
        saveUserData();
    }
}

function readMore(username) {
    showNotification(`${username}-ის სრული შეტყობინების ნახვა`);
    
    showModal(`${username}-ის შეტყობინება`, `
        <div style="padding: 15px; background: #f9f9f9; border-radius: 8px; margin-bottom: 15px;">
            <h3>${username}</h3>
            <p>გამარჯობა ვარ დაინტერესებული კიტრის შეძენით. მაქვს მცირე ფერმა და მჭირდება ხარისხიანი კიტრი ჩემი მოსავლისთვის. გთხოვთ მომწეროთ ფასებისა და ხელმისაწვდომობის შესახებ.</p>
            <small style="color: #666;">გაგზავნილია: ${new Date().toLocaleDateString('ka-GE')}</small>
        </div>
        <div style="display: flex; gap: 10px;">
            <button onclick="openChat('${username}')" style="flex: 1; padding: 10px; background: #007f5f; color: white; border: none; border-radius: 4px; cursor: pointer;">პასუხი</button>
            <button onclick="viewProfile('${username}')" style="flex: 1; padding: 10px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">პროფილი</button>
        </div>
    `);
}

// Profile and user functions
function viewProfile(username) {
    showNotification(`${username}-ის პროფილის ნახვა`);
    
    showModal(`${username}-ის პროფილი`, '<div class="loading"></div>');
    
    setTimeout(() => {
        document.getElementById('modalContent').innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="width: 80px; height: 80px; background: #007f5f; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;">
                    ${username.charAt(0).toUpperCase()}
                </div>
                <h3>${username}</h3>
                <p style="color: #666;">ფერმერი • რეგისტრირებულია 2023 წელს</p>
            </div>
            <div style="margin-bottom: 15px;">
                <h4>შესახებ:</h4>
                <p>მე ვარ ფერმერი და ვმუშაობ ორგანული პროდუქტების წარმოებაზე. ჩემი ფერმა მდებარეობს საქართველოში და ვაწარმოებ ხარისხიან სოფლის მეურნეობის პროდუქტებს.</p>
            </div>
            <div style="display: flex; gap: 10px;">
                <button onclick="openChat('${username}')" style="flex: 1; padding: 10px; background: #007f5f; color: white; border: none; border-radius: 4px; cursor: pointer;">შეტყობინება</button>
                <button onclick="addToFavorites('${username}')" style="flex: 1; padding: 10px; background: #ffc107; color: black; border: none; border-radius: 4px; cursor: pointer;">ფავორიტებში</button>
            </div>
        `;
    }, 600);
}

function showProfile() {
    showNotification('თქვენი პროფილის ნახვა');
    
    showModal('ჩემი პროფილი', `
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="width: 80px; height: 80px; background: #007f5f; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;">
                ${currentUser.name.charAt(0)}
            </div>
            <h3>${currentUser.name}</h3>
            <p style="color: #666;">${currentUser.email}</p>
        </div>
        <div style="margin-bottom: 15px;">
            <h4>ანგარიშის ინფორმაცია:</h4>
            <p><strong>ტელეფონი:</strong> ${currentUser.phone}</p>
            <p><strong>ფავორიტები:</strong> ${favorites.length} ელემენტი</p>
            <p><strong>კალათა:</strong> ${cart.length} ელემენტი</p>
        </div>
        <div style="display: flex; gap: 10px;">
            <button onclick="editProfile()" style="flex: 1; padding: 10px; background: #007f5f; color: white; border: none; border-radius: 4px; cursor: pointer;">რედაქტირება</button>
            <button onclick="logout()" style="flex: 1; padding: 10px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">გასვლა</button>
        </div>
    `);
}

function editProfile() {
    showModal('პროფილის რედაქტირება', `
        <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">სახელი:</label>
            <input type="text" id="editName" value="${currentUser.name}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px;">
            
            <label style="display: block; margin-bottom: 5px;">ელ. ფოსტა:</label>
            <input type="email" id="editEmail" value="${currentUser.email}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px;">
            
            <label style="display: block; margin-bottom: 5px;">ტელეფონი:</label>
            <input type="tel" id="editPhone" value="${currentUser.phone}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 15px;">
        </div>
        <div style="display: flex; gap: 10px;">
            <button onclick="saveProfile()" style="flex: 1; padding: 10px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">შენახვა</button>
            <button onclick="showProfile()" style="flex: 1; padding: 10px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">გაუქმება</button>
        </div>
    `);
}

function saveProfile() {
    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const phone = document.getElementById('editPhone').value;
    
    if (name && email && phone) {
        currentUser.name = name;
        currentUser.email = email;
        currentUser.phone = phone;
        saveUserData();
        showNotification('პროფილი წარმატებით განახლდა');
        closeModal();
    } else {
        showNotification('გთხოვთ შეავსოთ ყველა ველი');
    }
}

function logout() {
    localStorage.clear();
    showNotification('თქვენ წარმატებით გახვედით სისტემიდან');
    closeModal();
    setTimeout(() => {
        location.reload();
    }, 1500);
}

// Search and filter functions
function performSearch() {
    showNotification('ძებნის ფუნქციის გაშვება');
    
    showModal('ძებნა', `
        <div style="margin-bottom: 15px;">
            <input type="text" id="searchInput" placeholder="შეიყვანეთ საძიებო სიტყვა..." style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px;">
            <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                <select id="searchCategory" style="flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="">ყველა კატეგორია</option>
                    <option value="vegetables">ბოსტნეული</option>
                    <option value="fruits">ხილი</option>
                    <option value="grains">მარცვლეული</option>
                    <option value="dairy">რძის პროდუქტები</option>
                </select>
                <select id="searchLocation" style="flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="">ყველა რეგიონი</option>
                    <option value="tbilisi">თბილისი</option>
                    <option value="kutaisi">ქუთაისი</option>
                    <option value="batumi">ბათუმი</option>
                    <option value="rustavi">რუსთავი</option>
                </select>
            </div>
        </div>
        <div style="display: flex; gap: 10px;">
            <button onclick="executeSearch()" style="flex: 1; padding: 10px; background: #007f5f; color: white; border: none; border-radius: 4px; cursor: pointer;">ძებნა</button>
            <button onclick="clearSearch()" style="flex: 1; padding: 10px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">გასუფთავება</button>
        </div>
        <div id="searchResults" style="margin-top: 15px;"></div>
    `);
}

function executeSearch() {
    const query = document.getElementById('searchInput').value;
    const category = document.getElementById('searchCategory').value;
    const location = document.getElementById('searchLocation').value;
    
    document.getElementById('searchResults').innerHTML = '<div class="loading"></div>';
    
    setTimeout(() => {
        document.getElementById('searchResults').innerHTML = `
            <h4>ძებნის შედეგები:</h4>
            <div style="border: 1px solid #ddd; border-radius: 8px; padding: 10px; margin-bottom: 10px;">
                <h5>ორგანული კიტრი</h5>
                <p>ფერმერი: GIORGI787 • ადგილმდებარეობა: თბილისი</p>
                <p>ფასი: 15 ლარი/კგ</p>
            </div>
            <div style="border: 1px solid #ddd; border-radius: 8px; padding: 10px; margin-bottom: 10px;">
                <h5>ხარისხიანი კიტრი</h5>
                <p>ფერმერი: vaja22 • ადგილმდებარეობა: ქუთაისი</p>
                <p>ფასი: 12 ლარი/კგ</p>
            </div>
        `;
    }, 1000);
    
    showNotification(`ძებნა: "${query}" - ნაპოვნია 2 შედეგი`);
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchCategory').value = '';
    document.getElementById('searchLocation').value = '';
    document.getElementById('searchResults').innerHTML = '';
    showNotification('ძებნის ველები გასუფთავდა');
}

// Favorites and cart functions
function addToFavorites(item) {
    if (!favorites.includes(item)) {
        favorites.push(item);
        saveUserData();
        showNotification(`${item} დაემატა ფავორიტებში`);
    } else {
        showNotification(`${item} უკვე არის ფავორიტებში`);
    }
}

function showFavorites() {
    showNotification('ფავორიტების ნახვა');
    
    let favoritesContent = '<h4>ჩემი ფავორიტები:</h4>';
    
    if (favorites.length === 0) {
        favoritesContent += '<p>ფავორიტები ცარიელია</p>';
    } else {
        favorites.forEach(item => {
            favoritesContent += `
                <div style="border: 1px solid #ddd; border-radius: 8px; padding: 10px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                    <span>${item}</span>
                    <button onclick="removeFromFavorites('${item}')" style="padding: 5px 10px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">წაშლა</button>
                </div>
            `;
        });
    }
    
    showModal('ფავორიტები', favoritesContent);
}

function removeFromFavorites(item) {
    favorites = favorites.filter(fav => fav !== item);
    saveUserData();
    showNotification(`${item} წაიშალა ფავორიტებიდან`);
    showFavorites(); // Refresh the favorites view
}

function showCart() {
    showNotification('კალათის ნახვა');
    
    let cartContent = '<h4>ჩემი კალათა:</h4>';
    
    if (cart.length === 0) {
        cartContent += '<p>კალათა ცარიელია</p>';
    } else {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            cartContent += `
                <div style="border: 1px solid #ddd; border-radius: 8px; padding: 10px; margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span><strong>${item.name}</strong></span>
                        <button onclick="removeFromCart('${item.id}')" style="padding: 5px 10px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">წაშლა</button>
                    </div>
                    <p>რაოდენობა: ${item.quantity} • ფასი: ${item.price} ლარი</p>
                </div>
            `;
        });
        cartContent += `<div style="text-align: right; font-size: 18px; font-weight: bold; margin-top: 15px;">სულ: ${total} ლარი</div>`;
        cartContent += `<button onclick="checkout()" style="width: 100%; padding: 12px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">შეკვეთის გაფორმება</button>`;
    }
    
    showModal('კალათა', cartContent);
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveUserData();
    showNotification('პროდუქტი წაიშალა კალათიდან');
    showCart(); // Refresh the cart view
}

function checkout() {
    showNotification('შეკვეთის გაფორმება დაიწყო');
    closeModal();
    
    setTimeout(() => {
        showModal('შეკვეთის გაფორმება', `
            <h4>შეკვეთის დეტალები:</h4>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px;">მისამართი:</label>
                <input type="text" id="deliveryAddress" placeholder="მიწოდების მისამართი" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px;">
                
                <label style="display: block; margin-bottom: 5px;">ტელეფონი:</label>
                <input type="tel" id="deliveryPhone" value="${currentUser.phone}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px;">
                
                <label style="display: block; margin-bottom: 5px;">კომენტარი:</label>
                <textarea id="orderComment" placeholder="დამატებითი ინფორმაცია..." style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; height: 60px; margin-bottom: 15px;"></textarea>
            </div>
            <div style="display: flex; gap: 10px;">
                <button onclick="confirmOrder()" style="flex: 1; padding: 10px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">შეკვეთის დადასტურება</button>
                <button onclick="showCart()" style="flex: 1; padding: 10px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">უკან</button>
            </div>
        `);
    }, 500);
}

function confirmOrder() {
    const address = document.getElementById('deliveryAddress').value;
    const phone = document.getElementById('deliveryPhone').value;
    
    if (address && phone) {
        cart = []; // Clear cart
        saveUserData();
        showNotification('შეკვეთა წარმატებით გაფორმდა!');
        closeModal();
    } else {
        showNotification('გთხოვთ შეავსოთ სავალდებულო ველები');
    }
}

// Notification and messaging functions
function showNotifications() {
    showNotification('შეტყობინებების ნახვა');
    
    let notificationsContent = '<h4>შეტყობინებები:</h4>';
    
    if (notifications.length === 0) {
        notificationsContent += '<p>ახალი შეტყობინებები არ არის</p>';
    } else {
        notifications.forEach((notif, index) => {
            notificationsContent += `
                <div style="border: 1px solid #ddd; border-radius: 8px; padding: 10px; margin-bottom: 10px;">
                    <p>${notif.message}</p>
                    <small style="color: #666;">${new Date(notif.timestamp).toLocaleString('ka-GE')}</small>
                    <button onclick="removeNotification(${index})" style="float: right; padding: 3px 8px; background: #dc3545; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 12px;">წაშლა</button>
                </div>
            `;
        });
    }
    
    showModal('შეტყობინებები', notificationsContent);
}

function removeNotification(index) {
    notifications.splice(index, 1);
    saveUserData();
    showNotifications(); // Refresh notifications view
}

function showMessages() {
    showNotification('შეტყობინებების ისტორიის ნახვა');
    
    let messagesContent = '<h4>შეტყობინებების ისტორია:</h4>';
    
    if (messages.length === 0) {
        messagesContent += '<p>შეტყობინებები არ არის</p>';
    } else {
        messages.forEach(msg => {
            messagesContent += `
                <div style="border: 1px solid #ddd; border-radius: 8px; padding: 10px; margin-bottom: 10px;">
                    <p><strong>მიმღები:</strong> ${msg.to}</p>
                    <p>${msg.message}</p>
                    <small style="color: #666;">${new Date(msg.timestamp).toLocaleString('ka-GE')}</small>
                </div>
            `;
        });
    }
    
    showModal('შეტყობინებები', messagesContent);
}

// App download and social media functions
function downloadApp(store) {
    const storeNames = {
        'microsoft': 'Microsoft Store',
        'apple': 'App Store',
        'google': 'Google Play Store'
    };
    
    const storeName = storeNames[store] || 'აპლიკაციის მაღაზია';
    showNotification(`${storeName}-დან VilleGo აპლიკაციის ჩამოტვირთვა`);
    
    // Simulate app download
    setTimeout(() => {
        showNotification('აპლიკაციის ჩამოტვირთვა დაიწყო');
    }, 1000);
}

function openSocialMedia(platform) {
    const platforms = {
        'facebook': 'Facebook',
        'instagram': 'Instagram',
        'twitter': 'Twitter',
        'linkedin': 'LinkedIn',
        'youtube': 'YouTube',
        'discord': 'Discord'
    };
    
    showNotification(`${platforms[platform]} გვერდის გახსნა`);
}

// Contact and company functions
function callPhone() {
    showNotification('ტელეფონზე დარეკვა: 555 88 88 88');
    if (navigator.userAgent.match(/Mobile/)) {
        window.location.href = 'tel:+995558888888';
    }
}

function sendEmail() {
    showNotification('ელ. ფოსტის გაგზავნა: VilleGoLLC@gmail.com');
    window.location.href = 'mailto:VilleGoLLC@gmail.com?subject=VilleGo-დან მიმართვა';
}

function showLocation() {
    showNotification('მისამართის ნახვა რუკაზე');
    
    showModal('ჩვენი მისამართი', `
        <div style="text-align: center; margin-bottom: 15px;">
            <h4>მიცკევიჩის N25</h4>
            <p>თბილისი, საქართველო</p>
        </div>
        <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 15px;">
            <p>🗺️ რუკის ვიზუალიზაცია</p>
            <p style="color: #666; font-size: 14px;">რეალურ აპლიკაციაში აქ იქნება ინტერაქტიული რუკა</p>
        </div>
        <div style="display: flex; gap: 10px;">
            <button onclick="callPhone()" style="flex: 1; padding: 10px; background: #007f5f; color: white; border: none; border-radius: 4px; cursor: pointer;">დარეკვა</button>
            <button onclick="sendEmail()" style="flex: 1; padding: 10px; background: #17a2b8; color: white; border: none; border-radius: 4px; cursor: pointer;">ელ. ფოსტა</button>
        </div>
    `);
}

function showCompanyInfo() {
    showNotification('კომპანიის ინფორმაციის ნახვა');
    
    showModal('VilleGo შესახებ', `
        <div style="text-align: center; margin-bottom: 20px;">
            <h3>VilleGo</h3>
            <p style="color: #007f5f; font-weight: bold;">ფერმერიდან მომხმარებლამდე, შუამავალის გარეშე!</p>
        </div>
        <div style="margin-bottom: 15px;">
            <h4>ჩვენი მისია:</h4>
            <p>VilleGo არის პლატფორმა, რომელიც აკავშირებს ფერმერებს მომხმარებლებთან პირდაპირ, უზრუნველყოფს ხარისხიან სოფლის მეურნეობის პროდუქტებზე წვდომას და ხელს უწყობს ადგილობრივი ეკონომიკის განვითარებას.</p>
        </div>
        <div style="margin-bottom: 15px;">
            <h4>ჩვენი მომსახურებები:</h4>
            <ul>
                <li>ფერმერებისა და მომხმარებლების დაკავშირება</li>
                <li>ხარისხიანი პროდუქტების მარკეტპლეისი</li>
                <li>უსაფრთხო ონლაინ გადახდები</li>
                <li>სწრაფი მიწოდების სერვისი</li>
            </ul>
        </div>
        <div style="text-align: center;">
            <button onclick="navigateTo('contact')" style="padding: 10px 20px; background: #007f5f; color: white; border: none; border-radius: 4px; cursor: pointer;">დაგვიკავშირდით</button>
        </div>
    `);
}

function showAdvertisement() {
    showNotification('რეკლამის განთავსების ინფორმაცია');
    
    showModal('განათავსეთ თქვენი რეკლამა', `
        <div style="text-align: center; margin-bottom: 20px;">
            <h3>რეკლამის განთავსება VilleGo-ზე</h3>
            <p>მიაღწიეთ ათასობით პოტენციურ მომხმარებელს!</p>
        </div>
        <div style="margin-bottom: 15px;">
            <h4>რეკლამის ტიპები:</h4>
            <div style="border: 1px solid #ddd; border-radius: 8px; padding: 10px; margin-bottom: 10px;">
                <h5>ბანერი მთავარ გვერდზე</h5>
                <p>ფასი: 100 ლარი/თვე</p>
            </div>
            <div style="border: 1px solid #ddd; border-radius: 8px; padding: 10px; margin-bottom: 10px;">
                <h5>პროდუქტის რეკომენდაცია</h5>
                <p>ფასი: 50 ლარი/თვე</p>
            </div>
            <div style="border: 1px solid #ddd; border-radius: 8px; padding: 10px; margin-bottom: 15px;">
                <h5>სპონსორული პოსტი</h5>
                <p>ფასი: 25 ლარი/პოსტი</p>
            </div>
        </div>
        <div style="display: flex; gap: 10px;">
            <button onclick="contactAdvertising()" style="flex: 1; padding: 10px; background: #007f5f; color: white; border: none; border-radius: 4px; cursor: pointer;">დაგვიკავშირდით</button>
            <button onclick="closeModal()" style="flex: 1; padding: 10px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">დახურვა</button>
        </div>
    `);
}

function contactAdvertising() {
    showNotification('რეკლამის განყოფილებასთან დაკავშირება');
    sendEmail();
}

function createPost() {
    showNotification('ახალი პოსტის შექმნა');
    
    showModal('ახალი პოსტის შექმნა', `
        <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">პროდუქტის სახელი:</label>
            <input type="text" id="postTitle" placeholder="მაგ: ორგანული კიტრი" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px;">
            
            <label style="display: block; margin-bottom: 5px;">აღწერა:</label>
            <textarea id="postDescription" placeholder="პროდუქტის დეტალური აღწერა..." style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; height: 80px; margin-bottom: 10px;"></textarea>
            
            <label style="display: block; margin-bottom: 5px;">ფასი (ლარი):</label>
            <input type="number" id="postPrice" placeholder="0.00" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px;">
            
            <label style="display: block; margin-bottom: 5px;">კატეგორია:</label>
            <select id="postCategory" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 15px;">
                <option value="">აირჩიეთ კატეგორია</option>
                <option value="vegetables">ბოსტნეული</option>
                <option value="fruits">ხილი</option>
                <option value="grains">მარცვლეული</option>
                <option value="dairy">რძის პროდუქტები</option>
            </select>
        </div>
        <div style="display: flex; gap: 10px;">
            <button onclick="publishPost()" style="flex: 1; padding: 10px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">გამოქვეყნება</button>
            <button onclick="closeModal()" style="flex: 1; padding: 10px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">გაუქმება</button>
        </div>
    `);
}

function publishPost() {
    const title = document.getElementById('postTitle').value;
    const description = document.getElementById('postDescription').value;
    const price = document.getElementById('postPrice').value;
    const category = document.getElementById('postCategory').value;
    
    if (title && description && price && category) {
        showNotification('პოსტი წარმატებით გამოქვეყნდა!');
        closeModal();
        
        // Add notification about new post
        notifications.unshift({
            message: `თქვენი პოსტი "${title}" წარმატებით გამოქვეყნდა`,
            timestamp: new Date().toISOString()
        });
        saveUserData();
    } else {
        showNotification('გთხოვთ შეავსოთ ყველა ველი');
    }
}

// Modal and notification utilities
function showModal(title, content) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalContent').innerHTML = content;
    document.getElementById('userModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('userModal').style.display = 'none';
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Event listeners setup
function setupEventListeners() {
    // Close modal when clicking outside of it
    window.onclick = function(event) {
        const modal = document.getElementById('userModal');
        if (event.target === modal) {
            closeModal();
        }
    };
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
        if (event.ctrlKey && event.key === 'k') {
            event.preventDefault();
            performSearch();
        }
    });
    
    // Add some sample data for demo
    if (notifications.length === 0) {
        notifications.push({
            message: 'მოგესალმებით VilleGo-ზე! თქვენი ანგარიში წარმატებით შეიქმნა.',
            timestamp: new Date().toISOString()
        });
        saveUserData();
    }
}

// Initialize sample cart items for demo
function initializeSampleData() {
    if (cart.length === 0) {
        cart.push({
            id: 'item1',
            name: 'ორგანული კიტრი',
            price: 15,
            quantity: 2
        });
        cart.push({
            id: 'item2',
            name: 'ხარისხიანი პომიდორი',
            price: 8,
            quantity: 1
        });
        saveUserData();
    }
}

// Call initialization
initializeSampleData();
