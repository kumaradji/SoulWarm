import React, { useState } from 'react';
import styles from './VIPChatCard.module.scss';
import ModalVIPChat from "../ModalVIPChat";

const VIPChatCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.chatCard} onClick={handleOpenModal}>
        <h3>ЧАТ для участников мастер-класса</h3>
      </div>
      {isModalOpen && <ModalVIPChat onClose={handleCloseModal} />}
    </>
  );
};

export default VIPChatCard;