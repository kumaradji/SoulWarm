// Slider.jsx
import React from 'react';
import { SliderProvider } from '../../context/SliderContext';
import SlideList from './SlideList/SlideList';
import styles from './Slider.module.scss';

const Slider = ({ autoPlay, autoPlayTime, images }) => {
  return (
    <SliderProvider autoPlay={autoPlay} autoPlayTime={autoPlayTime} images={images}>
      <div className={styles.slider}>
        <SlideList />
      </div>
    </SliderProvider>
  );
};

export default Slider;
