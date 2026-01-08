import React from "react";
import { AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from "../icons";
import "./AddToCartModal.scss";

export default function AddToCartModal({
  show,
  product,
  options,
  onClose,
  onOptionsChange,
  onQuantityChange,
  onAddToCart,
  calculateTotalPrice,
}) {
  if (!show || !product) return null;

  const handleQuantityChange = (change) => {
    onQuantityChange(change);
  };

  const handleQuantityInput = (e) => {
    const val = parseInt(e.target.value) || 1;
    onOptionsChange((prev) => ({ ...prev, quantity: Math.max(1, val) }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <AiOutlineClose />
        </button>

        <div className="modal-body">
          <div className="modal-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="modal-info">
            <h3>{product.name}</h3>
            <div className="modal-price">
              <span className="price">{product.price} ₫</span>
              {product.old_price && (
                <span className="old-price">{product.old_price} ₫</span>
              )}
            </div>

            {/* Chọn màu sắc */}
            {product.hasColors && product.colors && (
              <div className="modal-option">
                <label>Màu sắc:</label>
                <div className="option-buttons">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`option-btn ${
                        options.color === color ? "active" : ""
                      }`}
                      onClick={() =>
                        onOptionsChange((prev) => ({ ...prev, color }))
                      }
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chọn kích cỡ */}
            {product.hasSizes && product.sizes && (
              <div className="modal-option">
                <label>Dung lượng:</label>
                <div className="option-buttons">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`option-btn ${
                        options.size === size ? "active" : ""
                      }`}
                      onClick={() =>
                        onOptionsChange((prev) => ({ ...prev, size }))
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
                  disabled={options.quantity <= 1}
                >
                  <AiOutlineMinus />
                </button>
                <input
                  type="number"
                  value={options.quantity}
                  onChange={handleQuantityInput}
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
              <span className="total-price">{calculateTotalPrice()} ₫</span>
            </div>

            {/* Nút thêm vào giỏ */}
            <button className="modal-add-btn" onClick={onAddToCart}>
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
