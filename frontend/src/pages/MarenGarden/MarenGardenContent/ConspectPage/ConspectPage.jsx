// ConspectPage.jsx
import React from 'react';
import styles from './ConspectPage.module.scss';

const ConspectPage = () => {
  return (
    <div className={styles.conspectPage}>
      <h2>13. Конспекты.</h2>
      <div className={styles.conspectsContainer}>
        <div className={styles.conspectItem}>
          <h2>Конспект "Цветной фон"</h2>
          <div className={styles.iframeContainer}>
            <iframe
              src="https://drive.google.com/file/d/1HwMy7gnpbNqDNwwYKAFkgegMJnwyjp0K/preview"
              allow="autoplay"
            ></iframe>
          </div>
          <h4>Скачайте файл, нажав на кнопку ниже.</h4>
          <a
            href="https://drive.google.com/uc?export=download&id=1HwMy7gnpbNqDNwwYKAFkgegMJnwyjp0K"
            className={styles.downloadButton}
            download
          >
            Скачать конспект "Цветной фон"
          </a>
        </div>
        <div className={styles.conspectItem}>
          <h2>Конспект "Цветной фон"</h2>
          <div className={styles.iframeContainer}>
            <iframe
              src="https://drive.google.com/file/d/16n-r79FSDTSoo2bt2c2_kcwrQmLcHnaC/preview"
              allow="autoplay"
            ></iframe>
          </div>
          <h4>Скачайте файл, нажав на кнопку ниже.</h4>
          <a
            href="https://drive.google.com/uc?export=download&id=16n-r79FSDTSoo2bt2c2_kcwrQmLcHnaC"
            className={styles.downloadButton}
            download
          >
            Скачать конспект "Цветной фон"
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConspectPage;
