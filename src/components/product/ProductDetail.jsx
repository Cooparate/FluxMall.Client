import { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import data from "../../assets/data/data.json";
import ProductOptionsModal from "../../components/product/ProductOptionsModal";
import LoginAlertModal from "../../components/auth/LoginAlerModal";
import "./ProductDetail.scss";
import { AiOutlineLeft } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const product = data.products.find((p) => p.id === parseInt(id));

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showMore, setShowMore] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [isBuyNow, setIsBuyNow] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  // Kiểm tra user đã đăng nhập chưa
  const checkLogin = () => {
    const currentUser = localStorage.getItem("fluxmall_current_user");
    if (!currentUser) {
      setShowLoginAlert(true);
      return false;
    }
    return true;
  };

  // Tự động phát hiện options từ specifications
  const getProductOptions = () => {
    if (!product)
      return { hasColors: false, colors: [], hasSizes: false, sizes: [] };

    let colors = [];
    let sizes = [];

    // Lấy màu từ specifications.color nếu có
    if (product.specifications?.color) {
      colors = Array.isArray(product.specifications.color)
        ? product.specifications.color
        : [product.specifications.color];
    }

    // Lấy size từ RAM hoặc storage cho Laptop
    if (product.category.toLowerCase() === "laptop") {
      if (product.specifications?.ram) {
        sizes.push(product.specifications.ram);
      }
      sizes.push("RAM 8GB", "RAM 16GB", "RAM 32GB");
      sizes = [...new Set(sizes)];
    }

    // Bag/Túi có thể có nhiều size
    if (product.category.toLowerCase() === "bag") {
      sizes = ["13 inch", "14 inch", "15.6 inch", "16 inch"];
    }

    // Keyboard, Mouse, Headphone có nhiều màu
    if (
      ["keyboard", "mouse", "headphone"].includes(
        product.category.toLowerCase()
      )
    ) {
      colors = ["Đen", "Trắng", "Xám"];
    }

    return {
      hasColors: colors.length > 0,
      colors: colors,
      hasSizes: sizes.length > 0,
      sizes: sizes,
    };
  };

  const productOptions = getProductOptions();

  // useEffect để xử lý thay đổi productId từ URL
  // Reset state khi chuyển sang sản phẩm khác và scroll to top

  useEffect(() => {
    setCurrentImageIndex(0);
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="not-found">
          <h2>Sản phẩm không tìm thấy</h2>
          <button onClick={() => navigate("/home")} className="btn-back-home">
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  const images = Object.values(product.image).filter((img) => img);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Mở modal khi nhấn "Thêm vào giỏ"
  const handleAddToCart = () => {
    if (!checkLogin()) return;
    setIsBuyNow(false);
    setShowModal(true);
  };

  // Mở modal khi nhấn "Mua ngay"
  const handleBuy = () => {
    if (!checkLogin()) return;
    setIsBuyNow(true);
    setShowModal(true);
  };

  // Xác nhận thêm vào giỏ từ modal
  const confirmAddToCart = (modalOptions) => {
    // Chuẩn bị dữ liệu sản phẩm
    const productData = {
      id: product.id,
      name: product.name,
      price: product.price.toLocaleString
        ? product.price.toLocaleString("vi-VN")
        : product.price,
      old_price: product.old_price,
      image: product.image.img0,
      hasColors: productOptions.hasColors,
      colors: productOptions.colors,
      hasSizes: productOptions.hasSizes,
      sizes: productOptions.sizes,
    };

    // Thêm vào giỏ hàng
    addToCart(productData, modalOptions);

    if (isBuyNow) {
      alert("Đã chọn sản phẩm để thanh toán!");
      setShowModal(false);
      navigate("/cart");
    } else {
      alert(`Đã thêm ${modalOptions.quantity} sản phẩm vào giỏ!`);
      setShowModal(false);
    }
  };

  return (
    <div className="product-detail-container">
      {/* Header with back button */}
      <button className="btn-back" onClick={() => navigate(-1)}>
        <AiOutlineLeft /> Quay lại
      </button>

      <div className="detail-wrapper">
        {/* Left: Images */}
        <div className="detail-images">
          <div className="main-image">
            <img
              src={
                new URL(
                  `../../assets/images/${images[currentImageIndex]}`,
                  import.meta.url
                ).href
              }
              alt={product.name}
            />
            {images.length > 1 && (
              <>
                <button className="nav-btn prev" onClick={handlePrevImage}>
                  ❮
                </button>
                <button className="nav-btn next" onClick={handleNextImage}>
                  ❯
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="thumbnails">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`thumbnail ${
                    idx === currentImageIndex ? "active" : ""
                  }`}
                  onClick={() => setCurrentImageIndex(idx)}
                >
                  <img
                    src={
                      new URL(`../../assets/images/${img}`, import.meta.url)
                        .href
                    }
                    alt={`${product.name} ${idx}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="detail-info">
          <div className="product-header">
            <h1>{product.name}</h1>
            <p className="brand">Hãng {product.brand}</p>
          </div>

          <div className="pricing-section">
            <div className="price-group">
              <span className="current-price">
                {Number(product.price).toLocaleString()}đ
              </span>
              {product.old_price && (
                <span className="old-price">
                  {Number(product.old_price).toLocaleString()}đ
                </span>
              )}
            </div>
            {product.discount && (
              <span className="discount-badge">{product.discount}</span>
            )}
          </div>

          <div className="description-section">
            <h3>Mô tả sản phẩm</h3>
            <p>{product.description}</p>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="features-section">
              <h3>Điểm nổi bật</h3>
              <ul className="features-list">
                {product.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="stock-section">
            <span
              className={`stock-status ${
                product.inStock ? "in-stock" : "out-stock"
              }`}
            >
              {product.inStock ? "Còn hàng" : "Hết hàng"}
            </span>
          </div>

          <div className="actions-section">
            <button
              className="btn-add-cart"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              Thêm vào giỏ
            </button>
            <button
              className="btn-buy-now"
              onClick={handleBuy}
              disabled={!product.inStock}
            >
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* MODAL CHỌN OPTIONS - Component riêng */}
      <ProductOptionsModal
        show={showModal}
        onClose={() => setShowModal(false)}
        product={product}
        productOptions={productOptions}
        isBuyNow={isBuyNow}
        onConfirm={confirmAddToCart}
      />

      {/* MODAL THÔNG BÁO ĐĂNG NHẬP - Component riêng */}
      <LoginAlertModal
        show={showLoginAlert}
        onClose={() => setShowLoginAlert(false)}
      />

      {/* Các phần khác giữ nguyên */}
      {product.productInfo && (
        <div className="info-section">
          <h2>Thông tin sản phẩm</h2>
          <div
            className={`product-info ${showMore ? "expanded" : "collapsed"}`}
          >
            {product.productInfo}
          </div>
          <button
            className="btn-show-more"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Thu gọn" : "Xem thêm"}
          </button>
        </div>
      )}

      {product.specifications && (
        <div className="specifications-section">
          <h2>Thông số kỹ thuật</h2>
          <div className="specs-grid">
            {Object.entries(product.specifications).map(([key, value]) => {
              const keyDisplay = key
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase());

              const valueDisplay = Array.isArray(value)
                ? value.join(", ")
                : String(value);

              return (
                <div key={key} className="spec-item">
                  <span className="spec-label">{keyDisplay}</span>
                  <span className="spec-value">{valueDisplay}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {product.warranty && (
        <div className="warranty-section">
          <h2>Bảo hành & Chính sách</h2>
          <div className="warranty-card">
            {Object.entries(product.warranty).map(([key, value]) => {
              const keyDisplay = key
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase());

              const valueDisplay = Array.isArray(value)
                ? value.join(", ")
                : String(value);

              return (
                <p key={key}>
                  <strong>{keyDisplay}:</strong> {valueDisplay}
                </p>
              );
            })}
          </div>
        </div>
      )}

      {product.promotion && (
        <div className="promotion-section">
          <h2>Khuyến mãi đặc biệt</h2>
          <div className="promotion-list">
            {product.promotion.shockSale && (
              <div className="promotion-item shock-sale">Giảm giá sốc</div>
            )}
            {product.promotion.studentDiscount && (
              <div className="promotion-item student">Dành cho sinh viên</div>
            )}
            {product.promotion.gift && (
              <div className="promotion-item gift">
                Quà tặng: {product.promotion.gift}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
