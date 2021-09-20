import React from 'react';
import styles from './social-list.module.scss';
import {Link} from 'react-router-dom';
import {Social} from '../../const';

export default function SocialList() {
  return (
    <ul className={styles.list}>
      {
        Object.values(Social).map((name) => (
          <li key={name} className={styles.item}>
            <Link
              to="#"
              aria-label={name}
              className={`${styles.link} ${styles[name]}`}
            />
          </li>
        ))
      }
    </ul>
  );
}
