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

        this.defaultAvatarIcon = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='50' fill='%23E5E7EB'/%3E%3Cpath d='M66.95 66.78a25.02 25.02 0 00-33.9 0C24.4 71.3 20 79.95 20 90h60c0-10.05-4.4-18.7-13.05-23.22zM50 55c-10.33 0-18.7-8.37-18.7-18.7S39.67 17.6 50 17.6s18.7 8.37 18.7 18.7-8.37 18.7-18.7 18.7z' fill='%23A0AEC0'/%3E%3C/svg%3E";
        this.NOTIFICATION_KEY = 'newDocumentsCount';
        
        // START: Biến cho chức năng theo dõi online
        this.presenceChannel = null;
        this.lastSeenInterval = null;
        // END: Biến cho chức năng theo dõi online
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

        .btn-upgrade {
            background: linear-gradient(90deg, #ffc107, #ff9800);
            color: #212529;
            font-weight: 600;
            padding: 0.6rem 1.2rem;
            border-radius: 50px;
            border: none;
            box-shadow: 0 4px 15px rgba(255, 152, 0, 0.4);
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            white-space: nowrap;
        }
        .btn-upgrade:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 6px 20px rgba(255, 152, 0, 0.5);
            color: #212529;
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
        #auth-container-wrapper {
            display: flex;
            align-items: center;
            gap: 0.75rem;
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
            overflow: hidden; /* Đảm bảo các thành phần con tuân thủ bo góc */
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
        
        /* START: CSS ĐÃ SỬA CHO UPGRADE MODAL (NHỎ GỌN HƠN) */
        #upgradeModal .modal-body {
            background-color: var(--bg-off-white);
        }
        .pricing-card {
            background-color: var(--bg-white);
            border: 1px solid var(--border-color);
            border-radius: 1rem; /* Giảm độ bo tròn */
            padding: 1.5rem; /* Giảm padding */
            text-align: center;
            height: 100%;
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        .pricing-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(74, 108, 243, 0.15);
        }
        .pricing-card.featured {
            border: 2px solid transparent;
            background-image: 
                linear-gradient(white, white), 
                var(--gradient-primary);
            background-origin: border-box;
            background-clip: padding-box, border-box;
            transform: scale(1.02);
            box-shadow: 0 15px 40px rgba(155, 73, 242, 0.2);
        }
        
        /* Huy hiệu mới */
        .plan-badge {
            position: absolute;
            top: 1.25rem;
            right: 1.25rem;
            padding: 0.3rem 0.8rem;
            font-size: 0.8rem;
            font-weight: 600;
            border-radius: 50px;
            z-index: 2;
        }
        .plan-badge.popular {
            background: var(--gradient-primary);
            color: white;
            box-shadow: 0 4px 10px rgba(120, 73, 242, 0.3);
            left: 50%;
            transform: translateX(-50%);
            top: -15px;
        }
        .plan-badge.current {
            background-color: var(--primary-blue);
            color: white;
        }
        
        .current-plan-badge {
            position: absolute;
            top: 1.25rem;
            right: 1.25rem;
            background-color: var(--primary-blue);
            color: white;
            padding: 0.3rem 0.8rem;
            font-size: 0.8rem;
            font-weight: 600;
            border-radius: 50px;
            z-index: 2;
        }
        
        .pricing-card-header {
            margin-top: 1rem;
        }
        .pricing-card-header h3 {
            font-weight: 700;
            font-size: 1.6rem; /* Giảm kích thước tên gói */
            color: var(--text-primary);
            margin-bottom: 0.4rem; /* Giảm margin */
        }
        .pricing-card-header p {
            color: var(--text-secondary);
            min-height: 38px; /* Giảm chiều cao tối thiểu */
            font-size: 0.9rem; /* Giảm kích thước mô tả */
        }
        .pricing-card-price {
            font-size: 2.75rem; /* Giảm kích thước giá */
            font-weight: 700;
            margin: 1.25rem 0; /* Giảm margin */
            color: var(--text-primary);
            line-height: 1;
        }
        .pricing-card-price .price-period {
            font-size: 0.95rem; /* Giảm kích thước */
            font-weight: 500;
            color: var(--text-secondary);
        }
        .pricing-card.featured .pricing-card-price {
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .pricing-card-features {
            list-style: none;
            padding: 0;
            margin: 0 0 1.5rem 0; /* Giảm khoảng cách dưới */
            text-align: left;
            flex-grow: 1;
        }
        .pricing-card-features li {
            margin-bottom: 0.75rem; /* Giảm khoảng cách giữa các tính năng */
            display: flex;
            align-items: flex-start;
            font-size: 0.9rem; /* Giảm kích thước chữ */
        }
        .pricing-card-features li .fa-check-circle {
            color: var(--success-color);
            margin-right: 10px;
            margin-top: 3px; /* Điều chỉnh vị trí icon */
        }
        .pricing-card-features li.disabled {
            color: #adb5bd;
            text-decoration: line-through;
        }
        .pricing-card-features li.disabled .fa-check-circle {
            color: #ced4da;
        }
        .pricing-card .btn {
            margin-top: auto;
            font-weight: 600;
            padding: 0.8rem; /* Giảm padding nút */
            border-radius: 50px;
        }

        /* CSS điều chỉnh riêng cho card "Học viên" để tối ưu không gian */
        .pricing-card[data-role="student"] .pricing-card-price {
            font-size: 1.7rem;
            margin: 1.8rem 0;
            line-height: 1.2;
        }

        /* START: CSS LÀM NỔI BẬT GÓI HỌC VIÊN */
        .pricing-card[data-role="student"] {
            border: 2px solid var(--warning-color);
            box-shadow: 0 8px 25px rgba(255, 193, 7, 0.2);
            background-color: #FFFBF2; /* Màu nền vàng rất nhạt */
            transform: scale(1.02); /* Tăng kích thước nhẹ để nổi bật hơn */
        }
        .pricing-card[data-role="student"]:hover {
            transform: translateY(-5px) scale(1.03); /* Hiệu ứng hover được cải thiện */
            box-shadow: 0 15px 35px rgba(255, 193, 7, 0.3);
        }
        .pricing-card[data-role="student"] .btn {
            background: linear-gradient(90deg, #ffc107, #ff9800);
            color: #212529;
            border: none;
            box-shadow: 0 4px 15px rgba(255, 152, 0, 0.4);
        }
        .pricing-card[data-role="student"] .btn:hover {
            color: #212529;
        }
        /* END: CSS LÀM NỔI BẬT GÓI HỌC VIÊN */
        
        /* END: CSS ĐÃ SỬA CHO UPGRADE MODAL */
        
        /* START: CSS TÙY CHỈNH CHO BỐ CỤC CHI TIẾT KHÓA HỌC VIÊN */
        @media (min-width: 992px) {
            /* Mục tiêu: Làm cho 2 card khóa học (1:1 và Nhóm) trông gọn gàng và cân đối hơn 
               trên màn hình lớn thay vì kéo dài quá rộng.
               - Sử dụng max-width để giới hạn chiều rộng của mỗi cột.
               - justify-content-center trên thẻ cha (.row) sẽ tự động căn giữa chúng.
            */
            #course-details-container > .col-lg-6 {
                max-width: 450px; /* Giảm chiều rộng tối đa của mỗi cột chứa card */
                width: 100%;
            }
        }
        /* END: CSS TÙY CHỈNH CHO BỐ CỤC CHI TIẾT KHÓA HỌC VIÊN */
        
        /* START: CSS CHO PAYMENT QR MODAL (THIẾT KẾ MỚI) */
        #paymentQRModal .modal-dialog {
            max-width: 800px; /* Rộng hơn */
        }
        #paymentQRModal .modal-content {
            background-color: var(--bg-off-white);
        }
        #paymentQRModal .modal-header {
             background-color: var(--bg-white);
        }
        #paymentQRModal .modal-body {
            padding: 2rem;
        }
        .qr-code-wrapper {
            background-color: var(--bg-white);
            border-radius: 1rem;
            padding: 1.5rem;
            box-shadow: 0 8px 25px rgba(0,0,0,0.08);
            height: 100%;
        }
        #qr-code-image {
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: 0.5rem;
            background-color: white;
            max-width: 250px;
            width: 100%;
            height: auto;
        }
        .payment-info-wrapper {
            background-color: var(--bg-white);
            border-radius: 1rem;
            padding: 1.5rem;
            box-shadow: 0 8px 25px rgba(0,0,0,0.08);
            height: 100%;
        }
        .payment-details-list .list-group-item {
            padding: 0.8rem 0;
            font-size: 0.95rem;
            color: var(--text-secondary);
            background-color: transparent;
            border-color: var(--border-color) !important;
        }
        .payment-details-list strong {
            color: var(--text-primary);
            font-size: 1rem;
        }
        .btn-copy {
            background: transparent;
            border: 1px solid var(--border-color);
            border-radius: 5px;
            color: var(--text-secondary);
            cursor: pointer;
            padding: 2px 6px;
            font-size: 0.8rem;
            transition: all 0.2s ease;
        }
        .btn-copy:hover {
            background-color: var(--bg-off-white);
            color: var(--primary-blue);
        }
        .payment-instructions {
            font-size: 0.9rem;
            color: var(--text-secondary);
            padding-left: 0;
        }
        .payment-instructions li {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 0.75rem;
        }
        .payment-instructions .step-icon {
            flex-shrink: 0;
            width: 20px;
            height: 20px;
            background-color: #e9ecef;
            border-radius: 50%;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            font-size: 0.7rem;
            color: var(--text-secondary);
            margin-top: 2px;
        }
        .payment-instructions .step-icon .fa-check {
            color: var(--success-color);
        }

        /* Responsive cho QR Modal */
        @media (max-width: 767.98px) {
            #paymentQRModal .modal-body {
                padding: 1rem;
            }
             .qr-code-wrapper {
                margin-bottom: 1rem;
             }
        }
        /* END: CSS CHO PAYMENT QR MODAL */


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

        /* START: CSS ĐÃ SỬA CHO FACEBOOK WIDGET */
        .footer-widget .fb-page {
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            line-height: 0; /* Giúp loại bỏ khoảng trắng thừa bên dưới iframe */
        }
        .footer-widget .fb-page:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
        }
        /* END: CSS ĐÃ SỬA CHO FACEBOOK WIDGET */

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
            flex-direction: row; /* Icon ở bên phải, text ở bên trái */
        }
        .widget-left {
            left: 25px;
            flex-direction: row-reverse; /* Đảo ngược thứ tự: icon ở bên phải, text ở bên trái */
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
            #auth-container {
                flex-direction: column;
                align-items: center;
                gap: 1rem;
            }
            .pricing-card.featured, .pricing-card[data-role="student"] {
                 transform: scale(1); /* Reset scale on mobile */
            }
             #course-details-container .col-lg-6 {
                flex: 0 0 100%;
                max-width: 100%;
             }
        }
        
        @media (max-width: 767.98px) {
            .widget-right {
                right: 15px;
                bottom: 15px;
                gap: 10px;
            }
            .widget-left {
                left: auto; 
                right: 15px;
                bottom: 80px; 
                flex-direction: row; 
                gap: 10px;
            }
            .widget-left .messenger-text-bubble {
                transform-origin: right bottom;
            }
            .widget-left .messenger-close-btn {
                right: -5px; 
                left: auto;
            }
            .messenger-fab-icon {
                width: 55px;
                height: 55px;
                font-size: 24px;
            }
            .messenger-close-btn {
                width: 24px;
                height: 24px;
                font-size: 14px;
                line-height: 20px;
            }
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
                                <a class="nav-link" href="handbook.html"><i class="fas fa-scroll me-2"></i>Cẩm nang</a>
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

    // Phương thức trả về HTML của Footer (ĐÃ ĐƯỢC CẬP NHẬT)
    getFooterHTML() {
        return `
        <footer class="site-footer">
            <div id="fb-root"></div>
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
                            <div class="fb-page" 
                                data-href="https://www.facebook.com/viettarotacademy/" 
                                data-tabs="" 
                                data-width="300" 
                                data-height="130" 
                                data-small-header="false" 
                                data-adapt-container-width="true" 
                                data-hide-cover="false" 
                                data-show-facepile="true">
                                <blockquote cite="https://www.facebook.com/viettarotacademy/" class="fb-xfbml-parse-ignore">
                                    <a href="https://www.facebook.com/viettarotacademy/">VietTarot</a>
                                </blockquote>
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

    // START: HÀM ĐƯỢC CẬP NHẬT
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
        </div>

        <div class="modal fade" id="upgradeModal" tabindex="-1" aria-labelledby="upgradeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <div class="modal-header text-center d-block">
                         <h5 class="modal-title" id="upgradeModalLabel">Nâng Cấp Tài Khoản</h5>
                         <p class="mb-0 modal-subtitle">Chọn gói phù hợp để tối ưu trải nghiệm học tập của bạn!</p>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row g-4 justify-content-center" id="pricing-plans-container">
                            <div class="col-lg-4 d-flex">
                                <div class="pricing-card" data-role="user">
                                    <div class="pricing-card-header">
                                        <h3>User</h3>
                                        <p>Gói miễn phí dành cho người dùng muốn tìm hiểu cơ bản.</p>
                                    </div>
                                    <div class="pricing-card-price">Miễn phí</div>
                                    <ul class="pricing-card-features">
                                        <li><i class="fas fa-check-circle"></i>Truy cập đầy đủ thông tin chủ đề Tarot.</li>
                                        <li><i class="fas fa-check-circle"></i>Tài liệu miễn phí cơ bản và nâng cao.</li>
                                        <li><i class="fas fa-check-circle"></i>Làm các bài kiểm tra trắc nghiệm miễn phí.</li>
                                        <li class="disabled"><i class="fas fa-check-circle"></i>Truy cập Cẩm nang và các bộ bài khác.</li>
                                        <li class="disabled"><i class="fas fa-check-circle"></i>Bài kiểm tra có người chấm & tự luận.</li>
                                    </ul>
                                    <button class="btn btn-outline-secondary" data-default-text="Gói Hiện Tại">Gói Hiện Tại</button>
                                </div>
                            </div>
                            <div class="col-lg-4 d-flex">
                                <div class="pricing-card" data-role="membership">
                                    <div class="pricing-card-header">
                                        <h3>Membership</h3>
                                        <p>Mở khóa toàn bộ tài liệu, công cụ và cộng đồng hỗ trợ.</p>
                                    </div>
                                    <div class="pricing-card-price">199K<span class="price-period">/tháng</span></div>
                                    <ul class="pricing-card-features">
                                        <li><i class="fas fa-check-circle"></i>Truy cập vào Cẩm nang Tarot.</li>
                                        <li><i class="fas fa-check-circle"></i>Học Tarot qua các ví dụ thực tế.</li>
                                        <li><i class="fas fa-check-circle"></i>Truy cập các bộ bài: Lenormand, Oracle, Rune</li>
                                        <li><i class="fas fa-check-circle"></i>Bài kiểm tra có tự luận & người chấm.</li>
                                        <li><i class="fas fa-check-circle"></i>Truy cập tài liệu do VietTarot phát hành.</li>
                                        <li><i class="fas fa-check-circle"></i>Tham gia nhóm hỗ trợ học tập riêng.</li>
                                        <li><i class="fas fa-check-circle"></i>Tham gia sự kiện Online và Offline.</li>
                                    </ul>
                                    <button class="btn btn-gradient" data-default-text="Nâng cấp ngay">Nâng cấp ngay</button>
                                </div>
                            </div>
                            <div class="col-lg-4 d-flex">
                                <div class="pricing-card" data-role="student">
                                    <div class="pricing-card-header">
                                        <h3>Học Viên</h3>
                                        <p>Đầy đủ quyền lợi và được hỗ trợ chuyên sâu cho học viên.</p>
                                    </div>
                                    <div class="pricing-card-price">Khóa Học<br>Chuyên Sâu</div>
                                    <ul class="pricing-card-features">
                                        <li><i class="fas fa-check-circle"></i>Toàn bộ ưu đãi của gói Membership.</li>
                                        <li><i class="fas fa-check-circle"></i>Xem toàn bộ video bài giảng khóa học.</li>
                                        <li><i class="fas fa-check-circle"></i>Tài liệu & bài test độc quyền cho học viên.</li>
                                        <li><i class="fas fa-check-circle"></i>Hỗ trợ chuyên sâu từ giảng viên.</li>
                                        <li><i class="fas fa-check-circle"></i>Tham gia cộng đồng học viên riêng tư.</li>
                                        <li><i class="fas fa-check-circle"></i>Hỗ trợ Certification & làm việc.</li>
                                    </ul>
                                    <button class="btn btn-outline-primary" id="view-courses-btn" data-default-text="Xem chi tiết">Xem chi tiết</button>
                                </div>
                            </div>
                        </div>
                        <div id="course-details-container" class="row g-4 justify-content-center" style="display: none;">
                            <div class="col-12 text-start mb-0">
                                <button class="btn btn-link px-0" id="back-to-plans-btn" style="text-decoration: none;"><i class="fas fa-arrow-left me-2"></i> Quay lại các gói</button>
                            </div>
                        
                            <div class="col-lg-6 d-flex">
                                <div class="pricing-card" data-role="student-1-1">
                                    <div class="pricing-card-header">
                                        <h3>Lớp học 1:1</h3>
                                        <p>Lộ trình được cá nhân hóa, thời gian linh hoạt, hiệu quả tối đa.</p>
                                    </div>
                                    <div class="pricing-card-price">4.890K</div>
                                    <ul class="pricing-card-features">
                                         <li><i class="fas fa-check-circle"></i>Toàn bộ ưu đãi gói Membership.</li>
                                         <li><i class="fas fa-check-circle"></i>Xem toàn bộ video bài giảng khóa học.</li>
                                         <li><i class="fas fa-check-circle"></i>Lộ trình học cá nhân hóa theo mục tiêu.</li>
                                         <li><i class="fas fa-check-circle"></i>Lịch học siêu linh hoạt 1-1 với giảng viên.</li>
                                         <li><i class="fas fa-check-circle"></i>Giải đáp & Chữa bài tập chuyên sâu.</li>
                                         <li><i class="fas fa-check-circle"></i>Hỗ trợ Certification & làm việc tại VietTarot.</li>
                                    </ul>
                                     <button class="btn btn-primary" data-default-text="Đăng ký ngay">Đăng ký ngay</button>
                                </div>
                            </div>
                        
                            <div class="col-lg-6 d-flex">
                                <div class="pricing-card" data-role="student-group" data-base-price="2190000" data-discount-price="1890000">
                                    <div class="pricing-card-header">
                                        <h3>Lớp học nhóm</h3>
                                        <p>Học tập trong môi trường tương tác, tiết kiệm chi phí.</p>
                                    </div>
                                    <div class="pricing-card-price">2.190K</div>
                                     <ul class="pricing-card-features">
                                         <li><i class="fas fa-check-circle"></i>Toàn bộ ưu đãi gói Membership.</li>
                                         <li><i class="fas fa-check-circle"></i>Xem toàn bộ video bài giảng khóa học.</li>
                                         <li><i class="fas fa-check-circle"></i>Học theo lộ trình chuẩn cho người mới.</li>
                                         <li><i class="fas fa-check-circle"></i>Lịch học cố định, học cùng các học viên khác.</li>
                                         <li><i class="fas fa-check-circle"></i>Tương tác, thực hành trong môi trường nhóm.</li>
                                         <li><i class="fas fa-check-circle"></i>Tham gia cộng đồng học viên riêng tư.</li>
                                    </ul>
                                    <div class="form-check text-start my-3 w-100">
                                        <input class="form-check-input" type="checkbox" id="student-discount-checkbox">
                                        <label class="form-check-label" for="student-discount-checkbox">
                                            Ưu đãi HSSV: chỉ còn 1.890K
                                        </label>
                                    </div>
                                     <button class="btn btn-gradient" data-default-text="Đăng ký ngay">Đăng ký ngay</button>
                                </div>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
        </div>
        
        <div class="modal fade" id="paymentQRModal" tabindex="-1" aria-labelledby="paymentQRModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="paymentQRModalLabel">Thanh toán & Kích hoạt Gói</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row g-md-4">
                            <div class="col-md-5">
                                <div class="qr-code-wrapper d-flex flex-column text-center">
                                    <h6 class="fw-bold">Quét mã để thanh toán</h6>
                                    <div class="mb-3">
                                        <span class="text-secondary">Gói dịch vụ:</span>
                                        <h5 id="qr-plan-name" class="gradient-text mb-0"></h5>
                                    </div>
                                    <div id="qr-container" class="d-flex justify-content-center align-items-center flex-grow-1" style="min-height: 200px;">
                                        <div id="qr-loading-indicator" class="text-center" style="display: none;">
                                            <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>
                                            <p class="mt-2 mb-0 text-secondary small">Đang tạo mã QR...</p>
                                        </div>
                                        <img id="qr-code-image" src="" alt="Mã QR thanh toán VietQR" class="img-fluid" style="display: none;">
                                    </div>
                                    <div class="mt-auto pt-3 d-grid gap-2">
                                        <button type="button" class="btn btn-success" data-bs-dismiss="modal"><i class="fas fa-check-circle me-2"></i>Tôi đã hoàn tất thanh toán</button>
                                        <button type="button" class="btn btn-outline-secondary" data-bs-target="#upgradeModal" data-bs-toggle="modal"><i class="fas fa-arrow-left me-2"></i>Quay lại</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-7">
                                <div class="payment-info-wrapper">
                                    <h5 class="fw-bold mb-3">Thông tin chuyển khoản</h5>
                                    <ul class="list-group list-group-flush payment-details-list mb-3">
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            <span>Số tiền:</span>
                                            <strong id="qr-amount"></strong>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            <span>Ngân hàng:</span>
                                            <strong>Techcombank</strong>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            <span>Chủ tài khoản:</span>
                                            <strong id="qr-account-name"></strong>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            <span>Số tài khoản:</span>
                                            <div class="d-flex align-items-center">
                                                <strong id="qr-account-number" class="me-2"></strong>
                                                <button class="btn-copy" title="Sao chép số tài khoản" data-copy-target="#qr-account-number">
                                                    <i class="far fa-copy"></i>
                                                </button>
                                            </div>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            <span>Nội dung:</span>
                                            <div class="d-flex align-items-center">
                                                <strong id="qr-memo" class="me-2"></strong>
                                                <button class="btn-copy" title="Sao chép nội dung" data-copy-target="#qr-memo">
                                                    <i class="far fa-copy"></i>
                                                </button>
                                            </div>
                                        </li>
                                    </ul>
        
                                    <h6 class="fw-bold mt-4 mb-3"><i class="fas fa-info-circle text-primary me-2"></i>Lưu ý quan trọng</h6>
                                    <ul class="payment-instructions list-unstyled">
                                        <li>
                                            <span class="step-icon"><i class="fas fa-check"></i></span>
                                            <div>Chuyển khoản <strong class="text-danger">ĐÚNG</strong> nội dung và số tiền ở trên.</div>
                                        </li>
                                        <li>
                                            <span class="step-icon"><i class="fas fa-hourglass-half"></i></span>
                                            <div>Hệ thống sẽ tự động kích hoạt tài khoản sau <strong>2-5 phút</strong>.</div>
                                        </li>
                                         <li>
                                            <span class="step-icon"><i class="fas fa-headset"></i></span>
                                            <div>Nếu cần hỗ trợ, vui lòng liên hệ fanpage <a href="https://www.facebook.com/viettarotacademy/" target="_blank">VietTarot</a>.</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    // END: HÀM ĐƯỢC CẬP NHẬT
    
    // Phương thức trả về HTML của các Widget nổi
    getFloatingWidgetsHTML() {
        return `
        <div class="messenger-widget-container widget-left" id="facebook-widget-container">
            <div class="messenger-text-bubble">
                <p class="mb-0">Liên hệ hỗ trợ</p>
            </div>
             <div class="messenger-icon-wrapper">
                <button class="messenger-close-btn" id="facebook-close-btn" title="Ẩn">&times;</button>
                <a href="https://www.facebook.com/viettarotacademy/" class="messenger-fab-icon" target="_blank" title="Truy cập trang Facebook">
                    <i class="fab fa-facebook-f"></i>
                </a>
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
    // ===== BẮT ĐẦU: CÁC HÀM LOGIC CHO COMPONENT (AUTH, ETC.) =========
    // =====================================================================
    
    // START: Các hàm theo dõi trạng thái online
    async initializeRealtimePresence(user) {
        if (this.presenceChannel || !user) return;
        this.presenceChannel = this.supabase.channel('online-users', {
            config: { presence: { key: user.id } },
        });
        this.presenceChannel.subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
                await this.presenceChannel.track({
                    user_id: user.id,
                    full_name: user.user_metadata?.full_name || user.email,
                    avatar_url: user.user_metadata?.avatar_url,
                    online_at: new Date().toISOString(),
                });
                console.log('Đã tham gia kênh theo dõi trạng thái online.');
            }
        });
        const updateLastSeen = async () => {
            const { error } = await this.supabase
                .from('profiles')
                .update({ last_seen: new Date().toISOString() })
                .eq('id', user.id);
            if (error) console.error('Lỗi khi cập nhật last_seen:', error);
        };
        await updateLastSeen();
        this.lastSeenInterval = setInterval(updateLastSeen, 60000);
    }
    
    async leavePresenceChannel() {
        if (this.presenceChannel) {
            await this.supabase.removeChannel(this.presenceChannel);
            this.presenceChannel = null;
            console.log('Đã rời kênh theo dõi trạng thái online.');
        }
        if (this.lastSeenInterval) {
            clearInterval(this.lastSeenInterval);
            this.lastSeenInterval = null;
        }
    }
    // END: Các hàm theo dõi trạng thái online

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
            const fullName = user.user_metadata?.full_name || user.email.split('@')[0];
            const avatarUrl = user.user_metadata?.avatar_url || this.defaultAvatarIcon;
            authContainer.innerHTML = `
                <div id="auth-container-wrapper">
                    <div class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" 
                           style="background-color: transparent; padding: 0.1rem 0.5rem; margin:0; border-radius: 50px;">
                            <img src="${avatarUrl}" alt="${fullName}" class="user-avatar">
                            <span class="gradient-text fw-bold d-none d-lg-inline">${fullName}</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" id="profile-dropdown-item" href="infor-user.html"><i class="fas fa-user-circle fa-fw"></i> Hồ sơ của tôi</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" id="logout-button"><i class="fas fa-sign-out-alt fa-fw"></i> Đăng xuất</a></li>
                        </ul>
                    </div>
                     <a href="#" class="btn-upgrade" data-bs-toggle="modal" data-bs-target="#upgradeModal">
                        <i class="fas fa-crown me-2"></i>
                        <span class="d-none d-md-inline">Nâng cấp</span>
                    </a>
                </div>
            `;
            document.getElementById('logout-button').addEventListener('click', (e) => this.handleLogout(e));
            this.initializeRealtimePresence(user); 
        } else {
            authContainer.innerHTML = `
                <a href="#" class="btn-gradient" data-bs-toggle="modal" data-bs-target="#loginModal">
                    <i class="fa-solid fa-user me-2"></i>
                    <span>Đăng ký / Đăng nhập</span>
                </a>
            `;
            this.leavePresenceChannel();
        }
        this.updateAllNotifications();
        this.setActiveNavLink();
    }
    
    setActiveNavLink() {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
        navLinks.forEach(link => {
            link.classList.remove('active');
    
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
                if (isChildActive) {
                    link.classList.add('active');
                }
            } else {
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
    
    // START: HÀM ĐÃ ĐƯỢC CẬP NHẬT LOGIC
    async setupUpgradeModal() {
        const upgradeModalEl = document.getElementById('upgradeModal');
        if (!upgradeModalEl) return;
    
        upgradeModalEl.addEventListener('show.bs.modal', async () => {
            const { data: { user } } = await this.supabase.auth.getUser();
            let userRole = 'user'; // Mặc định cho khách hoặc người dùng mới
    
            if (user) {
                const { data: profile } = await this.supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', user.id)
                    .single();
                if (profile && profile.role) {
                    userRole = profile.role;
                }
            }
            
            // Dọn dẹp trạng thái cũ của tất cả các card
            document.querySelectorAll('.pricing-card').forEach(card => {
                card.classList.remove('current');
                card.querySelector('.current-plan-badge')?.remove();
                const button = card.querySelector('.btn');
                if (button && button.dataset.defaultText) {
                    button.innerHTML = button.dataset.defaultText;
                    button.disabled = false;
                }
            });
            
            // LOGIC MỚI: Nếu người dùng là 'student', vô hiệu hóa gói 'membership'
            if (userRole === 'student') {
                const membershipCard = document.querySelector(".pricing-card[data-role='membership']");
                if (membershipCard) {
                    const membershipButton = membershipCard.querySelector('.btn');
                    if (membershipButton) {
                        membershipButton.innerHTML = `<i class="fas fa-check me-2"></i> Đã bao gồm`;
                        membershipButton.disabled = true;
                    }
                }
            }
            
            // Tìm và làm nổi bật gói hiện tại của người dùng
            const currentPlanCard = document.querySelector(`.pricing-card[data-role='${userRole}']`);
            if (currentPlanCard) {
                const badge = document.createElement('div');
                badge.className = 'current-plan-badge';
                badge.textContent = 'Hiện tại';
                currentPlanCard.prepend(badge);
    
                const button = currentPlanCard.querySelector('.btn');
                if (button) {
                    button.innerHTML = `<i class="fas fa-check-circle me-2"></i>Đang sử dụng`;
                    button.disabled = true;
                }
            }
        });
    }
    // END: HÀM ĐÃ ĐƯỢC CẬP NHẬT LOGIC

    // START: HÀM MỚI ĐỂ XỬ LÝ CHUYỂN ĐỔI VIEW TRONG UPGRADE MODAL
    setupUpgradeModalViewSwitch() {
        const upgradeModalEl = document.getElementById('upgradeModal');
        if (!upgradeModalEl) return;
    
        const plansContainer = document.getElementById('pricing-plans-container');
        const coursesContainer = document.getElementById('course-details-container');
        const viewCoursesBtn = document.getElementById('view-courses-btn');
        const backToPlansBtn = document.getElementById('back-to-plans-btn');
        const modalTitle = document.getElementById('upgradeModalLabel');
        const modalSubtitle = upgradeModalEl.querySelector('.modal-subtitle');
    
        const originalTitle = 'Nâng Cấp Tài Khoản';
        const originalSubtitle = 'Chọn gói phù hợp để tối ưu trải nghiệm học tập của bạn!';
    
        if (viewCoursesBtn) {
            viewCoursesBtn.addEventListener('click', (e) => {
                e.preventDefault();
                plansContainer.style.display = 'none';
                coursesContainer.style.display = 'flex'; // Sử dụng flex vì nó là một .row
                modalTitle.textContent = 'Chi Tiết Khoá Học Chuyên Sâu';
                modalSubtitle.textContent = 'Chọn hình thức học phù hợp với bạn nhất.';
            });
        }
    
        if (backToPlansBtn) {
            backToPlansBtn.addEventListener('click', (e) => {
                e.preventDefault();
                coursesContainer.style.display = 'none';
                plansContainer.style.display = 'flex'; // Sử dụng flex vì nó là một .row
                modalTitle.textContent = originalTitle;
                modalSubtitle.textContent = originalSubtitle;
            });
        }
        
        const discountCheckbox = document.getElementById('student-discount-checkbox');
        if (discountCheckbox) {
            discountCheckbox.addEventListener('change', (e) => {
                const card = e.target.closest('.pricing-card');
                const priceEl = card.querySelector('.pricing-card-price');
                const basePrice = parseInt(card.dataset.basePrice, 10);
                const discountPrice = parseInt(card.dataset.discountPrice, 10);
                
                if (e.target.checked) {
                    priceEl.textContent = `${(discountPrice / 1000).toLocaleString('vi-VN').replace('.',',')}K`;
                } else {
                    priceEl.textContent = `${(basePrice / 1000).toLocaleString('vi-VN').replace('.',',')}K`;
                }
            });
        }
    
        // Reset view khi modal bị đóng
        upgradeModalEl.addEventListener('hidden.bs.modal', () => {
            coursesContainer.style.display = 'none';
            plansContainer.style.display = 'flex';
            modalTitle.textContent = originalTitle;
            modalSubtitle.textContent = originalSubtitle;
            if(discountCheckbox) discountCheckbox.checked = false; // Bỏ check HSSV
            const groupCard = document.querySelector('[data-role="student-group"]');
            if (groupCard) {
                const basePrice = parseInt(groupCard.dataset.basePrice, 10);
                groupCard.querySelector('.pricing-card-price').textContent = `${(basePrice / 1000).toLocaleString('vi-VN').replace('.',',')}K`;
            }
        });
    }
    // END: HÀM MỚI

    // START: HÀM ĐƯỢC CẬP NHẬT
    async setupPaymentLogic() {
        const upgradeModalEl = document.getElementById('upgradeModal');
        if (!upgradeModalEl) return;

        upgradeModalEl.addEventListener('click', async (event) => {
            const button = event.target.closest('.pricing-card .btn');
            // Bỏ qua nếu không phải nút, hoặc nút bị vô hiệu hóa, hoặc là các nút điều hướng view
            if (!button || button.disabled || button.id === 'view-courses-btn' || button.id === 'back-to-plans-btn') {
                return;
            }

            const { data: { user } } = await this.supabase.auth.getUser();
            if (!user) {
                bootstrap.Modal.getInstance(document.getElementById('upgradeModal'))?.hide();
                new bootstrap.Modal(document.getElementById('loginModal'))?.show();
                return;
            }

            const card = button.closest('.pricing-card');
            const role = card.dataset.role;
            let price = 0;
            let planName = '';

            if (role === 'membership') {
                price = 199000;
                planName = 'Membership';
            } else if (role === 'student-1-1') { // Lớp 1:1
                price = 4890000;
                planName = 'Lop 1:1';
            } else if (role === 'student-group') { // Lớp nhóm
                planName = 'Lop Nhom';
                const discountCheckbox = document.getElementById('student-discount-checkbox');
                if (discountCheckbox && discountCheckbox.checked) {
                    price = parseInt(card.dataset.discountPrice, 10);
                    planName += ' HSSV'; // Thêm ghi chú cho gói giảm giá
                } else {
                    price = parseInt(card.dataset.basePrice, 10);
                }
            } else {
                return; // Không phải nút thanh toán
            }
            
            const qrModalEl = document.getElementById('paymentQRModal');
            const qrLoadingEl = document.getElementById('qr-loading-indicator');
            const qrImageEl = document.getElementById('qr-code-image');

            // Cập nhật thông tin giao dịch tĩnh
            document.getElementById('qr-plan-name').textContent = planName.replace('Lop', 'Lớp').replace('HSSV', '(HSSV)');
            document.getElementById('qr-amount').textContent = `${price.toLocaleString('vi-VN')} VNĐ`;

            qrLoadingEl.style.display = 'block';
            qrImageEl.style.display = 'none';
            
            bootstrap.Modal.getInstance(document.getElementById('upgradeModal'))?.hide();
            const paymentModal = new bootstrap.Modal(qrModalEl);
            paymentModal.show();
            
            const BANK_ID = "970407";
            const ACCOUNT_NO = "1911200200";
            const ACCOUNT_NAME = "NGUYEN DUC DANG";
            
            document.getElementById('qr-account-name').textContent = ACCOUNT_NAME;
            document.getElementById('qr-account-number').textContent = ACCOUNT_NO;

            const userIdShort = user.id.slice(0, 7).toUpperCase(); 
            const paymentMemo = `VT ${planName.toUpperCase().replace(':', '')} ${userIdShort}`;
            document.getElementById('qr-memo').textContent = paymentMemo;
            
            const qrImageUrl = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-compact.png?amount=${price}&addInfo=${encodeURIComponent(paymentMemo)}&accountName=${encodeURIComponent(ACCOUNT_NAME)}`;
            
            const tempImage = new Image();
            tempImage.src = qrImageUrl;

            tempImage.onload = () => {
                qrImageEl.src = qrImageUrl;
                qrLoadingEl.style.display = 'none';
                qrImageEl.style.display = 'block';
            };
            
            tempImage.onerror = () => {
                qrLoadingEl.innerHTML = '<p class="text-danger">Không thể tạo mã QR. Vui lòng thử lại.</p>';
            };
        });
    }
    // END: HÀM ĐƯỢC CẬP NHẬT
    
    // START: HÀM MỚI ĐỂ XỬ LÝ SAO CHÉP
    setupCopyToClipboard() {
        document.body.addEventListener('click', (event) => {
            const copyButton = event.target.closest('[data-copy-target]');
            if (!copyButton) return;

            const targetSelector = copyButton.dataset.copyTarget;
            const textToCopy = document.querySelector(targetSelector)?.textContent;

            if (textToCopy && navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalIcon = copyButton.innerHTML;
                    copyButton.innerHTML = '<i class="fas fa-check text-success"></i>';
                    copyButton.disabled = true;
                    setTimeout(() => {
                        copyButton.innerHTML = originalIcon;
                        copyButton.disabled = false;
                    }, 2000);
                }).catch(err => {
                    console.error('Lỗi sao chép:', err);
                });
            }
        });
    }
    // END: HÀM MỚI ĐỂ XỬ LÝ SAO CHÉP

    // START: HÀM MỚI ĐỂ TẢI FACEBOOK SDK
    loadFacebookSDK() {
        if (document.getElementById('facebook-jssdk')) return;
        const script = document.createElement('script');
        script.id = 'facebook-jssdk';
        script.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v18.0';
        script.crossOrigin = 'anonymous';
        script.nonce = '5Xf2Yh1z'; // Nonce có thể cần thiết nếu bạn có Chính sách Bảo mật Nội dung (CSP)
        document.head.appendChild(script);
    }
    // END: HÀM MỚI

    // Phương thức chính để khởi tạo tất cả các thành phần và logic
    init() {
        this.injectCSS();
        
        document.getElementById('header-placeholder').innerHTML = this.getHeaderHTML();
        document.getElementById('footer-placeholder').innerHTML = this.getFooterHTML();
        document.getElementById('modals-placeholder').innerHTML = this.getModalsHTML();
        
        const floatingWidgetsPlaceholder = document.getElementById('floating-widgets-placeholder');
        if (floatingWidgetsPlaceholder) {
            floatingWidgetsPlaceholder.innerHTML = this.getFloatingWidgetsHTML();
        }
        
        this.loadFacebookSDK(); // Tải SDK của Facebook để hiển thị widget

        document.querySelectorAll('.pricing-card .btn').forEach(btn => {
            btn.dataset.originalClass = btn.className;
        });

        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('registerForm');
        const facebookLoginBtn = document.getElementById('facebook-login-btn');

        if (registerForm) registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        if (loginForm) loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        if (facebookLoginBtn) facebookLoginBtn.addEventListener('click', () => this.signInWithFacebook());
        
        this.supabase.auth.onAuthStateChange((event, session) => {
            const user = session ? session.user : null;
            this.updateUI(user);
        });

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

        this.setupPasswordToggle('toggleLoginPassword', 'loginPassword');
        this.setupPasswordToggle('toggleRegisterPassword', 'registerPassword');
        this.setupPasswordToggle('toggleConfirmPassword', 'confirmPassword');
        
        this.setupFloatingWidget('community-widget-container', 'community-close-btn', 'communityWidgetCollapsed');
        this.setupFloatingWidget('facebook-widget-container', 'facebook-close-btn', 'facebookWidgetCollapsed');

        this.setupUpgradeModal();
        this.setupUpgradeModalViewSwitch(); // Gọi hàm xử lý chuyển đổi view mới
        this.setupPaymentLogic(); 
        this.setupCopyToClipboard();

        document.dispatchEvent(new CustomEvent('viettarot.initialized'));
    }
}

// Khởi tạo và chạy các components khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    const components = new ViettarotComponents();
    components.init();
});
