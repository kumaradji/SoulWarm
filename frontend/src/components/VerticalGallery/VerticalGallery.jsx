import React, { useState } from 'react';
import styles from './VerticalGallery.module.scss';

const VerticalGallery = ({ images }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(null);

  const openFullscreen = (index) => {
    setFullscreenImageIndex(index);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setFullscreenImageIndex(null);
  };

  const nextImage = () => {
    setFullscreenImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setFullscreenImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.verticalGallery}>
      <div className={styles.mainImage} onClick={() => openFullscreen(0)}>
        <img src={images[0]} alt="Main" />
      </div>
      <div className={styles.thumbnails}>
        {images.map((image, index) => (
          <div key={index} className={styles.imageContainer} onClick={() => openFullscreen(index)}>
            <img src={image} alt={`Image ${index}`} className={styles.image} />
          </div>
        ))}
      </div>
      {isFullscreen && (
        <div className={styles.fullscreen} onClick={closeFullscreen}>
          <button className={styles.prevButton} onClick={(e) => { e.stopPropagation(); prevImage(); }}>‹</button>
          <img src={images[fullscreenImageIndex]} alt="Fullscreen" className={styles.fullscreenImage} />
          <button className={styles.nextButton} onClick={(e) => { e.stopPropagation(); nextImage(); }}>›</button>
        </div>
      )}
    </div>
  );
};

export default VerticalGallery;