export const AppRoute = {
  ROOT: '/',
  SERVICES: '/services',
  CREDIT: '/credit',
  EXCHANGER: '/',
  CONTACTS: '/contacts',
  QUESTION: '/question',
  NOT_FOUND: '/In-progress',
  LOGIN: '/login',
};

export const BreakPoint = {
  PHONE: 320,
  MAX_PHONE: 767,
  TABLET: 768,
  MAX_TABLET: 1023,
  DESKTOP: 1024,
};

export const PurposeNames = {
  DEFAULT: 'DEFAULT',
  MORTGAGE: 'MORTGAGE',
  CAR: 'CAR',
};

export const LoanPurpose = {
  MORTGAGE: {
    NAME: 'недвижимости',
    MIN_PRICE: 1200000,
    MAX_PRICE: 25000000,
    STEP_PRICE: 100000,
    MIN_TIME: 5,
    MAX_TIME: 30,
    STEP_TIME: 1,
    MIN_PERCENT: 10,
  },
  CAR: {
    NAME: 'автомобиля',
    MIN_PRICE: 500000,
    MAX_PRICE: 5000000,
    STEP_PRICE: 50000,
    MIN_TIME: 1,
    MAX_TIME: 5,
    STEP_TIME: 1,
    MIN_PERCENT: 20,
  },
};

export const MinCreditPrice = {
  MORTGAGE: 500000,
  CAR: 200000,
};

export const CreditPercents = {
  MORTGAGE: {
    MIN: 8.5,
    MAX: 9.4,
  },
  CAR: {
    INSURANCE: {
      MIN: 3.5,
      MAX: 8.5,
    },
    PRICE: {
      MIN: 15,
      MAX: 16,
    },
  },
};

export const FieldName = {
  name: 'name',
  phone: 'phone',
  email: 'email',
};

export const SumName = {
  MORTGAGE: 'ипотеки',
  CAR: 'автокредита',
};

export const Cities = [
  {lat: 55.75, lng: 37.6167},
  {lat: 51.530018, lng: 46.034683},
  {lat: 55.7823547, lng: 49.1242266},
  {lat: 57.153534, lng: 65.542274},
  {lat: 54.991375, lng: 73.371529},
];

export const TIME_TITLES = ['год', 'года', 'лет'];

export const CURRENCY_TITLES = ['рубль', 'рубля', 'рублей'];

export const Social = {
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  TWITTER: 'twitter',
  YOUTUBE: 'youtube',
};
