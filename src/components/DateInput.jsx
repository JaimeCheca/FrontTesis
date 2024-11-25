// src/components/DateInput.jsx
import React, { useState } from 'react';
import './DateInput.css'; // Importamos el archivo CSS

function DateInput({ onDateSubmit }) {
  const [selectedDateTime, setSelectedDateTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDateTime) {
      onDateSubmit(selectedDateTime);
    } else {
      alert('Por favor, selecciona una fecha y hora.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="date-input-form">
      <label htmlFor="datetime">Selecciona una fecha y hora para la predicción:</label>
      <input
        type="datetime-local"
        id="datetime"
        name="datetime"
        value={selectedDateTime}
        onChange={(e) => setSelectedDateTime(e.target.value)}
      />
      <button type="submit">Obtener Predicción</button>
    </form>
  );
}

export default DateInput;