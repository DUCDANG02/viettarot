// Khởi tạo đối tượng toàn cục để chứa các hàm và biến dùng chung
window.viettarotApp = {};

class ViettarotComponents {
    constructor() {
        // Khai báo các hằng số và khởi tạo Supabase client
        this.SUPABASE_URL = 'https://lkznteubcwladqkxyaqo.supabase.co';
        this.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxrem50ZXViY3dsYWRxa3h5YXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjcwODksImV4cCI6MjA2NzgwMzA4OX0.7P4-H_ujbLG2KLEFiVtlGIs8o515OkqNw9MVPDF7sCY';
        this.supabase = window.supabase.createClient(this.SUPABASE_URL, this.SUPABASE_ANON_KEY);
        
        // Gán supabase client vào đối tượng toàn cục để các file khác có thể truy cập
        window.viettarotApp.supabase = this.supabase;

        this.presenceChannel = null;
        this.defaultAvatarIcon = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='50' fill='%23E5E7EB'/%3E%3Cpath d='M66.95 66.78a25.02 25.02 0 00-33.9 0C24.4 71.3 20 79.95 20 90h60c0-10.05-4.4-18.7-13.05-23.22zM50 55c-10.33 0-18.7-8.37-18.7-18.7S39.67 17.6 50 17.6s18.7 8.37 18.7 18.7-8.37 18.7-18.7 18.7z' fill='%23A0AEC0'/%3E%3C/svg%3E";
        this.NOTIFICATION_KEY = 'newDocumentsCount';
    }

