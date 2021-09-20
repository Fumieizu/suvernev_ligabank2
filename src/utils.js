import {CURRENCY_TITLES, TIME_TITLES} from './const';

export const declOfNum = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};

export const getNumber = (value) => +value.toString().replace(/[^\d]/g, '');

export const divideNumberByPieces = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const getMoneyString = (value) => `${divideNumberByPieces(value)} ${declOfNum(value, CURRENCY_TITLES)}`;

export const getTime = (value) => `${value} ${declOfNum(value, TIME_TITLES)}`;
