import React, { useState, useEffect, useCallback } from 'react';
import { buscarOrdenes } from '../services/api';
import { debounce } from 'lodash';

const BuscarOrden = () => {
  const [numeroOrden, setNumeroOrden] = useState('');
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // Función debounce para buscar órdenes
  const buscarOrdenesDebounced = useCallback(
    debounce(async (numero) => {
      if (numero.length > 2) {
        setCargando(true);
        try {
          const data = await buscarOrdenes(numero);
          setOrdenes(data);
          setError(null);
        } catch (error) {
          console.error('Error al buscar órdenes:', error);
          setError('Error al buscar órdenes');
          setOrdenes([]);
        } finally {
          setCargando(false);
        }
      } else {
        setOrdenes([]);
      }
    }, 300),
    [] // Dependencias vacías ya que no necesitamos centroSeleccionado
  );

  // Limpiar debounce al desmontar
  useEffect(() => {
    return () => {
      buscarOrdenesDebounced.cancel();
    };
  }, [buscarOrdenesDebounced]);

  const handleChange = (e) => {
    const value = e.target.value;
    setNumeroOrden(value);
    buscarOrdenesDebounced(value);
  };

  return (
    <div className="buscar-orden-container">
      <div className="form-group">
        <label htmlFor="numeroOrden" className="form-label">
          Número de Orden
        </label>
        <input
          id="numeroOrden"
          type="text"
          className="search-input"
          value={numeroOrden}
          placeholder="Ej: 10848080"
          onChange={handleChange}
        />
      </div>

      {cargando && <div className="loading">Buscando...</div>}
      
      {error && <div className="error-message">{error}</div>}

      {ordenes.length > 0 && (
        <div className="resultados-container">
          <h3>Resultados:</h3>
          <ul className="ordenes-list">
            {ordenes.map((orden) => (
              <li key={orden.id} className="orden-item">
                <div>Orden: {orden.numero_orden}</div>
                <div>Descripción: {orden.descripcion}</div>
                <div>Estado: {orden.estado}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {ordenes.length === 0 && numeroOrden.length > 2 && !cargando && (
        <div className="no-results">No se encontraron órdenes</div>
      )}
    </div>
  );
};

export default BuscarOrden;