    // Phương thức trả về CSS cho tất cả các component
    getComponentCSS() {
        return `
        :root {
            --primary-blue: #4A6CF3;
            --primary-purple: #9B49F2;
            --text-primary: #1A1229;
            --text-secondary: #5A6474;
            --bg-white: #FFFFFF;
            --bg-off-white: #F8F7FA;
            --border-color: #E5E7EB;
            --danger-color: #dc3545;
            --warning-color: #FFC107;
            --success-color: #198754;
            --gradient-primary: linear-gradient(90deg, var(--primary-blue) 0%, var(--primary-purple) 100%);
        }

        /* Header & Navbar */
        header {
            position: sticky;
            top: 0;
            z-index: 1030;
            background-color: var(--bg-white);
            box-shadow: 0 10px 40px -15px rgba(74, 108, 243, 0.25);
            transition: all 0.3s ease-in-out;
        }
        .navbar {
            background-color: transparent !important;
            box-shadow: none !important;
            padding: 10px 0px;
        }
        .navbar-brand {
            font-weight: 700;
            font-size: 1.75rem;
        }
        #header-logo {
            max-height: 40px;
            width: auto;
        }
        .gradient-text {
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            color: var(--primary-blue);
        }
        .navbar-toggler {
            position: relative;
        }
        .navbar-nav .nav-link {
            color: var(--text-secondary);
            font-weight: 500;
            padding: 0.4rem 1.7rem;
            margin: 0 0.6rem;
            border-radius: 20px;
            display: flex;
            align-items: center;
            position: relative;
            z-index: 1;
            overflow: hidden;
            transition: color 0.4s ease-in-out;
            background-color: transparent;
        }
        .navbar-nav .nav-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: var(--gradient-primary);
            z-index: -1;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.4s ease-in-out;
        }
        .navbar-nav .nav-link:hover {
            color: var(--bg-white);
        }
        .navbar-nav .nav-link:hover::before {
            transform: scaleX(1);
        }
        .navbar-nav .nav-link.active {
            color: var(--bg-white);
            font-weight: 600;
        }
        .navbar-nav .nav-link.active::before {
            transform: scaleX(1);
        }
        .navbar-nav .nav-link.active:hover {
            color: var(--bg-white);
        }
        .dropdown-menu {
            border-radius: 0.75rem;
            border: 1px solid var(--border-color);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            padding: 0.5rem 0;
            margin-top: 0.5rem !important;
        }
        .dropdown-item {
            padding: 0.5rem 1.2rem;
            font-weight: 500;
            color: var(--text-secondary);
            display: flex;
            align-items: center;
        }
        .dropdown-item:hover,
        .dropdown-item:focus {
            background-color: var(--bg-off-white);
            color: var(--text-primary);
        }
        .dropdown-item .fa-fw {
            width: 20px;
            text-align: center;
            margin-right: 8px;
        }
        
        /* Auth (Login/Register/User) */
        .btn-gradient {
            background: var(--gradient-primary);
            border: none;
            color: white;
            font-weight: 600;
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            transition: all 0.4s ease;
            box-shadow: 0 4px 15px rgba(120, 73, 242, 0.4);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            background-size: 200% auto;
        }
        .btn-gradient:hover {
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(120, 73, 242, 0.5);
            background-position: right center;
        }
        .fa-user {
            margin-right: 10px;
        }
        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 10px;
            background-color: var(--border-color);
            border: 2px solid var(--primary-purple);
            box-shadow: 0 2px 8px rgba(155, 73, 242, 0.4);
        }

        /* Modals */
        .modal.fade .modal-dialog {
            transform: translate(0, -25px);
            transition: transform 0.4s ease-out;
        }
        .modal.show .modal-dialog {
            transform: translate(0, 0);
        }
        .modal-content {
            border-radius: 1rem;
            border: none;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .modal-header {
            border-bottom: 1px solid var(--border-color);
            padding: 1.5rem;
            position: relative;
        }
        .modal-body {
            padding: 1.5rem;
        }
        .modal-title {
            font-weight: 700;
            color: var(--text-primary);
        }
        .modal-subtitle {
            font-size: 0.95rem;
            color: var(--text-secondary);
        }
        .btn-close {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
        }

        /* Forms in Modals */
        .form-group-icon {
            position: relative;
        }
        .form-group-icon .form-icon {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-secondary);
            pointer-events: none;
        }
        .form-control {
            background-color: var(--bg-off-white);
            border: 1px solid var(--border-color);
            padding: 0.8rem 1rem;
            border-radius: 0.5rem;
            transition: all 0.3s ease;
        }
        .form-control-icon {
            padding-left: 2.8rem !important;
        }
        .form-control:focus {
            background-color: var(--bg-white);
            border-color: var(--primary-blue);
            box-shadow: 0 0 0 3px rgba(74, 108, 243, 0.2);
        }
        .form-text a {
            color: var(--primary-blue);
            text-decoration: none;
        }
        .social-login-divider {
            display: flex;
            align-items: center;
            text-align: center;
            color: var(--text-secondary);
            font-size: 0.9rem;
        }
        .social-login-divider::before,
        .social-login-divider::after {
            content: '';
            flex: 1;
            border-bottom: 1px solid var(--border-color);
        }
        .social-login-divider:not(:empty)::before { margin-right: .5em; }
        .social-login-divider:not(:empty)::after { margin-left: .5em; }
        .btn-social {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--border-color);
            border-radius: 0.5rem;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 0.3rem;
            text-decoration: none;
        }
        .btn-social:hover {
            background-color: var(--bg-off-white);
            border-color: #d1d5db;
        }
        .btn-social img {
            width: 22px;
            height: 22px;
        }
        .btn-social-text {
            font-size: 0.8rem;
            color: var(--text-secondary);
            font-weight: 500;
        }
        .password-toggle-icon {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            color: var(--text-secondary);
        }
        .auth-alert {
            font-size: 0.9rem;
            padding: 0.75rem 1rem;
        }
        #password-match-feedback {
            font-size: 0.875em;
            margin-top: 0.25rem;
            width: 100%;
        }
        .password-match { color: var(--success-color); }
        .password-mismatch { color: var(--danger-color); }

        /* Fullscreen Success Message */
        .fullscreen-overlay {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background-color: rgba(26, 18, 41, 0.7);
            z-index: 1060;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .fullscreen-overlay.show {
            opacity: 1;
            visibility: visible;
        }
        .success-notification {
            background-color: var(--bg-white);
            padding: 2.5rem 3rem;
            border-radius: 1rem;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            transform: scale(0.9);
            transition: transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }
        .fullscreen-overlay.show .success-notification {
            transform: scale(1);
        }
        .success-icon {
            font-size: 4rem;
            color: var(--success-color);
            margin-bottom: 1rem;
            line-height: 1;
        }
        .success-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
        }
        .success-message {
            font-size: 1rem;
            color: var(--text-secondary);
            margin-bottom: 0;
        }

        /* Footer */
        .site-footer {
            background: var(--gradient-primary);
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.95rem;
            padding-top: 4rem;
            background-size: 200% 200%;
            animation: gradient-animation 10s ease infinite;
        }
        @keyframes gradient-animation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .footer-widget h5 {
            color: var(--bg-white);
            font-weight: 600;
            margin-bottom: 1.5rem;
        }
        .footer-logo {
            display: inline-block;
            margin-bottom: 1rem;
        }
        #footer-logo {
            max-height: 50px;
            width: auto;
        }
        .footer-links li {
            margin-bottom: 0.75rem;
        }
        .footer-links a {
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            transition: all 0.3s ease;
        }
        .footer-links a:hover {
            color: var(--bg-white);
            padding-left: 5px;
        }
        .social-icons a {
            display: inline-flex;
            width: 40px; height: 40px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.1);
            color: var(--bg-white);
            justify-content: center;
            align-items: center;
            text-decoration: none;
            transition: all 0.3s ease;
            margin-right: 0.5rem;
        }
        .social-icons a:hover {
            background-color: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }
        .footer-bottom {
            background-color: rgba(0, 0, 0, 0.1);
            padding: 1.5rem 0;
            margin-top: 3rem;
        }
        .footer-bottom p {
            color: var(--bg-white);
        }

        /* Floating Widgets */
        .messenger-widget-container {
            position: fixed;
            bottom: 25px;
            z-index: 1050;
            display: flex;
            align-items: flex-end;
            gap: 15px;
            transition: gap 0.3s ease;
        }
        .widget-right {
            right: 25px;
            flex-direction: row;
        }
        .widget-left {
            left: 25px;
            flex-direction: row;
        }
        .widget-left .messenger-text-bubble {
             transform-origin: left bottom;
        }
        .widget-left .messenger-close-btn {
            right: auto;
            left: -5px;
        }
        .messenger-widget-container.collapsed .messenger-text-bubble,
        .messenger-widget-container.collapsed .messenger-close-btn {
            transform: scale(0);
            opacity: 0;
            pointer-events: none;
        }
        .messenger-widget-container.collapsed .messenger-text-bubble {
            width: 0;
            padding-left: 0; padding-right: 0;
            margin-left: 0; margin-right: 0;
        }
        .messenger-widget-container.collapsed {
            gap: 0;
        }
        .messenger-widget-container.collapsed .messenger-fab-icon {
            transform: scale(0.7);
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            cursor: pointer;
        }
        .messenger-widget-container.collapsed .messenger-fab-icon:hover {
            transform: scale(0.8);
        }
        .messenger-icon-wrapper {
            position: relative;
            flex-shrink: 0;
        }
        .messenger-fab-icon {
            width: 60px; height: 60px;
            background: var(--gradient-primary);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            text-decoration: none;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
        }
        .messenger-fab-icon:hover {
            color: white;
            transform: scale(1.1);
            box-shadow: 0 8px 25px rgba(120, 73, 242, 0.5);
        }
        .messenger-text-bubble {
            background-color: var(--bg-white);
            padding: 12px 20px;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
            color: var(--text-primary);
            font-weight: 500;
            font-size: 0.9rem;
            max-width: 220px;
            margin-bottom: 5px;
            animation: pop-in 0.5s 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
            transform: scale(0);
            transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease, padding 0.3s ease, margin 0.3s ease;
            white-space: nowrap;
            overflow: hidden;
        }
        .messenger-close-btn {
            position: absolute;
            top: -5px;
            width: 26px; height: 26px;
            background-color: var(--text-primary);
            color: white;
            border: 2px solid white;
            border-radius: 50%;
            font-size: 16px;
            line-height: 22px;
            text-align: center;
            cursor: pointer;
            z-index: 12;
            transition: all 0.3s ease;
            padding: 0;
        }
        .widget-right .messenger-close-btn {
            right: -5px;
        }
        .messenger-close-btn:hover {
            transform: scale(1.15) rotate(180deg);
            background-color: var(--danger-color);
        }
        @keyframes pop-in {
            from { opacity: 0; transform: scale(0.5); }
            to { opacity: 1; transform: scale(1); }
        }

        /* Notification Badge */
        .notification-badge {
            position: absolute;
            min-width: 22px;
            height: 22px;
            background-color: var(--danger-color);
            color: white;
            border-radius: 50%;
            font-size: 12px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid var(--bg-white);
            transform: scale(1);
            animation: pulse-badge 1.5s infinite;
            z-index: 10;
        }
        #userDropdown .notification-badge {
            top: -2px;
            right: 0;
        }
        .navbar-toggler .notification-badge {
            position: absolute;
            top: 4px; right: 4px;
            width: 10px; height: 10px;
            min-width: auto;
            padding: 0;
            font-size: 0;
            border-width: 2px;
        }
        .dropdown-item .notification-badge {
            position: static;
            margin-left: auto;
            transform: scale(0.9);
            animation: none;
            border: none;
            padding: 0 6px;
        }
        @keyframes pulse-badge {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(220, 53, 69, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(220, 53, 69, 0); }
        }

        /* Responsive */
        @media (max-width: 991.98px) {
            .navbar-nav { padding-top: 1rem; }
            .navbar-nav .nav-item { margin-bottom: 0.5rem; }
            .navbar-nav .nav-item:last-child { margin-bottom: 0; }
            .navbar-nav .nav-link {
                margin: 0;
                padding: 0.75rem 1rem;
                justify-content: center;
            }
        }
        @media (max-width: 767.98px) {
            .widget-right { right: 15px; bottom: 15px; gap: 10px; }
            .widget-left { left: 15px; bottom: 15px; gap: 10px; }
            .messenger-fab-icon { width: 55px; height: 55px; font-size: 24px; }
            .messenger-close-btn { width: 24px; height: 24px; font-size: 14px; line-height: 20px; }
        }
        `;
    }
    
