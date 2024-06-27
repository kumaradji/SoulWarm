// frontend/src/components/Header/Header.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import UserBlock from './UserBlock/UserBlock';
import { useAuth } from '../../context/AuthContext';

import styles from './Header.module.scss';
import useWindowSize from '../../hooks/useWindowSize';

import logo_black from '../../assets/logo_DushuGreu_black.png';
import logo_white from '../../assets/logo_DushuGreu_white.png';
import fallout_menu_icon from '../../assets/fallout_menu_icon.svg';
import close_icon from '../../assets/closing-icon.png';

const Header = () => {
  const { isLoggedIn, user } = useAuth();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width <= 1360;

  const toggleMenuVisibility = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/auth');
  };

  return (
    <header className={isMenuVisible && isMobile ? 'menu-visible' : ''}>
      <div className={styles.headerContent}>
        <img className={styles.headerLogo} src={isMenuVisible && isMobile ? logo_white : logo_black} alt="Logo ДушуГрею" />

        {!isMobile && <Navbar />}

        <div className={styles.rightSection}>
          {isLoggedIn && user ? (
            <UserBlock
              userName={user.username} // Теперь проверяем, что user определен
              userPicture={user.picture}
            />
          ) : (
            <button className={styles.loginButton} onClick={handleLoginClick}>Войти</button>
          )}
        </div>

        {isMobile && (
          <img src={isMenuVisible ? close_icon : fallout_menu_icon}
               alt="Menu" className={styles.headerMenuIcon}
               onClick={toggleMenuVisibility} />
        )}
      </div>

      {isMenuVisible && isMobile && (
        <div className={styles.dropdownMenuPage}>
          <Navbar />
          {isLoggedIn && user ? (
            <UserBlock
              userName={user.username} // Теперь проверяем, что user определен
              userPicture={user.picture}
            />
          ) : (
            <button className={styles.loginButton} onClick={handleLoginClick}>Войти</button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;