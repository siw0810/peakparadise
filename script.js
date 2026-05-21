// ==================== PARADISE PEAK - COMPLETE WORKING SCRIPT ====================

// ==================== DATA ====================

const features = [
    { icon: "fas fa-hiking", title: "Expert Guided Tours", desc: "Local guides with years of mountain experience" },
    { icon: "fas fa-camera", title: "Photo Perfect Views", desc: "Instagram-worthy spots at every turn" },
    { icon: "fas fa-utensils", title: "Gourmet Camp Dining", desc: "Organic local cuisine under the stars" },
    { icon: "fas fa-tree", title: "Eco-Friendly Travel", desc: "Sustainable tourism practices throughout" }
];

const allAttractions = [
    { name: "Emerald Lake Trail", desc: "Crystal clear alpine lake surrounded by wildflowers.", img: "https://images.pexels.com/photos/2082103/pexels-photo-2082103.jpeg?auto=compress&cs=tinysrgb&w=600", tag: "hiking", price: 49 },
    { name: "Sunset Ridge Lookout", desc: "Panoramic views of three valleys.", img: "https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&w=600", tag: "viewpoint", price: 39 },
    { name: "Ancient Pines Forest", desc: "Walk among 500-year-old trees.", img: "https://images.pexels.com/photos/735860/pexels-photo-735860.jpeg?auto=compress&cs=tinysrgb&w=600", tag: "nature", price: 59 },
    { name: "Whispering Falls", desc: "A majestic 80-foot waterfall.", img: "https://images.pexels.com/photos/1153467/pexels-photo-1153467.jpeg?auto=compress&cs=tinysrgb&w=600", tag: "water", price: 79 },
    { name: "Eagle's Nest Peak", desc: "Challenge yourself with steep climb.", img: "https://images.pexels.com/photos/2577274/pexels-photo-2577274.jpeg?auto=compress&cs=tinysrgb&w=600", tag: "hiking", price: 99 },
    { name: "Starlight Meadow", desc: "Perfect for stargazing.", img: "https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?auto=compress&cs=tinysrgb&w=600", tag: "nature", price: 45 }
];

const stats = [
    { number: "15K+", label: "Happy Visitors" },
    { number: "50+", label: "Guided Trails" },
    { number: "12", label: "Scenic Viewpoints" },
    { number: "4.9", label: "Rating (1.2K reviews)" }
];

const quotes = [
    { text: "The sunrise from the summit changed my life. Absolutely magical!", author: "— Elena Rodriguez" },
    { text: "Every trail tells a story. Paradise Peak wrote mine.", author: "— James Wilson" },
    { text: "Best mountain experience I've ever had. Coming back next year!", author: "— Maria Garcia" },
    { text: "The guides are incredibly knowledgeable and friendly!", author: "— Thomas Lee" }
];

// ==================== STORAGE KEYS ====================

const STORAGE_KEYS = {
    USERS: 'paradise_users',
    CURRENT_USER: 'paradise_current_user',
    BOOKINGS: 'paradise_bookings'
};

function initializeStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([
            { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", password: "123456" }
        ]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
        localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([]));
    }
}

function getCurrentUser() {
    const userJson = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return userJson ? JSON.parse(userJson) : null;
}

function setCurrentUser(user) { localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user)); }
function clearCurrentUser() { localStorage.removeItem(STORAGE_KEYS.CURRENT_USER); }

function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        setCurrentUser({ id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email });
        return { success: true, message: "Login successful!" };
    }
    return { success: false, message: "Invalid email or password." };
}

function signupUser(firstName, lastName, email, password, phone) {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));
    if (users.find(u => u.email === email)) {
        return { success: false, message: "Email already registered." };
    }
    const newUser = { id: Date.now(), firstName, lastName, email, password, phone };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    setCurrentUser({ id: newUser.id, firstName, lastName, email });
    return { success: true, message: "Account created successfully!" };
}

function logoutUser() {
    clearCurrentUser();
    window.location.href = "index.html";
}

function addBooking(attractionName, date, guests, price) {
    const bookings = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS));
    const user = getCurrentUser();
    if (!user) return { success: false, message: "Please login to book." };
    
    const newBooking = {
        id: Date.now(),
        userId: user.id,
        attractionName,
        date,
        guests: parseInt(guests),
        price: parseInt(price) * parseInt(guests),
        status: "confirmed",
        bookedAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    return { success: true, message: `Booked ${attractionName} for ${date}!` };
}

