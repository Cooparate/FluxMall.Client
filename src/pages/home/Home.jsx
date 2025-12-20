import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

import "./home.scss";

import { slide1, slide2, slide3, Img1, Img2, Img3, Img4, Img5, acerAspireImg, acerNitroImg, acerNitro5Img, lenovoLoqImg, lenovoIdeapadImg } from "../../assets";
import { 
  FaFacebookSquare, FaChevronLeft, FaChevronRight, FaInstagramSquare, FaYoutube,
  IoLogoGithub,
  AiOutlinePlus, AiOutlineMinus, AiOutlineClose 
} from "../../components/icons";

const mockProducts = [
  { 
    id: 1, 
    name: "Acer Nitro V 15", 
    image: Img1, 
    price: "20.290.000", 
    old_price: "21.990.000", 
    tag: "Mẫu mới",
    hasColors: true,
    colors: ["Đen", "Xám", "Bạc"],
    hasSizes: false,
  },
  { 
    id: 2, 
    name: "Acer Aspire GO", 
    image: Img2, 
    price: "23.490.000", 
    old_price: "24.990.000", 
    tag: "Mẫu mới",
    hasColors: true,
    colors: ["Xanh", "Đen"],
    hasSizes: false,
  },
  { 
    id: 3, 
    name: "Máy chiếu Wanbo", 
    image: Img3, 
    price: "2.990.000", 
    old_price: "3.990.000", 
    tag: "Giảm 20%",
    hasColors: false,
    hasSizes: false,
  },
  { 
    id: 4, 
    name: "Giá đỡ laptop baseus", 
    image: Img4, 
    price: "390.000", 
    old_price: "490.000", 
    tag: "Khuyến mãi",
    hasColors: true,
    colors: ["Đen", "Trắng", "Xám"],
    hasSizes: false,
  },
  { 
    id: 5, 
    name: "IPhone 17 Pro", 
    image: Img5, 
    price: "30.990.000", 
    old_price: "32.490.000", 
    tag: "Sale",
    hasColors: true,
    colors: ["Đen Titan", "Trắng Titan", "Tự nhiên", "Xanh Titan"],
    hasSizes: true,
    sizes: ["128GB", "256GB", "512GB", "1TB"],
  },
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
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  // Kiểm tra đăng nhập
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOptions, setModalOptions] = useState({
    color: '',
    size: '',
    quantity: 1,
  });

  // Kiểm tra đăng nhập khi component mount
  useEffect(() => {
    const user = localStorage.getItem('fluxmall_current_user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

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

  // Kiểm tra đăng nhập trước khi thực hiện thao tác
  const checkLoginBeforeAction = () => {
    if (!currentUser) {
      setShowLoginAlert(true);
      return false;
    }
    return true;
  };

  // Modal handlers
  const openModal = (product) => {
    // Kiểm tra đăng nhập trước khi mở modal
    if (!checkLoginBeforeAction()) {
      return;
    }
    
    setSelectedProduct(product);
    setModalOptions({
      color: product.hasColors ? product.colors[0] : '',
      size: product.hasSizes ? product.sizes[0] : '',
      quantity: 1,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setModalOptions({
      color: '',
      size: '',
      quantity: 1,
    });
  };

  const handleQuantityChange = (change) => {
    setModalOptions(prev => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + change)
    }));
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      // Kiểm tra xem có cần chọn màu/size không
      if (selectedProduct.hasColors && !modalOptions.color) {
        alert('Vui lòng chọn màu sắc');
        return;
      }
      if (selectedProduct.hasSizes && !modalOptions.size) {
        alert('Vui lòng chọn kích cỡ');
        return;
      }

      addToCart(selectedProduct, modalOptions);
      alert('Đã thêm sản phẩm vào giỏ hàng!');
      closeModal();
    }
  };

  // Tính tổng giá trong modal
  const calculateModalPrice = () => {
    if (!selectedProduct) return 0;
    const basePrice = parseFloat(selectedProduct.price.replace(/\./g, ''));
    return (basePrice * modalOptions.quantity).toLocaleString('vi-VN');
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
              <img src={acerAspireImg} alt="Acer Aspire Laptop" loading="lazy" />
              <img src={acerNitroImg} alt="Acer Nitro V15 Laptop" loading="lazy" />
              <img src={acerNitro5Img} alt="Acer Nitro 5 Laptop" loading="lazy" />
              <img src={lenovoLoqImg} alt="Lenovo LOQ Laptop" loading="lazy" />
              <img src={lenovoIdeapadImg} alt="Lenovo IdeaPad Slim Laptop" loading="lazy" />
              <img src={acerAspireImg} alt="Acer Aspire Laptop" loading="lazy" />
              <img src={acerNitroImg} alt="Acer Nitro V15 Laptop" loading="lazy" />
              <img src={acerNitro5Img} alt="Acer Nitro 5 Laptop" loading="lazy" />
              <img src={lenovoLoqImg} alt="Lenovo LOQ Laptop" loading="lazy" />
              <img src={lenovoIdeapadImg} alt="Lenovo IdeaPad Slim Laptop" loading="lazy" />
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
                    <button className="btn-add" onClick={() => openModal(product)}>
                      Thêm vào giỏ
                    </button>
                    <button 
                      className="btn-buy"
                      onClick={() => {
                        if (!checkLoginBeforeAction()) {
                          return;
                        }
                        // TODO: Xử lý mua hàng
                        alert('Chức năng mua hàng đang phát triển');
                      }}
                    >
                      Mua
                    </button>
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

      {/* Modal yêu cầu đăng nhập */}
      {showLoginAlert && (
        <div className="modal-overlay" onClick={() => setShowLoginAlert(false)}>
          <div className="modal-content login-alert" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowLoginAlert(false)}>
              <AiOutlineClose />
            </button>
            
            <div className="login-alert-body">
              <div className="alert-icon">🔒</div>
              <h3>Yêu cầu đăng nhập</h3>
              <p>Bạn cần đăng nhập để thực hiện thao tác này</p>
              
              <div className="alert-actions">
                <button 
                  className="btn-login"
                  onClick={() => navigate('/login')}
                >
                  Đăng nhập ngay
                </button>
                <button 
                  className="btn-cancel"
                  onClick={() => setShowLoginAlert(false)}
                >
                  Để sau
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal thêm vào giỏ hàng */}
      {showModal && selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <AiOutlineClose />
            </button>

            <div className="modal-body">
              <div className="modal-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>

              <div className="modal-info">
                <h3>{selectedProduct.name}</h3>
                <div className="modal-price">
                  <span className="price">{selectedProduct.price} ₫</span>
                  <span className="old-price">{selectedProduct.old_price} ₫</span>
                </div>

                {/* Chọn màu sắc */}
                {selectedProduct.hasColors && (
                  <div className="modal-option">
                    <label>Màu sắc:</label>
                    <div className="option-buttons">
                      {selectedProduct.colors.map((color) => (
                        <button
                          key={color}
                          className={`option-btn ${modalOptions.color === color ? 'active' : ''}`}
                          onClick={() => setModalOptions(prev => ({ ...prev, color }))}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chọn kích cỡ */}
                {selectedProduct.hasSizes && (
                  <div className="modal-option">
                    <label>Dung lượng:</label>
                    <div className="option-buttons">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          className={`option-btn ${modalOptions.size === size ? 'active' : ''}`}
                          onClick={() => setModalOptions(prev => ({ ...prev, size }))}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chọn số lượng */}
                <div className="modal-option">
                  <label>Số lượng:</label>
                  <div className="quantity-control">
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={modalOptions.quantity <= 1}
                    >
                      <AiOutlineMinus />
                    </button>
                    <input 
                      type="number" 
                      value={modalOptions.quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        setModalOptions(prev => ({ ...prev, quantity: Math.max(1, val) }));
                      }}
                      min="1"
                    />
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>

                {/* Tổng tiền */}
                <div className="modal-total">
                  <span>Tổng tiền:</span>
                  <span className="total-price">{calculateModalPrice()} ₫</span>
                </div>

                {/* Nút thêm vào giỏ */}
                <button className="modal-add-btn" onClick={handleAddToCart}>
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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