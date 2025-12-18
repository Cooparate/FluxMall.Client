import React, { createContext, useContext, useState, useEffect } from 'react';

// Tạo Context cho Cart (Kho chứa data chung)
// Chứa data giỏ hàng + các thao tác khác
const CartContext = createContext();

// Hook để sử dụng CartContext
export const useCart = () => {
  // (useContext) Hook để lấy data từ context
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart phải được sử dụng trong CartProvider');
  }
  return context;
};

// CartProvider component
export const CartProvider = ({ children }) => {
  // Load cart từ localStorage khi khởi tạo
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('fluxmall_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Lưu cart vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem('fluxmall_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product, options) => {
    const { color, size, quantity } = options;
    
    // Tạo ID unique cho item dựa trên product ID + color + size
    const itemId = `${product.id}_${color}_${size}`;
    
    setCartItems(prevItems => {
      // Kiểm tra xem item đã tồn tại chưa
      const existingItem = prevItems.find(item => item.itemId === itemId);
      
      if (existingItem) {
        // Nếu đã tồn tại, tăng số lượng
        return prevItems.map(item =>
          item.itemId === itemId
            ? { ...item, quantity: item.quantity + quantity } // Tăng số lượng
            : item // Giữ nguyên item khác
        );
      } else {
        // Nếu chưa tồn tại, thêm mới
        return [
          ...prevItems,     // Giữ nguyên item cũ
          {                 // Thêm item mới
            ...product,     // Copy tất cả thông tin product
            itemId,
            color,
            size,
            quantity,
            selected: false, // Mặc định chưa được chọn
            voucher: null,   // Chưa áp voucher
          },
        ];
      }
    });
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.itemId !== itemId));
  };

  // Cập nhật số lượng sản phẩm
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Không cho phép số lượng < 1
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.itemId === itemId
          ? { ...item, quantity: newQuantity }    // Cập nhật Quantity mới
          : item          // Item khác thì giữ nguyên
      )
    );
  };

  // Toggle chọn sản phẩm (checkbox)
  const toggleSelectItem = (itemId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.itemId === itemId
          ? { ...item, selected: !item.selected }   // Đảo ngược trạng thái
          : item        // Item khác giữ nguyênn
      )
    );
  };

  // Chọn tất cả sản phẩm
  const selectAll = (isSelected) => {
    setCartItems(prevItems =>
      prevItems.map(item => ({ ...item, selected: isSelected }))
    );
  };

  // Áp dụng voucher cho sản phẩm
  const applyVoucher = (itemId, voucher) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.itemId === itemId
          ? { ...item, voucher }
          : item
      )
    );
  };

  // Xóa voucher
  const removeVoucher = (itemId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.itemId === itemId
          ? { ...item, voucher: null }
          : item
      )
    );
  };

  // Tính tổng tiền cho 1 item (có tính voucher)
  const calculateItemTotal = (item) => {
    // Chuyển price từ string sang number (loại bỏ dấu chấm phân cách)
    const basePrice = parseFloat(item.price.replace(/\./g, ''));
    let total = basePrice * item.quantity;
    
    // Áp dụng voucher nếu có
    if (item.voucher) {
      if (item.voucher.type === 'percent') {
        total = total * (1 - item.voucher.value / 100);
      } else if (item.voucher.type === 'fixed') {
        total = total - item.voucher.value;
      }
    }
    
    return Math.max(0, total); // Không cho phép âm
  };

  // Tính tổng tiền các items được chọn
  const calculateSelectedTotal = () => {
    return cartItems
      .filter(item => item.selected)
      .reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  // Lấy số lượng items trong giỏ
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Lấy số lượng items được chọn
  const getSelectedCount = () => {
    return cartItems.filter(item => item.selected).length;
  };

  // Xóa các items đã chọn (sau khi thanh toán)
  const removeSelectedItems = () => {
    setCartItems(prevItems => prevItems.filter(item => !item.selected));
  };

  // Clear toàn bộ giỏ hàng
  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleSelectItem,
    selectAll,
    applyVoucher,
    removeVoucher,
    calculateItemTotal,
    calculateSelectedTotal,
    getCartCount,
    getSelectedCount,
    removeSelectedItems,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
