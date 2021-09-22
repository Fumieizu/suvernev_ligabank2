import React, { useState, useRef } from 'react';
import SwiperCore, { Thumbs, Pagination, A11y } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import styles from './tabs.module.scss';

SwiperCore.use([Thumbs, Pagination, A11y]);

export default function Tabs() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const thumbRef = useRef(null);
  const sliderRef = useRef(null);

  const onSlideFocus = (evt) => {
    const index = +evt.target.dataset.id;

    const thumbElements = thumbRef.current.querySelectorAll('.swiper-slide');
    const sliderElements = sliderRef.current.querySelectorAll('.swiper-slide');

    if (thumbElements[index]) {
      thumbElements.forEach((item) =>
        item.classList.remove('swiper-slide-thumb-active'),
      );

      sliderElements.forEach((item) =>
        item.classList.remove(
          'swiper-slide-active',
          'swiper-slide-prev',
          'swiper-slide-next',
        ),
      );

      thumbElements[index].classList.add('swiper-slide-thumb-active');
      sliderElements[index].classList.add('swiper-slide-active');

      if (sliderElements[index - 1]) {
        sliderElements[index - 1].classList.add('swiper-slide-prev');
      }

      if (sliderElements[index + 1]) {
        sliderElements[index + 1].classList.add('swiper-slide-next');
      }
    }
  };

  return (
    <section className={styles.section} id="services">
      <h2 className="visually-hidden">Услуги Лига Банка</h2>
      <div className={styles.container}>
        <div className={styles.control_container} ref={thumbRef}>
          <Swiper
            className="thumb"
            onSwiper={setThumbsSwiper}
            slidesPerView={4}
            allowTouchMove={false}
            simulateTouch
          >
            <SwiperSlide>
              <span className={`${styles.control} ${styles.control_vault}`}>
                Вклады
              </span>
            </SwiperSlide>
            <SwiperSlide>
              <span className={`${styles.control} ${styles.control_cards}`}>
                Кредиты
              </span>
            </SwiperSlide>
            <SwiperSlide>
              <span className={`${styles.control} ${styles.control_security}`}>
                Страхование
              </span>
            </SwiperSlide>
            <SwiperSlide>
              <span className={`${styles.control} ${styles.control_phone}`}>
                Онлайн-сервисы
              </span>
            </SwiperSlide>
          </Swiper>
        </div>
        <div>
          <Swiper
            className={`slides ${styles.slides}`}
            thumbs={{ swiper: thumbsSwiper }}
            simulateTouch={false}
            pagination
            a11y
            ref={sliderRef}
          >
            <SwiperSlide
              className={`${styles.slide} ${styles.slide_vault}`}
              onFocus={onSlideFocus}
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
              onFocus={onSlideFocus}
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
              <p className={styles.text}>
                Рассчитайте ежемесячный платеж
                <br />и ставку по кредиту воспользовавшись
                <br />
                нашим{' '}
                <a className={styles.calc_link} href="#calculator">
                  кредитным калькулятором
                </a>
              </p>
            </SwiperSlide>
            <SwiperSlide
              className={`${styles.slide} ${styles.slide_security}`}
              onFocus={onSlideFocus}
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
              onFocus={onSlideFocus}
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
