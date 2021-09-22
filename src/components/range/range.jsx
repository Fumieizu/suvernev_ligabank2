import React from 'react';
import PropTypes from 'prop-types';
import styles from './range.module.scss';

export default function Range({
  value,
  min = 10,
  max = 100,
  step = 5,
  onChange,
  markTo = '',
  prefix = '',
}) {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
      />
      <div className={styles.inner}>
        <span>{`${value} ${prefix}`}</span>
        <span>{markTo}</span>
      </div>
    </div>
  );
}

Range.propTypes = {
  value: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  markTo: PropTypes.string,
  prefix: PropTypes.string,
};
