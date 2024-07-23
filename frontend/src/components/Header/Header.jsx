import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import UserBlock from './UserBlock/UserBlock';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.scss';
import useWindowSize from '../../hooks/useWindowSize';
import logo_black from '../../assets/logo_DushuGreu_black.png';
import logo_white from '../../assets/logo_DushuGreu_white.png';
import burger_menu_icon from '../../assets/icons/burger_menu_icon.png';
import close_icon from '../../assets/icons/close_icon.png';
import Telegram from '../../assets/icons/telegram_icon.png';
import Whatsapp from '../../assets/icons/whatsapp_icon.png';
import Telephone from '../../assets/icons/telephone_icon.png';
import Email from '../../assets/icons/email_icon.png';
import VK from '../../assets/icons/vk_icon.png';

const Header = () => {
  const { isLoggedIn, user } = useAuth();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width <= 767; // Измените значение на нужное
  const navigate = useNavigate();
  const location = useLocation();

  const openMenu = () => setIsMenuVisible(true);
  const closeMenu = () => setIsMenuVisible(false);

  const handleLoginClick = () => {
    navigate('/auth');
  };

  return (
    <header className={isMenuVisible && isMobile ? styles.menuVisible : ''}>
      <div className={styles.headerContent}>
        <img className={styles.headerLogo} src={isMenuVisible && isMobile ? logo_white : logo_black} alt="Logo ДушуГрею" />
        {!isMobile && <Navbar />}
        <div className={`${styles.rightSection} ${isMobile ? styles.hideOnMobile : ''}`}>
          {isLoggedIn && user ? (
            <UserBlock userName={user.username} userPicture={user.picture} />
          ) : (
            location.pathname !== '/auth' && (
              <button className={styles.loginButton} onClick={handleLoginClick}>
                Войти
              </button>
            )
          )}
        </div>
        {isMobile && (
          <>
            {isMenuVisible ? (
              <img src={close_icon} alt="Close" onClick={closeMenu} className={styles.headerMenuIcon} />
            ) : (
              <img src={burger_menu_icon} alt="Menu" onClick={openMenu} className={styles.headerMenuIcon} />
            )}
          </>
        )}
      </div>
      {isMenuVisible && isMobile && (
        <div className={styles.dropdownMenuPage}>
          <div className={styles.userBlockWrapper}>
            {isLoggedIn && user ? (
              <UserBlock userName={user.username} userPicture={user.picture} />
            ) : (
              <button className={styles.loginButton} onClick={handleLoginClick}>
                Войти
              </button>
            )}
          </div>
          <Navbar />
          <div className={styles.footer__social}>
            <a href="https://t.me/nina_koltsova">
              <img src={Telegram} alt="Telegram" />
            </a>
            <a href="https://vk.com/ecoprint_koltsova">
              <img src={VK} alt="VK" />
            </a>
            <a href="https://wa.me/79500423593">
              <img src={Whatsapp} alt="Whatsapp" />
            </a>
            <a href="tel:+79500423593">
              <img src={Telephone} alt="Telephone" />
            </a>
            <a href="mailto:koltsovaecoprint@yandex.ru">
              <img src={Email} alt="Email" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
