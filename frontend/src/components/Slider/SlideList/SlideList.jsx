// SlideList.jsx
import React, { useContext } from 'react';
import { SliderContext } from '../../../context/SliderContext';
import styles from './SlideList.module.scss';

const SlideList = () => {
  const { currentSlide, images } = useContext(SliderContext);

  return (
    <div className={styles.slideList} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
      {images.map((image, index) => (
        <div className={styles.slide} key={index}>
          <img src={image.src} alt={image.alt} className={styles.slideImage} />
        </div>
      ))}
    </div>
  );
};

export default SlideList;