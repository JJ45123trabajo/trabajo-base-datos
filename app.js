const express = require('express');
const path = require('path'); // Importa el módulo path
const { Client } = require('pg');
const app = express();

// Configuración de la conexión a la base de datos PostgreSQL
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Empresa',
  password: '1234',
  port: 5432,
});

// Conectar a la base de datos
client.connect()
  .then(() => console.log('Conexión a PostgreSQL exitosa'))
  .catch(err => console.error('Error de conexión a PostgreSQL:', err.stack));

// Configuración de Express para servir archivos estáticos (HTML, CSS)
app.use(express.static(path.join(__dirname, 'public'))); // Carpeta 'public'

// Ruta para servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Sirve index.html desde 'public'
});

// Ruta para obtener todos los empleados
app.get('/empleados', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM empleados');
    res.json(result.rows); // Devuelve los datos como JSON
  } catch (err) {
    console.error('Error al obtener empleados:', err.stack);
    res.status(500).send('Error al obtener empleados');
  }
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
