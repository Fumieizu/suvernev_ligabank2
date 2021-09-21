import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './bid.module.scss';
import InputMask from 'react-input-mask';
import Popup from '../popup/popup';
import useLocalStorage from '../../hooks/use-local-storage/useLocalStorage';
import {FieldName} from '../../const';

const COUNT_LENGTH = 4;

const PurposeName = {
  MORTGAGE: 'Ипотека',
  CAR: 'Автокредит',
};

const PriceName = {
  MORTGAGE: 'недвижимости',
  CAR: 'автомобиля',
};

let count = 1;

export default function Bid({purpose, price, payment, time, onDataSet}) {
  const [name, setName] = useLocalStorage(FieldName.name, '');
  const [phone, setPhone] = useLocalStorage(FieldName.phone, '');
  const [email, setEmail] = useLocalStorage(FieldName.email, '');

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    setIsPopupOpen(true);
    document.body.style = 'overflow: hidden;';
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Шаг 3. Оформление заявки</h3>
        <dl className={styles.list}>
          <dt className={styles.term}>Номер заявки</dt>
          <dd className={styles.value}>№ {count.toString().padStart(COUNT_LENGTH, '0')}</dd>
          <dt className={styles.term}>Цель кредита</dt>
          <dd className={styles.value}>{PurposeName[purpose]}</dd>
          <dt className={styles.term}>Стоимость {PriceName[purpose]}</dt>
          <dd className={styles.value}>{price}</dd>
          <dt className={styles.term}>Первоначальный взнос</dt>
          <dd className={styles.value}>{payment}</dd>
          <dt className={styles.term}>Срок кредитования</dt>
          <dd className={styles.value}>{time}</dd>
        </dl>
        <form className={styles.form} onSubmit={onFormSubmit}>
          <label className={`${styles.label} ${styles.name}`}>
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(evt) => setName(evt.target.value)}
              placeholder="ФИО"
              aria-label="ФИО"
              autoFocus
              required
            />
          </label>
          <label className={styles.label}>
            <InputMask
              className={styles.input}
              value={phone}
              onChange={(evt) => setPhone(evt.target.value)}
              placeholder="Телефон"
              mask="+7 (999) 999-99-99"
              aria-label="Телефон"
              required
            />
          </label>
          <label className={styles.label}>
            <input
              className={styles.input}
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              type="email"
              placeholder="E-mail"
              aria-label="Email"
              required
            />
          </label>
          <div className={styles.button_wrapper}>
            <button className={styles.button}>
              Отправить
            </button>
          </div>
        </form>
        <Popup
          isOpen={isPopupOpen}
          onClose={() => {
            setIsPopupOpen(false);
            onDataSet((state) => ({ ...state, purpose: '' }));
            document.body.style = 'overflow: visible;';
            count++;
          }}
        />
      </div>
    </div>
  );
}

Bid.propTypes = {
  purpose: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  payment: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  onDataSet: PropTypes.func.isRequired,
};
