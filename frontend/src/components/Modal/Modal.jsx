import React from 'react';
import styles from './Modal.module.scss';

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <p>{message}</p>
          <button className={styles.modal__button} onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;