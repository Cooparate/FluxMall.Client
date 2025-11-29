# SCSS Documentation - Home Page

## 📋 Tổng Quan

File `home.scss` sử dụng SCSS variables để quản lý color, spacing và animation tập trung. Cấu trúc được chia thành các section rõ ràng với chú thích chi tiết.

---

## 🎨 Global Variables

```scss
$color-primary: #0066cc;      // Màu xanh chính (các button, link, hover)
$color-secondary: #ffc300;    // Màu vàng phụ (logo)
$color-error: #e53935;        // Màu đỏ (giá sản phẩm)
$color-text: #333;            // Màu text chính
$color-text-light: #999;      // Màu text nhạt (secondary text)
$color-bg-light: #f5f5f5;     // Màu nền nhạt
$color-border: #ddd;          // Màu border
$border-radius: 8px;          // Border radius chuẩn
$transition-speed: 0.2s;      // Tốc độ animation
```

### 💡 Cách Sử Dụng:
- **Thay đổi toàn bộ theme color**: Chỉ cần chỉnh sửa các biến ở đầu file
- **Thêm màu mới**: Khai báo variable mới và sử dụng `$color-name` ở mọi nơi

---

## 🏗️ Cấu Trúc File

### 1. **HEADER SECTION** (Thanh header chính)
   - `.header-top` - Thông tin địa chỉ, đăng nhập
   - `.header-main` - Logo, tìm kiếm, giỏ hàng
   - `.logo`, `.search-bar`, `.header-right`

### 2. **NAVIGATION MENU** (Menu chính)
   - `.nav` - Container menu chính
   - `.nav-menu` - Danh sách link menu
   - Hover effect: underline animation
   - Scroll bar style tùy chỉnh

### 3. **BANNER CAROUSEL** (Slide banner quảng cáo)
   - `.carousel-wrapper` - Container slide
   - `.carousel-slide` - Slide content
   - `.carousel-btn` - Button điều hướng
   - `.carousel-dots` - Indicator dots

### 4. **SALE BANNER** (Thông báo FLASH SALE)
   - Gradient background
   - Timer countdown

### 5. **CATEGORY FILTERS** (Lọc danh mục)
   - Horizontal scrollable button list
   - Active state styling

### 6. **PRODUCTS SECTION** (Danh sách sản phẩm)
   - `.sort-options` - Các nút sắp xếp
   - `.grid` - Grid layout cho sản phẩm
   - `.card` - Card sản phẩm
   - `.card-image`, `.card-content`, `.card-actions`

### 7. **FOOTER** (Chân trang)
   - `.footer-content` - Nội dung footer
   - `.footer-bottom` - Phương thức thanh toán
   - `.footer-copyright` - Bản quyền

---

## 🎯 Chi Tiết Các Thành Phần

### Menu Navigation (.nav)

```scss
.nav {
  background-color: #fff;
  border-top: 1px solid $color-border;
  padding: 10px 0;
  position: sticky;    // Menu cố định khi scroll
  top: 0;
  z-index: 100;        // Luôn ở trên cùng
  
  .nav-menu {
    display: flex;
    overflow-x: auto;   // Cuộn ngang trên mobile
    
    li {
      a {
        padding: 12px 18px;
        border-bottom: 3px solid transparent;
        
        &:hover {
          border-bottom-color: $color-primary;  // Underline effect
          color: $color-primary;
          background-color: rgba($color-primary, 0.02);
        }
      }
    }
  }
}
```

**Tính năng:**
- ✅ Sticky position (cố định khi scroll)
- ✅ Cuộn ngang trên mobile
- ✅ Underline animation khi hover
- ✅ Custom scrollbar style

### Product Card (.card)

