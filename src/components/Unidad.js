import React, { useState } from 'react';

const Unidad = ({ onConfirm, maxUnidades = 100 }) => {
  const [unidades, setUnidades] = useState(1);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setUnidades('');
      setError('');
      return;
    }

    const numValue = parseInt(value);
    if (isNaN(numValue)) {
      setError('Debe ingresar un número válido');
      return;
    }

    if (numValue < 1) {
      setError('Mínimo 1 unidad');
      return;
    }

    if (numValue > maxUnidades) {
      setError(`Máximo ${maxUnidades} unidades`);
      return;
    }

    setUnidades(numValue);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (unidades >= 1 && unidades <= maxUnidades) {
      onConfirm(unidades);
    }
  };

  return (
    <div className="unidad-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="unidad-input">Unidades:</label>
          <input
            id="unidad-input"
            type="number"
            min="1"
            max={maxUnidades}
            value={unidades}
            onChange={handleChange}
            placeholder="Ingrese unidades a imprimir"
            className={error ? 'input-error' : ''}
          />
          {error && <div className="error-message">{error}</div>}
        </div>
        <button type="submit" className="submit-button">
          Confirmar
        </button>
      </form>
      
    </div>
  );
};

export default Unidad;