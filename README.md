# 🎉 Trang Web Chúc Mừng Sinh Nhật - Phạm Diễm Quỳnh

Một trang web sinh nhật tương tác, đẹp mắt và đầy màu sắc được thiết kế đặc biệt cho Phạm Diễm Quỳnh.

## ✨ Tính năng

### 🎨 Giao diện
- Thiết kế tươi sáng với màu sắc pastel
- Hiệu ứng confetti rơi liên tục
- Background động với bóng bay và sao lấp lánh
- Responsive design cho cả desktop và mobile
- Dark mode / Light mode

### 🎂 Tính năng chính
- **Đếm ngược sinh nhật**: Hiển thị thời gian còn lại đến sinh nhật
- **Lời chúc ngẫu nhiên**: Bộ sưu tập lời chúc đặc biệt
- **Nến ảo tương tác**: Thổi nến với hiệu ứng âm thanh
- **Album ảnh carousel**: Hiển thị ảnh kỷ niệm
- **Mini-game bóng bay**: Game đơn giản để giải trí

### 🎵 Âm thanh & Hiệu ứng
- Nhạc nền sinh nhật (có thể bật/tắt)
- Hiệu ứng âm thanh khi thổi nến
- Animation mượt mà với Anime.js

### 💌 Tương tác xã hội
- Form gửi lời chúc (lưu trữ local)
- Chia sẻ Facebook và WhatsApp
- Hiển thị lời chúc từ bạn bè

## 🚀 Hướng dẫn cài đặt

### Cách 1: Deploy lên GitHub Pages

1. **Tạo repository mới**:
   ```bash
   git clone https://github.com/nnphuc04/birthday-website.git
   cd birthday-website
   ```

2. **Upload files**:
   - Copy tất cả files vào thư mục repository
   - Commit và push lên GitHub

3. **Kích hoạt GitHub Pages**:
   - Vào Settings → Pages
   - Chọn source: Deploy from a branch
   - Chọn branch: main
   - Click Save

4. **Truy cập website**:
   - URL: `https://nnphuc04.github.io/birthday-website/`

### Cách 2: Deploy lên Netlify

1. **Kéo thả files**:
   - Truy cập [Netlify](https://netlify.com)
   - Kéo thả thư mục chứa files vào Netlify
   - Website sẽ được deploy tự động

2. **Custom domain** (tùy chọn):
   - Vào Site settings → Domain management
   - Add custom domain

## 🎨 Tùy chỉnh

### Thay đổi thông tin cơ bản

**1. Tên người được chúc** (trong `index.html`):
```html
<!-- Tìm dòng này và thay đổi tên -->
<h2 class="name-title animate-name">Phạm Diễm Quỳnh!</h2>

<!-- Và title -->
<title>Chúc Mừng Sinh Nhật [Tên mới]!</title>
```

**2. Ngày sinh nhật** (trong `js/script.js`):
```javascript
// Tìm dòng này trong function startCountdown()
const birthday = new Date(2024, 7, 15, 0, 0, 0); // Tháng 8, ngày 15, 2024
// Thay đổi thành: new Date(năm, tháng-1, ngày, giờ, phút, giây)
```

**3. Lời chúc** (trong `js/script.js`):
```javascript
// Tìm array this.wishes và thêm/sửa lời chúc
this.wishes = [
    "Lời chúc mới 1! 🌟",
    "Lời chúc mới 2! 💖",
    // ... thêm lời chúc mới
];
```

### Thay đổi màu sắc

**Trong `css/style.css`**, tìm section `:root` và thay đổi:
```css
:root {
    --primary-color: #ff69b4;    /* Màu hồng chính */
    --secondary-color: #87ceeb;  /* Màu xanh nhạt */
    --accent-color: #ffd700;     /* Màu vàng */
    /* Thay đổi các màu này theo ý muốn */
}
```

### Thêm ảnh thật

**1. Tạo thư mục `assets/images/`**
**2. Upload ảnh vào thư mục**
**3. Trong `index.html`, tìm carousel và thay thế**:
```html
<!-- Thay thế div.photo-placeholder bằng img tag -->
<div class="carousel-item active">
    <img src="assets/images/photo1.jpg" class="d-block w-100" alt="Ảnh 1">
</div>
```

### Thêm nhạc nền thật

**1. Upload file nhạc** (format: .mp3, .ogg, .wav) vào `assets/audio