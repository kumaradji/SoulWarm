// Lessons02.js
import React from "react";
import styles from '../../LessonsPage.module.scss';

const Lesson02 = () => {
  return (
    <div>
      <div>
        <p>Листиками можно покрасить любые натуральные материалы: ткань, войлок, кожу, дерево, бумагу, керамику.</p>
        <p>В этом видео вы можете увидеть, как при помощи самодельной протравы из ржавых железок и уксуса я окрашивала
          керамическую вазу.</p>
        <p>На вазе после запаривания остался графический рисунок от листьев малины, земляники, манжетки.</p>
        <p>Таким же образом можно окрашивать кашпо, декоративные тарелки. Не бойтесь экспериментировать.</p>
        <p>Волшебничайте!</p>

        <div>
          <video controls>
            <source
              src="/videos/lessons/Lesson2.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Lesson02;