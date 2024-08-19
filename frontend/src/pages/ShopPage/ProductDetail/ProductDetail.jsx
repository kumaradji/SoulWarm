import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styles from './ProductDetail.module.scss';
import VerticalGallery from '../../../components/VerticalGallery/VerticalGallery';
import { CartContext } from '../../../context/CartContext';
import { AuthContext } from "../../../context/AuthContext";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [notification, setNotification] = useState('');
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}/`);
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
    if (isLoggedIn) {
      addToCart(product);
      setNotification('Товар добавлен в корзину');
      setTimeout(() => setNotification(''), 3000);
    } else {
      // Перенаправление на страницу входа
      navigate('/profile', { state: { from: location.pathname } });
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
      <div className={styles.productContent}>
        <div className={styles.productImages}>
          {product.images && product.images.length > 0 && (
            <VerticalGallery images={product.images} />
          )}
        </div>

        <div className={styles.productInfo}>
          <h1>{product.title}</h1>
          <div className={styles.productText}>
            {renderContent(product.content)}
            <p className={styles.productPrice}>Цена: {product.price} руб.</p>
          </div>
          <button className={styles.addToCartButton} onClick={handleAddToCart}>
            {isLoggedIn ? 'Добавить в корзину' : 'Войти для покупки'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;