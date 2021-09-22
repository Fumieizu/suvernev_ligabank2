import React from 'react';
import SwiperCore, { Pagination, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import styles from './slider.module.scss';

SwiperCore.use([Pagination, A11y, Autoplay]);

export default function Slider() {
  return (
    <section>
      <h2 className="visually-hidden">Промо</h2>
      <Swiper
        slidesPerView={1}
        pagination={{clickable: true}}
        a11y
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        <SwiperSlide className={`${styles.slide} ${styles.slide_first}`} tabIndex='0'>
          <div className={`${styles.wrapper} ${styles.wrapper_first}`}>
            <h3 className={styles.title}>Лига Банк</h3>
            <p className={styles.text}>Кредиты на любой случай</p>
            <a href="#calculator" className={styles.button}>Рассчитать кредит</a>
          </div>
        </SwiperSlide>
        <SwiperSlide className={`${styles.slide} ${styles.slide_second}`} tabIndex='0'>
          <div className={styles.wrapper}>
            <h3 className={styles.title}>Лига Банк</h3>
            <p className={styles.text}>Ваша уверенность в завтрашнем дне</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className={`${styles.slide} ${styles.slide_third}`} tabIndex='0'>
          <div className={styles.wrapper}>
            <h3 className={styles.title}>Лига Банк</h3>
            <p className={styles.text}>Всегда рядом</p>
            <a href="#map" className={`${styles.button} ${styles.button_third}`}>Найти отделение</a>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
