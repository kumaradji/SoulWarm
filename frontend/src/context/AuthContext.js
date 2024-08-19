// AuthContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      logout();
      return;
    }

    try {
      const response = await fetch('/api/user/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setIsLoggedIn(true);
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Ошибка при обновлении данных пользователя:', error);
      logout();
    }
  }, [logout]);

  const login = useCallback(async (email, password) => {
    try {
      const response = await fetch('/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login response:', data);
        if (data.token) {
          localStorage.setItem('token', data.token);
          setIsLoggedIn(true);
          await fetchUserData();
          return true;
        } else {
          console.error('Token not found in response');
          setError('Ошибка входа: токен не получен');
          return false;
        }
      } else {
        const errorData = await response.json();
        console.error('Login error:', errorData);
        setError(errorData.message || 'Неверный логин или пароль');
        setLoginAttempts(prevAttempts => prevAttempts + 1);
        return false;
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
      setError('Ошибка входа');
      setLoginAttempts(prevAttempts => prevAttempts + 1);
      return false;
    }
  }, [fetchUserData]);

  const handleRegistration = useCallback(async (username, email, password) => {
    try {
      const response = await fetch('/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, message: data.message };
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Ошибка регистрации');
        return { success: false, error: errorData.error || 'Ошибка регистрации' };
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      setError('Ошибка регистрации');
      return { success: false, error: 'Ошибка регистрации' };
    }
  }, []);

  const handleResetPassword = useCallback(async (email) => {
    try {
      const response = await fetch('/api/reset-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        return { success: true, message: 'Проверьте ваш email для инструкций по сбросу пароля.' };
      } else {
        setError('Ошибка при сбросе пароля');
        return { success: false, error: 'Ошибка при сбросе пароля' };
      }
    } catch (error) {
      console.error('Ошибка при сбросе пароля:', error);
      setError('Ошибка при сбросе пароля');
      return { success: false, error: 'Ошибка при сбросе пароля' };
    }
  }, []);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('/api/verify-token/', {
            method: 'GET',
            headers: {
              'Authorization': `Token ${token}`,
            },
          });
          if (response.ok) {
            await fetchUserData();
          } else {
            throw new Error('Token is invalid');
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          logout();
        }
      } else {
        logout();
      }
    };

    checkTokenValidity();
  }, [fetchUserData, logout]);

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      user,
      login,
      logout,
      fetchUserData,
      handleRegistration,
      handleResetPassword,
      error,
      setError,
      modalMessage,
      setModalMessage,
      isModalOpen,
      setIsModalOpen,
      loginAttempts
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);