# Portal Turístico

Un portal turístico desarrollado con arquitectura JAMstack utilizando Next.js, que presenta los atractivos, eventos y gastronomía del municipio de San Miguel de Allende, Guanajuato, México.

## Arquitectura JAMstack

### ¿Qué es JAMstack?

JAMstack es una arquitectura moderna de desarrollo web que se basa en tres pilares:

- **J** - JavaScript: Lógica del cliente sin dependencia del servidor
- **A** - APIs: Funcionalidad reuse mediante APIs HTTP
- **M** - Markup: Contenido estático pre-renderizado

### Justificación de la Arquitectura

| Aspecto | Implementación | Beneficio |
|---------|---------------|------------|
| **Pre-renderizado** | getStaticProps / getStaticPaths | HTML generado en build time |
| **Datos estáticos** | JSON files en /public/data | Sin base de datos, API simulada |
| **CDN Ready** | Archivos estáticos | Distribución global rápida |
| **Sin servidor runtime** | Solo build | Costos reducidos, alta seguridad |
| **Reutilización** | Componentes React | Mantenibilidad del código |

### Flujo de Datos

```
JSON (API simulada)
      ↓
getStaticProps (Build time)
      ↓
HTML pre-renderizado
      ↓
Usuario (CDN)
```

## Características del Proyecto

### Páginas Implementadas

1. **Inicio** (`/`)
   - Hero con información institucional
   - Estadísticas del municipio
   - Sitios destacados
   - Formulario de contacto

2. **Sitios Turísticos** (`/sitios`)
   - Listado con búsqueda en tiempo real
   - Filtro por categoría (Natural, Cultural, Histórico)
   - Mapa interactivo con Leaflet
   - Pre-renderizado de categorías

3. **Eventos y Gastronomía** (`/eventos`)
   - Tabs para navegar entre eventos y gastronomía
   - Calendario de eventos próximos
   - Restaurantes recomendados
   - Platos típicos de la región

### Tecnologías Utilizadas

| Tecnología | Propósito |
|------------|-----------|
| **Next.js 16** | Framework React con SSG |
| **TypeScript** | Tipado estático |
| **CSS Modules** | Estilos scoped |
| **Leaflet** | Mapas interactivos |
| **JSON Files** | API simulada |

### Estructura del Proyecto

```
turismo/
├── public/
│   ├── data/
│   │   ├── sitios.json      # API de sitios turísticos
│   │   ├── eventos.json     # API de eventos
│   │   └── gastronomia.json # API de gastronomía
│   └── images/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Footer.tsx
│   │   ├── TouristSiteCard.tsx
│   │   ├── EventCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── MapComponent.tsx
│   │   └── ContactForm.tsx
│   ├── lib/
│   │   └── data.ts         # Funciones de fetch
│   ├── pages/
│   │   ├── index.tsx       # Página de inicio
│   │   ├── sitios/         # Sitios turísticos
│   │   │   └── index.tsx
│   │   └── eventos/        # Eventos y gastronomía
│   │       └── index.tsx
│   └── styles/
│       ├── globals.css     # Estilos globales y variables
│       ├── Home.module.css
│       ├── Sitios.module.css
│       └── Eventos.module.css
├── package.json
├── next.config.js
└── tsconfig.json
```

### Datos Estáticos (API Simulada)

El proyecto utiliza archivos JSON como fuente de datos, simulando una API REST:

```typescript
// Ejemplo de consumo de datos
import { getSitios, getEventos, getGastronomia } from '@/lib/data';

export async function getStaticProps() {
  const sitios = await getSitios();
  const eventos = await getEventos();
  const gastronomia = await getGastronomia();
  
  return {
    props: { sitios, eventos, gastronomia },
    revalidate: 60  // ISR: Regeneración cada 60 segundos
  };
}
```

### Pre-renderizado (SSG + ISR)

- **Static Site Generation (SSG)**: Las páginas se generan en tiempo de build
- **Incremental Static Regeneration (ISR)**: `revalidate: 60` permite actualización sin rebuild completo
- **getStaticPaths**: Preparación de rutas para build

## Instalación y Ejecución

### Requisitos Previos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar o descargar el proyecto
cd turismo

# Instalar dependencias
npm install
```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm run start
```

## Despliegue

### Vercel (Recomendado)

1. Crear cuenta en [Vercel](https://vercel.com)
2. Importar repositorio Git
3. Vercel detectará Next.js automáticamente
4. Deployment automático en cada push

### Netlify

1. Crear cuenta en [Netlify](https://netlify.com)
2. Conectar repositorio Git
3. Configurar Build Command: `next build`
4. Output Directory: `.next`

## Funcionalidades Implementadas

- Buscador en tiempo real con filtro
- Filtros por categoría (Natural, Cultural, Histórico)
- Mapa interactivo con Leaflet
- Formulario de contacto con validación
- Diseño responsive con CSS moderno
- Pre-renderizado con SSG/ISR
- Navegación con Next.js Router

## Contenido de Datos

El portal incluye información sobre:

- **8 Sitios Turísticos**: Parroquias, mercados, miradores, reservas naturales
- **6 Eventos**: Festivals, tradiciones, celebraciones
- **10 Gastronomía**: Restaurantes y platos típicos

## Licencia

MIT License - Proyecto educativo.
