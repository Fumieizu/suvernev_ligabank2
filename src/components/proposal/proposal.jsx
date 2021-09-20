import React from 'react';
import PropTypes from 'prop-types';
import {SumName} from '../../const';
import styles from './proposal.module.scss';

export default function Proposal({purpose, sum, percent, payment, profit, disabled}) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Наше предложение</h3>
      <div className={styles.inner}>
        <div>
          <div className={styles.subtitle}>{sum}</div>
          <div>Сумма {SumName[purpose]}</div>
        </div>
        <div>
          <div className={styles.subtitle}>{percent}%</div>
          <div>Процентная ставка</div>
        </div>
        <div>
          <div className={styles.subtitle}>{payment}</div>
          <div>Ежемесячный платеж</div>
        </div>
        <div>
          <div className={styles.subtitle}>{profit}</div>
          <div>Необходимый доход</div>
        </div>
      </div>
      <button className={styles.button} disabled={disabled}>
        Оформить заявку
      </button>
    </div>
  );
}

Proposal.propTypes = {
  purpose: PropTypes.string.isRequired,
  sum: PropTypes.string.isRequired,
  percent: PropTypes.number.isRequired,
  payment: PropTypes.string.isRequired,
  profit: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};
