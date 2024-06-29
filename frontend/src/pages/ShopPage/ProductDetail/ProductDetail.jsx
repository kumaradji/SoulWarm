import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductDetail.module.scss';
import VerticalGallery from '../../../components/VerticalGallery/VerticalGallery';

const ProductDetail = ({ updateCartCount }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/${productId}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setNotification('Failed to load product details');
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setNotification('Пожалуйста, войдите в систему');
      setTimeout(() => setNotification(''), 3000);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/cart/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ product_id: productId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Ошибка при добавлении товара в корзину');
      }

      setNotification('Товар добавлен в корзину');
      setTimeout(() => setNotification(''), 3000);

      await updateCartData(token);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setNotification(error.message || 'Не удалось добавить товар в корзину');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const updateCartData = async (token) => {
    try {
      const cartResponse = await fetch('http://localhost:8000/api/cart/', {
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
      console.error('Error fetching cart data:', error);
    }
  };

  const renderContent = (content) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
  };

  if (!product) return <div>Загрузка...</div>;

  return (
    <div className={styles.productDetail}>
      {notification && <div className={styles.notification}>{notification}</div>}
      <div className={styles.productImages}>
        {product.images && product.images.length > 0 && (
          <VerticalGallery images={product.images.map(image => `http://localhost:8000${image}`)} />
        )}
      </div>

      <div className={styles.productInfo}>
        <h1>{product.title}</h1>
        <div className={styles.productContent}>
          {renderContent(product.content)}
          <p className={styles.productPrice}>Цена: {product.price} руб.</p>
        </div>
        <button className={styles.addToCartButton} onClick={addToCart}>Добавить в корзину</button>
      </div>
    </div>
  );
};

export default ProductDetail;