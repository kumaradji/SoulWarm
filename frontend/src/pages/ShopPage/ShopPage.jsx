import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ShopPage.module.scss';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories/');
        const data = await response.json();
        setCategories(data);
        console.log('Categories:', data); // Выводим категории для проверки
      } catch (error) {
        console.error('Ошибка при получении категорий:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className={styles.shopContainer}>
      <div className={styles.categoriesWrapper}>
        <div className={styles.categoriesContainer}>
          <ul>
            {categories
              .filter(category => {
                return category.id !== 6;
              })
              .map(category => (
                <li key={category.id}>
                  <button
                    className={selectedCategory === category.id ? styles.activeCategory : ''}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            <br/>
            <li>
              <button
                className={selectedCategory === null ? styles.activeCategory : ''}
                onClick={() => setSelectedCategory(null)}
              >
                все категории
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.productsContainer}>
        <div className={styles.productsGrid}>
          {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={styles.productCard}
              >
                <Link to={`/product/${product.id}`}>
                  <div className={styles.productImage}>
                    {product.images && product.images.length > 0 ? (
                      <img src={`http://localhost${product.images[0]}`} alt={product.title} onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/100';
                      }} />
                    ) : (
                      <img src='https://via.placeholder.com/100' alt={product.title} />
                    )}
                  </div>
                  <h3 className={styles.productTitle}>{product.title}</h3>
                  <p className={styles.productDescription}>{product.description}</p>
                  <p className={styles.productPrice}>Цена: {product.price} руб.</p>
                  <button className={styles.productButton}>ПОДРОБНЕЕ</button>
                </Link>
              </div>
            ))
          ) : (
            <h2 className={styles.productNot}>Нет доступных товаров</h2>
          )}
        </div>
      </div>
      <div className={styles.burgerMenu}>
        <button className={styles.burgerButton} onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}>
          {isBurgerMenuOpen ? 'Закрыть категории' : 'Открыть категории'}
        </button>
        {isBurgerMenuOpen && (
          <div className={styles.burgerMenuOpen}>
            <ul>
              {categories
                .filter(category => category.id !== 6)
                .map(category => (
                  <li key={category.id}>
                    <button
                      className={selectedCategory === category.id ? styles.activeCategory : ''}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              <br />
              <li>
                <button
                  className={selectedCategory === null ? styles.activeCategory : ''}
                  onClick={() => setSelectedCategory(null)}
                >
                  все категории
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
