import React, { useState } from 'react';
import styles from './ChatButton.module.scss';
import { FaComments } from 'react-icons/fa';
import ModalChat from './ModalChat/ModalChat';

const ChatButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.chatButton} onClick={handleOpenModal}>
        <FaComments />
      </div>
      {isModalOpen && <ModalChat onClose={handleCloseModal} />}
    </>
  );
};

export default ChatButton;