    injectCSS() {
        const style = document.createElement('style');
        style.textContent = this.getComponentCSS();
        document.head.appendChild(style);
    }

    // Phương thức trả về HTML của Header
    getHeaderHTML() {
        return `
        <header>
            <nav class="navbar navbar-expand-lg">
                <div class="container">
                    <a class="navbar-brand" href="index.html">
                        <img src="/image/logo.png" alt="VietTarot Logo" id="header-logo">
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="mainNavbar">
                        <ul class="navbar-nav mx-auto">
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="index.html"><i class="fas fa-home me-2"></i> Trang chủ</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="coursesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fas fa-graduation-cap me-2"></i> Khoá học
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="coursesDropdown">
                                    <li><a class="dropdown-item" href="lectures.html"><i class="fas fa-chalkboard-teacher fa-fw"></i> Bài giảng</a></li>
                                    <li><a class="dropdown-item" href="tests.html"><i class="fas fa-file-alt fa-fw"></i> Bài kiểm tra</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="document.html"><i class="fas fa-book me-2"></i> Tài liệu</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="blog.html"><i class="fas fa-scroll me-2"></i> Bài Viết</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="cards.html"><i class="fas fa-layer-group me-2"></i> Ý nghĩa lá bài</a>
                            </li>
                        </ul>
                        <div id="auth-container" class="d-flex justify-content-center mt-3 mt-lg-0"></div>
                    </div>
                </div>
            </nav>
        </header>`;
    }

