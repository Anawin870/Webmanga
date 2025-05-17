// ฟอร์มล็อกอิน
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // ตรวจสอบกับข้อมูลผู้ใช้ใน localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', user.role || 'user');
        
        // ปิด modal และรีเฟรชหน้า
        document.getElementById('login-modal').style.display = 'none';
        window.location.reload();
    } else {
        alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
});

// ฟอร์มสมัครสมาชิก
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    
    // ตรวจสอบรหัสผ่าน
    if (password !== confirmPassword) {
        alert('รหัสผ่านไม่ตรงกัน');
        return;
    }
    
    // ตรวจสอบว่ามีผู้ใช้อยู่แล้วหรือไม่
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(u => u.username === username || u.email === email);
    
    if (userExists) {
        alert('ชื่อผู้ใช้หรืออีเมลนี้มีอยู่แล้ว');
        return;
    }
    
    // เพิ่มผู้ใช้ใหม่
    const newUser = {
        username,
        email,
        password,
        role: 'user',
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // แสดงข้อความสำเร็จและปิด modal
    alert('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ');
    document.getElementById('register-modal').style.display = 'none';
    document.getElementById('login-modal').style.display = 'block';
    
    // เคลียร์ฟอร์ม
    document.getElementById('register-form').reset();
});

// เพิ่มผู้ใช้แอดมินเริ่มต้น (ถ้ายังไม่มี)
function setupDefaultAdmin() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const adminExists = users.some(u => u.role === 'admin');
    
    if (!adminExists) {
        const adminUser = {
            username: 'admin',
            email: 'admin@mangahub.com',
            password: 'admin123',
            role: 'admin',
            createdAt: new Date().toISOString()
        };
        
        users.push(adminUser);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// เรียกใช้เมื่อโหลดหน้า
setupDefaultAdmin();
