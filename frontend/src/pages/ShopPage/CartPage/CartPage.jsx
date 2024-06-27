import React, { useEffect, useState } from 'react';
import styles from './CartPage.module.scss';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/cart/', {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!cart || !cart.items) return <div>Корзина пуста.</div>;

  return (
    <div className={styles.cartPage}>
      <h1>Корзина</h1>
      {cart.items.length === 0 ? (
        <p>Ваша корзина пуста.</p>
      ) : (
        <ul>
          {cart.items.map(item => (
            <li key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <p>Цена: {item.price} руб.</p>
            </li>
          ))}
        </ul>
      )}
      <p>Общая стоимость: {cart.total_cost} руб.</p>
    </div>
  );
};

export default CartPage;