import styles from './Navbar.module.scss';
import Link from 'next/link';
import classNames from 'classnames';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={classNames('container', styles.content)}>
        <Link href="/" className={styles.brand}><span>Ter</span>mo</Link>
        <ul className={styles.linkList}>
          <li className={styles.item}>
            <Link href="/" className={styles.link}>Jogar</Link>
          </li>
          <li className={styles.item}>
            <Link href="/regras" className={styles.link}>Regras</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}