```scss
.card {
  border: 1px solid $color-border;
  position: relative;
  
  .tag {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #ff6b6b;  // Tag "New", "Sale"
  }
  
  .card-image {
    height: 180px;
    
    img {
      transition: transform $transition-speed;
      
      &:hover {
        transform: scale(1.05);  // Zoom ảnh khi hover
      }
    }
  }
  
  .card-actions {
    display: flex;
    gap: 8px;
    
    .btn-add {
      flex: 1;          // Nút thêm chiếm toàn bộ width
      background-color: $color-primary;
    }
    
    .btn-favorite {
      width: 36px;      // Nút yêu thích vuông nhỏ
      border: 1px solid $color-border;
    }
  }
}
```

**Tính năng:**
- ✅ Tag hiển thị trạng thái (New/Sale)
- ✅ Hover effect trên ảnh
- ✅ Nút thêm giỏ và yêu thích

---

## 📱 Responsive Design

File hỗ trợ 3 breakpoint chính:

### Desktop (> 768px)
```scss
// Full layout mặc định
```

### Tablet (≤ 768px)
```scss
@media (max-width: 768px) {
  .header-main .container {
    flex-direction: column;  // Header chiếc dọc
  }
  
  .products .grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));  // Card nhỏ hơn
  }
  
  .footer-content {
    grid-template-columns: repeat(2, 1fr);  // Footer 2 cột
  }
}
```

### Mobile (≤ 480px)
```scss
@media (max-width: 480px) {
  .header-top {
    display: none;  // Ẩn header top
  }
  
  .products .grid {
    grid-template-columns: repeat(2, 1fr);  // Card 2 cột
  }
  
  .banner-carousel .carousel-btn {
    display: none;  // Ẩn nút carousel
  }
}
```

---

## 🔄 Transitions & Animations

Tất cả animation sử dụng chuẩn:
```scss
$transition-speed: 0.2s;
transition: all $transition-speed;  // Hoặc transition: property $transition-speed;
```

**Ví dụ:**
```scss
a:hover {
  color: $color-primary;
  transition: color $transition-speed;  // 0.2s
}
```

---

## ✏️ Mở Rộng / Chỉnh Sửa

### Thêm màu mới
```scss
$color-success: #4caf50;  // Thêm biến mới

.success-label {
  color: $color-success;  // Sử dụng
}
```

### Thêm component mới
```scss
// ============================================
// NEW COMPONENT
// ============================================
.new-component {
  padding: 20px;
  background-color: $color-bg-light;
  border-radius: $border-radius;
  
  &:hover {
    transition: all $transition-speed;
  }
}
```

### Chỉnh sửa spacing
```scss
// Tất cả padding/margin sẽ thay đổi tự động
// chỉ cần chỉnh sửa grid-template-columns
$gap-size: 15px;
gap: $gap-size;
```

---

## 🎓 Best Practices

1. **Luôn dùng variables** cho color, spacing, transition
2. **Sử dụng nested selectors** để tạo hierarchy rõ ràng
3. **Thêm comment** cho mỗi section chính
4. **Group related properties** (color, border, transition)
5. **Sử dụng `&:hover`, `&:active`** cho pseudo-elements

---

## 📝 Công Thức Tính Responsive

```scss
// Grid responsive
grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
//                                         ↑ Min width
// Tức là: Mỗi card tối thiểu 180px, nếu màn hình nhỏ sẽ xuống dòng

// Flex responsive
display: flex;
flex-wrap: wrap;    // Cho phép wrap sang dòng tiếp theo
gap: 15px;          // Khoảng cách giữa items
```

---

## 🔍 Debug Tips

1. **Kiểm tra breakpoint hiện tại:**
   ```js
   console.log(window.innerWidth);
   ```

2. **Tắt transitions để debug:**
   ```scss
   * {
     transition: none !important;
   }
   ```

3. **Hiển thị grid:**
   ```scss
   .grid {
     outline: 1px solid red;  // Hiển thị outline
   }
   ```

---

## 📚 Tài liệu Liên Quan

- [SCSS Documentation](https://sass-lang.com/documentation)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
