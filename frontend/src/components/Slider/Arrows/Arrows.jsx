// Arrows.jsx
import React, { useContext } from 'react';
import { SliderContext } from '../../../context/SliderContext';
import styles from './Arrows.module.scss';

import leftArrowIcon from '../../../assets/icons/arrow_left.svg';
import rightArrowIcon from '../../../assets/icons/arrow_right.svg';

const Arrows = () => {
  const { nextSlide, prevSlide } = useContext(SliderContext);

  return (
    <div className={styles.arrows}>
      <button className={styles.arrow} onClick={prevSlide}>
        <img src={leftArrowIcon} alt="Previous" />
      </button>
      <button className={styles.arrow} onClick={nextSlide}>
        <img src={rightArrowIcon} alt="Next" />
      </button>
    </div>
  );
};

export default Arrows;