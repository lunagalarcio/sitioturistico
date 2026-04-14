import Link from 'next/link';
import styles from './Footer.module.css';

interface FooterProps {
  municipio?: {
    nombre: string;
    telefono?: string;
    email?: string;
  };
}

export default function Footer({ municipio }: FooterProps) {
  return (
    <footer className={styles.footer} id="contacto">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.section}>
            <h3 className={styles.logo}>
              <span>🏛️</span> Turismo SMA
            </h3>
            <p className={styles.description}>
              Descubre la magia de San Miguel de Allende. 
              Un destino que combina historia, cultura y naturaleza.
            </p>
          </div>

          <div className={styles.section}>
            <h4 className={styles.title}>Enlaces Rápidos</h4>
            <nav className={styles.links}>
              <Link href="/">Inicio</Link>
              <Link href="/sitios">Sitios Turísticos</Link>
              <Link href="/eventos">Eventos</Link>
              <Link href="/sitios#mapa">Mapa</Link>
            </nav>
          </div>

          <div className={styles.section}>
            <h4 className={styles.title}>Contacto</h4>
            <div className={styles.contact}>
              <p>📍 Centro Histórico</p>
              <p>📞 (415) 152 0000</p>
              <p>✉️ turismo@sma.gob.mx</p>
              <p>🕐 Lun - Vie: 9:00 - 18:00</p>
            </div>
          </div>

          <div className={styles.section}>
            <h4 className={styles.title}>Síguenos</h4>
            <div className={styles.social}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                📘
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                📸
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                🐦
              </a>
              <a href="#" className={styles.socialLink} aria-label="YouTube">
                📹
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2026 Turismo San Miguel de Allende. Todos los derechos reservados.</p>
          <p>Hecho con ❤️ para visitantes de todo el mundo</p>
        </div>
      </div>
    </footer>
  );
}