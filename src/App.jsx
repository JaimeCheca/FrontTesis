// src/App.jsx
import React, { useState } from 'react';
import DateInput from './components/DateInput';
import MapView from './components/MapView';
import MapViewConcatenado from './components/MapViewConcatenado';
import axios from 'axios';
import './App.css'; // Importamos el archivo CSS

function App() {
  const [predictionData, setPredictionData] = useState(null);
  const [realData, setRealData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataConcatenada, setDataConcatenada] = useState(null);

  const handleDateSubmit = async (date) => {
    setLoading(true);
    try {
      // Obtenemos la predicción
      const response = await axios.post('http://localhost:8000/predict', {
        date_time: date,
      });
      setPredictionData(response.data.prediction);
      setRealData(response.data.real_data);
      setDataConcatenada(response.data.data_concatenada);
    } catch (error) {
      console.error('Error al obtener la predicción:', error);
      alert('Ocurrió un error al obtener la predicción');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Predicción de Incendios</h1>
      <DateInput onDateSubmit={handleDateSubmit} />
      {loading && <p>Cargando predicción...</p>}
      {predictionData && realData && dataConcatenada &&(
        <div className="maps-container">
          <div className="map-wrapper">
            <h2>Mapa de Predicción</h2>
            <MapView data={predictionData} />
          </div>
          <div className="map-wrapper">
            <h2>Mapa Real</h2>
            <MapView data={realData} />
          </div>
          <div className="map-wrapper">
            <h2>Mapa Concatenado</h2>
            <MapViewConcatenado data={dataConcatenada} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;