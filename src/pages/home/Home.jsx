import React, { useState } from "react";
import "./home.scss";

import { FaFacebookSquare, FaChevronLeft, FaChevronRight, FaInstagramSquare, FaYoutube } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { FiShoppingBag } from "react-icons/fi";
import { banner, slide1, slide2, slide3, Img1, Img2, Img3, Img4, Img5 } from "../../assets";

const mockProducts = [
  { 
    id: 1, 
    name: "Acer Nitro V 15", 
    image: Img1, 
    price: "20.290.000", 
    old_price: "21.990.000", 
    tag: "Mẫu mới" 
  },
  { 
    id: 2, 
    name: "Acer Aspire GO", 
    image: Img2, 
    price: "23.490.000", 
    old_price: "24.990.000", 
    tag: "Mẫu mới" 
  },
  { 
    id: 3, 
    name: "Máy chiếu Wanbo", 
    image: Img3, 
    price: "2.990.000", 
    old_price: "3.990.000", 
    tag: "Giảm 20%" 
  },
  { 
    id: 4, 
    name: "Giá đỡ laptop baseus", 
    image: Img4, 
    price: "390.000", 
    old_price: "490.000", 
    tag: "Khuyến mãi" 
  },
  { 
    id: 5, 
    name: "IPhone 17 Pro", 
    image: Img5, 
    price: "30.990.000", 
    old_price: "32.490.000", 
    tag: "Sale" },
];

const bannerSlides = [
  {
    id: 1,
    title: "THỨ TƯ SALE SẬP SÀN",
    subtitle: "Giảm đến 50%",
    discount: "400K",
    image: slide2
  },
  {
    id: 2,
    title: "IPHONE 17 VÀ IPHONE AIR",
    subtitle: "Được thiết kế cho Apple Intelligence",
    discount: "HỌC VỤ",
    image: slide1
  },
  {
    id: 3,
    title: "QUẢNG BÌNH",
    subtitle: "Rất sản lòng hỗ trợ anh/chị",
    discount: "ĐƠN 700K",
    image: slide3
  }
];

