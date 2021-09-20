import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './select.module.scss';

const CreditType = {
  DEFAULT: 'Выберите цель кредита',
  MORTGAGE: 'Ипотечное кредитование',
  CAR: 'Автомобильное кредитование',
};

const Keys = {
  SPACE: 'Space',
  ENTER: 'Enter',
};

export default function Select({activeType, onActiveType}) {
  const [isOpen, setIsOpen] = useState(false);

  const onInputKeydown = (evt) => {
    if (evt.code === Keys.SPACE || evt.code === Keys.ENTER) {
      evt.preventDefault();
      onActiveType(evt.target.value);
      setIsOpen(false);
    }
  };

  const onLabelClick = (evt) => {
    onActiveType(evt.target.htmlFor.toUpperCase());
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${isOpen && styles.button_active}`}
        onClick={() => setIsOpen((state) => !state)}
        type="button"
      >
        {CreditType[activeType]}
      </button>
      {isOpen && (
        <ul className={styles.list}>
          <li className={styles.item}>
            <input
              className={`visually-hidden ${styles.input}`}
              onKeyDown={onInputKeydown}
              id="mortgage"
              type="radio"
              name="credit"
              value="MORTGAGE"
            />
            <label
              className={styles.label}
              htmlFor="mortgage"
              onClick={onLabelClick}
            >
              {CreditType.MORTGAGE}
            </label>
          </li>
          <li className={styles.item}>
            <input
              className={`visually-hidden ${styles.input}`}
              onKeyDown={onInputKeydown}
              id="car"
              type="radio"
              name="credit"
              value="CAR"
            />
            <label
              className={styles.label}
              onClick={onLabelClick}
              htmlFor="car"
            >
              {CreditType.CAR}
            </label>
          </li>
        </ul>
      )}
    </div>
  );
}

Select.propTypes = {
  activeType: PropTypes.string.isRequired,
  onActiveType: PropTypes.func.isRequired,
};
