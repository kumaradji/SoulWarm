import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuthStatus = () => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setUser(parsedUser);
      } catch (error) {
        console.error('Ошибка при разборе JSON:', error);
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:8000/api/user/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data)); // Обновляем данные в localStorage
      } else {
        console.error('Ошибка при обновлении данных пользователя');
      }
    } catch (error) {
      console.error('Ошибка при обновлении данных пользователя:', error);
    }
  };

  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData)); // Сохранение пользователя в localStorage
    localStorage.setItem('token', token); // Сохранение токена в localStorage
    setIsLoggedIn(true); // Обновление состояния до "вошел в систему"
    setUser(userData); // Установка данных пользователя в состояние
  };

  const logout = () => {
    localStorage.removeItem('user'); // Удаление пользователя из локального хранилища
    localStorage.removeItem('token'); // Удаление токена из локального хранилища
    setIsLoggedIn(false); // Обновление состояния до "не вошел в систему"
    setUser(null); // Удаление данных пользователя из состояния
  };

  useEffect(() => {
    checkAuthStatus();
  }, []); // Пустой массив зависимостей гарантирует, что эффект выполнится только один раз при монтировании

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, checkAuthStatus, fetchUserData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);