import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Hero from '@/components/Hero';
import TouristSiteCard from '@/components/TouristSiteCard';
import ContactForm from '@/components/ContactForm';
import { getSitios, getMunicipio } from '@/lib/data';
import styles from '@/styles/Home.module.css';

interface HomeProps {
  municipio: {
    nombre: string;
    estado: string;
    poblacion: number;
    extension: string;
    fundacion: string;
    lema: string;
  };
  sitiosDestacados: Array<{
    id: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    imagen: string;
    ubicacion: string;
    lat: number;
    lng: number;
  }>;
}

export default function Home({ municipio, sitiosDestacados }: HomeProps) {
  return (
    <>
      <Head>
        <title>Turismo San Miguel de Allende - Descubre la Magia</title>
        <meta name="description" content={`Visit ${municipio.nombre}, ${municipio.estado}. Historia, cultura y naturaleza te esperan.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Hero
        subtitle={`Bienvenido a ${municipio.nombre}`}
        title="Descubre la Magia del Bajío"
        description="Un destino que combina arquitectura colonial, arte contemporáneo y paisajes naturales únicos. Vive una experiencia inigualable."
      />

      <section className={styles.stats}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>🏛️</span>
              <span className={styles.statLabel}>Ciudad Colonial</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{municipio.poblacion.toLocaleString()}+</span>
              <span className={styles.statLabel}>Habitantes</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{municipio.extension}</span>
              <span className={styles.statLabel}>Extensión</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{municipio.fundacion}</span>
              <span className={styles.statLabel}>Fundación</span>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.about}`}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutContent}>
              <span className={styles.sectionTag}>Historia y Cultura</span>
              <h2>{municipio.nombre}</h2>
              <p className={styles.lema}>"{municipio.lema}"</p>
              <p>
                San Miguel de Allende es una ciudad colonial ubicada en el corazón del estado de Guanajuato. 
                Fundada en 1542, ha preservado su riqueza arquitectónica y tradición cultural a través de los siglos.
              </p>
              <p>
                Hoy es reconocido como uno de los destinos turísticos más importantes de México, 
               -atrayendo visitantes de todo el mundo con su arquitectura neogótica, calles empedradas 
                y una escena artística vibrante.
              </p>
              <Link href="/sitios" className="btn btn-primary">
                Explorar Sitios Turísticos
              </Link>
            </div>
            <div className={styles.aboutImage}>
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800" 
                alt="San Miguel de Allende"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.featured}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Destacados</span>
            <h2>Lugares Imperdibles</h2>
            <p>Descubre los sitios másHermosos de nuestra ciudad</p>
          </div>
          
          <div className="grid grid-3">
            {sitiosDestacados.map(sitio => (
              <TouristSiteCard key={sitio.id} sitio={sitio} />
            ))}
          </div>
          
          <div className={styles.viewAll}>
            <Link href="/sitios" className="btn btn-outline">
              Ver Todos los Sitios →
            </Link>
          </div>
        </div>
      </section>

      <section className={`section ${styles.cta}`}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>¿Listo para Visitarnos?</h2>
            <p>
              Planifica tu viaje y descubre todo lo que San Miguel de Allende tiene para ofrecerte.
              Desde su centro histórico hasta sus paisajes naturales, hay algo para todos.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/sitios" className="btn btn-primary">
                Explorar Mapa
              </Link>
              <Link href="/eventos" className="btn btn-secondary">
                Ver Eventos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.contact}`} id="contacto">
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <span className={styles.sectionTag}>Contáctanos</span>
              <h2>¿Tienes preguntas?</h2>
              <p>
                Estamos aquí para ayudarte a planificar tu visita a San Miguel de Allende. 
                Contáctanos para obtener más información sobre sitios turísticos, eventos y servicios.
              </p>
              
              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <span>📍</span>
                  <span>Centro Histórico, San Miguel de Allende, Gto.</span>
                </div>
                <div className={styles.contactItem}>
                  <span>📞</span>
                  <span>(415) 152 0000</span>
                </div>
                <div className={styles.contactItem}>
                  <span>✉️</span>
                  <span>turismo@sma.gob.mx</span>
                </div>
                <div className={styles.contactItem}>
                  <span>🕐</span>
                  <span>Lunes a Viernes: 9:00 - 18:00</span>
                </div>
              </div>
            </div>
            
            <div className={styles.contactForm}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const municipio = await getMunicipio();
  const todosSitios = await getSitios();
  
  const sitiosDestacados = todosSitios.slice(0, 3);

  return {
    props: {
      municipio,
      sitiosDestacados
    },
    revalidate: 60
  };
};