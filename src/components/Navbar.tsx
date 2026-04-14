import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🏛️</span>
          <span className={styles.logoText}>Turismo SMA</span>
        </Link>
        
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Inicio</Link>
          <Link href="/sitios" className={styles.navLink}>Sitios Turísticos</Link>
          <Link href="/eventos" className={styles.navLink}>Eventos</Link>
        </div>

        <Link href="/#contacto" className={styles.contactBtn}>
          Contacto
        </Link>
      </div>
    </nav>
  );
}