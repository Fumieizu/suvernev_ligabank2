import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Login from '../login/login';
import logoPhone from '../../assets/img/logo-phone.svg';
import logoTablet from '../../assets/img/logo-tablet.svg';
import logoDesktop from '../../assets/img/logo-descktop.svg';
import {BreakPoint} from '../../const';
import styles from './header.module.scss';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const burgerHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeButtonHandler = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <button type="button" className={styles.burger} onClick={burgerHandler}/>
        <picture>
          <source srcSet={logoPhone} media={`(max-width: ${BreakPoint.MAX_PHONE}px)`} type="image/svg+xml"/>
          <source srcSet={logoTablet} media={`(max-width: ${BreakPoint.MAX_TABLET}px)`} type="image/svg+xml"/>
          <img className={styles.logo} width="150" height="27" src={logoDesktop} alt="Логотип Лига Банка"/>
        </picture>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link to="/" className={styles.link}>
                Услуги
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/credit" className={styles.link}>
                Рассчитать кредит
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/converter" className={styles.link}>
                Конвертер валют
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/contact" className={styles.link}>
                Контакты
              </Link>
            </li>
            {
              isMenuOpen && (
                <li className={styles.item}>
                  <Link
                    to="/"
                    className={styles.login}
                    onClick={(evt) => {
                      evt.preventDefault();
                      setIsModalOpen(true);
                    }}
                  >
                    Войти в Интернет-банк
                  </Link>
                </li>
              )
            }
          </ul>
        </nav>
        {
          isMenuOpen
            ? (
              <button type="button" className={styles.close_button} onClick={closeButtonHandler}/>
            )
            : (
              <Link
                to="/"
                className={styles.login}
                onClick={(evt) => {
                  evt.preventDefault();
                  setIsModalOpen(true);
                }}
              >
                <span>
                Войти в Интернет-банк
                </span>
              </Link>
            )
        }
      </div>
      <Login isOpen={isModalOpen} onActive={setIsModalOpen}/>
    </header>
  );
}
