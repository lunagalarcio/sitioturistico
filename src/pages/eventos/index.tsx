import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Hero from '@/components/Hero';
import EventCard from '@/components/EventCard';
import { getEventos, getGastronomia } from '@/lib/data';
import styles from '@/styles/Eventos.module.css';

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

interface EventosPageProps {
  eventos: Evento[];
  gastronomia: (Gastronomia | Evento)[];
}

export default function EventosPage({ eventos, gastronomia }: EventosPageProps) {
  const [activeTab, setActiveTab] = useState<'eventos' | 'gastronomia'>('eventos');
  
  const filteredEventos = eventos.filter(e => {
    const eventDate = new Date(e.fecha);
    return eventDate >= new Date();
  }).sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

  const restaurantes = gastronomia.filter((g): g is Gastronomia => 'tipo' in g && g.tipo === 'restaurante');
  const platos = gastronomia.filter((g): g is Gastronomia => 'tipo' in g && g.tipo !== 'restaurante');

  return (
    <>
      <Head>
        <title>Eventos y Gastronomía - San Miguel de Allende</title>
        <meta name="description" content="Descubre eventos culturales y la gastronomía de San Miguel de Allende." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Hero
        title="Eventos y Gastronomía"
        subtitle="Vive la experiencia"
        description="Calendario de eventos y los mejores lugares para comer"
        showButtons={false}
      />

      <section className={`section ${styles.content}`}>
        <div className="container">
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'eventos' ? styles.active : ''}`}
              onClick={() => setActiveTab('eventos')}
            >
              🎭 Eventos
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'gastronomia' ? styles.active : ''}`}
              onClick={() => setActiveTab('gastronomia')}
            >
              🍽️ Gastronomía
            </button>
          </div>

          {activeTab === 'eventos' ? (
            <div className={styles.eventsSection}>
              <div className={styles.sectionHeader}>
                <h2>Próximos Eventos</h2>
                <p>No te pierdas las actividades próximas en la ciudad</p>
              </div>
              
              {filteredEventos.length > 0 ? (
                <div className="grid grid-3">
                  {filteredEventos.map(evento => (
                    <EventCard key={evento.id} evento={evento} type="evento" />
                  ))}
                </div>
              ) : (
                <div className={styles.noResults}>
                  <span>📅</span>
                  <h3>No hay eventos próximos</h3>
                  <p>Revisa pronto las nuevas programaciones</p>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.gastronomiaSection}>
              <div className={styles.gastroPart}>
                <div className={styles.sectionHeader}>
                  <h2>Restaurantes Recomendados</h2>
                  <p>Los mejores lugares para disfrutar de la gastronomía local</p>
                </div>
                
                <div className="grid grid-2">
                  {restaurantes.map(rest => (
                    <EventCard key={rest.id} evento={rest} type="gastronomia" />
                  ))}
                </div>
              </div>

              <div className={styles.gastroPart}>
                <div className={styles.sectionHeader}>
                  <h2>Platos Típicos</h2>
                  <p>Sabores auténticos de la región</p>
                </div>
                
                <div className="grid grid-3">
                  {platos.map(plato => (
                    <EventCard key={plato.id} evento={plato} type="gastronomia" />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const eventos = await getEventos();
  const gastronomia = await getGastronomia();

  return {
    props: {
      eventos,
      gastronomia
    },
    revalidate: 60
  };
};