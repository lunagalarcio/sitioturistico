'use client';

import { useEffect, useRef } from 'react';
import styles from './MapComponent.module.css';

interface Marker {
  id: number;
  nombre: string;
  lat: number;
  lng: number;
  categoria: string;
}

interface MapComponentProps {
  markers: Marker[];
  center?: [number, number];
  zoom?: number;
}

export default function MapComponent({ markers, center = [20.9153, -100.7436], zoom = 14 }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    const initMap = async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      if (mapInstanceRef.current) return;

      const map = L.map(mapRef.current!).setView(center, zoom);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      const getIconColor = (categoria: string) => {
        const colors: Record<string, string> = {
          natural: '#40916C',
          cultural: '#D4A373',
          historico: '#74C69D'
        };
        return colors[categoria] || '#1B4332';
      };

      markers.forEach(marker => {
        const color = getIconColor(marker.categoria);
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="
            background-color: ${color};
            width: 30px;
            height: 30px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          "></div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 30]
        });

        L.marker([marker.lat, marker.lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family: 'Source Sans 3', sans-serif; padding: 8px;">
              <strong style="color: #1B4332; font-size: 16px;">${marker.nombre}</strong>
              <p style="color: #666; font-size: 13px; margin: 4px 0 0;">${marker.categoria}</p>
            </div>
          `);
      });

      if (markers.length > 0) {
        const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]));
        map.fitBounds(bounds, { padding: [50, 50] });
      }

      mapInstanceRef.current = map;
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [markers, center, zoom]);

  return (
    <div className={styles.mapContainer}>
      <div ref={mapRef} className={styles.map}></div>
    </div>
  );
}