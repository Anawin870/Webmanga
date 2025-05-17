// ข้อมูลตัวอย่างมังงะ
const mangaData = [
    {
        id: 1,
        title: "One Piece",
        cover: "images/one-piece.jpg",
        chapters: 1050,
        lastUpdated: "2023-05-15",
        isFeatured: true
    },
    {
        id: 2,
        title: "Solo Leveling",
        cover: "images/solo-leveling.jpg",
        chapters: 179,
        lastUpdated: "2023-05-10",
        isFeatured: true
    },
    {
        id: 3,
        title: "Attack on Titan",
        cover: "images/aot.jpg",
        chapters: 139,
        lastUpdated: "2023-04-28"
    },
    {
        id: 4,
        title: "Tower of God",
        cover: "images/tog.jpg",
        chapters: 550,
        lastUpdated: "2023-05-12"
    },
    {
        id: 5,
        title: "Naruto",
        cover: "images/naruto.jpg",
        chapters: 700,
        lastUpdated: "2023-03-20"
    },
    {
        id: 6,
        title: "Demon Slayer",
        cover: "images/demon-slayer.jpg",
        chapters: 205,
        lastUpdated: "2023-05-08"
    }
];

// โหลดมังงะแนะนำ
function loadFeaturedManga() {
    const featuredContainer = document.getElementById('featured-manga');
    const featuredManga = mangaData.filter(manga => manga.isFeatured);
    
    featuredManga.forEach(manga => {
        featuredContainer.innerHTML += `
            <div class="manga-card" data-id="${manga.id}">
                <div class="manga-cover">
                    <img src="${manga.cover}" alt="${manga.title}">
                </div>
                <div class="manga-info">
                    <h4>${manga.title}</h4>
                    <p>ตอนที่ ${manga.chapters}</p>
                </div>
            </div>
        `;
    });
}

// โหลดมังงะอัพเดทล่าสุด
function loadRecentManga() {
    const recentContainer = document.getElementById('recent-manga');
    const sortedManga = [...mangaData].sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)).slice(0, 6);
    
    sortedManga.forEach(manga => {
        recentContainer.innerHTML += `
            <div class="manga-card" data-id="${manga.id}">
                <div class="manga-cover">
                    <img src="${manga.cover}" alt="${manga.title}">
                </div>
                <div class="manga-info">
                    <h4>${manga.title}</h4>
                    <p>อัพเดท: ${formatDate(manga.lastUpdated)}</p>
                </div>
            </div>
        `;
    });
}

// จัดรูปแบบวันที่
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('th-TH', options);
}

// เปิด/ปิด Modal
function setupModals() {
    const loginBtn = document.getElementById('login-btn');
    const registerLink = document.getElementById('register-link');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const closeButtons = document.querySelectorAll('.close');
    
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'block';
    });
    
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'block';
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });
}

// ตรวจสอบสถานะการล็อกอิน
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isAdmin = localStorage.getItem('userRole') === 'admin';
    
    if (isLoggedIn) {
        document.getElementById('login-btn').textContent = 'ออกจากระบบ';
        document.getElementById('login-btn').id = 'logout-btn';
        
        if (isAdmin) {
            document.getElementById('admin-btn').style.display = 'block';
        }
    }
}

// ออกจากระบบ
function setupLogout() {
    document.addEventListener('click', (e) => {
        if (e.target.id === 'logout-btn') {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userRole');
            window.location.href = 'index.html';
        }
    });
}

// ไปยังหน้ารายละเอียดมังงะ
function setupMangaNavigation() {
    document.addEventListener('click', (e) => {
        const mangaCard = e.target.closest('.manga-card');
        if (mangaCard) {
            const mangaId = mangaCard.dataset.id;
            window.location.href = `reader.html?id=${mangaId}`;
        }
    });
}

// ไปยังหน้าแอดมิน
function setupAdminNavigation() {
    document.addEventListener('click', (e) => {
        if (e.target.id === 'admin-btn') {
            e.preventDefault();
            window.location.href = 'admin/index.html';
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedManga();
    loadRecentManga();
    setupModals();
    checkAuthStatus();
    setupLogout();
    setupMangaNavigation();
    setupAdminNavigation();
});
