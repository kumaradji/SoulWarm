import React, { useState, useEffect } from 'react';
import styles from '../../../components/ChatButton/ModalChat/ModalChat.module.scss';

const ModalVIPChat = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchMessages = async () => {
        const response = await fetch('http://localhost:8000/api/vip-messages/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error('Failed to fetch messages');
        }
      };
      fetchMessages();

      const intervalId = setInterval(fetchMessages, 5000);
      return () => clearInterval(intervalId);
    }
  }, []);

  const addMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8000/api/vip-messages/create/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: newMessage, is_admin: false })
    });
    if (response.ok) {
      const data = await response.json();
      addMessage(data);
      setNewMessage('');  // Сброс текста в поле ввода
    } else {
      console.error('Failed to send message');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Чат для участников мастер-класса</h2>
          <div className={styles.modalButton} onClick={onClose}>Закрыть</div>
        </div>
        <div className={styles.chatWindow}>
          {messages.map((message, index) => (
            <div key={index} className={`${styles.message} ${message.is_admin ? styles.adminMessage : styles.userMessage}`}>
              <strong>{message.user}:</strong> {message.content}
              <div className={styles.timestamp}>{new Date(message.timestamp).toLocaleString()}</div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage}>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Введите ваше сообщение..."
            required
          />
          <button className={styles.modalButtonSend} type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default ModalVIPChat;