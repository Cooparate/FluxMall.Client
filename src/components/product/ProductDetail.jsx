import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import data from '../../assets/data/data.json';
import './ProductDetail.scss';
import { AiOutlineLeft } from 'react-icons/ai';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showMore, setShowMore] = useState(false);

  const product = data.products.find(p => p.id === parseInt(id));

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
          <button onClick={() => navigate('/home')} className="btn-back-home">
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  const images = Object.values(product.image).filter(img => img);
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image.img0
    });
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ!`);
  };

  const handleBuy = () => {
    handleAddToCart();
    navigate('/cart');
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
              src={`/src/assets/images/${images[currentImageIndex]}`}
              alt={product.name}
            />
            {images.length > 1 && (
              <>
                <button className="nav-btn prev" onClick={handlePrevImage}>❮</button>
                <button className="nav-btn next" onClick={handleNextImage}>❯</button>
              </>
            )}
          </div>

          {/* Thumbnail images */}
          {images.length > 1 && (
            <div className="thumbnails">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(idx)}
                >
                  <img src={`/src/assets/images/${img}`} alt={`${product.name} ${idx}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="detail-info">
          {/* Product basic info */}
          <div className="product-header">
            {/* {product.tag && <span className="tag">{product.tag}</span>} */}
            <h1>{product.name}</h1>
            <p className="brand">Hãng {product.brand}</p>
          </div>

          {/* Pricing */}
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

          {/* Description */}
          <div className="description-section">
            <h3>Mô tả sản phẩm</h3>
            <p>{product.description}</p>
          </div>

          {/* Features */}
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

          {/* Stock status */}
          <div className="stock-section">
            <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-stock'}`}>
              {product.inStock ? 'Còn hàng' : 'Hết hàng'}
            </span>
          </div>

          {/* Quantity and actions */}
          <div className="actions-section">
            {/* <div className="quantity-control">
              <label>Số lượng:</label>
              <button 
                className="qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <input 
                type="number" 
                min="1" 
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <button 
                className="qty-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div> */}

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

{/* Warranty info */}

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


      {/* Specifications section */}
      {product.specifications && (
        <div className="specifications-section">
          <h2>Thông số kỹ thuật</h2>
          <div className="specs-grid">
            {Object.entries(product.specifications).map(([key, value]) => {
              // Format key name
              const keyDisplay = key
                .replace(/_/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());

              // Handle array values
              const valueDisplay = Array.isArray(value) 
                ? value.join(', ')
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
          .replace(/_/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());

        const valueDisplay = Array.isArray(value)
          ? value.join(', ')
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


      {/* Store info */}
      {/* {product.store && product.store.length > 0 && (
        <div className="store-section">
          <h2>Thông tin cửa hàng</h2>
          <div className="stores-grid">
            {product.store.map((store, idx) => (
              <div key={idx} className="store-card">
                <h4>{store.address}</h4>
                <p><strong>Thành phố:</strong> {store.city}</p>
                <p><strong>Điện thoại:</strong> {store.phone}</p>
                <p><strong>Giờ mở cửa:</strong> {store.hours}</p>
                <p className="store-status"><strong>Trạng thái:</strong> {store.status}</p>
              </div>
            ))}
          </div>
        </div>
      )} */}

      {/* Warranty info */}

      {/* Promotion info */}
      {product.promotion && (
        <div className="promotion-section">
          <h2>Khuyến mãi đặc biệt</h2>
          <div className="promotion-list">
            {product.promotion.shockSale && (
              <div className="promotion-item shock-sale">
                Giảm giá sốc
              </div>
            )}
            {product.promotion.studentDiscount && (
              <div className="promotion-item student">
                Dành cho sinh viên
              </div>
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



