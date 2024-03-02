'use client';
import { OrbitPath, OrbitItem } from 'react-orbit-component';
import styles from './page.module.css';

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <div>
        <OrbitPath type="circle" className={styles.circle1}>
          <OrbitItem className={styles.item} direction="clockwise">
            1
          </OrbitItem>
          <OrbitItem className={styles.item} direction="counter-clockwise">
            1
          </OrbitItem>
        </OrbitPath>

        <OrbitPath type="circle" className={styles.circle2}>
          <OrbitItem className={styles.item}>6</OrbitItem>
        </OrbitPath>
      </div>
    </main>
  );
}
