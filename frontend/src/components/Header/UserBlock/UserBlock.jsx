import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import styles from './UserBlock.module.scss';
import user_icon from '../../../assets/user_icon.png';

const UserBlock = ({ userName, setMode }) => {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState(user_icon);

  useEffect(() => {
    if (isLoggedIn && user) {
      fetch(`http://localhost:8000/api/profile/avatar/`, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.avatar) {
            setAvatarUrl(`http://localhost:8000${data.avatar}`);
          }
        })
        .catch(error => {
          console.error('Error fetching avatar:', error);
        });
    }
  }, [isLoggedIn, user]);

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  const handleLoginClick = () => {
    setMode('login');
    navigate('/auth');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className={styles.userBlock}>
      {isLoggedIn ? (
        <>
          <div className={styles.userInfo}>
            <div className={styles.userInfo__details}>
              <div
                className={styles.userInfo__userName}
                onClick={handleProfileClick}
                style={{ cursor: 'pointer' }}
              >
                {userName || 'Пользователь'}
              </div>
              <img
                src={avatarUrl}
                alt="User"
                className={styles.userInfo__userIcon}
              />
            </div>
          </div>
          <button className={styles.logoutButton} onClick={handleLogoutClick}>Выйти</button>
        </>
      ) : (
        <button className={styles.loginButton} onClick={handleLoginClick}>Войти</button>
      )}
    </div>
  );
};

export default UserBlock;
