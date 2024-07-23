import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './GalleriesList.module.scss';
import galleries from '../galleries'; // Import the galleries array

const GalleriesList = () => {
  return (
    <div className={styles.galleries}>
      <h1>Галереи фотографий</h1>
      <div className={styles.galleries__container}>
        {galleries.map((gallery, index) => (
          <motion.div
            key={gallery.id}
            className={styles.galleries__item}
            initial={{ opacity: index < 2 ? 1 : 0, x: index % 2 === 0 ? '-100vw' : '100vw' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            <Link to={`/gallery/${gallery.id}`}>
              <h2 className={styles.galleries__item_title}>{gallery.title}</h2>
              <div className={styles.galleries__item_image}>
                <img src={gallery.items[0].src} alt={gallery.items[0].alt} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GalleriesList;