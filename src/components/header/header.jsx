import React from 'react';
import {Link} from 'react-router-dom';
import logoPhone from '../../assets/img/logo-phone.svg';
import logoTablet from '../../assets/img/logo-tablet.svg';
import logoDesktop from '../../assets/img/logo-descktop.svg';
import {BreakPoint} from '../../const';
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <button className={styles.burger}/>
        <picture>
          <source srcSet={logoPhone} media={`(max-width: ${BreakPoint.MAX_PHONE}px)`} type="image/svg+xml"/>
          <source srcSet={logoTablet} media={`(max-width: ${BreakPoint.MAX_TABLET}px)`} type="image/svg+xml"/>
          <img className={styles.logo} src={logoDesktop} alt="Логотип Лига Банка"/>
        </picture>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link to="/" className={styles.link}>
                Услуги
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/" className={styles.link}>
                Рассчитать кредит
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/" className={styles.link}>
                Конвертер валют
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/" className={styles.link}>
                Контакты
              </Link>
            </li>
          </ul>
        </nav>
        <Link to="/" className={styles.login}>
          <span>
            Войти в Интернет-банк
          </span>
        </Link>
      </div>
    </header>
  );
}
