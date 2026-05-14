import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Hero from "@/components/Hero";
import TouristSiteCard from "@/components/TouristSiteCard";
import ContactForm from "@/components/ContactForm";
import { getSitios, getMunicipio } from "@/lib/data";
import styles from "@/styles/Home.module.css";

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
        <title>Turismo - Descubre la Magia</title>
        <meta
          name="description"
          content={`Visit ${municipio.nombre}, ${municipio.estado}. Historia y cultura te esperan.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Hero
        subtitle={`Bienvenido a ${municipio.nombre}`}
        title="Descubre la Magia del lugar"
        description="Un destino que combina arquitectura colonial y arte contemporáneo. Vive una experiencia inigualable."
      />

      <section className={styles.stats}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>Girón</span>
              <span className={styles.statLabel}>Santander</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                {municipio.poblacion.toLocaleString()}+
              </span>
              <span className={styles.statLabel}>Habitantes</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{municipio.extension}</span>
              <span className={styles.statLabel}>de extensión</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{municipio.fundacion}</span>
              <span className={styles.statLabel}>Colombia</span>
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
                Girón es un municipio colonial ubicado en el departamento de
                Santander, Colombia. Fundado en 1631, conserva su riqueza
                histórica, arquitectura tradicional y esencia cultural a través
                del tiempo.
              </p>

              <p>
                Hoy es reconocido como uno de los destinos patrimoniales más
                importantes de Santander, atrayendo visitantes con sus calles
                empedradas, casas blancas, templos históricos y un ambiente
                lleno de tradición y encanto colonial.
              </p>
              <Link href="/sitios" className="btn btn-primary">
                Explorar Sitios Turísticos
              </Link>
            </div>
            <div className={styles.aboutImage}>
              <img
                src="https://i.pinimg.com/1200x/f3/ad/28/f3ad2818c7d80682a0a2a6121349c573.jpg"
                alt="Girón, Santander"
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
            {sitiosDestacados.map((sitio) => (
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
              Planifica tu viaje y descubre todo lo que Girón
              tiene para ofrecerte. Desde su centro histórico hasta sus paisajes
              naturales, hay algo para todos.
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
                Estamos aquí para ayudarte a planificar tu visita a Girón.
                Contáctanos para obtener más información sobre
                sitios turísticos, eventos y servicios.
              </p>

              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <span></span>
                  <span>Centro Histórico, Girón, Santander</span>
                </div>
                <div className={styles.contactItem}>
                  <span></span>
                  <span>(415) 152 0000</span>
                </div>
                <div className={styles.contactItem}>
                  <span></span>
                  <span>turismo@sma.gob.mx</span>
                </div>
                <div className={styles.contactItem}>
                  <span></span>
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
      sitiosDestacados,
    },
    revalidate: 60,
  };
};
