import sitiosData from '../../public/data/sitios.json';
import eventosData from '../../public/data/eventos.json';
import gastronomiaData from '../../public/data/gastronomia.json';

export interface Sitio {
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

export interface Evento {
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

export interface Gastronomia {
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

export async function getSitios(): Promise<Sitio[]> {
  return sitiosData.sitios;
}

export async function getMunicipio() {
  return sitiosData.municipio;
}

export async function getEventos(): Promise<Evento[]> {
  return eventosData.eventos;
}

export async function getGastronomia(): Promise<Gastronomia[]> {
  return gastronomiaData.gastronomia;
}

export async function getAllData() {
  const [sitios, eventos, gastronomia, municipio] = await Promise.all([
    getSitios(),
    getEventos(),
    getGastronomia(),
    getMunicipio()
  ]);
  return { sitios, eventos, gastronomia, municipio };
}