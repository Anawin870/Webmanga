// ตรวจสอบสิทธิ์การเข้าถึง
function checkAdminAccess() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isAdmin = localStorage.getItem('userRole') === 'admin';
    
    if (!isLoggedIn || !isAdmin) {
        window.location.href = '../index.html';
    }
}

// โหลดสถิติแดชบอร์ด
function loadDashboardStats() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const manga = JSON.parse(localStorage.getItem('manga')) || [];
    
    // นับจำนวนผู้ใช้ (ไม่รวมแอดมิน)
    const regularUsers = users.filter(u => u.role !== 'admin').length;
    document.getElementById('total-users').textContent = regularUsers;
    
    // นับจำนวนมังงะ
    document.getElementById('total-manga').textContent = manga.length;
    
    // นับจำนวนตอนทั้งหมด
    const totalChapters = manga.reduce((sum, m) => sum + (m.chapters || 0), 0);
    document.getElementById('total-chapters').textContent = totalChapters;
    
    // ผู้ใช้ออนไลน์ (สุ่ม)
    document.getElementById('online-users').textContent = Math.floor(Math.random() * 50) + 5;
}

// โหลดกิจกรรมล่าสุด
function loadRecentActivities() {
    const activities = [
        {
            type: 'new-user',
            title: 'ผู้ใช้ใหม่สมัครสมาชิก',
            description: 'ผู้ใช้ "john_doe" ได้สมัครสมาชิกใหม่',
            time: '2 นาทีที่แล้ว'
        },
        {
            type: 'new-chapter',
            title: 'เพิ่มตอนใหม่',
            description: 'เพิ่มตอนที่ 1051 ของ One Piece',
            time: '15 นาทีที่แล้ว'
        },
        {
            type: 'update',
            title: 'อัพเดทมังงะ',
            description: 'อัพเดทข้อมูลของ Solo Leveling',
            time: '1 ชั่วโมงที่แล้ว'
        },
        {
            type: 'login',
            title: 'ผู้ดูแลระบบเข้าสู่ระบบ',
            description: 'คุณเข้าสู่ระบบจาก IP: 192.168.1.1',
            time: '2 ชั่วโมงที่แล้ว'
        }
    ];
    
    const activityList = document.getElementById('activity-list');
    
    activities.forEach(activity => {
        let iconClass;
        switch(activity.type) {
            case 'new-user':
                iconClass = 'fas fa-user-plus';
                break;
            case 'new-chapter':
                iconClass = 'fas fa-book-open';
                break;
            case 'update':
                iconClass = 'fas fa-sync-alt';
                break;
            case 'login':
                iconClass = 'fas fa-sign-in-alt';
                break;
            default:
                iconClass = 'fas fa-bell';
        }
        
        activityList.innerHTML += `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="${iconClass}"></i>
                </div>
                <div class="activity-details">
                    <h4>${activity.title}</h4>
                    <p>${activity.description}</p>
                </div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `;
    });
}

// ออกจากระบบ
function setupAdminLogout() {
    document.getElementById('logout-btn').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        window.location.href = '../index.html';
    });
}

// Initialize Admin Dashboard
document.addEventListener('DOMContentLoaded', () => {
    checkAdminAccess();
    loadDashboardStats();
    loadRecentActivities();
    setupAdminLogout();
});
