import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CartButton.module.scss';
import cartIcon from '../../../assets/icons/shopping-cart.png';
import { CartContext } from '../../../context/CartContext';

const CartButton = () => {
  const navigate = useNavigate();
  const { cartCount, updateCartCount } = useContext(CartContext);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetchCartCount();
    }
  }, [token]);

  const fetchCartCount = async () => {
    try {
      const response = await fetch('/api/cart/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0].items)) {
        updateCartCount(data[0].items.length);
      } else {
        console.error('Invalid cart data:', data);
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  const handleCartClick = () => {
    if (cartCount > 0) {
      navigate('/cart');
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div className={styles.cartButton} onClick={handleCartClick}>
      <img src={cartIcon} alt="Cart Icon"/>
      {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
    </div>
  );
};

export default CartButton;
