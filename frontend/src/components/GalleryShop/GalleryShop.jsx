// GalleryShop.jsx
import React, { useState } from 'react';
import Slider from 'react-slick';
import styles from './GalleryShop.module.scss';
import nextIcon from '../../assets/icons/next.png'; // Импорт иконок
import prevIcon from '../../assets/icons/prev.png';

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.nextArrow}`}
      style={{ ...style, display: 'block', background: `url(${nextIcon}) no-repeat center center`, backgroundSize: 'contain' }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.prevArrow}`}
      style={{ ...style, display: 'block', background: `url(${prevIcon}) no-repeat center center`, backgroundSize: 'contain' }}
      onClick={onClick}
    />
  );
};

const GalleryShop = ({ images }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const openFullscreen = (image) => {
    setFullscreenImage(image);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setFullscreenImage(null);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className={styles.gallery}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} onClick={() => openFullscreen(image)}>
            <img src={image} alt={`Slide ${index}`} className={styles.gallery__image} />
          </div>
        ))}
      </Slider>
      {isFullscreen && (
        <div className={styles.fullscreen} onClick={closeFullscreen}>
          <img src={fullscreenImage} alt="Fullscreen" className={styles.fullscreen__image} />
        </div>
      )}
    </div>
  );
};

export default GalleryShop;