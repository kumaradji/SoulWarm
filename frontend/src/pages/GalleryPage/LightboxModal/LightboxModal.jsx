import React, { useState, useEffect } from 'react';
import styles from './LightboxModal.module.scss';

const LightboxModal = ({ images, selectedImageIndex, closeLightbox }) => {
  const [currentIndex, setCurrentIndex] = useState(selectedImageIndex);

  useEffect(() => {
    setCurrentIndex(selectedImageIndex);
  }, [selectedImageIndex]);

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div>
      {selectedImageIndex !== null && (
        <div className={styles.modal}>
          <button className={styles.close} onClick={closeLightbox}>×</button>
          <div className={styles.modal_content}>
            <button className={styles.prev} onClick={prevImage}>&#10094;</button>
            <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} />
            <button className={styles.next} onClick={nextImage}>&#10095;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LightboxModal;