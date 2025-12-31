import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import ProductCard from "../../components/product/ProductCard";
import ProductOptionsModal from "../../components/product/ProductOptionsModal";
import LoginAlertModal from "../../components/auth/LoginAlerModal";
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
import { FaChevronLeft, FaChevronRight } from "../../components/icons";

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
  };

  const openModal = (product) => {
    if (!checkLoginBeforeAction()) return;
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleConfirmAddToCart = (modalOptions) => {
    if (selectedProduct) {
      addToCart(selectedProduct, modalOptions);
      alert("Đã thêm sản phẩm vào giỏ hàng!");
      closeModal();
    }
  };

  // Chuẩn bị productOptions cho modal
  const getProductOptions = (product) => {
    if (!product)
      return { hasColors: false, colors: [], hasSizes: false, sizes: [] };

    return {
      hasColors: product.hasColors || false,
      colors: product.colors || [],
      hasSizes: product.hasSizes || false,
      sizes: product.sizes || [],
    };
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
          <img id="student" src={featuredProductBanner} alt="image" />

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

      {/* MODAL THÔNG BÁO ĐĂNG NHẬP - Component riêng */}
      <LoginAlertModal
        show={showLoginAlert}
        onClose={() => setShowLoginAlert(false)}
      />

      {/* MODAL CHỌN OPTIONS - Component riêng */}
      {selectedProduct && (
        <ProductOptionsModal
          show={showModal}
          onClose={closeModal}
          product={selectedProduct}
          productOptions={getProductOptions(selectedProduct)}
          isBuyNow={false}
          onConfirm={handleConfirmAddToCart}
        />
      )}
    </div>
  );
}
