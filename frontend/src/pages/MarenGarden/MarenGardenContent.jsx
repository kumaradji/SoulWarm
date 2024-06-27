import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './MarenGarden.module.scss';
import MarenGardenList from "./MarenGardenList/MarenGardenList";

const MarenGardenContent = ({ marenGardenChapters = [] }) => {
  const { chapterId } = useParams();

  const chapter = marenGardenChapters.find(ch => ch.id === parseInt(chapterId));

  if (!chapter) {
    return <p>Раздел не найден</p>;
  }

  return (
    <div className={styles.content}>
      <div className={styles.chapterList}>
        <MarenGardenList chapters={marenGardenChapters}/>
      </div>
      <div className={styles.chapterContent}>
        {chapter.content}
      </div>
    </div>
  );
};

export default MarenGardenContent;
