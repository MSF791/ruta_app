import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function MapsView({ form }) {
  useEffect(() => {
    // Inicializa el mapa solo una vez cuando el componente se monta
    const map = L.map('map').setView([4.60971, -74.08175], 10); // Coordenadas de Bogotá, Colombia

    // Capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Puedes agregar un marcador en una ubicación específica
    L.marker([4.60971, -74.08175]).addTo(map)
      .bindPopup('Estás aquí en Bogotá')
      .openPopup();

    // Limpia el mapa al desmontar el componente
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div>
      <div className='flex justify-center items-center mb-4'>
        <h1 className='text-2xl font-extrabold text-center mr-3'>Planear Ruta</h1> 
        <button className='bg-blue-600 p-2 text-white rounded-md hover:bg-blue-700' onClick={form}>Agregar nueva ruta</button>
      </div>
      <div id="map" style={{ height: '400px', width: '100%' }}></div>
    </div>
  );
}

export default MapsView;
