import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './MarenGardenContent.module.scss';

const MarenGardenContent = ({ marenGardenChapters = [] }) => {
  const { chapterId } = useParams();
  const navigate = useNavigate();

  const currentChapter = marenGardenChapters.find(ch => ch.id === parseInt(chapterId));

  const handleChapterChange = (newChapterId) => {
    navigate(`/masterclass/${newChapterId}`);
  };

  if (!currentChapter) {
    return <p>Раздел не найден</p>;
  }

  return (
    <div className={styles.content}>
      <div className={styles.sidebar}>
        <ol>
          {marenGardenChapters.map((chapter) => (
            <li
              key={chapter.id}
              onClick={() => handleChapterChange(chapter.id)}
              className={chapter.id === parseInt(chapterId) ? styles.activeChapter : ''}
            >
              {chapter.title}
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.chapterContent}>
        {currentChapter.content}
      </div>
    </div>
  );
};

export default MarenGardenContent;