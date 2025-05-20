// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import allProductsData from '../data/processedProducts';

const IVA_RATE = 0.16;

// 1. Crear el Contexto
const CartContext = createContext();

// Hook personalizado para usar el CartContext fácilmente en otros componentes
// ASEGÚRATE DE QUE 'export' ESTÉ AQUÍ
export const useCart = () => {
  return useContext(CartContext);
};

// 2. Crear el Proveedor del Contexto (Provider)
export const CartProvider = ({ children }) => {
  // ... (el resto de tu código de CartProvider: useState, useEffect, funciones del carrito, etc.)

  const [products] = useState(allProductsData);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('activeSaleCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('activeSaleCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productToAdd.id);
      if (existingItem) {
        const currentQuantity = typeof existingItem.quantity === 'number' ? existingItem.quantity : 0;
        return prevItems.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const removeItemFromCart = (productIdToRemove) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productIdToRemove));
  };

  const updateItemQuantity = (productId, quantityInput) => {
    let parsedQuantity = parseInt(quantityInput, 10);

    if (isNaN(parsedQuantity) || prasedQuantity <= 0) { // if nan or negative number
      parsedQuantity = 0;
    }

    if (parsedQuantity === 0) {
      removeItemFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: parsedQuantity } : item
        )
      );
    }
  };

  const getCartSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.basePrice * item.quantity)
    }, 0);
  };

  const getCartTaxes = () => {
    return getCartSubtotal() * IVA_RATE;
  };

  const getCartTotal = () => {
    return getCartSubtotal() + getCartTaxes();
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    products,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    getCartSubtotal,
    getCartTaxes,
    getCartTotal,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext; // El default export es CartContext, no useCart