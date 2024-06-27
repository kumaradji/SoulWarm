import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CartButton.module.scss';
import cartIcon from '../../../assets/icons/shopping-cart.png';

const CartButton = ({ cartCount, updateCartCount }) => {
  const navigate = useNavigate();

  const handleCartClick = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/cart/', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && Array.isArray(data.items)) {
        updateCartCount(data.items.length);
      } else {
        console.error('Invalid cart data:', data);
      }
      navigate('/cart');
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  return (
    <div className={styles.cartButton} onClick={handleCartClick}>
      <img src={cartIcon} alt="Cart Icon"/>
      {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
    </div>
  );
};

export default CartButton;