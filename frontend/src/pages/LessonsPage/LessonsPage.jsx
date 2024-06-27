import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './LessonsPage.module.scss';
import lessons from './LessonPage/Lessons';

export const LessonsPage = () => {
  return (
    <div className={styles.lessons}>
      <h1>Бесплатные уроки</h1>
      <p>В этих уроках я рассказываю о важнейших этапах создания экопринта.</p>
      <div className={styles.lessons__card}>
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            className={styles.lessons__items}
            initial={{ opacity: index < 2 ? 1 : 0, x: index % 2 === 0 ? '-100vw' : '100vw' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 360 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            <Link to={`/lesson/${lesson.id}`} >
              <h2 className={styles.lessons__items_title}>{lesson.title}</h2>
              <div className={styles.lessons__items_image}>
                <img src={lesson.image} alt={lesson.title} onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/100';
                }} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LessonsPage;