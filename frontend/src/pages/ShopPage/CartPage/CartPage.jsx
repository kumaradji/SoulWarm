import React, { useEffect, useState, useContext } from 'react';
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

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!cart || !cart.items || cart.items.length === 0) return <div>Корзина пуста.</div>;

  return (
    <div className={styles.cartPage}>
      <h1>Корзина</h1>
      <ul>
        {cart.items.map(item => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>Цена: {item.price} руб.</p>
            <button onClick={() => removeFromCart(item.id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <p>Общая стоимость: {cart.total_cost} руб.</p>
    </div>
  );
};

export default CartPage;
