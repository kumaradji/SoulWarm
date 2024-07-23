import React, { useState } from 'react';
import styles from './ChatButton.module.scss';
import { FaComments } from 'react-icons/fa';
import ModalChat from './ModalChat/ModalChat';

const ChatButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    console.log('Toggle Modal:', !isModalOpen);
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <>
      <div className={styles.chatButton} onClick={handleToggleModal}>
        <FaComments />
      </div>
      {isModalOpen && <ModalChat onClose={handleToggleModal} />}
    </>
  );
};

export default ChatButton;
