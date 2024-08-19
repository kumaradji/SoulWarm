// authFunctions.js
import { useState } from 'react';

export const useAuth = () => {
  const [error, setError] = useState(null);
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const handleLogin = async (email, username, password, login, navigate) => {
    try {
      const response = await fetch('/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: email || username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.user, data.token); // Сохраняем данные пользователя и токен в контексте
        navigate('/');
      } else {
        setError('Неверный логин или пароль');
        setLoginAttempts(prevAttempts => prevAttempts + 1);
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
      setError('Ошибка входа');
      setLoginAttempts(prevAttempts => prevAttempts + 1);
    }
  };

  const handleRegistration = async (password, confirmPassword, username, email, setMode) => {
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      setIsModalOpen(true);
      setModalMessage('Пароли не совпадают');
      return;
    }

    try {
      const response = await fetch('/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setModalMessage(data.message || 'Пожалуйста, проверьте ваш email для подтверждения регистрации.');
        setIsModalOpen(true);
        setMode('login');
      } else {
        setError(data.error || JSON.stringify(data) || 'Ошибка регистрации');
        setIsModalOpen(true);
        setModalMessage(data.error || JSON.stringify(data) || 'Ошибка регистрации');
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      setError('Ошибка регистрации');
      setIsModalOpen(true);
      setModalMessage('Ошибка регистрации');
    }
  };

  const handleResetPassword = async (email, setMode) => {
    try {
      const response = await fetch('/api/reset-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setModalMessage('Проверьте ваш email для инструкций по сбросу пароля.');
        setIsModalOpen(true);
        setMode('login');
      } else {
        setError('Ошибка при сбросе пароля');
      }
    } catch (error) {
      console.error('Ошибка при сбросе пароля:', error);
      setError('Ошибка при сбросе пароля');
    }
  };

  return {
    error,
    modalMessage,
    isModalOpen,
    loginAttempts,
    setError,
    setModalMessage,
    setIsModalOpen,
    handleLogin,
    handleRegistration,
    handleResetPassword
  };
};