import React, {useState, useRef} from 'react';
import useLocalStorage from '../../hooks/use-local-storage/useLocalStorage';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import bigLogo from '../../assets/img/big-logo.svg';
import styles from './login.module.scss';
import {Link} from 'react-router-dom';

const FieldNames = {
  LOGIN: 'login',
  PASSWORD: 'password',
};

export default function Login({isOpen, onActive}) {
  const [login, setLogin] = useLocalStorage(FieldNames.LOGIN, '');
  const [password, setPassword] = useLocalStorage(FieldNames.PASSWORD, '');
  const [isPassVisible, setIsPassVisible] = useState(false);

  const loginRef = useRef();
  const passwordRef = useRef();

  return(
    <ReactModal
      className={styles.modal}
      isOpen={isOpen}
      onRequestClose={() => onActive(false)}
      onAfterOpen={() => loginRef.current.focus()}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      ariaHideApp={false}
      style={{
        overlay: { backgroundColor: 'rgba(88, 87, 87, 0.6)', zIndex: '10000' },
      }}
    >
      <div className={styles.wrapper}>
        <img width="151" height="31" src={bigLogo} alt="Логотип Лига Банка"/>
        <button
          onClick={() => {
            onActive(false);
          }}
          className={styles.close_button}
          type="button"
        />
      </div>
      <form className={styles.form}>
        <label className={styles.label}>
          <span>Логин</span>
          <input
            className={styles.input}
            type="email"
            value={login}
            ref={loginRef}
            required
            aria-label="Логин"
            onChange={(evt) => {
              setLogin(evt.target.value);
            }}
          />
        </label>
        <label className={styles.label}>
          <span>Пароль</span>
          <input
            className={styles.input}
            type={`${isPassVisible ? 'text' : 'password'}`}
            value={password}
            ref={passwordRef}
            required
            aria-label="Пароль"
            onChange={(evt) => {
              setPassword(evt.target.value);
            }}
          />
          <button
            className={styles.show_password}
            onMouseDown={() => setIsPassVisible(true)}
            onMouseUp={() => setIsPassVisible(false)}
            onMouseLeave={() => setIsPassVisible(false)}
            onTouchStart={() => setIsPassVisible(true)}
            onTouchEnd={() => setIsPassVisible(false)}
            type="button"
          />
        </label>
        <Link className={styles.remember_link} to="">Забыли пароль?</Link>
        <button className={styles.button}>Войти</button>
      </form>
    </ReactModal>
  );
}

Login.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onActive: PropTypes.func.isRequired,
};
