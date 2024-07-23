import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductDetail.module.scss';
import VerticalGallery from '../../../components/VerticalGallery/VerticalGallery';
import { CartContext } from '../../../context/CartContext';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [notification, setNotification] = useState('');
  const { addToCart } = useContext(CartContext);

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

  const handleAddToCart = () => {
    addToCart(product);
    setNotification('Товар добавлен в корзину');
    setTimeout(() => setNotification(''), 3000);
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
      <div className={styles.productContent}>
        <div className={styles.productImages}>
          {product.images && product.images.length > 0 && (
            <VerticalGallery images={product.images.map(image => `http://localhost:8000${image}`)} />
          )}
        </div>

        <div className={styles.productInfo}>
          <h1>{product.title}</h1>
          <div className={styles.productText}>
            {renderContent(product.content)}
            <p className={styles.productPrice}>Цена: {product.price} руб.</p>
          </div>
          <button className={styles.addToCartButton} onClick={handleAddToCart}>Добавить в корзину</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;