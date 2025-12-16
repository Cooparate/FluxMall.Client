import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete, AiOutlineShoppingCart } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import { RiCouponLine } from 'react-icons/ri';
import './Cart.scss';

// Mock data cho vouchers (sau này sẽ fetch từ API)
const mockVouchers = [
  {
    id: 'VC001',
    code: 'GIAM10',
    name: 'Giảm 10%',
    description: 'Giảm 10% tối đa 50.000đ',
    type: 'percent',
    value: 10,
    maxDiscount: 50000,
    minOrder: 0,
  },
  {
    id: 'VC002',
    code: 'GIAM50K',
    name: 'Giảm 50K',
    description: 'Giảm 50.000đ cho đơn từ 500.000đ',
    type: 'fixed',
    value: 50000,
    minOrder: 500000,
  },
  {
    id: 'VC003',
    code: 'FREESHIP',
    name: 'Miễn phí vận chuyển',
    description: 'Miễn phí ship cho đơn từ 200.000đ',
    type: 'fixed',
    value: 30000,
    minOrder: 200000,
  },
  {
    id: 'VC004',
    code: 'GIAM20',
    name: 'Giảm 20%',
    description: 'Giảm 20% tối đa 100.000đ',
    type: 'percent',
    value: 20,
    maxDiscount: 100000,
    minOrder: 300000,
  },
];

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    toggleSelectItem,
    selectAll,
    applyVoucher,
    removeVoucher,
    calculateItemTotal,
    calculateSelectedTotal,
    getSelectedCount,
    removeSelectedItems,
  } = useCart();

  // State quản lý voucher modal
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [selectedItemForVoucher, setSelectedItemForVoucher] = useState(null);

  // Kiểm tra tất cả items có được chọn không
  const allSelected = cartItems.length > 0 && cartItems.every(item => item.selected);

  // Mở modal chọn voucher
  const openVoucherModal = (item) => {
    setSelectedItemForVoucher(item);
    setShowVoucherModal(true);
  };

  // Đóng modal voucher
  const closeVoucherModal = () => {
    setShowVoucherModal(false);
    setSelectedItemForVoucher(null);
  };

  // Áp dụng voucher
  const handleApplyVoucher = (voucher) => {
    if (selectedItemForVoucher) {
      const itemPrice = parseFloat(selectedItemForVoucher.price.replace(/\./g, '')) * selectedItemForVoucher.quantity;
      
      // Kiểm tra điều kiện áp dụng voucher
      if (itemPrice < voucher.minOrder) {
        alert(`Voucher này yêu cầu đơn hàng tối thiểu ${voucher.minOrder.toLocaleString('vi-VN')}đ`);
        return;
      }

      applyVoucher(selectedItemForVoucher.itemId, voucher);
      closeVoucherModal();
    }
  };

  // Format giá tiền
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN');
  };

  // Xử lý thanh toán
  const handleCheckout = () => {
    if (getSelectedCount() === 0) {
      alert('Vui lòng chọn ít nhất 1 sản phẩm để thanh toán!');
      return;
    }

    // TODO: API - Gửi request thanh toán
    // const selectedItems = cartItems.filter(item => item.selected);
    // fetch('/api/checkout', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     items: selectedItems,
    //     total: calculateSelectedTotal()
    //   })
    // })
    // .then(res => res.json())
    // .then(data => {
    //   if (data.success) {
    //     removeSelectedItems();
    //     alert('Đặt hàng thành công!');
    //     // Redirect to order confirmation page
    //   }
    // });

    alert(`Thanh toán ${getSelectedCount()} sản phẩm - Tổng: ${formatPrice(calculateSelectedTotal())}đ`);
  };

  // Nếu giỏ hàng trống
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <AiOutlineShoppingCart className="empty-icon" />
        <h2>Giỏ hàng của bạn đang trống</h2>
        <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm!</p>
        <a href="/home" className="btn-continue-shopping">
          Tiếp tục mua sắm
        </a>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Giỏ hàng của bạn</h1>

        {/* Header của giỏ hàng */}
        <div className="cart-header">
          <div className="header-checkbox">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => selectAll(e.target.checked)}
            />
            <span>Chọn tất cả ({cartItems.length} sản phẩm)</span>
          </div>
          <div className="header-info">
            <span className="header-item">Đơn giá</span>
            <span className="header-item">Số lượng</span>
            <span className="header-item">Thành tiền</span>
            <span className="header-item">Thao tác</span>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="cart-items">
          {cartItems.map((item) => {
            const itemTotal = calculateItemTotal(item);
            const originalTotal = parseFloat(item.price.replace(/\./g, '')) * item.quantity;

            return (
              <div key={item.itemId} className={`cart-item ${item.selected ? 'selected' : ''}`}>
                {/* Checkbox chọn sản phẩm */}
                <div className="item-checkbox">
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => toggleSelectItem(item.itemId)}
                  />
                </div>

                {/* Thông tin sản phẩm */}
                <div className="item-info">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    {item.color && <p>Màu: {item.color}</p>}
                    {item.size && <p>Dung lượng: {item.size}</p>}
                  </div>
                </div>

                {/* Đơn giá */}
                <div className="item-price">
                  <span>{item.price} ₫</span>
                </div>

                {/* Số lượng */}
                <div className="item-quantity">
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <AiOutlineMinus />
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      updateQuantity(item.itemId, Math.max(1, val));
                    }}
                    min="1"
                  />
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                  >
                    <AiOutlinePlus />
                  </button>
                </div>

                {/* Thành tiền */}
                <div className="item-total">
                  {item.voucher && originalTotal !== itemTotal && (
                    <span className="original-total">{formatPrice(originalTotal)} ₫</span>
                  )}
                  <span className="total-price">{formatPrice(itemTotal)} ₫</span>
                </div>

                {/* Nút xóa */}
                <div className="item-actions">
                  <button
                    className="btn-delete"
                    onClick={() => removeFromCart(item.itemId)}
                    title="Xóa sản phẩm"
                  >
                    <AiOutlineDelete />
                  </button>
                </div>

                {/* Voucher section - chỉ hiện khi item được chọn */}
                {item.selected && (
                  <div className="item-voucher-section">
                    {item.voucher ? (
                      <div className="voucher-applied">
                        <RiCouponLine className="voucher-icon" />
                        <span className="voucher-name">{item.voucher.name}</span>
                        <span className="voucher-desc">{item.voucher.description}</span>
                        <button
                          className="btn-remove-voucher"
                          onClick={() => removeVoucher(item.itemId)}
                        >
                          <MdClose />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn-select-voucher"
                        onClick={() => openVoucherModal(item)}
                      >
                        <RiCouponLine className="voucher-icon" />
                        Chọn voucher
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Thanh toán */}
        <div className="cart-summary">
          <div className="summary-info">
            <div className="summary-row">
              <span>Tổng thanh toán ({getSelectedCount()} sản phẩm):</span>
              <span className="summary-total">{formatPrice(calculateSelectedTotal())} ₫</span>
            </div>
          </div>
          <button className="btn-checkout" onClick={handleCheckout}>
            Thanh toán
          </button>
        </div>
      </div>

      {/* Modal chọn voucher */}
      {showVoucherModal && selectedItemForVoucher && (
        <div className="voucher-modal-overlay" onClick={closeVoucherModal}>
          <div className="voucher-modal" onClick={(e) => e.stopPropagation()}>
            <div className="voucher-modal-header">
              <h3>Chọn Voucher</h3>
              <button className="modal-close" onClick={closeVoucherModal}>
                <MdClose />
              </button>
            </div>

            <div className="voucher-modal-body">
              {/* TODO: API - Fetch vouchers from backend
                fetch('/api/vouchers')
                  .then(res => res.json())
                  .then(data => setVouchers(data))
              */}
              {mockVouchers.map((voucher) => {
                const itemPrice = parseFloat(selectedItemForVoucher.price.replace(/\./g, '')) * selectedItemForVoucher.quantity;
                const canApply = itemPrice >= voucher.minOrder;

                return (
                  <div
                    key={voucher.id}
                    className={`voucher-card ${!canApply ? 'disabled' : ''}`}
                  >
                    <div className="voucher-info">
                      <RiCouponLine className="voucher-icon" />
                      <div className="voucher-details">
                        <h4>{voucher.name}</h4>
                        <p>{voucher.description}</p>
                        {voucher.minOrder > 0 && (
                          <span className="voucher-condition">
                            Đơn tối thiểu: {formatPrice(voucher.minOrder)}đ
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      className="btn-apply-voucher"
                      onClick={() => handleApplyVoucher(voucher)}
                      disabled={!canApply}
                    >
                      {canApply ? 'Áp dụng' : 'Không đủ điều kiện'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
