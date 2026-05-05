import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);

  const addToCart = (product, size = "M", quantity = 1) => {
    const productWithImages = {
      ...product,
      image: product.images || [],
    };

    const existing = cartItems.find(
      (item) => item._id === product._id && item.size === size
    );

    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { ...productWithImages, size, quantity },
      ]);
    }
  };

  const removeFromCart = (id, size) => {
    setCartItems(
      cartItems.filter(
        (item) => !(item._id === id && item.size === size)
      )
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        orderDetails,
        setOrderDetails,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};