export default function Home() {
  const [bannerIndex, setBannerIndex] = useState(0);

  const handlePrevBanner = () => {
    setBannerIndex((prev) => (
      prev === 0 ? bannerSlides.length - 1 : prev - 1
    ));
  };

  const handleNextBanner = () => {
    setBannerIndex((prev) => (
      prev === bannerSlides.length - 1 ? 0 : prev + 1
    ));
  };

  // TODO: API - Fetch products from backend
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   fetch('/api/products')
  //     .then(res => res.json())
  //     .then(data => setProducts(data))
  // }, []);

  return (
    <div className="home">
      {/* Header */}
      <header className="header">
        <div className="header-top">
          <img src={banner} alt=""/>
        </div>
        <div className="header-main">
          <div className="container">
            <div className="logo">
              <h1>FluxMall</h1>
            </div>
            <div className="search-bar">
              <input type="text" placeholder="Tìm kiếm sản phẩm..." />
              <button>Tìm</button>
            </div>
            <div className="header-right">
              <a href="#cart">
                <FiShoppingBag className="icon"/>
              </a>
            </div>
          </div>
        </div>

        <nav className="nav">
          <div className="container">
            <ul className="nav-menu">
              <li><a href="#">Điện thoại</a></li>
              <li><a href="#">Laptop</a></li>
              <li><a href="#">Phụ kiện</a></li>
              <li><a href="#">Smartwatch</a></li>
              <li><a href="#">Đồng hồ</a></li>
              <li><a href="#">Tablet</a></li>
              <li><a href="#">Máy ảnh</a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Banner Carousel */}
      <section className="banner-carousel">
        <div className="container">
          <div className="carousel-wrapper">
            <button className="carousel-btn prev" onClick={handlePrevBanner}>
              <FaChevronLeft />
            </button>
            
            <div className="carousel-slide">
              <div 
                className="slide-item" 
                style={{   
                  backgroundImage: `url(${bannerSlides[bannerIndex].image})`, 
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="slide-content">
                  <h2>{bannerSlides[bannerIndex].title}</h2>
                  <p>{bannerSlides[bannerIndex].subtitle}</p>
                  <span className="discount-tag">{bannerSlides[bannerIndex].discount}</span>
                </div>
              </div>
            </div>

            <button className="carousel-btn next" onClick={handleNextBanner}>
              <FaChevronRight />
            </button>
          </div>

          <div className="carousel-dots">
            {bannerSlides.map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${idx === bannerIndex ? 'active' : ''}`}
                onClick={() => setBannerIndex(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sale Banner */}
      <section className="sale-banner">
        <div className="container">
          <div className="sale-content">
            <h3>🔥 FLASH SALE - Giảm đến 50%</h3>
            <div className="timer">
              <span>Kết thúc trong: 00:45:30</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="category-filters">
        <div className="container">
          <button className="filter-btn active"> Lọc</button>
          <button className="filter-btn"> Motorola</button>
          <button className="filter-btn"> Samsung</button>
          <button className="filter-btn"> iPhone</button>
          <button className="filter-btn"> Oppo</button>
          <button className="filter-btn"> Xiaomi</button>
          <button className="filter-btn"> Vivo</button>
          <button className="filter-btn"> Realme</button>
          <button className="filter-btn"> iPhone 17 Series</button>
          <button className="filter-btn"> Honor</button>
          <button className="filter-btn"> Tecno</button>
        </div>
      </section>

      {/* Products Section */}
      <section className="products">
        <div className="container">
          <h2>SẢN PHẨM NỔI BẬT</h2>
          <div className="sort-options">
            <button className="sort-btn active">Nổi bật</button>
            <button className="sort-btn">Bán chạy</button>
            <button className="sort-btn">Giảm giá</button>
            <button className="sort-btn">Mới</button>
            <button className="sort-btn">Giá</button>
          </div>

          <div className="grid">
            {mockProducts.map((product) => (
              <div className="card" key={product.id}>
                {product.tag && <span className="tag">{product.tag}</span>}
                <div className="card-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="card-content">
                  <h3>{product.name}</h3>
                  <div className="price-section">
                    <span className="price">{product.price}</span>
                    <span className="old-price">{product.old_price}</span>
                  </div>
                  <div className="card-actions">
                    <button className="btn-add">Thêm vào giỏ</button>
                    <button className="btn-buy">Mua</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="load-more">
            {/* TODO: API - Fetch more products
              <button onClick={() => {
                fetch('/api/products?page=' + page)
                  .then(res => res.json())
                  .then(data => setProducts([...products, ...data]))
              }}>
                Xem thêm
              </button>
            */}
            <button className="btn-load">Xem thêm</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Về FluxMall</h4>
              <ul>
                <li><a href="#about">Giới thiệu</a></li>
                <li><a href="#careers">Tuyển dụng</a></li>
                <li><a href="#news">Tin tức</a></li>
                <li><a href="#press">Nhà báo</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Chính sách & Quyền lợi</h4>
              <ul>
                <li><a href="#policy">Chính sách bảo hành</a></li>
                <li><a href="#delivery">Giao hàng miễn phí</a></li>
                <li><a href="#returns">Chính sách đổi trả</a></li>
                <li><a href="#privacy">Bảo mật thông tin</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Hỗ trợ khách hàng</h4>
              <ul>
                <li><a href="#contact">Liên hệ chúng tôi</a></li>
                <li><a href="#faq">Câu hỏi thường gặp</a></li>
                <li><a href="#tracking">Theo dõi đơn hàng</a></li>
                <li><a href="#warranty">Kiểm tra bảo hành</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Kết nối với chúng tôi</h4>
              <div className="social-links">
                <a href="#"><FaFacebookSquare className="icon"/></a>
                <a href="#"><FaInstagramSquare className="icon"/></a>
                <a href="#"><FaYoutube className="icon"/></a>
                <a href="#"><IoLogoGithub className="icon"/></a>                  
                  
              </div>
              <div className="contact-info">
                <a href="#">📞 Hotline: 1900.1234</a><br />                
                <a href="#">✉️ Email: support@fluxmall.com</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="payment-methods">
              <span>Phương thức thanh toán:</span>
              <span>Thẻ tín dụng</span>
              <span>Chuyển khoản</span>
              <span>Chuyển trả sau</span>
              <span>E-wallet</span>
            </div>
          </div>

          <div className="footer-copyright">
            <p>&copy; 2025 FluxMall. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 