# FluxMall.Client

🛍️ **FluxMall.Client** - Ứng dụng Thương mại Điện tử Hiện đại

Ứng dụng frontend thương mại điện tử hiện đại, được xây dựng bằng React + Vite, với giao diện đẹp mắt, chức năng giỏ hàng và quản lý sản phẩm toàn diện.

## 📋 Mục Lục

- [Tính Năng](#tính-năng)
- [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [Bắt Đầu](#bắt-đầu)
- [Các Script Có Sẵn](#các-script-có-sẵn)
- [Trang & Routes](#trang--routes)
- [Components](#components)
- [Quản Lý State](#quản-lý-state)
- [Tối Ưu Hiệu Suất](#tối-ưu-hiệu-suất)
- [Giấy phép bản quyền](#bản-quyền)

## ✨ Tính Năng

- 🏠 **Trang chủ** với sản phẩm nổi bật và danh mục
- 🔐 **Xác thực người dùng** (Đăng nhập/Đăng ký)
- 🛒 **Giỏ hàng** với lưu trữ local storage
- 📱 **Thiết kế Responsive** - hoạt động trên mọi thiết bị
- 🎨 **UI/UX hiện đại** với hiệu ứng mượt mà
- 🔍 **Lọc sản phẩm** theo danh mục
- 📦 **Chi tiết sản phẩm** với nhiều tùy chọn (màu sắc, kích thước)
- 🎯 **Lazy Loading** để tối ưu hiệu suất
- 💳 **Quy trình thanh toán** với hỗ trợ voucher
- 🎁 **Trang khuyến mãi** (Giảm giá, Ưu đãi sinh viên)
- 📞 **Trang liên hệ & hỗ trợ**
- 🔧 **Thông tin bảo hành**
- 🎧 **Mục phụ kiện**

## 🛠 Công Nghệ Sử Dụng

### Công Nghệ Chính
- **React 19.2.0** - Thư viện UI
- **React Router DOM 7.9.6** - Định tuyến
- **Vite 7.2.4** - Công cụ Build & Dev Server
- **Sass** - CSS Preprocessor

### UI & Icons
- **React Icons 5.5.0** - Thư viện icon

### Công Cụ Phát Triển
- **ESLint** - Kiểm tra code
- **Sass Embedded 1.93.3** - Xử lý CSS

## 📁 Cấu Trúc Dự Án

```
FluxMall.Client/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and data
│   │   ├── data/
│   │   │   └── data.json  # Product data
│   │   └── images/        # Image assets
│   ├── components/        # Reusable components
│   │   ├── auth/          # Authentication modals
│   │   │   ├── LoginAlertModal.jsx
│   │   │   └── LoginAlertModal.scss
│   │   ├── cart/          # Cart components
│   │   │   ├── AddToCartModal.jsx
│   │   │   └── AddToCartModal.scss
│   │   ├── icons/         # Icon components
│   │   │   └── index.js
│   │   └── product/       # Product components
│   │       ├── ProductCard.jsx
│   │       ├── ProductDetail.jsx
│   │       └── ProductOptionsModal.jsx
│   ├── contexts/          # React Context providers
│   │   └── CartContext.jsx
│   ├── layouts/           # Layout components
│   │   ├── LayoutHome.jsx
│   │   └── LayoutIntro.jsx
│   ├── pages/             # Page components
│   │   ├── accessories/   # Accessories pages
│   │   ├── auth/          # Login/Register
│   │   ├── bestseller/    # Bestseller & New Arrivals
│   │   ├── cart/          # Shopping cart
│   │   ├── category/      # Category listing
│   │   ├── contact/       # Contact page
│   │   ├── home/          # Homepage
│   │   ├── intro/         # Landing page
│   │   ├── promotion/     # Sales & Student discounts
│   │   └── warranty/      # Warranty information
│   ├── App.jsx            # Main App component
│   ├── App.scss           # Global styles
│   ├── main.jsx           # Entry point
│   └── index.scss         # Base styles
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🚀 Bắt Đầu

### Yêu Cầu

- Node.js (phiên bản 16 trở lên)
- npm hoặc yarn package manager

### Cài Đặt

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd FluxMall.Client
   ```

2. **Cài đặt dependencies**
   ```bash
   npm install
   # hoặc
   yarn install
   ```

3. **Khởi động development server**
   ```bash
   npm run dev
   # hoặc
   yarn dev
   ```

4. **Mở trình duyệt**
   
   Truy cập `http://localhost:5173` (hoặc cổng hiển thị trong terminal)

## 📜 Các Script Có Sẵn

```bash
npm run dev        # Khởi động development server
npm run build      # Build cho production
npm run lint       # Chạy ESLint
npm run preview    # Xem trước bản build production
```

## 🗺 Trang & Routes

| Route                | Component     | Mô Tả              |
|----------------------|---------------|--------------------|
| `/`                  | Intro         | Trang giới thiệu   |
| `/home`              | Home          | Trang chủ          |
| `/login`             | Login         | Đăng nhập          |
| `/register`          | Register      | Đăng ký tài khoản  |  
| `/cart`              | Cart          | Giỏ hàng           |
| `/category/:type`    | Category      | Danh mục sản phẩm  |
| `/product/:id`       | ProductDetail | Chi tiết sản phẩm  |
| `/bestseller`        | Bestseller    | Sản phẩm bán chạy  |
| `/newarrivals`       | NewArrivals   | Hàng mới về        |
| `/sale`              | Sale          | Khuyến mãi         |
| `/student`           | Student       | Ưu đãi sinh viên   |
| `/warranty`          | Warranty      | Thông tin bảo hành |
| `/contact`           | Contact       | Liên hệ            |
| `/accessories/:type` | Accessories   | Phụ kiện theo loại |

## 🧩 Components

### Authentication Components
- `LoginAlertModal` - Modal thông báo đăng nhập

### Cart Components
- `AddToCartModal` - Modal thêm sản phẩm vào giỏ hàng

### Product Components
- `ProductCard` - Thẻ hiển thị sản phẩm
- `ProductDetail` - Chi tiết sản phẩm
- `ProductOptionsModal` - Modal chọn tùy chọn sản phẩm (màu sắc, kích thước)

### Icons
- Tập trung exports icon để sử dụng nhất quán

## 🔄 Quản Lý State

### CartContext

Ứng dụng sử dụng React Context API để quản lý state giỏ hàng toàn cục:

**Tính năng:**
- Thêm/Xóa sản phẩm khỏi giỏ hàng
- Cập nhật số lượng sản phẩm
- Chọn/Bỏ chọn sản phẩm
- Áp dụng voucher
- Lưu trữ bền vững qua localStorage (key: `fluxmall_cart`)

**Cách sử dụng:**
```jsx
import { useCart } from './contexts/CartContext';

function MyComponent() {
  const { cartItems, addToCart, removeFromCart } = useCart();
  // Sử dụng các phương thức giỏ hàng...
}
```

## ⚡ Tối Ưu Hiệu Suất

1. **Lazy Loading** - Tất cả trang và layouts được lazy-load để tải nhanh hơn
2. **Code Splitting** - Tách riêng các chunks:
   - Thư viện React vendor
   - Thư viện icons
3. **Pre-warming** - Các trang quan trọng được pre-transform để khởi động nhanh hơn
4. **Quản lý kích thước Chunk** - Tối ưu kích thước bundle với manual chunking

### Tiêu Chuẩn Code
- Tuân thủ các quy tắc ESLint
- Sử dụng tên component và biến có ý nghĩa
- Viết code sạch, dễ đọc
- Thêm comments cho logic phức tạp
- Giữ components nhỏ và tập trung

## Giấy phép bản quyền
MIT License

Copyright (c) 2026 FluxMall

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

--------

**Được xây dựng với ❤️ bởi FluxMall Team**

Nếu có câu hỏi hoặc cần hỗ trợ, vui lòng mở issue hoặc liên hệ qua trang liên hệ.
