import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Hero from '@/components/Hero';
import TouristSiteCard from '@/components/TouristSiteCard';
import SearchBar from '@/components/SearchBar';
import MapComponent from '@/components/MapComponent';
import { getSitios } from '@/lib/data';
import styles from '@/styles/Sitios.module.css';

interface Sitio {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  imagen: string;
  ubicacion: string;
  lat: number;
  lng: number;
  horario?: string;
  telefono?: string;
}

interface SitiosPageProps {
  sitios: Sitio[];
  categorias: string[];
}

export default function SitiosPage({ sitios, categorias }: SitiosPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [showMap, setShowMap] = useState(false);

  const filteredSitios = sitios.filter(sitio => {
    const matchesSearch = sitio.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sitio.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || sitio.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryLabel = (categoria: string) => {
    const labels: Record<string, string> = {
      natural: 'Natural',
      cultural: 'Cultural',
      historico: 'Histórico'
    };
    return labels[categoria] || categoria;
  };

  return (
    <>
      <Head>
        <title>Sitios Turísticos - San Miguel de Allende</title>
        <meta name="description" content="Descubre los mejores sitios turísticos de San Miguel de Allende." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Hero
        title="Sitios Turísticos"
        subtitle="Explora nuestra ciudad"
        description="Descubre los rincones más Hermosos de San Miguel de Allende"
        showButtons={false}
      />

      <section className={`section ${styles.content}`}>
        <div className="container">
          <div className={styles.controls}>
            <SearchBar 
              onSearch={setSearchQuery} 
              placeholder="Buscar sitios turísticos..." 
            />
            
            <div className={styles.categories}>
              <button 
                className={`${styles.categoryBtn} ${selectedCategory === 'todos' ? styles.active : ''}`}
                onClick={() => setSelectedCategory('todos')}
              >
                Todos
              </button>
              {categorias.map(cat => (
                <button 
                  key={cat}
                  className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.active : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {getCategoryLabel(cat)}
                </button>
              ))}
            </div>
            
            <button 
              className={styles.mapToggle}
              onClick={() => setShowMap(!showMap)}
            >
              {showMap ? '📷 Ver Tarjetas' : '🗺️ Ver Mapa'}
            </button>
          </div>

          {showMap ? (
            <div className={styles.mapSection} id="mapa">
              <h3>Mapa de Sitios Turísticos</h3>
              <MapComponent 
                markers={filteredSitios.map(s => ({
                  id: s.id,
                  nombre: s.nombre,
                  lat: s.lat,
                  lng: s.lng,
                  categoria: s.categoria
                }))}
              />
            </div>
          ) : (
            <div className={styles.sitiosGrid}>
              {filteredSitios.length > 0 ? (
                filteredSitios.map(sitio => (
                  <TouristSiteCard key={sitio.id} sitio={sitio} />
                ))
              ) : (
                <div className={styles.noResults}>
                  <span>🔍</span>
                  <h3>No se encontraron sitios</h3>
                  <p>Intenta con otros términos de búsqueda o categorías</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const sitios = await getSitios();
  const categorias = ['natural', 'cultural', 'historico'];

  return {
    props: {
      sitios,
      categorias
    },
    revalidate: 60
  };
};