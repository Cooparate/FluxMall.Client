import { useState } from "react";
import "./ProductOptionsModal.scss";

export default function ProductOptionsModal({
  show,
  onClose,
  product,
  productOptions,
  isBuyNow,
  onConfirm,
}) {
  const [modalOptions, setModalOptions] = useState({
    color:
      productOptions.hasColors && productOptions.colors.length > 0
        ? productOptions.colors[0]
        : "",
    size:
      productOptions.hasSizes && productOptions.sizes.length > 0
        ? productOptions.sizes[0]
        : "",
    quantity: 1,
  });

  if (!show) return null;

  const handleConfirm = () => {
    if (productOptions.hasColors && !modalOptions.color) {
      alert("Vui lòng chọn màu sắc");
      return;
    }
    if (productOptions.hasSizes && !modalOptions.size) {
      alert("Vui lòng chọn kích cỡ");
      return;
    }

    onConfirm(modalOptions);
  };

  // Tính tổng giá trong modal
  const calculateModalPrice = () => {
    const basePrice =
      typeof product.price === "number"
        ? product.price
        : parseFloat(product.price.toString().replace(/\./g, ""));
    return (basePrice * modalOptions.quantity).toLocaleString("vi-VN");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Chọn tùy chọn sản phẩm</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {/* Hiển thị thông tin sản phẩm */}
          <div className="modal-product-info">
            <img
              src={
                new URL(
                  `../../assets/images/${product.image.img0}`,
                  import.meta.url
                ).href
              }
              alt={product.name}
            />
            <div>
              <h4>{product.name}</h4>
              <p className="modal-price">
                {Number(product.price).toLocaleString()}đ
              </p>
            </div>
          </div>

          {/* Chọn màu sắc */}
          {productOptions.hasColors && productOptions.colors.length > 0 && (
            <div className="modal-option-group">
              <label>
                Màu sắc: <span className="required">*</span>
              </label>
              <div className="color-options">
                {productOptions.colors.map((color) => (
                  <button
                    key={color}
                    className={`color-btn ${
                      modalOptions.color === color ? "active" : ""
                    }`}
                    onClick={() => setModalOptions({ ...modalOptions, color })}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chọn kích cỡ */}
          {productOptions.hasSizes && productOptions.sizes.length > 0 && (
            <div className="modal-option-group">
              <label>
                Kích cỡ: <span className="required">*</span>
              </label>
              <div className="size-options">
                {productOptions.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${
                      modalOptions.size === size ? "active" : ""
                    }`}
                    onClick={() => setModalOptions({ ...modalOptions, size })}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chọn số lượng */}
          <div className="modal-option-group">
            <label>Số lượng:</label>
            <div className="quantity-controls">
              <button
                className="qty-btn"
                onClick={() =>
                  setModalOptions({
                    ...modalOptions,
                    quantity: Math.max(1, modalOptions.quantity - 1),
                  })
                }
              >
                −
              </button>
              <input
                type="number"
                min="1"
                value={modalOptions.quantity}
                onChange={(e) =>
                  setModalOptions({
                    ...modalOptions,
                    quantity: Math.max(1, parseInt(e.target.value) || 1),
                  })
                }
              />
              <button
                className="qty-btn"
                onClick={() =>
                  setModalOptions({
                    ...modalOptions,
                    quantity: modalOptions.quantity + 1,
                  })
                }
              >
                +
              </button>
            </div>
          </div>

          {/* Tổng tiền */}
          <div className="modal-total">
            <span>Tổng cộng:</span>
            <span className="total-price">{calculateModalPrice()}đ</span>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Hủy
          </button>
          <button className="btn-confirm" onClick={handleConfirm}>
            {isBuyNow ? "Mua ngay" : "Thêm vào giỏ"}
          </button>
        </div>
      </div>
    </div>
  );
}
