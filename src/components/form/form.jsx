import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Select from '../select/select';
import Range from '../range/range';
import Checkbox from '../checkbox/checkbox';
import Proposal from '../proposal/proposal';
import Message from '../message/message';
import styles from './form.module.scss';
import {PurposeNames, LoanPurpose, MinCreditPrice, CreditPercents, TIME_TITLES} from '../../const';
import {declOfNum, getNumber, divideNumberByPieces, getMoneyString, getTime} from '../../utils';

const DEFAULT_VALUE = '';
const DEFAULT_RANGE_VALUE = 0;
const MAX_PERCENT = 100;
const MONTHS_IN_YEAR = 12;
const MATERNITY_CAPITAL = 470000;
const CAR_PRICE = 2000000;
const PAYMENT_PERCENT = 15;
const MIN_PROFIT = 45;

export default function Form({onDataSet }) {
  const [purpose, setPurpose] = useState(PurposeNames.DEFAULT);
  const [price, setPrice] = useState(DEFAULT_VALUE);
  const [priceError, setPriceError] = useState(false);
  const [payment, setPayment] = useState(DEFAULT_VALUE);
  const [paymentRange, setPaymentRange] = useState(DEFAULT_RANGE_VALUE);
  const [time, setTime] = useState(DEFAULT_VALUE);
  const [timeRange, setTimeRange] = useState(DEFAULT_RANGE_VALUE);
  const [capital, setCapital] = useState(false);
  const [casco, setCasco] = useState(false);
  const [insurance, setInsurance] = useState(false);


  useEffect(() => {
    if (purpose !== PurposeNames.DEFAULT) {
      setPrice(getMoneyString(LoanPurpose[purpose].MIN_PRICE));
      setPaymentRange(LoanPurpose[purpose].MIN_PERCENT);
      setPayment(
        getMoneyString(
          Math.round(LoanPurpose[purpose].MIN_PRICE / MAX_PERCENT) *
          LoanPurpose[purpose].MIN_PERCENT,
        ),
      );
      setTime(
        `${LoanPurpose[purpose].MIN_TIME} ${declOfNum(
          LoanPurpose[purpose].MIN_TIME,
          TIME_TITLES,
        )}`,
      );
      setTimeRange(LoanPurpose[purpose].MIN_TIME);
    }
  }, [purpose]);

  useEffect(() => {
    onDataSet((state) => ({ ...state, purpose: '' }));
  }, [onDataSet, purpose]);

  useEffect(() => {
    if (
      purpose !== PurposeNames.DEFAULT &&
      (getNumber(price) < LoanPurpose[purpose].MIN_PRICE ||
        getNumber(price) > LoanPurpose[purpose].MAX_PRICE)
    ) {
      setPriceError(true);
    } else {
      setPriceError(false);
    }
  }, [purpose, price]);

  const getProposalPercent = () => {
    if (purpose === PurposeNames.MORTGAGE) {
      return (
        paymentRange >= PAYMENT_PERCENT
          ? CreditPercents[purpose].MIN.toFixed(2)
          : CreditPercents[purpose].MAX.toFixed(2)
      );
    }

    if (purpose === PurposeNames.CAR) {
      if (casco && insurance) {
        return CreditPercents[purpose].INSURANCE.MIN.toFixed(2);
      }

      if (casco || insurance) {
        return CreditPercents[purpose].INSURANCE.MAX.toFixed(2);
      }

      if (getNumber(price) < CAR_PRICE) {
        return CreditPercents[purpose].PRICE.MAX.toFixed(2);
      }

      if (getNumber(price) >= CAR_PRICE) {
        return CreditPercents[purpose].PRICE.MIN.toFixed(2);
      }
    }
  };

  const getProposalSum = () => {
    const maternityCapital =
      purpose === PurposeNames.MORTGAGE && capital ? MATERNITY_CAPITAL : 0;
    return getNumber(price) - getNumber(payment) - maternityCapital;
  };

  const getProposalPayment = () => {
    const rate = getProposalPercent() / MAX_PERCENT / MONTHS_IN_YEAR;
    return Math.round(
      getProposalSum() *
      (rate + rate / ((1 + rate) ** (timeRange * MONTHS_IN_YEAR) - 1)),
    );
  };

  const getProposalProfit = () =>
    Math.round((getProposalPayment() / MIN_PROFIT) * MAX_PERCENT);

  const proposal = {
    purpose,
    sum: getMoneyString(getProposalSum()),
    percent: getProposalPercent(),
    payment: getMoneyString(getProposalPayment()),
    profit: getMoneyString(getProposalProfit()),
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    onDataSet({
      purpose,
      price,
      payment,
      time,
    });
  };

  const onPriceChange = (evt) => {
    const value = getNumber(evt.target.value);

    if (value <= LoanPurpose[purpose].MAX_PRICE) {
      setPrice(value);
      setPayment(
        getMoneyString(Math.round((value / MAX_PERCENT) * +paymentRange)),
      );
    }
  };

  const onPriceBlur = (evt) => {
    const value = getNumber(evt.target.value);

    if (value < LoanPurpose[purpose].MIN_PRICE) {
      setPrice(getMoneyString(LoanPurpose[purpose].MIN_PRICE));
      setPayment(
        getMoneyString(
          Math.round(
            (LoanPurpose[purpose].MIN_PRICE / MAX_PERCENT) * +paymentRange,
          ),
        ),
      );
      return;
    }

    if (value > LoanPurpose[purpose].MAX_PRICE) {
      setPrice(getMoneyString(LoanPurpose[purpose].MAX_PRICE));
      setPayment(
        getMoneyString(
          Math.round(
            (LoanPurpose[purpose].MAX_PRICE / MAX_PERCENT) * +paymentRange,
          ),
        ),
      );
      return;
    }

    setPrice(getMoneyString(value));
    setPayment(
      getMoneyString(Math.round((value / MAX_PERCENT) * +paymentRange)),
    );
  };

  const onPriceFocus = (evt) => {
    setPrice(getNumber(evt.target.value));
  };

  const onPriceButtonClick = (_, subtraction) => {
    let step = LoanPurpose[purpose].STEP_PRICE;

    if (subtraction) {
      step = step * -1;
    }

    setPrice(getMoneyString(getNumber(price) + step));

    setPayment(
      getMoneyString(Math.round(((getNumber(price) + step) / MAX_PERCENT) * +paymentRange),
      ),
    );
  };


  const onPaymentChange = (evt) => {
    const value = getNumber(evt.target.value);
    setPayment(value);
    setPaymentRange((value / getNumber(price)) * MAX_PERCENT);
  };

  const onPaymentBlur = (evt) => {
    const value = getNumber(evt.target.value);
    const numberPrice = getNumber(price);

    if (
      (value / numberPrice) * MAX_PERCENT <
      LoanPurpose[purpose].MIN_PERCENT
    ) {
      setPayment(
        getMoneyString(
          (numberPrice / MAX_PERCENT) * LoanPurpose[purpose].MIN_PERCENT,
        ),
      );
      setPaymentRange(LoanPurpose[purpose].MIN_PERCENT);
      return;
    }

    if ((value / numberPrice) * MAX_PERCENT > MAX_PERCENT) {
      setPayment(getMoneyString((numberPrice / MAX_PERCENT) * MAX_PERCENT));
      return;
    }

    setPayment(getMoneyString(value));
  };

  const onPaymentFocus = (evt) => {
    setPayment(getNumber(evt.target.value));
  };

  const onPaymentRangeChange = (evt) => {
    const value = +evt.target.value;
    setPaymentRange(value);
    setPayment(
      getMoneyString(Math.round((getNumber(price) / MAX_PERCENT) * value)),
    );
  };

  const onTimeChange = (evt) => {
    const value = evt.target.value;
    setTime(value);
    setTimeRange(getNumber(value));
  };

  const onTimeBlur = () => {
    if (time > LoanPurpose[purpose].MAX_TIME) {
      setTime(
        `${LoanPurpose[purpose].MAX_TIME} ${declOfNum(
          LoanPurpose[purpose].MAX_TIME,
          TIME_TITLES,
        )}`,
      );
      return;
    }

    if (time < LoanPurpose[purpose].MIN_TIME) {
      setTime(
        `${LoanPurpose[purpose].MIN_TIME} ${declOfNum(
          LoanPurpose[purpose].MIN_TIME,
          TIME_TITLES,
        )}`,
      );
      return;
    }

    setTime(`${time} ${declOfNum(time, TIME_TITLES)}`);
  };

  const onTimeFocus = () => {
    setTime(getNumber(time.toString()));
  };

  const onTimeRangeChange = (evt) => {
    const value = +evt.target.value;
    setTimeRange(value);
    setTime(getTime(value));
  };

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <div className={styles.container}>
        <div className={`${styles.wrapper} ${purpose !== PurposeNames.DEFAULT ? styles.select : ''}`}>
          <h3 className={styles.title}>Шаг 1. Цель кредита</h3>
          <Select activeType={purpose} onActiveType={setPurpose}/>
        </div>
        {purpose !== PurposeNames.DEFAULT && (
          <div className={styles.wrapper}>
            <h3 className={styles.title}>Шаг 2. Введите параметры кредита</h3>
            <label className={`${styles.label} ${styles.price}`}>
              <span className={styles.caption}>
                Стоимость {LoanPurpose[purpose].NAME}
              </span>
              {priceError && (
                <span className={styles.error}>Некорректное значение</span>
              )}
              <input
                className={`${styles.input} ${priceError ? styles.input_error : ''}`}
                value={price}
                onChange={onPriceChange}
                onBlur={onPriceBlur}
                onFocus={onPriceFocus}
                type="text"
              />
              <button
                className={`${styles.button} ${styles.button_minus}`}
                onClick={(evt) => onPriceButtonClick(evt, true)}
                type="button"
                disabled={
                  getNumber(price) - LoanPurpose[purpose].STEP_PRICE <
                  LoanPurpose[purpose].MIN_PRICE
                }
              />
              <button
                className={`${styles.button} ${styles.button_plus}`}
                onClick={onPriceButtonClick}
                type="button"
                disabled={
                  getNumber(price) + LoanPurpose[purpose].STEP_PRICE >
                  LoanPurpose[purpose].MAX_PRICE
                }
              />
              <span className={styles.text}>
                От {divideNumberByPieces(LoanPurpose[purpose].MIN_PRICE)} до{' '}
                {divideNumberByPieces(LoanPurpose[purpose].MAX_PRICE)} рублей
              </span>
            </label>
            <label className={styles.label}>
              <span className={styles.caption}>Первоначальный взнос</span>
              <input
                className={styles.input}
                value={payment}
                onChange={onPaymentChange}
                onBlur={onPaymentBlur}
                onFocus={onPaymentFocus}
                type="text"
              />
              <div className={styles.slider}>
                <Range
                  onChange={onPaymentRangeChange}
                  value={paymentRange}
                  prefix={'%'}
                  min={LoanPurpose[purpose].MIN_PERCENT}
                />
              </div>
            </label>
            <label className={styles.label}>
              <span className={styles.caption}>Срок кредитования</span>
              <input
                className={styles.input}
                value={time}
                onChange={onTimeChange}
                onBlur={onTimeBlur}
                onFocus={onTimeFocus}
                type="text"
              />
            </label>
            <div className={styles.slider}>
              <Range
                onChange={onTimeRangeChange}
                value={timeRange}
                min={LoanPurpose[purpose].MIN_TIME}
                max={LoanPurpose[purpose].MAX_TIME}
                step={LoanPurpose[purpose].STEP_TIME}
                markTo={getTime(LoanPurpose[purpose].MAX_TIME)}
              />
            </div>
            {purpose === PurposeNames.MORTGAGE && (
              <Checkbox value={capital} onChange={setCapital}>
                Использовать материнский капитал
              </Checkbox>
            )}
            {purpose === PurposeNames.CAR && (
              <>
                <Checkbox value={casco} onChange={setCasco}>
                  Оформить КАСКО в нашем банке
                </Checkbox>
                <Checkbox value={insurance} onChange={setInsurance}>
                  Оформить Страхование жизни в нашем банке
                </Checkbox>
              </>
            )}
          </div>
        )}
      </div>
      {(purpose !== PurposeNames.DEFAULT &&
        getProposalSum() < MinCreditPrice[purpose] && (
        <Message purpose={purpose} />
      )) ||
      (purpose !== PurposeNames.DEFAULT && (
        <Proposal disabled={priceError} {...proposal} />
      ))}
    </form>
  );
}

Form.propTypes = {
  onDataSet: PropTypes.func.isRequired,
};
