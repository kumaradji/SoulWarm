import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import styles from './LightboxModal.module.scss';

const LightboxModal = ({ images, selectedImageIndex, closeLightbox }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closeLightbox]);

  return (
    <div>
      {selectedImageIndex !== null && (
        <div className={styles.modal}>
          <button className={styles.close} onClick={closeLightbox}>×</button>
          <Swiper
            initialSlide={selectedImageIndex}
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className={styles.swiper}
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <img src={src} alt={`Image ${index + 1}`} className={styles.image} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default LightboxModal;