function getUserBookings() {
    const user = getCurrentUser();
    if (!user) return [];
    const bookings = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS));
    return bookings.filter(b => b.userId === user.id);
}

// ==================== DARK MODE ====================

let darkMode = localStorage.getItem('darkMode') === 'enabled';

function toggleDarkMode() {
    darkMode = !darkMode;
    if (darkMode) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
    const toggleBtn = document.getElementById('darkModeToggle');
    if (toggleBtn) toggleBtn.innerHTML = darkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// ==================== WEATHER ====================

function getMockWeather() {
    const conditions = ["☀️ Sunny", "⛅ Partly Cloudy", "🌈 Clear Skies"];
    const temps = [12, 14, 16, 18];
    return { temp: temps[Math.floor(Math.random() * temps.length)], condition: conditions[Math.floor(Math.random() * conditions.length)] };
}

function renderWeather() {
    const weather = getMockWeather();
    const weatherDiv = document.getElementById("homeWeatherContent");
    if (weatherDiv) {
        weatherDiv.innerHTML = `<div style="display: flex; align-items: center; gap: 1rem;"><div style="font-size: 2rem;">${weather.condition.split(' ')[0]}</div><div><span style="font-size: 2rem; font-weight: bold;">${weather.temp}°C</span><br>${weather.condition}</div></div>`;
    }
}

// ==================== COUNTDOWN ====================

let countdownInterval = null;
function startCountdown() {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    targetDate.setHours(23, 59, 59, 0);
    
    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;
        if (diff <= 0) return;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (86400000)) / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        if (document.getElementById("days")) document.getElementById("days").innerText = String(days).padStart(2, '0');
        if (document.getElementById("hours")) document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        if (document.getElementById("minutes")) document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        if (document.getElementById("seconds")) document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    }
    updateCountdown();
    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(updateCountdown, 1000);
}

// ==================== ROTATING QUOTES ====================

let quoteInterval = null;
let currentQuoteIndex = 0;
function startRotatingQuotes() {
    const quoteEl = document.getElementById("rotatingQuote");
    const authorEl = document.getElementById("quoteAuthor");
    if (!quoteEl || !authorEl) return;
    function updateQuote() {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        quoteEl.innerText = `"${quotes[currentQuoteIndex].text}"`;
        authorEl.innerText = quotes[currentQuoteIndex].author;
    }
    if (quoteInterval) clearInterval(quoteInterval);
    quoteInterval = setInterval(updateQuote, 8000);
}

// ==================== PAGE RENDERING ====================

function renderFeatures() {
    const grid = document.getElementById("featuresGrid");
    if (grid) grid.innerHTML = features.map(f => `<div class="feature-card"><i class="${f.icon}"></i><h3>${f.title}</h3><p>${f.desc}</p></div>`).join('');
}

function renderStats() {
    const statsSection = document.getElementById("statsSection");
    if (statsSection) statsSection.innerHTML = stats.map(s => `<div class="stat-card"><div class="stat-number">${s.number}</div><div class="stat-label">${s.label}</div></div>`).join('');
}

function renderAllAttractions(filter = "all") {
    const grid = document.getElementById("allAttractionsGrid");
    if (!grid) return;
    const filtered = filter === "all" ? allAttractions : allAttractions.filter(a => a.tag === filter);
    grid.innerHTML = filtered.map(attr => `
        <div class="attraction-card">
            <div class="attraction-img" style="background-image: url('${attr.img}');"></div>
            <div class="attraction-content">
                <h3>${attr.name}</h3>
                <p>${attr.desc}</p>
                <span class="attraction-badge">${attr.tag} $${attr.price}</span>
            </div>
        </div>
    `).join('');
}

