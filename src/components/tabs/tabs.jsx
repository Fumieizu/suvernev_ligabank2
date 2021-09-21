import React, { useState } from 'react';
import SwiperCore, { Thumbs, Pagination, A11y } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import styles from './tabs.module.scss';

SwiperCore.use([Thumbs, Pagination, A11y]);

const SliderControls = [
  {
    id: 0,
    name: 'vault',
    text: 'Вклады',
  },
  {
    id: 1,
    name: 'cards',
    text: 'Кредиты',
  },
  {
    id: 2,
    name: 'security',
    text: 'Страхование',
  },
  {
    id: 3,
    name: 'phone',
    text: 'Онлайн-сервисы',
  },
];

export default function Tabs() {
  const [swiper, setSwiper] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (sw) => {
    setActiveSlide(sw.activeIndex);
  };
  const slideTo = (index) => {
    if (swiper) {
      setActiveSlide(index);
      swiper.slideTo(index);
    }
  };
  const handleTabClick = (index) => slideTo(index);

  return (
    <section className={styles.section} id="services">
      <h2 className="visually-hidden">Услуги Лига Банка</h2>
      <div className={styles.container}>
        <div className={styles.control_container}>
          {
            SliderControls.map(({id, name, text}) => (
              <button
                className={`${styles.control_button} ${activeSlide === id ? styles.control_button_active : ''}`}
                key={id}
                onClick={() => handleTabClick(id)}
              >
                <span className={`${styles.control} ${styles[name]}`}>
                  {text}
                </span>
              </button>
            ))
          }
        </div>
        <div>
          <Swiper
            className={`slides ${styles.slides}`}
            onSlideChange={handleSlideChange}
            onSwiper={setSwiper}
            simulateTouch={false}
            pagination
            a11y
          >
            <SwiperSlide
              className={`${styles.slide} ${styles.slide_vault}`}
              tabIndex="0"
              data-id="0"
            >
              <h3 className={styles.title}>
               Вклады Лига Банка – это выгодная
                <br/>
               инвестиция в свое будущее
              </h3>
              <ul className={styles.list}>
                <li className={styles.item}>Проценты по вкладам до 7%</li>
                <li className={styles.item}>Разнообразные условия</li>
                <li className={styles.item}>
                 Возможность ежемесячной капитализации
                  <br />
                 или вывод процентов на банковскую карту
                </li>
              </ul>
              <a href="/" className={styles.button}>Узнать подробнее</a>
            </SwiperSlide>
            <SwiperSlide
              className={`${styles.slide} ${styles.slide_cards}`}
              tabIndex="0"
              data-id="1"
            >
              <h3 className={styles.title}>
                Лига Банк выдает кредиты под любые цели
              </h3>
              <ul className={styles.list}>
                <li className={styles.item}>Ипотечный кредит</li>
                <li className={styles.item}>Автокредит</li>
                <li className={styles.item}>Потребительский кредит</li>
              </ul>
              <p>
                Рассчитайте ежемесячный платеж
                <br />и ставку по кредиту воспользовавшись
                <br />
                нашим{' '}
                <a href="#calculator">
                  кредитным калькулятором
                </a>
              </p>
            </SwiperSlide>
            <SwiperSlide
              className={`${styles.slide} ${styles.slide_security}`}
              tabIndex="0"
              data-id="2"
            >
              <h3 className={styles.title}>
                Лига Страхование — застрахуем все что захотите
              </h3>
              <ul className={styles.list}>
                <li className={styles.item}>Автомобильное страхование</li>
                <li className={styles.item}>Страхование жизни и здоровья</li>
                <li className={styles.item}>Страхование недвижимости</li>
              </ul>
              <a href="/" className={styles.button}>Узнать подробнее</a>
            </SwiperSlide>
            <SwiperSlide
              className={`${styles.slide} ${styles.slide_phone}`}
              tabIndex="0"
              data-id="3"
            >
              <h3 className={styles.title}>
                Лига Банк — это огромное количество онлайн-сервисов для вашего
                удобства
              </h3>
              <ul className={styles.list}>
                <li className={styles.item}>
                  Мобильный банк, который всегда под рукой
                </li>
                <li className={styles.item}>
                  Приложение Лига-проездной позволит вам оплачивать билеты по
                  всему миру
                </li>
              </ul>
              <a href="/" className={styles.button}>Узнать подробнее</a>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
