// Slider.jsx
import React from 'react';
import { SliderProvider } from '../../context/SliderContext';
import SlideList from './SlideList/SlideList';
import Arrows from './Arrows/Arrows';
import styles from './Slider.module.scss';

const Slider = ({ autoPlay, autoPlayTime, width, height, images }) => {
  return (
    <SliderProvider autoPlay={autoPlay} autoPlayTime={autoPlayTime} width={width} height={height} images={images}>
      <div className={styles.slider} style={{ width, height }}>
        <SlideList />
        <Arrows />
      </div>
    </SliderProvider>
  );
};

export default Slider;