function renderDashboard() {
    const user = getCurrentUser();
    if (!user) return;
    const userNameSpan = document.getElementById("userNameDisplay");
    if (userNameSpan) userNameSpan.innerText = user.firstName;
    const bookings = getUserBookings();
    const statsHtml = `
        <div class="dashboard-stat-card"><i class="fas fa-calendar-check"></i><div class="dashboard-stat-number">${bookings.length}</div><p>Bookings</p></div>
        <div class="dashboard-stat-card"><i class="fas fa-dollar-sign"></i><div class="dashboard-stat-number">$${bookings.reduce((sum, b) => sum + b.price, 0)}</div><p>Total Spent</p></div>
    `;
    const statsContainer = document.getElementById("dashboardStats");
    if (statsContainer) statsContainer.innerHTML = statsHtml;
    
    const bookingsHtml = bookings.length === 0 ? 
        '<p style="text-align: center; padding: 2rem;">No bookings yet. Start your adventure!</p>' :
        bookings.map(b => `
            <div class="booking-item">
                <div class="booking-info"><h4>${b.attractionName}</h4><p>${b.date} • ${b.guests} guest(s)</p></div>
                <div><span class="booking-status status-confirmed">${b.status}</span><p style="margin-top: 0.5rem;">$${b.price}</p></div>
            </div>
        `).join('');
    const bookingsContainer = document.getElementById("upcomingBookings");
    if (bookingsContainer) bookingsContainer.innerHTML = bookingsHtml;
}

// ==================== CALENDAR FUNCTIONS ====================

let selectedDate = null;
let bookedDates = [];

function loadBookedDates() {
    const bookings = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS)) || [];
    bookedDates = bookings.map(b => b.date);
}

function renderCalendar() {
    const calendarDiv = document.getElementById('bookingCalendar');
    if (!calendarDiv) return;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    let html = '<div class="booking-calendar">';
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => { html += `<div style="font-weight: bold;">${day}</div>`; });
    for (let i = 0; i < firstDay.getDay(); i++) { html += '<div></div>'; }
    for (let d = 1; d <= lastDay.getDate(); d++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        let classes = 'calendar-day';
        if (bookedDates.includes(dateStr)) classes += ' booked';
        else classes += ' available';
        if (selectedDate === dateStr) classes += ' selected';
        html += `<div class="${classes}" onclick="selectBookingDate('${dateStr}')">${d}</div>`;
    }
    html += '</div>';
    calendarDiv.innerHTML = html;
}

function selectBookingDate(date) {
    selectedDate = date;
    renderCalendar();
    const display = document.getElementById('selectedDateDisplay');
    if (display) display.innerHTML = `📅 Selected: ${date}`;
}

function advancedBooking() {
    const attraction = document.getElementById('quickBookingSelect')?.value;
    const guests = document.getElementById('bookingGuests')?.value;
    const msg = document.getElementById('quickBookMessage');
    if (!attraction || !selectedDate) {
        if (msg) msg.innerHTML = `<span style="color: #c62828;">❌ Please select attraction and date from calendar!</span>`;
        return;
    }
    const found = allAttractions.find(a => a.name === attraction);
    const price = found ? found.price : 49;
    const result = addBooking(attraction, selectedDate, guests, price);
    if (result.success) {
        if (msg) msg.innerHTML = `<span style="color: #2e7d32;">✅ ${result.message}</span>`;
        loadBookedDates();
        renderCalendar();
        renderDashboard();
    } else {
        if (msg) msg.innerHTML = `<span style="color: #c62828;">❌ ${result.message}</span>`;
    }
}

// ==================== FILTERS ====================

function setupFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    if (filterBtns.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                renderAllAttractions(btn.dataset.filter);
            });
        });
    }
}

// ==================== MOBILE MENU ====================

function setupMobileMenu() {
    const toggle = document.getElementById("mobileMenu");
    const navLinks = document.querySelector(".nav-links");
    if (toggle && navLinks) {
        toggle.addEventListener("click", () => navLinks.classList.toggle("active"));
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => navLinks.classList.remove("active"));
        });
    }
}

// ==================== LOGIN FORM ====================

