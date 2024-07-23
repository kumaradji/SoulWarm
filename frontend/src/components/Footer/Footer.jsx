import React from 'react';
import styles from './Footer.module.scss';
import LogoFooter from '../../assets/logo_DushuGreu_white.png';

import Telegram from '../../assets/icons/telegram_icon.png';
import Whatsapp from '../../assets/icons/whatsapp_icon.png';
import Telephone from '../../assets/icons/telephone_icon.png';
import Email from '../../assets/icons/email_icon.png';
import VK from '../../assets/icons/vk_icon.png';


const Footer = () => {
  return (
    <footer>
      <div className={styles.footer}>
        <img className={styles.footer__logo} src={LogoFooter} alt="Logo"/>
        <div className={styles.footer__logo_title}>ДушуГрею</div>
        <div className={styles.footer__title}>
          <h3>
            <div>Давайте волшебничать...</div>
            <div> У Вас всё получится!</div>
          </h3>
        </div>
        <div className={styles.footer__social}>
          <a href="https://t.me/nina_koltsova">
            <img src={Telegram} alt="Telegram"/>
          </a>
          <a href="https://vk.com/ecoprint_koltsova">
            <img src={VK} alt="VK"/>
          </a>
          <a href="https://wa.me/79500423593">
            <img src={Whatsapp} alt="Whatsapp"/>
          </a>
          <a href="tel:+79500423593">
            <img src={Telephone} alt="Telephone"/>
          </a>
          <a href="mailto:koltsovaecoprint@yandex.ru">
            <img src={Email} alt="Email"/>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer