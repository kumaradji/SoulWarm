import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './LessonPage.module.scss';
import lessons from "./Lessons";

const LessonPage = () => {
  const { lessonId } = useParams();
  const lesson = lessons.find(lesson => lesson.id === parseInt(lessonId));

  if (!lesson) {
    return <div>Урок не найден</div>;
  }

  const { title, component } = lesson;

  return (
    <div className={styles.lesson}>
      <h1>{title}</h1>
      <div className={styles.lesson__content}>
        {component}
      </div>
    </div>
  );
};

export default LessonPage;