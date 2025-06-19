import React, { useState, useEffect } from 'react';
import './Centrodes.css';

const Centro = ({ onCenterSelect, selectedCenter }) => {
  const [centros, setCentros] = useState([
    { id: 1, nombre: 'Fundición' },
    { id: 2, nombre: 'Expóxico' },
    { id: 3, nombre: 'Empaque' },
    { id: 4, nombre: 'Galvanica' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const selectedId = e.target.value;
    if (onCenterSelect) {
      onCenterSelect(selectedId);
    }
  };

  return (
    <div className="centro-despegable">
      <label htmlFor="centro">Centro:</label>
      <select 
        id="centro"
        value={selectedCenter || ''}
        onChange={handleChange}
        className="select-field"
      >
        {centros.map(centro => (
          <option key={centro.id} value={centro.id}>
            {centro.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Centro;