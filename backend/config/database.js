const mysql = require('mysql2/promise'); // mysql2/promise para async/await
const express = require('express');
const cors = require('cors'); 

const app = express();
const PORT = 3001;

// Configuración de la base de datos
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'pruebarotulos',
  port: 3306 
};

// Crear pool de conexiones
const pool = mysql.createPool(dbConfig);

// Middlewares
app.use(cors()); 
app.use(express.json()); // Para parsear JSON

// Ruta para obtener órdenes
app.get('/api/ordenes', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ensam_prueba');
    res.json(rows);
  } catch (err) {
    console.error('Error en la consulta:', err);
    res.status(500).json({ error: 'Error al obtener órden' });
  }
});

// Ruta para buscar órdenes por número
app.get('/api/ordenes/buscar', async (req, res) => {
  try {
    const { numero } = req.query;
    const [rows] = await pool.query(
      'SELECT * FROM ensam_prueba WHERE Orden LIKE ?',
      [`%${numero}%`]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error en la búsqueda:', err);
    res.status(500).json({ error: 'Error al buscar órden' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});