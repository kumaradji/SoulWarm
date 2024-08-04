import React, { createContext, useState, useCallback } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = useCallback((count) => {
    setCartCount(count);
  }, []);

  const addToCart = useCallback(async (item) => {
    // Логика добавления товара в корзину
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch('/api/cart/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ product_id: item.id })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Ошибка при добавлении товара в корзину');
      }

      // Обновляем состояние корзины
      const cartResponse = await fetch('/api/cart/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      if (!cartResponse.ok) {
        throw new Error('Failed to fetch cart data');
      }
      const cartData = await cartResponse.json();
      if (Array.isArray(cartData) && cartData.length > 0 && Array.isArray(cartData[0].items)) {
        updateCartCount(cartData[0].items.length);
      } else {
        console.error('Invalid cart data:', cartData);
      }

    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }, [updateCartCount]);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
