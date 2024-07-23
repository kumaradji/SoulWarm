import React from 'react';
import Slider from 'react-slick';
import styles from './Gallery.module.scss';
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

const Gallery = ({ images }) => {
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
          <div key={index}>
            <img src={image} alt={`Slide ${index}`} className={styles.gallery__image} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Gallery;