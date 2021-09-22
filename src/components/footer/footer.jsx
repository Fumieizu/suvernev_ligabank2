import React from 'react';
import SocialList from '../social-list/social-list';
import {BreakPoint} from '../../const';
import logoPhone from '../../assets/img/logo-phone.svg';
import logoTablet from '../../assets/img/logo-tablet.svg';
import logoDesktop from '../../assets/img/logo-descktop.svg';
import styles from './footer.module.scss';
import {Link} from 'react-router-dom';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <ul className={styles.list}>
          <li className={styles.info}>
            <picture>
              <source srcSet={logoPhone} media={`(max-width: ${BreakPoint.MAX_PHONE}px)`} type="image/svg+xml"/>
              <source srcSet={logoTablet} media={`(max-width: ${BreakPoint.MAX_TABLET}px)`} type="image/svg+xml"/>
              <img className={styles.logo} width="150" height="27" src={logoDesktop} alt="Логотип Лига Банка"/>
            </picture>
            <address className={`${styles.text} ${styles.address}`}>
              150015, г. Москва, ул. Московская, д. 32
              Генеральная лицензия Банка России №1050
              Ⓒ Лига Банк, 2019
            </address>
          </li>
          <li className={styles.nav_container}>
            <ul className={styles.nav}>
              <li className={styles.item}>
                <Link className={styles.link} to="/">Услуги</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to="credit">Рассчитать кредит</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to="contact">Контакты</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to="question">Задать вопрос</Link>
              </li>
            </ul>
          </li>
          <li className={`${styles.contacts} ${styles.mobile}`}>
            <p className={styles.title}>*0904</p>
            <p className={styles.text}>Бесплатно для абонентов МТС, Билайн, Мегафон, Теле2</p>
          </li>
          <li className={`${styles.contacts} ${styles.phone}`}>
            <a className={styles.title} href='tel:88001112233'>8 800 111 22 33</a>
            <p className={styles.text}>Бесплатный для всех городов России</p>
          </li>
          <li>
            <SocialList/>
          </li>
        </ul>
      </div>
    </footer>
  );
}