    // Phương thức trả về HTML của Footer
    getFooterHTML() {
        return `
        <footer class="site-footer">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <div class="footer-widget">
                            <a class="footer-logo" href="#">
                                <img src="/image/logo.png" alt="VietTarot Logo" id="footer-logo">
                            </a>
                            <p class="mt-3">Nền tảng học Tarot và Huyền học trực tuyến hàng đầu Việt Nam. Khai phá tiềm năng, thấu hiểu bản thân và định hướng tương lai.</p>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
                        <div class="footer-widget">
                            <h5>Khám Phá</h5>
                            <ul class="list-unstyled footer-links">
                                <li><a href="index.html">Trang chủ</a></li>
                                <li><a href="test.html">Khoá học</a></li>
                                <li><a href="document.html">Tài liệu</a></li>
                                <li><a href="#">Về chúng tôi</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <div class="footer-widget">
                            <h5>Tài Liệu</h5>
                            <ul class="list-unstyled footer-links">
                                <li><a href="cards.html">Ý nghĩa 78 lá bài Tarot</a></li>
                                <li><a href="#">Các trải bài thông dụng</a></li>
                                <li><a href="#">Kiến thức Chiêm tinh</a></li>
                                <li><a href="#">Kiến thức Thần số học</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="footer-widget">
                            <h5>Kết Nối Với Chúng Tôi</h5>
                            <p>Theo dõi VietTarot trên các nền tảng mạng xã hội để không bỏ lỡ kiến thức hữu ích!</p>
                            <div class="social-icons mt-3">
                                <a href="#" title="Facebook"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" title="Instagram"><i class="fab fa-instagram"></i></a>
                                <a href="#" title="Youtube"><i class="fab fa-youtube"></i></a>
                                <a href="#" title="Tiktok"><i class="fab fa-tiktok"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="container text-center">
                    <p class="mb-0">&copy; 2025 được phát triển bởi hệ thống VietTarot</p>
                </div>
            </div>
        </footer>`;
    }

