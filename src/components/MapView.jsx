// src/components/MapView.jsx
import React from 'react';
import { MapContainer, TileLayer, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import './MapView.css'; // Importamos el archivo CSS

function MapView({ data }) {
  // Coordenadas para centrar el mapa en Perú
  const center = [-13.3, -72.3];
  const zoomLevel = 5;

  // Definir los límites del mapa
  const bounds = L.latLngBounds([-10.375, -74.625], [-16.125, -69.875]);

  // Generar las cuadrículas
  const gridElements = [];

  const latStart = -10.375;
  const latEnd = -16.125;
  const lonStart = -74.625;
  const lonEnd = -69.875;
  const latStep = -0.25;
  const lonStep = 0.25;

  let latitudes = [];
  for (let lat = latStart; lat >= latEnd; lat += latStep) {
    latitudes.push(lat);
  }

  let longitudes = [];
  for (let lon = lonStart; lon <= lonEnd; lon += lonStep) {
    longitudes.push(lon);
  }

  for (let i = 0; i < latitudes.length - 1; i++) {
    for (let j = 0; j < longitudes.length - 1; j++) {
      const cellBounds = [
        [latitudes[i], longitudes[j]],
        [latitudes[i + 1], longitudes[j + 1]],
      ];
      const probability = data[i][j];

      // Definimos el color según la probabilidad
      let color = 'grey';
      if (probability > 0.7) {
        color = 'red';
      } else if (probability > 0.4) {
        color = 'orange';
      } else if (probability > 0.1) {
        color = 'yellow';
      }

      gridElements.push(
        <Rectangle
          key={`${i}-${j}`}
          bounds={cellBounds}
          pathOptions={{ color: color, weight: 1, fillOpacity: 0.5 }}
        />
      );
    }
  }

  return (
    <MapContainer center={center} zoom={zoomLevel} style={{ height: '500px', width: '100%' }} bounds={bounds}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {gridElements}
    </MapContainer>
  );
}

export default MapView;