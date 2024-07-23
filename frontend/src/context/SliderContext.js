// SliderContext.js
import React, { createContext, useState, useEffect } from 'react';

const SliderContext = createContext();

const SliderProvider = ({ children, autoPlay, autoPlayTime, width, height, images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
      }, autoPlayTime);

      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayTime, images.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  return (
    <SliderContext.Provider value={{ currentSlide, goToSlide, nextSlide, prevSlide, width, height, images }}>
      {children}
    </SliderContext.Provider>
  );
};

export { SliderContext, SliderProvider };