function setupLoginForm() {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;
            const result = loginUser(email, password);
            const msg = document.getElementById("loginMessage");
            if (result.success) {
                if (msg) msg.innerHTML = `<span style="color: #2e7d32;">✅ ${result.message} Redirecting...</span>`;
                setTimeout(() => window.location.href = "dashboard.html", 1500);
            } else {
                if (msg) msg.innerHTML = `<span style="color: #c62828;">❌ ${result.message}</span>`;
            }
        });
    }
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const firstName = document.getElementById("signupFirstName").value;
            const lastName = document.getElementById("signupLastName").value;
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;
            const confirm = document.getElementById("signupConfirmPassword").value;
            const phone = document.getElementById("signupPhone").value;
            const msg = document.getElementById("signupMessage");
            if (password !== confirm) {
                if (msg) msg.innerHTML = `<span style="color: #c62828;">❌ Passwords do not match!</span>`;
                return;
            }
            const result = signupUser(firstName, lastName, email, password, phone);
            if (result.success) {
                if (msg) msg.innerHTML = `<span style="color: #2e7d32;">✅ ${result.message} Redirecting...</span>`;
                setTimeout(() => window.location.href = "dashboard.html", 1500);
            } else {
                if (msg) msg.innerHTML = `<span style="color: #c62828;">❌ ${result.message}</span>`;
            }
        });
    }
}

function setupLogout() {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            logoutUser();
        });
    }
}

function setupContactForm() {
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("fullName");
            const msg = document.getElementById("contactFormMessage");
            if (name && msg) {
                msg.innerHTML = `<span style="color: #2e7d32;">✅ Thank you ${name.value}! We'll get back to you soon.</span>`;
                form.reset();
                setTimeout(() => msg.innerHTML = "", 5000);
            }
        });
    }
}

// ==================== VIDEO GALLERY - SIMPLE WORKING VERSION ====================
// Videos open in YouTube in new tab - ALWAYS WORKS!

