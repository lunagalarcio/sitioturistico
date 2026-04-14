import Image from 'next/image';
import styles from './TouristSiteCard.module.css';

interface TouristSiteCardProps {
  sitio: {
    id: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    imagen: string;
    ubicacion: string;
    lat: number;
    lng: number;
  };
}

export default function TouristSiteCard({ sitio }: TouristSiteCardProps) {
  const getCategoryLabel = (categoria: string) => {
    const labels: Record<string, string> = {
      natural: 'Natural',
      cultural: 'Cultural',
      historico: 'Histórico'
    };
    return labels[categoria] || categoria;
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image 
          src={sitio.imagen} 
          alt={sitio.nombre}
          width={400}
          height={250}
          className={styles.image}
        />
        <span className={`tag ${styles.tag} ${sitio.categoria}`}>
          {getCategoryLabel(sitio.categoria)}
        </span>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{sitio.nombre}</h3>
        <p className={styles.description}>{sitio.descripcion}</p>
        
        <div className={styles.location}>
          <span className={styles.locationIcon}>📍</span>
          <span>{sitio.ubicacion}</span>
        </div>
        
        <div className={styles.cta}>
          <span className={styles.moreInfo}>Ver más información →</span>
        </div>
      </div>
    </article>
  );
}