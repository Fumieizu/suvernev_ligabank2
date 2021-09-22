import React, {useState} from 'react';
import Form from '../form/form';
import Bid from '../bid/bid';
import styles from './calculator.module.scss';

export default function Calculator() {
  const [data, setData] = useState({
    purpose: '',
    price: '',
    payment: '',
    time: '',
  });
  const def = '';
  return (
    <section className={`${styles.section} ${data.purpose === def ? styles.purpose_margin : ''}`} id="calculator">
      <div className={styles.container}>
        <h2 className={styles.title}>Кредитный калькулятор</h2>
        <Form onDataSet ={setData}/>
        {data.purpose && <Bid onDataSet={setData} {...data} />}
      </div>
    </section>
  );
}
