import Link from 'next/link';
import styles from './Hero.module.css';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  showButtons?: boolean;
}

export default function Hero({ title, subtitle, description, showButtons = true }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
        
        {showButtons && (
          <div className={styles.buttons}>
            <Link href="/sitios" className="btn btn-primary">
              Explorar Sitios
            </Link>
            <Link href="/eventos" className="btn btn-secondary">
              Ver Eventos
            </Link>
          </div>
        )}
      </div>
      
      <div className={styles.scrollIndicator}>
        <span>Scroll</span>
        <div className={styles.scrollArrow}></div>
      </div>
    </section>
  );
}