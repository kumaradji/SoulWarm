// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  };

  const checkAuthStatus = () => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setUser(parsedUser);
        fetchUserData(); // Обновляем данные пользователя с сервера
      } catch (error) {
        console.error('Ошибка при разборе JSON:', error);
        logout();
      }
    } else {
      logout();
    }
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      logout();
      return;
    }

    try {
      const response = await fetch('/api/user/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Ошибка при обновлении данных пользователя:', error);
      logout();
    }
  };

  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    setUser(userData);
  };

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:8000/api/verify-token/', {
            method: 'GET',
            headers: {
              'Authorization': `Token ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error('Token is invalid');
          }
          checkAuthStatus();
        } catch (error) {
          console.error('Token validation failed:', error);
          logout();
        }
      } else {
        logout();
      }
    };

    checkTokenValidity();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, checkAuthStatus, fetchUserData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);