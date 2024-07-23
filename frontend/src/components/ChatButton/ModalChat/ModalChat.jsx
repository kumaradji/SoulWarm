import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Используем useNavigate из React Router
import styles from './ModalChat.module.scss';
import Modal from '../../Modal/Modal';

const ModalChat = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const lastMessageId = useRef(0);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [isPolling, setIsPolling] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Используем useNavigate для навигации

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const fetchMessages = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/messages/', {
            headers: {
              'Authorization': `Token ${token}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            setMessages(data);
            if (data.length > 0) {
              lastMessageId.current = data[data.length - 1].id;
            }
          } else {
            console.error('Failed to fetch messages');
          }
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
      fetchMessages();
      longPolling();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const longPolling = async () => {
    while (isPolling) {
      const controller = new AbortController();
      try {
        console.log('Polling for new messages...');
        const response = await fetch(`http://localhost:8000/api/long-polling/messages/?last_message_id=${lastMessageId.current}`, {
          signal: controller.signal
        });
        if (response.ok) {
          const newMessages = await response.json();
          console.log('Received new messages:', newMessages);
          if (newMessages.length > 0) {
            setMessages(prevMessages => {
              const messageIds = new Set(prevMessages.map(msg => msg.id));
              const filteredNewMessages = newMessages.filter(msg => !messageIds.has(msg.id));
              return [...prevMessages, ...filteredNewMessages];
            });
            lastMessageId.current = newMessages[newMessages.length - 1].id;
            console.log('Updated lastMessageId:', lastMessageId.current);
          } else {
            console.log('No new messages');
          }
        } else {
          console.error('Error in long polling response:', response.status, response.statusText);
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Polling aborted');
        } else {
          console.error('Error during long polling:', error);
        }
      }

      console.log('Waiting for 5 seconds before next poll...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setShowModal(true);
      return;
    }
    const response = await fetch('http://localhost:8000/api/messages/create/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: newMessage, is_admin: false })
    });
    if (response.ok) {
      const data = await response.json();
      setMessages(prevMessages => {
        const messageExists = prevMessages.some(msg => msg.id === data.id);
        if (!messageExists) {
          return [...prevMessages, data];
        }
        return prevMessages;
      });
      setNewMessage('');
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

  const handleRegisterRedirect = () => {
    setShowModal(false);
    onClose(); // Закрываем окно
    navigate('/auth'); // Перенаправляем пользователя на страницу регистрации
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Давайте поболтаем</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        {isAuthenticated ? (
          <>
            <div className={styles.chatWindow}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${styles.message} ${message.is_admin ? styles.adminMessage : styles.userMessage} ${message.user_name === localStorage.getItem('username') ? styles.myMessage : styles.theirMessage}`}
                >
                  <strong>{message.user_name || "Unknown"}:</strong> {message.content}
                  <div className={styles.timestamp}>{new Date(message.timestamp).toLocaleString()}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className={styles.chatInput}>
              <textarea
                ref={textareaRef}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Введите ваше сообщение..."
                required
              />
              <button className={styles.modalButtonSend} type="submit">Отправить</button>
            </form>
          </>
        ) : (
          <div className={styles.authRequired}>
            <p>Для общения в чате вы должны зарегистрироваться.</p>
            <button type="button" onClick={handleRegisterRedirect} className={styles.modalButtonSend}>Зарегистрироваться</button>
          </div>
        )}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          message={
            <div>
              Для отправки сообщений вы должны зарегистрироваться.
              <button type="button" onClick={handleRegisterRedirect} className={styles.modalButtonSend}>Зарегистрироваться</button>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default ModalChat;
