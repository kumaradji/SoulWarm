import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CartButton.module.scss';
import cartIcon from '../../../assets/icons/shopping-cart.png';
import { CartContext } from '../../../context/CartContext';

const CartButton = () => {
  const navigate = useNavigate();
  const { cartCount, updateCartCount } = useContext(CartContext);

  useEffect(() => {
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
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
    navigate('/cart');
  };

  return (
    <div className={styles.cartButton} onClick={handleCartClick}>
      <img src={cartIcon} alt="Cart Icon"/>
      {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
    </div>
  );
};

export default CartButton;