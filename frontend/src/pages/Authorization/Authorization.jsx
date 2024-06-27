import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Authorization.module.scss';
import registrationImage from '../../assets/LoginPic.png';
import Modal from '../../components/Modal/Modal.jsx';
import { handleLogin, handleRegistration, handleResetPassword } from './authFunctions';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Authorization = ({ initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth();

  useEffect(() => {
    if (isLoggedIn && mode !== 'changePassword') {
      navigate('/');
    }
  }, [isLoggedIn, navigate, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (mode) {
      case 'login':
        handleLogin(e, email, username, password, login, navigate, setError, setLoginAttempts);
        break;
      case 'register':
        handleRegistration(e, password, confirmPassword, username, email, setError, setModalMessage, setIsModalOpen, setMode);
        break;
      default:
        console.error('Неизвестный режим:', mode);
    }
  };

  return (
    <div className={styles.registrationForm}>
      <div className={styles.registrationContainer}>
        <div className={styles.registrationFormWrapper}>
          <h2>{mode === 'login' ? 'Войти' : 'Зарегистрироваться'}</h2>
          {error && <div className={styles.error}>{error}</div>}
          <form onSubmit={handleSubmit}>
            {(mode === 'login' || mode === 'register') && (
              <div className={styles.formGroup}>
                <label htmlFor="username">Имя пользователя или Email:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}
            {(mode === 'register') && (
              <div className={styles.formGroup}>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}
            {(mode === 'login' || mode === 'register') && (
              <div className={styles.formGroup}>
                <label htmlFor="password">Пароль:</label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPassword ? 'text' : 'password'} // Переключение типа поля
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
            )}
            {mode === 'register' && (
              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Подтвердите пароль:</label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPassword ? 'text' : 'password'} // Переключение типа поля
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
            )}
            <button type="submit">
              {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </button>
            {mode === 'login' ? (
              <button type="button" onClick={() => setMode('register')}>Зарегистрироваться</button>
            ) : (
              <button type="button" onClick={() => setMode('login')}>Войти</button>
            )}
          </form>
        </div>
      </div>

      <div className={styles.registrationImage}>
        <img src={registrationImage} alt="Registration Image"/>
        {mode === 'register' && (
          <div className={styles.privacyPolicy}>
            <p>
              Нажимая на кнопку "Зарегистрироваться",
              вы соглашаетесь с нашей
            </p>
            <p>
              <Link className={styles.privacyPolicyLink} to="/privacy-policy"> Политикой
                обработки персональных данных</Link>
            </p>
          </div>
        )}
      </div>

      {loginAttempts >= 5 && (
        <div className={styles.passwordOptions}>
          <button type="button" onClick={(e) => handleResetPassword(e, email, setError, setModalMessage, setIsModalOpen, setMode)}>Сбросить пароль</button>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </div>
  );
}

export default Authorization;