function initVideoGallery() {
    const grid = document.getElementById('videoGrid');
    if (!grid) return;
    
    const videos = [
        { title: '🏔️ Mountain Sunrise at Paradise Peak', url: 'https://www.youtube.com/watch?v=6v2L2UGZJAM', dur: '3:45', views: '15.2K', cat: 'scenic', thumb: 'https://img.youtube.com/vi/6v2L2UGZJAM/0.jpg' },
        { title: '🥾 Hiking the Emerald Lake Trail', url: 'https://www.youtube.com/watch?v=Hk5JZ5R_oEE', dur: '8:20', views: '8.7K', cat: 'adventure', thumb: 'https://img.youtube.com/vi/Hk5JZ5R_oEE/0.jpg' },
        { title: '🦌 Wildlife Encounters in Ancient Forest', url: 'https://www.youtube.com/watch?v=hHW1oY26kxQ', dur: '5:30', views: '6.2K', cat: 'wildlife', thumb: 'https://img.youtube.com/vi/hHW1oY26kxQ/0.jpg' },
        { title: '📖 Complete Visitor\'s Guide', url: 'https://www.youtube.com/watch?v=LrPxnI8NkSY', dur: '12:15', views: '22.1K', cat: 'guide', thumb: 'https://img.youtube.com/vi/LrPxnI8NkSY/0.jpg' },
        { title: '💧 Whispering Falls Waterfall', url: 'https://www.youtube.com/watch?v=iUUkIC4x9VY', dur: '4:50', views: '11.3K', cat: 'scenic', thumb: 'https://img.youtube.com/vi/iUUkIC4x9VY/0.jpg' },
        { title: '❄️ Winter Wonderland', url: 'https://www.youtube.com/watch?v=YU4F6H7Y2I4', dur: '6:40', views: '9.8K', cat: 'scenic', thumb: 'https://img.youtube.com/vi/YU4F6H7Y2I4/0.jpg' },
        { title: '⭐ Starlight Meadow Night Photography', url: 'https://www.youtube.com/watch?v=Fgw3UQFyS3k', dur: '7:25', views: '4.5K', cat: 'guide', thumb: 'https://img.youtube.com/vi/Fgw3UQFyS3k/0.jpg' },
        { title: '🏔️ Eagle\'s Nest Peak Challenge', url: 'https://www.youtube.com/watch?v=CTr9hTvPEa4', dur: '10:00', views: '12.4K', cat: 'adventure', thumb: 'https://img.youtube.com/vi/CTr9hTvPEa4/0.jpg' },
        { title: '🦅 Birds of Paradise Peak', url: 'https://www.youtube.com/watch?v=6UXaVfCxXNM', dur: '5:15', views: '3.2K', cat: 'wildlife', thumb: 'https://img.youtube.com/vi/6UXaVfCxXNM/0.jpg' }
    ];
    
    let activeCat = 'all';
    
    function displayVideos() {
        let html = '';
        let filtered = activeCat === 'all' ? videos : videos.filter(v => v.cat === activeCat);
        
        for (let v of filtered) {
            html += `
                <div class="video-card" onclick="window.open('${v.url}', '_blank')" style="cursor: pointer;">
                    <div class="video-thumbnail" style="background-image: url('${v.thumb}'); height: 200px; background-size: cover; background-position: center; position: relative; border-radius: 16px 16px 0 0;">
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 55px; height: 55px; background: rgba(168, 144, 122, 0.9); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-play" style="color: white; font-size: 20px; margin-left: 4px;"></i>
                        </div>
                        <span style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.7); padding: 3px 8px; border-radius: 5px; font-size: 11px; color: white;">${v.dur}</span>
                    </div>
                    <div style="padding: 15px;">
                        <h4 style="margin: 0 0 5px; font-size: 16px; color: #4A3728;">${v.title}</h4>
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #888; margin-top: 8px;">
                            <span><i class="fas fa-eye"></i> ${v.views} views</span>
                            <span style="background: #F5F0E8; padding: 3px 12px; border-radius: 20px; font-size: 11px; color: #A8907A;">${v.cat}</span>
                        </div>
                    </div>
                </div>
            `;
        }
        grid.innerHTML = html;
    }
    
    // Setup category filter buttons
    const filterBtns = document.querySelectorAll('.video-filter-btn');
    for (let btn of filterBtns) {
        btn.addEventListener('click', function() {
            for (let b of filterBtns) b.classList.remove('active');
            this.classList.add('active');
            activeCat = this.getAttribute('data-category');
            displayVideos();
        });
    }
    
    // Setup search
    const searchInput = document.getElementById('videoSearch');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            let term = this.value.toLowerCase();
            let filtered = activeCat === 'all' ? videos : videos.filter(v => v.cat === activeCat);
            if (term) {
                filtered = filtered.filter(v => v.title.toLowerCase().includes(term));
            }
            
            let html = '';
            for (let v of filtered) {
                html += `
                    <div class="video-card" onclick="window.open('${v.url}', '_blank')" style="cursor: pointer;">
                        <div class="video-thumbnail" style="background-image: url('${v.thumb}'); height: 200px; background-size: cover; background-position: center; position: relative; border-radius: 16px 16px 0 0;">
                            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 55px; height: 55px; background: rgba(168, 144, 122, 0.9); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-play" style="color: white; font-size: 20px; margin-left: 4px;"></i>
                            </div>
                            <span style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.7); padding: 3px 8px; border-radius: 5px; font-size: 11px; color: white;">${v.dur}</span>
                        </div>
                        <div style="padding: 15px;">
                            <h4 style="margin: 0 0 5px; font-size: 16px; color: #4A3728;">${v.title}</h4>
                            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #888; margin-top: 8px;">
                                <span><i class="fas fa-eye"></i> ${v.views} views</span>
                                <span style="background: #F5F0E8; padding: 3px 12px; border-radius: 20px; font-size: 11px; color: #A8907A;">${v.cat}</span>
                            </div>
                        </div>
                    </div>
                `;
            }
            grid.innerHTML = html;
        });
    }
    
    displayVideos();
    console.log("Video gallery ready with " + videos.length + " videos");
}

// ==================== INITIALIZATION ====================

document.addEventListener("DOMContentLoaded", () => {
    initializeStorage();
    
    // Home page
    renderFeatures();
    renderStats();
    renderWeather();
    startCountdown();
    startRotatingQuotes();
    
    // Attractions page
    renderAllAttractions();
    
    // Dashboard
    renderDashboard();
    loadBookedDates();
    renderCalendar();
    
    // Video Gallery
    initVideoGallery();
    
    // Setup event handlers
    setupFilters();
    setupMobileMenu();
    setupLoginForm();
    setupLogout();
    setupContactForm();
    
    // Dark mode toggle
    if (darkMode) document.body.classList.add('dark-mode');
    const darkToggle = document.getElementById('darkModeToggle');
    if (darkToggle) darkToggle.addEventListener('click', toggleDarkMode);
    
    // Language selector
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) langSelect.addEventListener('change', (e) => console.log('Language changed to:', e.target.value));
    
    // Make functions global
    window.selectBookingDate = selectBookingDate;
    window.advancedBooking = advancedBooking;
    
    console.log("✅ Paradise Peak website fully loaded!");
});