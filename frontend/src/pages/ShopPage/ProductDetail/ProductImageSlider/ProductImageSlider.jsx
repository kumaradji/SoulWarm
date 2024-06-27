// ProductImageSlider.jsx
import React from 'react';
import { SliderProvider } from '../../../../context/SliderContext';

import styles from './ProductImageSlider.module.scss';
import SlideList from "../../../../components/Slider/SlideList/SlideList";
import Arrows from "../../../../components/Slider/Arrows/Arrows";

const ProductImageSlider = ({ images }) => {
  const formattedImages = images.map((url, index) => ({
    src: url,
    alt: `Product Image ${index + 1}`
  }));

  return (
    <SliderProvider autoPlay={true} autoPlayTime={4000} width="600px" height="200px" images={formattedImages}>
      <div className={styles.slider}>
        <SlideList />
        <Arrows />
      </div>
    </SliderProvider>
  );
};

export default ProductImageSlider;