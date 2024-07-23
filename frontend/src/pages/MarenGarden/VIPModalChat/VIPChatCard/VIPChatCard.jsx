import React, { useState } from 'react';
import styles from './VIPChatCard.module.scss';
import ModalVIPChat from "../ModalVIPChat";

const VIPChatCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <>
      <div className={styles.chatCard} onClick={handleToggleModal}>
        <h3>ЧАТ для участников мастер-класса</h3>
      </div>
      {isModalOpen && <ModalVIPChat onClose={handleToggleModal} />}
    </>
  );
};

export default VIPChatCard;
