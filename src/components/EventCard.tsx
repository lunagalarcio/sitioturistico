import Image from 'next/image';
import styles from './EventCard.module.css';

interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  categoria: string;
  ubicacion: string;
  imagen: string;
  precio: string;
}

interface Gastronomia {
  id: number;
  nombre: string;
  tipo: string;
  especialidad: string;
  direccion?: string;
  telefono?: string;
  horario?: string;
  precio: string;
  imagen?: string;
  rating?: number;
}

type EventoItem = Evento | Gastronomia;

interface EventCardProps {
  evento: EventoItem;
  type?: 'evento' | 'gastronomia';
}

export default function EventCard({ evento, type = 'evento' }: EventCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-MX', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryLabel = (categoria: string) => {
    const labels: Record<string, string> = {
      cultural: 'Cultural',
      tradicional: 'Tradicional',
      religioso: 'Religioso',
      artesania: 'Artesanía',
      cine: 'Cine',
      restaurante: 'Restaurante',
      plato: 'Plato Típico',
      postre: 'Postre'
    };
    return labels[categoria] || categoria;
  };

  if (type === 'gastronomia') {
    const gastro = evento as Gastronomia;
    return (
      <article className={styles.card}>
        <div className={styles.imageWrapper}>
          {gastro.imagen && (
            <Image 
              src={gastro.imagen} 
              alt={gastro.nombre}
              width={400}
              height={250}
              className={styles.image}
            />
          )}
          <span className={`tag ${styles.tag}`}>
            {gastro.tipo === 'restaurante' ? 'Restaurante' : gastro.tipo}
          </span>
        </div>
        
        <div className={styles.content}>
          <h3 className={styles.title}>{gastro.nombre}</h3>
          <p className={styles.description}>{gastro.especialidad}</p>
          
          {gastro.direccion && (
            <div className={styles.location}>
              <span className={styles.locationIcon}>📍</span>
              <span>{gastro.direccion}</span>
            </div>
          )}
          
          <div className={styles.meta}>
            <span className={styles.price}>💰 {gastro.precio}</span>
            {gastro.rating && (
              <span className={styles.rating}>⭐ {gastro.rating}</span>
            )}
            {gastro.horario && (
              <span className={styles.time}>🕐 {gastro.horario}</span>
            )}
          </div>
        </div>
      </article>
    );
  }

  const ev = evento as Evento;
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {ev.imagen && (
          <Image 
            src={ev.imagen} 
            alt={ev.titulo}
            width={400}
            height={250}
            className={styles.image}
          />
        )}
        <span className={`tag ${styles.tag} ${ev.categoria}`}>
          {getCategoryLabel(ev.categoria)}
        </span>
      </div>
      
      <div className={styles.content}>
        <div className={styles.dateBadge}>
          <span className={styles.dateDay}>{new Date(ev.fecha).getDate()}</span>
          <span className={styles.dateMonth}>
            {new Date(ev.fecha).toLocaleDateString('es-MX', { month: 'short' })}
          </span>
        </div>
        
        <h3 className={styles.title}>{ev.titulo}</h3>
        <p className={styles.description}>{ev.descripcion}</p>
        
        <div className={styles.location}>
          <span className={styles.locationIcon}>📍</span>
          <span>{ev.ubicacion}</span>
        </div>
        
        <div className={styles.meta}>
          <span className={styles.time}>🕐 {ev.hora}</span>
          <span className={styles.price}>💰 {ev.precio}</span>
        </div>
      </div>
    </article>
  );
}