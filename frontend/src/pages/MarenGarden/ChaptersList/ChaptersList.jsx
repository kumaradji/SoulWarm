// ChaptersList.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './ChaptersList.module.scss';

const ChaptersList = ({ chapters }) => {
  return (
    <div className={styles.chaptersList}>
      {chapters.map((chapter) => (
        <NavLink
          key={chapter.id}
          to={`/masterclass/${chapter.id}`}
          className={({ isActive }) =>
            isActive ? `${styles.chapterLink} ${styles.activeChapter}` : styles.chapterLink
          }
        >
          {chapter.title}
        </NavLink>
      ))}
    </div>
  );
};

export default ChaptersList;