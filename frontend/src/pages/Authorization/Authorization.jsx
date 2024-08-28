import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Authorization.module.scss';
import Modal from '../../components/Modal/Modal.jsx';
import { handleLogin, handleRegistration, handleResetPassword } from './authFunctions';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Authorization = ({ initialMode = 'login', setAuthMode }) => {
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
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth();

  useEffect(() => {
    if (isLoggedIn && mode !== 'changePassword') {
      navigate('/');
    }
  }, [isLoggedIn, navigate, mode]);

  useEffect(() => {
    if (setAuthMode) {
      setAuthMode(mode);
    }
  }, [mode, setAuthMode]);

  const validateUsername = (username) => {
    if (username.includes(' ')) {
      setError('Имя пользователя не должно содержать пробелов');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (mode === 'register' && !validateUsername(username)) {
      setIsModalOpen(true);
      setModalMessage('Имя пользователя не должно содержать пробелов');
      return;
    }

    try {
      switch (mode) {
        case 'login':
          await handleLogin(email, username, password, login, navigate, setError, setLoginAttempts);
          break;
        case 'register':
          if (isCheckboxChecked) {
            await handleRegistration(
              password,
              confirmPassword,
              username,
              email,
              setError,
              setModalMessage,
              setIsModalOpen,
              login,
              navigate
            );
          } else {
            setError('Пожалуйста, дайте согласие на обработку персональных данных');
          }
          break;
        default:
          console.error('Неизвестный режим:', mode);
      }
    } catch (error) {
      console.error('Ошибка при обработке формы:', error);
      setError('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
    }
  };

  return (
    <div className={styles.registrationForm}>
      <div className={styles.registrationContainer}>
        <div className={styles.registrationFormWrapper}>
          <h2>{mode === 'login' ? 'Войти' : 'Зарегистрироваться'}</h2>
          {error && <div className={styles.error}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="text"
                id="username"
                placeholder="Имя пользователя или Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            {mode === 'register' && (
              <div className={styles.formGroup}>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}
            <div className={styles.formGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash/> : <FaEye/>}
                </span>
              </div>
              {mode === 'register' && (
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    placeholder="Подтвердите пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <span
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash/> : <FaEye/>}
                  </span>
                </div>
              )}
            </div>
            {mode === 'register' && (
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="agreement"
                  checked={isCheckboxChecked}
                  onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                  required
                />
                <label htmlFor="agreement">
                  Я даю согласие на обработку персональных данных и соглашаюсь с
                  <br/>
                  <Link className={styles.privacyPolicyLink} to="/privacy-policy"> Политикой обработки персональных
                    данных</Link>
                </label>
              </div>
            )}
            <div className={styles.buttonContainer}>
              <button type="submit" disabled={mode === 'register' && !isCheckboxChecked}>
                {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
              </button>
              {mode === 'login' ? (
                <button type="button" onClick={() => setMode('register')}>Зарегистрироваться</button>
              ) : (
                <button type="button" onClick={() => setMode('login')}>Войти</button>
              )}
            </div>
          </form>
        </div>
      </div>
      {loginAttempts >= 5 && (
        <div className={styles.passwordOptions}>
          <button type="button"
                  onClick={(e) => handleResetPassword(e, email, setError, setModalMessage, setIsModalOpen, setMode)}>Сбросить
            пароль
          </button>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </div>
  );
};

export default Authorization;