import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './MarenGardenList.module.scss';

const MarenGardenList = ({ chapters = [] }) => {
  const { chapterId } = useParams();

  return (
    <div className={styles.sidebar}>
      <ul className={styles.chapterList}>
        {chapters.map((chapter) => (
          <li key={chapter.id} className={chapter.id === parseInt(chapterId) ? styles.activeChapter : ''}>
            <Link to={`/masterclass/${chapter.id}`}>
              {chapter.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarenGardenList;
