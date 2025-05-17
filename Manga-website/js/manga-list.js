// ข้อมูลตัวอย่างมังงะ (สามารถดึงจาก API หรือ localStorage แทนได้)
const mangaData = [
    {
        id: 1,
        title: "One Piece",
        cover: "images/one-piece.jpg",
        chapters: 1050,
        lastUpdated: "2023-05-15",
        genres: ["action", "adventure", "comedy"],
        views: 1500000,
        rating: 4.9
    },
    {
        id: 2,
        title: "Solo Leveling",
        cover: "images/solo-leveling.jpg",
        chapters: 179,
        lastUpdated: "2023-05-10",
        genres: ["action", "adventure", "fantasy"],
        views: 980000,
        rating: 4.8
    },
    {
        id: 3,
        title: "Attack on Titan",
        cover: "images/aot.jpg",
        chapters: 139,
        lastUpdated: "2023-04-28",
        genres: ["action", "drama", "fantasy"],
        views: 1200000,
        rating: 4.7
    },
    {
        id: 4,
        title: "Tower of God",
        cover: "images/tog.jpg",
        chapters: 550,
        lastUpdated: "2023-05-12",
        genres: ["action", "adventure", "fantasy"],
        views: 850000,
        rating: 4.6
    },
    {
        id: 5,
        title: "Naruto",
        cover: "images/naruto.jpg",
        chapters: 700,
        lastUpdated: "2023-03-20",
        genres: ["action", "adventure", "comedy"],
        views: 2000000,
        rating: 4.8
    },
    {
        id: 6,
        title: "Demon Slayer",
        cover: "images/demon-slayer.jpg",
        chapters: 205,
        lastUpdated: "2023-05-08",
        genres: ["action", "adventure", "supernatural"],
        views: 1100000,
        rating: 4.7
    },
    {
        id: 7,
        title: "Jujutsu Kaisen",
        cover: "images/jujutsu.jpg",
        chapters: 220,
        lastUpdated: "2023-05-14",
        genres: ["action", "fantasy", "supernatural"],
        views: 950000,
        rating: 4.8
    },
    {
        id: 8,
        title: "My Hero Academia",
        cover: "images/mha.jpg",
        chapters: 380,
        lastUpdated: "2023-05-09",
        genres: ["action", "comedy", "supernatural"],
        views: 880000,
        rating: 4.6
    },
    {
        id: 9,
        title: "The Beginning After The End",
        cover: "images/tbate.jpg",
        chapters: 170,
        lastUpdated: "2023-05-13",
        genres: ["action", "adventure", "fantasy"],
        views: 750000,
        rating: 4.7
    },
    {
        id: 10,
        title: "Tokyo Revengers",
        cover: "images/tokyo-revengers.jpg",
        chapters: 250,
        lastUpdated: "2023-05-07",
        genres: ["action", "drama", "supernatural"],
        views: 680000,
        rating: 4.5
    },
    {
        id: 11,
        title: "Dr. Stone",
        cover: "images/dr-stone.jpg",
        chapters: 230,
        lastUpdated: "2023-05-06",
        genres: ["adventure", "comedy", "sci-fi"],
        views: 720000,
        rating: 4.6
    },
    {
        id: 12,
        title: "Horimiya",
        cover: "images/horimiya.jpg",
        chapters: 120,
        lastUpdated: "2023-04-30",
        genres: ["comedy", "romance", "drama"],
        views: 650000,
        rating: 4.7
    }
];

// ตัวแปรสำหรับการแบ่งหน้า
let currentPage = 1;
const itemsPerPage = 10;

// โหลดรายการมังงะ
function loadAllManga(page = 1, sortBy = 'title', genre = 'all', searchQuery = '') {
    currentPage = page;
    const mangaGrid = document.getElementById('all-manga-grid');
    mangaGrid.innerHTML = '';
    
    // คัดกรองและเรียงลำดับมังงะ
    let filteredManga = [...mangaData];
    
    // ค้นหา
    if (searchQuery) {
        filteredManga = filteredManga.filter(manga => 
            manga.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    // กรองประเภท
    if (genre !== 'all') {
        filteredManga = filteredManga.filter(manga => 
            manga.genres.includes(genre)
        );
    }
    
    // เรียงลำดับ
    switch(sortBy) {
        case 'latest':
            filteredManga.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
            break;
        case 'popular':
            filteredManga.sort((a, b) => b.views - a.views);
            break;
        case 'chapters':
            filteredManga.sort((a, b) => b.chapters - a.chapters);
            break;
        default: // 'title'
            filteredManga.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    // แบ่งหน้า
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedManga = filteredManga.slice(startIndex, startIndex + itemsPerPage);
    
    // แสดงผล
    if (paginatedManga.length === 0) {
        mangaGrid.innerHTML = '<p class="no-results">ไม่พบมังงะที่ค้นหา</p>';
    } else {
        paginatedManga.forEach(manga => {
            mangaGrid.innerHTML += `
                <div class="manga-card" data-id="${manga.id}">
                    <div class="manga-cover">
                        <img src="${manga.cover}" alt="${manga.title}">
                        <div class="manga-badge">${manga.rating} <i class="fas fa-star"></i></div>
                    </div>
                    <div class="manga-info">
                        <h4>${manga.title}</h4>
                        <p>ตอนที่ ${manga.chapters}</p>
                        <div class="manga-genres">
                            ${manga.genres.map(genre => `<span>${genre}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    // สร้างระบบแบ่งหน้า
    setupPagination(filteredManga.length);
}

// ตั้งค่าระบบแบ่งหน้า
function setupPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    // ปุ่มย้อนกลับ
    if (currentPage > 1) {
        pagination.innerHTML += `
            <button onclick="loadAllManga(${currentPage - 1}, getCurrentSort(), getCurrentGenre(), getCurrentSearch())">
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
    }
    
    // ปุ่มหน้า
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <button class="${i === currentPage ? 'active' : ''}" 
                onclick="loadAllManga(${i}, getCurrentSort(), getCurrentGenre(), getCurrentSearch())">
                ${i}
            </button>
        `;
    }
    
    // ปุ่มไปข้างหน้า
    if (currentPage < totalPages) {
        pagination.innerHTML += `
            <button onclick="loadAllManga(${currentPage + 1}, getCurrentSort(), getCurrentGenre(), getCurrentSearch())">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
    }
}

// ฟังก์ชันช่วยเหลือสำหรับการค้นหาและกรอง
function getCurrentSort() {
    return document.getElementById('sort-by').value;
}

function getCurrentGenre() {
    return document.getElementById('genre-filter').value;
}

function getCurrentSearch() {
    return document.getElementById('search-input').value;
}

// ตั้งค่าการค้นหาและกรอง
function setupSearchAndFilters() {
    // การค้นหา
    document.getElementById('search-btn').addEventListener('click', (e) => {
        e.preventDefault();
        loadAllManga(1, getCurrentSort(), getCurrentGenre(), getCurrentSearch());
    });
    
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loadAllManga(1, getCurrentSort(), getCurrentGenre(), getCurrentSearch());
        }
    });
    
    // การกรอง
    document.getElementById('sort-by').addEventListener('change', () => {
        loadAllManga(1, getCurrentSort(), getCurrentGenre(), getCurrentSearch());
    });
    
    document.getElementById('genre-filter').addEventListener('change', () => {
        loadAllManga(1, getCurrentSort(), getCurrentGenre(), getCurrentSearch());
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
    loadAllManga();
    setupSearchAndFilters();
    checkAuthStatus();
    setupLogout();
    setupMangaNavigation();
    setupAdminNavigation();
});
