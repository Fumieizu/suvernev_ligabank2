import React from 'react';
import styles from './social-list.module.scss';

import {Social} from '../../const';

export default function SocialList() {
  return (
    <ul className={styles.list}>
      {
        Object.values(Social).map((name) => (
          <li key={name} className={styles.item}>
            <a
              href="#"
              aria-label={name}
              className={`${styles.link} ${styles[name]}`}
            />
          </li>
        ))
      }
    </ul>
  );
}
