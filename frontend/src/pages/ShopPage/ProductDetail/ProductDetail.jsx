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
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/cart/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ product_id: productId })
      });

      if (response.ok) {
        setNotification('Product added to cart');
        setTimeout(() => setNotification(''), 3000); // Уведомление исчезает через 3 секунды
        // Обновляем количество товаров в корзине
        const cartResponse = await fetch('http://localhost:8000/api/cart/', {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        });
        const cartData = await cartResponse.json();
        if (cartData && Array.isArray(cartData.items)) {
          updateCartCount(cartData.items.length);
        } else {
          console.error('Invalid cart data:', cartData);
        }
      } else {
        const errorData = await response.json();
        setNotification(`Failed to add product to cart: ${errorData.error}`);
        setTimeout(() => setNotification(''), 3000); // Уведомление исчезает через 3 секунды
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setNotification('Failed to add product to cart');
      setTimeout(() => setNotification(''), 3000); // Уведомление исчезает через 3 секунды
    }
  };

  if (!product) return <div>Loading...</div>;

  const renderContent = (content) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
  };

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