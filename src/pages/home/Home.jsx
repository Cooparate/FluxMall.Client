import { useState, useEffect } from "react";

import "./home.scss";

import { slide1, slide2, slide3, Img1, Img2, Img3, Img4, Img5 } from "../../assets";
import { FaFacebookSquare, FaChevronLeft, FaChevronRight, FaInstagramSquare, FaYoutube } from "react-icons/fa";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoLogoGithub } from "react-icons/io";
import { FiShoppingBag } from "react-icons/fi";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prevIndex) => 
        prevIndex === bannerSlides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 5000ms = 5 giây

    // Cleanup khi component unmount
    return () => clearInterval(interval);
  }, [bannerSlides.length]);

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

      {/* Banner Carousel */}
      <section className="banner-carousel">
        
        {/* <div className="sidebar">
          <div className="menu-header">
            <h2>Danh mục sản phẩm</h2>
          </div>

          <ul className="menu-list">
            <li className="menu-item">
              <a href="#" className="menu-link">
                <span className="menu-text">Điện thoại thông minh</span>
                <span className="menu-arrow">›</span>
              </a>
            </li>


            <li className="menu-item">
              <a href="#" className="menu-link">
                <span className="menu-text">Laptop</span>
                <span className="menu-arrow">›</span>
              </a>
            </li>

            <li className="menu-item">
              <a href="#" className="menu-link">
                <span className="menu-text">Bàn phím cơ</span>
                <span className="menu-arrow">›</span>
              </a>
            </li>

            <li className="menu-item">
              <a href="#" className="menu-link">
                <span className="menu-text">Chuột không dây</span>
                <span className="menu-arrow">›</span>
              </a>
            </li>

            <li className="menu-item">
              <a href="#" className="menu-link">
                <span className="menu-text">Máy chiếu</span>
              </a>
            </li>
          </ul>
        </div> */}


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
                }}
              >
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


        <div className="marquee-container">
          <marquee direction="up" scrollamount="3" behavior="scroll" loop="infinite">
            <div className="marquee-item">
              <img src="src/assets/images/acer-aspire-go-ag15-31p.webp" alt="Image 1"/>
              <img src="src/assets/images/acer-nitro-v-15-anv15.webp" alt="" />
              <img src="src/assets/images/laptop_acernitro5_anv15_51_57b2.webp" alt="" />
              <img src="src/assets/images/laptop_lenovo_loq_15arp983jc00m3vn.webp" alt="" />
              <img src="src/assets/images/laptop_lenovo_ideapad_slim_3_14irh10_83k008vn.webp" alt="" />
              <img src="src/assets/images/acer-aspire-go-ag15-31p.webp" alt="Image 1"/>
              <img src="src/assets/images/acer-nitro-v-15-anv15.webp" alt="" />
              <img src="src/assets/images/laptop_acernitro5_anv15_51_57b2.webp" alt="" />
              <img src="src/assets/images/laptop_lenovo_loq_15arp983jc00m3vn.webp" alt="" />
              <img src="src/assets/images/laptop_lenovo_ideapad_slim_3_14irh10_83k008vn.webp" alt="" />
            </div>
          </marquee>
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
      {/* <section className="category-filters">
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
      </section> */}

      {/* Products Section */}
      <section className="products">
        <div className="container">
          <h2>SẢN PHẨM NỔI BẬT</h2>
          {/* <div className="sort-options">
            <button className="sort-btn active">Nổi bật</button>
            <button className="sort-btn">Bán chạy</button>
            <button className="sort-btn">Giảm giá</button>
            <button className="sort-btn">Mới</button>
            <button className="sort-btn">Giá</button>
          </div> */}

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
    </div>
  );
} 

















/*  <script>
    function toggleSubmenu(event, element) {
      event.preventDefault();
      const menuItem = element.closest('.menu-item');
      const isOpen = menuItem.classList.contains('open');
      
      // Close all other submenus
      document.querySelectorAll('.menu-item.has-submenu').forEach(item => {
        item.classList.remove('open');
      });
      
      // Toggle current submenu
      if (!isOpen) {
        menuItem.classList.add('open');
      }
    }
  </script>*/