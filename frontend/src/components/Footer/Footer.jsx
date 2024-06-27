import React from 'react';
import styles from './Footer.module.scss';
import LogoFooter from '../../assets/logo_DushuGreu_white.png';
import Telegram from '../../assets/telegram_footer.png';
import Whatsapp from '../../assets/whatsapp_footer.png';
import Telephone from '../../assets/phone_footer.png';
import Email from '../../assets/mail_footer.png';


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
          {/*<h4>*/}
          {/*  +7 950 042 35 93 ------ koltsovaecoprint@yandex.ru*/}
          {/*</h4>*/}
        </div>
        <div className={styles.footer__social}>
          <a href="https://t.me/nina_koltsova">
            <img src={Telegram} alt="Telegram"/>
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