    // Phương thức trả về HTML của các Modals
    getModalsHTML() {
        return `
        <div id="fullscreen-success-overlay" class="fullscreen-overlay">
            <div class="success-notification">
                <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                <h4 class="success-title">Thành Công!</h4>
                <p class="success-message">Bạn đã tạo tài khoản thành công.</p>
            </div>
        </div>

        <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <div>
                            <h5 class="modal-title" id="loginModalLabel">Đăng nhập</h5>
                            <p class="mb-0 modal-subtitle">Chào mừng bạn trở lại VietTarot!</p>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="login-form">
                            <div id="login-alert"></div>
                            <div class="mb-3 form-group-icon">
                                <i class="fas fa-envelope form-icon"></i>
                                <input type="email" class="form-control form-control-icon" id="loginEmail" placeholder="Email" required>
                            </div>
                            <div class="mb-3 form-group-icon">
                                <i class="fas fa-lock form-icon"></i>
                                <input type="password" class="form-control form-control-icon" id="loginPassword" placeholder="Mật khẩu" required>
                                <i class="fas fa-eye password-toggle-icon" id="toggleLoginPassword"></i>
                            </div>
                            <div class="mb-4 text-end">
                                <div id="passwordHelp" class="form-text"><a href="#">Quên mật khẩu?</a></div>
                            </div>
                            <button type="submit" id="login-submit-btn" class="btn btn-gradient w-100 py-2">Đăng nhập</button>
                        </form>
                        <div class="social-login-divider my-4">Hoặc tiếp tục với</div>
                        <div class="row g-2">
                            <div class="col-6">
                                <button class="btn btn-social" title="Đăng nhập với Google">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google logo">
                                    <span class="btn-social-text">Google</span>
                                </button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-social" title="Đăng nhập với Facebook" id="facebook-login-btn">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Facebook logo">
                                    <span class="btn-social-text">Facebook</span>
                                </button>
                            </div>
                        </div>
                        <div class="mt-4 text-center">
                            <p class="mb-0 text-secondary">Chưa có tài khoản?
                                <a href="#" class="fw-bold text-decoration-none" data-bs-toggle="modal" data-bs-target="#registerModal" style="color: var(--primary-blue);">Đăng ký ngay</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <div>
                            <h5 class="modal-title" id="registerModalLabel">Tạo tài khoản</h5>
                            <p class="mb-0 modal-subtitle">Bắt đầu hành trình khám phá Tarot của bạn!</p>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="registerForm" novalidate>
                            <div id="register-alert"></div>
                            <div class="mb-3"><div class="form-group-icon"><i class="fas fa-user form-icon"></i><input type="text" class="form-control form-control-icon" id="registerName" placeholder="Họ và tên" required></div></div>
                            <div class="mb-3"><div class="form-group-icon"><i class="fas fa-envelope form-icon"></i><input type="email" class="form-control form-control-icon" id="registerEmail" placeholder="Email" required></div></div>
                            <div class="mb-3"><div class="form-group-icon"><i class="fas fa-phone form-icon"></i><input type="tel" class="form-control form-control-icon" id="registerPhone" placeholder="Số điện thoại" required></div></div>
                            <div class="mb-3 form-group-icon"><i class="fas fa-lock form-icon"></i><input type="password" class="form-control form-control-icon" id="registerPassword" placeholder="Mật khẩu" required><i class="fas fa-eye password-toggle-icon" id="toggleRegisterPassword"></i></div>
                            <div class="mb-4 form-group-icon"><i class="fas fa-check-circle form-icon"></i><input type="password" class="form-control form-control-icon" id="confirmPassword" placeholder="Xác nhận mật khẩu" required><i class="fas fa-eye password-toggle-icon" id="toggleConfirmPassword"></i><div id="password-match-feedback" class="mt-1"></div></div>
                            <button type="submit" id="register-submit-btn" class="btn btn-gradient w-100 py-2" disabled>Tạo tài khoản</button>
                        </form>
                        <div class="mt-4 text-center">
                            <p class="mb-0 text-secondary">Đã có tài khoản?
                                <a href="#" class="fw-bold text-decoration-none" data-bs-toggle="modal" data-bs-target="#loginModal" style="color: var(--primary-blue);">Đăng nhập ngay</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }
    
    // Phương thức trả về HTML của các Widget nổi
    getFloatingWidgetsHTML() {
        return `
        <div class="messenger-widget-container widget-left" id="facebook-widget-container">
             <div class="messenger-icon-wrapper">
                <button class="messenger-close-btn" id="facebook-close-btn" title="Ẩn">&times;</button>
                <a href="https://www.facebook.com/viettarotacademy/" class="messenger-fab-icon" target="_blank" title="Truy cập trang Facebook">
                    <i class="fab fa-facebook-f"></i>
                </a>
            </div>
            <div class="messenger-text-bubble">
                <p class="mb-0">Liên hệ hỗ trợ</p>
            </div>
        </div>
        <div class="messenger-widget-container widget-right" id="community-widget-container">
            <div class="messenger-text-bubble">
                <p class="mb-0">Tham gia nhóm cộng đồng</p>
            </div>
            <div class="messenger-icon-wrapper">
                <button class="messenger-close-btn" id="community-close-btn" title="Ẩn">&times;</button>
                <a href="https://m.me/YOUR_PAGE_ID" class="messenger-fab-icon" target="_blank" title="Nhắn tin cho chúng tôi">
                    <i class="fas fa-users"></i>
                </a>
            </div>
        </div>
        `;
    }

    // =====================================================================
    // ===== BẮT ĐẦU: CÁC HÀM LOGIC CHO COMPONENT (AUTH, PRESENCE, ETC.) =====
    // =====================================================================
    
    async trackAnonymousVisitor() {
        const VISITOR_ID_KEY = 'anonymous_visitor_id';
        let visitorId = localStorage.getItem(VISITOR_ID_KEY);

        if (!visitorId) {
            visitorId = crypto.randomUUID();
            localStorage.setItem(VISITOR_ID_KEY, visitorId);

            const channel = this.supabase.channel('anonymous_visitors');
            channel.subscribe((status) => {
                if (status === 'SUBSCRIBED') {
                    channel.send({
                        type: 'broadcast',
                        event: 'new_visitor',
                        payload: {
                            visitorId: visitorId,
                            visitedAt: new Date().toISOString(),
                            page: window.location.pathname
                        },
                    });
                }
            });
        }
    }

    initializeRealtimePresence(user) {
        if (this.presenceChannel && this.presenceChannel.state === 'joined') return;
        
        const userChannel = this.supabase.channel('online-users', {
            config: { presence: { key: user.id } },
        });

        userChannel.subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
                await userChannel.track({
                    user_id: user.id,
                    full_name: user.user_metadata?.full_name || user.email,
                    avatar_url: user.user_metadata?.avatar_url,
                    role: 'user'
                });
            }
        });
        this.presenceChannel = userChannel;
    }

    async leavePresenceChannel() {
        if (this.presenceChannel) {
            await this.presenceChannel.unsubscribe();
            this.presenceChannel = null;
        }
    }

    getNotificationCount() {
        return parseInt(localStorage.getItem(this.NOTIFICATION_KEY) || '0', 10);
    }
    
    updateAllNotifications() {
        const count = this.getNotificationCount();
        const userDropdown = document.getElementById('userDropdown');
        const profileDropdownItem = document.getElementById('profile-dropdown-item');
        const navbarToggler = document.querySelector('.navbar-toggler');

        if (userDropdown) {
            userDropdown.style.position = 'relative';
            let badge = userDropdown.querySelector('.notification-badge');
            if (count > 0) {
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'notification-badge';
                    userDropdown.appendChild(badge);
                }
                badge.textContent = count;
            } else {
                if (badge) badge.remove();
            }
        }

        if (profileDropdownItem) {
            let badge = profileDropdownItem.querySelector('.notification-badge');
            if (count > 0) {
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'notification-badge';
                    profileDropdownItem.appendChild(badge);
                }
                badge.textContent = `+${count}`;
            } else {
                if (badge) badge.remove();
            }
        }

        if (navbarToggler) {
            let badge = navbarToggler.querySelector('.notification-badge');
            if (count > 0) {
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'notification-badge';
                    navbarToggler.appendChild(badge);
                }
            } else {
                if (badge) badge.remove();
            }
        }
    }

    translateSupabaseError(errorMessage) {
        if (!errorMessage) return "Đã có lỗi xảy ra. Vui lòng thử lại.";
        if (errorMessage.includes("User already registered")) return "Email này đã được đăng ký. Vui lòng sử dụng email khác.";
        if (errorMessage.includes("Password should be at least 6 characters")) return "Mật khẩu phải có ít nhất 6 ký tự.";
        if (errorMessage.includes("Invalid login credentials")) return "Email hoặc mật khẩu không chính xác.";
        if (errorMessage.includes("Unable to validate email address: invalid format")) return "Địa chỉ email không hợp lệ.";
        return `Đã xảy ra lỗi: ${errorMessage}`;
    }

    showAlert(containerId, message, type = 'danger') {
        const alertContainer = document.getElementById(containerId);
        if (alertContainer) {
            alertContainer.innerHTML = `
                <div class="alert alert-${type} alert-dismissible fade show auth-alert" role="alert">
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
        }
    }

    updateUI(user) {
        const authContainer = document.getElementById('auth-container');
        if (!authContainer) return;

        if (user) {
            const fullName = user.user_metadata?.full_name || user.email;
            const avatarUrl = user.user_metadata?.avatar_url || this.defaultAvatarIcon;
            authContainer.innerHTML = `
                <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" 
                       style="background-color: transparent; padding: 0.1rem 0.5rem; margin:0; border-radius: 50px;">
                        <img src="${avatarUrl}" alt="${fullName}" class="user-avatar">
                        <span class="gradient-text fw-bold">${fullName}</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                        <li><a class="dropdown-item" id="profile-dropdown-item" href="infor-user.html"><i class="fas fa-user-circle fa-fw"></i> Hồ sơ của tôi</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" id="logout-button"><i class="fas fa-sign-out-alt fa-fw"></i> Đăng xuất</a></li>
                    </ul>
                </div>
            `;
            document.getElementById('logout-button').addEventListener('click', (e) => this.handleLogout(e));
        } else {
            authContainer.innerHTML = `
                <a href="#" class="btn-gradient" data-bs-toggle="modal" data-bs-target="#loginModal">
                    <i class="fa-solid fa-user me-2"></i>
                    <span>Đăng ký / Đăng nhập</span>
                </a>
            `;
        }
        this.updateAllNotifications();
        this.setActiveNavLink();
    }
    
    setActiveNavLink() {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
        navLinks.forEach(link => {
            // Loại bỏ active khỏi tất cả các link trước
            link.classList.remove('active');
    
            // Nếu link là dropdown-toggle, kiểm tra các item con
            if (link.classList.contains('dropdown-toggle')) {
                const dropdownMenu = link.nextElementSibling;
                const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
                let isChildActive = false;
                dropdownItems.forEach(item => {
                    const itemPage = item.getAttribute('href').split('/').pop();
                    if (itemPage === currentPage) {
                        isChildActive = true;
                    }
                });
                // Nếu có item con nào active thì active luôn cả dropdown-toggle
                if (isChildActive) {
                    link.classList.add('active');
                }
            } else {
                // Xử lý cho các link thông thường
                const linkPage = link.getAttribute('href').split('/').pop();
                if (linkPage === currentPage) {
                    link.classList.add('active');
                }
            }
        });
    }

    async handleRegister(event) {
        event.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;
        const registerButton = document.getElementById('register-submit-btn');
        document.getElementById('register-alert').innerHTML = '';
        registerButton.disabled = true;
        registerButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang xử lý...`;
        
        const { data, error } = await this.supabase.auth.signUp({
            email: email,
            password: password,
            options: { data: { full_name: name, phone: phone } }
        });

        if (error) {
            this.showAlert('register-alert', this.translateSupabaseError(error.message));
            registerButton.disabled = false;
            registerButton.innerHTML = 'Tạo tài khoản';
        } else {
            const registerModalInstance = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
            const successOverlay = document.getElementById('fullscreen-success-overlay');
            if (registerModalInstance) registerModalInstance.hide();
            if (successOverlay) successOverlay.classList.add('show');
            setTimeout(() => {
                if (successOverlay) successOverlay.classList.remove('show');
                document.getElementById('registerForm').reset();
                registerButton.disabled = true;
                registerButton.innerHTML = 'Tạo tài khoản';
            }, 2500);
        }
    }

    async handleLogin(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const loginButton = document.getElementById('login-submit-btn');
        document.getElementById('login-alert').innerHTML = '';
        loginButton.disabled = true;
        loginButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang đăng nhập...`;
        
        setTimeout(async () => {
            const { error } = await this.supabase.auth.signInWithPassword({ email, password });
            if (error) {
                this.showAlert('login-alert', this.translateSupabaseError(error.message));
            } else {
                const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                loginModal.hide();
                document.getElementById('login-form').reset();
            }
            loginButton.disabled = false;
            loginButton.innerHTML = 'Đăng nhập';
        }, 1500);
    }

    async signInWithFacebook() {
        const { error } = await this.supabase.auth.signInWithOAuth({ provider: 'facebook' });
        if (error) {
            console.error('Lỗi khi đăng nhập Facebook:', error);
            this.showAlert('login-alert', 'Không thể đăng nhập bằng Facebook. Vui lòng thử lại.');
        }
    }

    async handleLogout(event) {
        event.preventDefault();
        await this.leavePresenceChannel();
        await this.supabase.auth.signOut();
    }
    
    setupPasswordToggle(toggleId, passwordId) {
        const toggleIcon = document.getElementById(toggleId);
        const passwordInput = document.getElementById(passwordId);
        if (toggleIcon && passwordInput) {
            toggleIcon.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });
        }
    }
    
    setupFloatingWidget(containerId, closeBtnId, storageKey) {
        const widgetContainer = document.getElementById(containerId);
        const closeBtn = document.getElementById(closeBtnId);
        const fabIcon = widgetContainer ? widgetContainer.querySelector('.messenger-fab-icon') : null;
        
        if (widgetContainer && closeBtn && fabIcon) {
            const collapse = () => { 
                widgetContainer.classList.add('collapsed'); 
                sessionStorage.setItem(storageKey, 'true'); 
            };
            const expand = () => { 
                widgetContainer.classList.remove('collapsed'); 
                sessionStorage.removeItem(storageKey); 
            };
            
            if (sessionStorage.getItem(storageKey)) {
                collapse();
            }
            
            closeBtn.addEventListener('click', (e) => { 
                e.stopPropagation(); 
                collapse(); 
            });
            
            fabIcon.addEventListener('click', (e) => { 
                if (widgetContainer.classList.contains('collapsed')) { 
                    e.preventDefault(); 
                    expand(); 
                } 
            });
        }
    }
    
    // Phương thức chính để khởi tạo tất cả các thành phần và logic
    init() {
        // Tiêm CSS vào trang
        this.injectCSS();
        
        // Render HTML vào các placeholder
        document.getElementById('header-placeholder').innerHTML = this.getHeaderHTML();
        document.getElementById('footer-placeholder').innerHTML = this.getFooterHTML();
        document.getElementById('modals-placeholder').innerHTML = this.getModalsHTML();
        
        const floatingWidgetsPlaceholder = document.getElementById('floating-widgets-placeholder');
        if (floatingWidgetsPlaceholder) {
            floatingWidgetsPlaceholder.innerHTML = this.getFloatingWidgetsHTML();
        }
        
        // Theo dõi khách truy cập ẩn danh
        this.trackAnonymousVisitor();

        // Gắn các sự kiện
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('registerForm');
        const facebookLoginBtn = document.getElementById('facebook-login-btn');

        if (registerForm) registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        if (loginForm) loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        if (facebookLoginBtn) facebookLoginBtn.addEventListener('click', () => this.signInWithFacebook());
        
        // Lắng nghe thay đổi trạng thái đăng nhập
        this.supabase.auth.onAuthStateChange((event, session) => {
            this.updateUI(session ? session.user : null);
            if (session?.user) {
                this.initializeRealtimePresence(session.user);
            } else {
                this.leavePresenceChannel();
            }
        });

        // Thiết lập logic cho form đăng ký
        if (registerForm) {
            const inputs = registerForm.querySelectorAll('input');
            const registerSubmitBtn = document.getElementById('register-submit-btn');
            const passwordInput = document.getElementById('registerPassword');
            const confirmPasswordInput = document.getElementById('confirmPassword');
            const feedbackDiv = document.getElementById('password-match-feedback');

            const validateRegisterForm = () => {
                let allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
                const passwordsMatch = passwordInput.value === confirmPasswordInput.value;

                if (confirmPasswordInput.value !== '') {
                    feedbackDiv.textContent = passwordsMatch ? 'Mật khẩu đã khớp!' : 'Mật khẩu không khớp!';
                    feedbackDiv.className = passwordsMatch ? 'password-match' : 'password-mismatch';
                } else {
                    feedbackDiv.textContent = '';
                }
                registerSubmitBtn.disabled = !(allFilled && passwordsMatch);
            };
            inputs.forEach(input => input.addEventListener('input', validateRegisterForm));
        }

        // Thiết lập ẩn/hiện mật khẩu
        this.setupPasswordToggle('toggleLoginPassword', 'loginPassword');
        this.setupPasswordToggle('toggleRegisterPassword', 'registerPassword');
        this.setupPasswordToggle('toggleConfirmPassword', 'confirmPassword');
        
        // Thiết lập các widget nổi
        this.setupFloatingWidget('community-widget-container', 'community-close-btn', 'communityWidgetCollapsed');
        this.setupFloatingWidget('facebook-widget-container', 'facebook-close-btn', 'facebookWidgetCollapsed');

        // Bắn ra một sự kiện tùy chỉnh khi tất cả đã sẵn sàng
        document.dispatchEvent(new CustomEvent('viettarot.initialized'));
    }
}

// Khởi tạo và chạy các components khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    const components = new ViettarotComponents();
    components.init();
});
