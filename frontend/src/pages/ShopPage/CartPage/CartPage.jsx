import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './CartPage.module.scss';
import { CartContext } from '../../../context/CartContext';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { updateCartCount } = useContext(CartContext);

  const fetchCart = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/cart/', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }
      const data = await response.json();
      setCart(Array.isArray(data) ? data[0] : data);
      updateCartCount(Array.isArray(data) ? data[0].items.length : data.items.length);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeFromCart = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/cart/remove/${itemId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
      // Обновляем корзину после удаления товара
      await fetchCart();
    } catch (error) {
      console.error('Error removing item from cart:', error);
      setError(error.message);
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      return total + itemPrice;
    }, 0).toFixed(2);
  };


  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!cart || !cart.items || cart.items.length === 0) return <div>Корзина пуста.</div>;

  return (
    <div className={styles.cartPage}>
      <h1>Корзина</h1>
      <div className={styles.cartContainer}>
        <div className={styles.cartItems}>
          {cart.items.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.cartItemImage}>
                <Link to={`/product/${item.id}`}>
                  {item.images && item.images.length > 0 ? (
                    <img src={item.images[0].image} alt={item.title} onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/100';
                    }} />
                  ) : (
                    <img src='https://via.placeholder.com/100' alt={item.title} />
                  )}
                </Link>
              </div>
              <div className={styles.cartItemDetails}>
                <h2>{item.title}</h2>
                <div className={styles.cartItemPrice}>
                  <p>Цена: {item.price} руб.</p>
                  <button className={styles.removeButton} onClick={() => removeFromCart(item.id)}>Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.cartSummary}>
          <div className={styles.summaryDetails}>
            <div className={styles.totalPrice}>Товаров на сумму: {calculateTotal()} руб.</div>
            <div className={styles.totalItems}>Количество товаров: {cart.items.length} шт.</div>
          </div>
          <button className={styles.checkoutButton}>Перейти к оформлению</button>
          <button className={styles.buyInOneClickButton}>Купить в 1 клик</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
