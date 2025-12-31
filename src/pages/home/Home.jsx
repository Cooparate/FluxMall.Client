import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import ProductCard from "../../components/product/ProductCard";
import data from "../../assets/data/data.json";

import "./home.scss";

import {
  slide1,
  slide2,
  slide3,
  slide4,
  acerAspireImg,
  acerNitroImg,
  acerNitro5Img,
  lenovoLoqImg,
  lenovoIdeapadImg,
  featuredProductBanner,
} from "../../assets";
import {
  FaChevronLeft,
  FaChevronRight,
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineClose,
} from "../../components/icons";

const bannerSlides = [
  {
    id: 1,
    image: slide2,
  },
  {
    id: 2,
    image: slide1,
  },
  {
    id: 3,
    image: slide3,
  },
  {
    id: 4,
    image: slide4,
  },
];

export default function Home() {
  const { products } = data;

  const [bannerIndex, setBannerIndex] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOptions, setModalOptions] = useState({
    color: "",
    size: "",
    quantity: 1,
  });
  const [t, setT] = useState(60 * 60);

  useEffect(() => {
    const i = setInterval(() => setT((t) => t - 1), 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("fluxmall_current_user");
    if (user) setCurrentUser(JSON.parse(user));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prevIndex) =>
        prevIndex === bannerSlides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevBanner = () => {
    setBannerIndex((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
  };

  const handleNextBanner = () => {
    setBannerIndex((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
  };

  const checkLoginBeforeAction = () => {
    if (!currentUser) {
      setShowLoginAlert(true);
      return false;
    }
    return true;
  };

  const goCategory = (type) => {
    navigate(`/category/${type}`);
    setOpen(false);
  };

  const openModal = (product) => {
    if (!checkLoginBeforeAction()) return;
    setSelectedProduct(product);
    setModalOptions({
      color: product.hasColors ? product.colors[0] : "",
      size: product.hasSizes ? product.sizes[0] : "",
      quantity: 1,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setModalOptions({ color: "", size: "", quantity: 1 });
  };

  const handleQuantityChange = (change) => {
    setModalOptions((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + change),
    }));
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      if (selectedProduct.hasColors && !modalOptions.color) {
        alert("Vui lòng chọn màu sắc");
        return;
      }
      if (selectedProduct.hasSizes && !modalOptions.size) {
        alert("Vui lòng chọn kích cỡ");
        return;
      }
      addToCart(selectedProduct, modalOptions);
      alert("Đã thêm sản phẩm vào giỏ hàng!");
      closeModal();
    }
  };

  const calculateModalPrice = () => {
    if (!selectedProduct) return 0;
    const basePrice = parseFloat(selectedProduct.price);
    return (basePrice * modalOptions.quantity).toLocaleString("vi-VN");
  };

  return (
    <div className="home">
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
                }}
              />
            </div>

            <button className="carousel-btn next" onClick={handleNextBanner}>
              <FaChevronRight />
            </button>
          </div>

          <div className="carousel-dots">
            {bannerSlides.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${idx === bannerIndex ? "active" : ""}`}
                onClick={() => setBannerIndex(idx)}
              />
            ))}
          </div>
        </div>

        <div className="marquee-container">
          <marquee
            direction="up"
            scrollamount="3"
            behavior="scroll"
            loop="infinite"
          >
            <div className="marquee-item">
              <img
                src={acerAspireImg}
                alt="Acer Aspire Laptop"
                loading="lazy"
              />
              <img
                src={acerNitroImg}
                alt="Acer Nitro V15 Laptop"
                loading="lazy"
              />
              <img
                src={acerNitro5Img}
                alt="Acer Nitro 5 Laptop"
                loading="lazy"
              />
              <img src={lenovoLoqImg} alt="Lenovo LOQ Laptop" loading="lazy" />
              <img
                src={lenovoIdeapadImg}
                alt="Lenovo IdeaPad Slim Laptop"
                loading="lazy"
              />
              <img
                src={acerAspireImg}
                alt="Acer Aspire Laptop"
                loading="lazy"
              />
              <img
                src={acerNitroImg}
                alt="Acer Nitro V15 Laptop"
                loading="lazy"
              />
              <img
                src={acerNitro5Img}
                alt="Acer Nitro 5 Laptop"
                loading="lazy"
              />
              <img src={lenovoLoqImg} alt="Lenovo LOQ Laptop" loading="lazy" />
              <img
                src={lenovoIdeapadImg}
                alt="Lenovo IdeaPad Slim Laptop"
                loading="lazy"
              />
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
              <span>
                Kết thúc sau: {String(Math.floor(t / 3600)).padStart(2, "0")}:
                {String(
                  Math.floor((t - Math.floor(t / 3600) * 3600) / 60)
                ).padStart(2, "0")}
                :{String(t - Math.floor(t / 60) * 60).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products">
        <div className="container">
          <img
            id="student"
            src={featuredProductBanner}
            alt="image"
          />

          {/* ✅ THAY ĐỔI 4: Lấy products từ data.json giống Category.jsx */}
          <div className="grid">
            {products
              .filter((product) => product.promotion?.featured === true)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  item={product}
                  onAdd={() => openModal(product)}
                  onBuy={() => {
                    if (!checkLoginBeforeAction()) return;
                    alert("Chức năng mua hàng đang phát triển");
                  }}
                />
              ))}
          </div>

          <div className="load-more">
            <button className="btn-load">
              <a href="" onClick={() => goCategory("laptop")}>
                Xem thêm
              </a>
            </button>
          </div>
        </div>
      </section>

      {/* Modal yêu cầu đăng nhập */}
      {showLoginAlert && (
        <div className="modal-overlay" onClick={() => setShowLoginAlert(false)}>
          <div
            className="modal-content login-alert"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowLoginAlert(false)}
            >
              <AiOutlineClose />
            </button>

            <div className="login-alert-body">
              <div className="alert-icon">🔒</div>
              <h3>Yêu cầu đăng nhập</h3>
              <p>Bạn cần đăng nhập để thực hiện thao tác này</p>

              <div className="alert-actions">
                <button
                  className="btn-login"
                  onClick={() => navigate("/login")}
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
                <img
                  src={new URL(`../../assets/images/${selectedProduct.image.img0}`, import.meta.url).href}
                  alt={selectedProduct.name}
                />
              </div>

              <div className="modal-info">
                <h3>{selectedProduct.name}</h3>
                <div className="modal-price">
                  <span className="price">
                    {Number(selectedProduct.price).toLocaleString("vi-VN")} ₫
                  </span>
                  <span className="old-price">
                    {Number(selectedProduct.old_price).toLocaleString("vi-VN")}{" "}
                    ₫
                  </span>
                </div>

                {/* Chọn màu sắc */}
                {selectedProduct.hasColors && (
                  <div className="modal-option">
                    <label>Màu sắc:</label>
                    <div className="option-buttons">
                      {selectedProduct.colors.map((color) => (
                        <button
                          key={color}
                          className={`option-btn ${
                            modalOptions.color === color ? "active" : ""
                          }`}
                          onClick={() =>
                            setModalOptions((prev) => ({ ...prev, color }))
                          }
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
                          className={`option-btn ${
                            modalOptions.size === size ? "active" : ""
                          }`}
                          onClick={() =>
                            setModalOptions((prev) => ({ ...prev, size }))
                          }
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
                        setModalOptions((prev) => ({
                          ...prev,
                          quantity: Math.max(1, val),
                        }));
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
