import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './ChangePassword.module.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Новые пароли не совпадают');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Получаем токен из локального хранилища
      const response = await fetch('http://localhost:8000/api/change-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`, // Передаем токен в заголовке
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (response.ok) {
        setSuccess('Пароль успешно изменен');
        setTimeout(() => navigate('/profile'), 2000); // Перенаправляем на профиль через 2 секунды
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Ошибка при изменении пароля');
      }
    } catch (error) {
      console.error('Ошибка при изменении пароля:', error);
      setError('Ошибка при изменении пароля');
    }
  };

  return (
    <div className={styles.changePassword}>
      <div className={styles.changePasswordContainer}>
        <div className={styles.changePasswordFormWrapper}>
          <h2>Изменить пароль</h2>
          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}
          <form onSubmit={handleChangePassword}>
            <div className={styles.formGroup}>
              <label htmlFor="currentPassword">Текущий пароль:</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <span
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="newPassword">Новый пароль:</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <span
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Подтвердите новый пароль:</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <button type="submit">Изменить пароль</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;