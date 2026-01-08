import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart phải được sử dụng trong CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("fluxmall_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("fluxmall_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, options) => {
    const { color, size, quantity } = options;

    const itemId = `${product.id}_${color}_${size}`;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.itemId === itemId);

      if (existingItem) {
        return prevItems.map((item) =>
          item.itemId === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            ...product,
            itemId,
            color,
            size,
            quantity,
            selected: false,
            voucher: null,
          },
        ];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.itemId !== itemId)
    );
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.itemId === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const toggleSelectItem = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.itemId === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const selectAll = (isSelected) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => ({ ...item, selected: isSelected }))
    );
  };

  const applyVoucher = (itemId, voucher) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.itemId === itemId ? { ...item, voucher } : item
      )
    );
  };

  const removeVoucher = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.itemId === itemId ? { ...item, voucher: null } : item
      )
    );
  };

  const calculateItemTotal = (item) => {
    const basePrice = parseFloat(item.price.replace(/\./g, ""));
    let total = basePrice * item.quantity;

    if (item.voucher) {
      if (item.voucher.type === "percent") {
        total = total * (1 - item.voucher.value / 100);
      } else if (item.voucher.type === "fixed") {
        total = total - item.voucher.value;
      }
    }

    return Math.max(0, total);
  };

  const calculateSelectedTotal = () => {
    return cartItems
      .filter((item) => item.selected)
      .reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const getSelectedCount = () => {
    return cartItems.filter((item) => item.selected).length;
  };

  const removeSelectedItems = () => {
    setCartItems((prevItems) => prevItems.filter((item) => !item.selected));
  };

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
