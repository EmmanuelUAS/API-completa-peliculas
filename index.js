
const express = require('express');
const sequelize = require('./database');


const crearPeliculaModelo = require('./models/pelicula');
const crearPeliculasRouter = require('./routes/peliculas');
const authRouter = require('./routes/auth');
const { verificarToken } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Modelo
const Pelicula = crearPeliculaModelo(sequelize);

// Rutas
app.use('/api', authRouter);
app.use('/api/peliculas', verificarToken, crearPeliculasRouter(sequelize, Pelicula));

async function iniciarServidor() {
  try {
    await sequelize.sync();

    // Inserta datos de ejemplo solo si la tabla está vacía
    const existentes = await Pelicula.count();
    if (existentes === 0) {
      await Pelicula.bulkCreate([
        {
          titulo: 'Interstellar',
          director: 'Christopher Nolan',
          anio: 2014,
          genero: 'Ciencia ficción',
        },
        {
          titulo: 'Titanic',
          director: 'James Cameron',
          anio: 1997,
          genero: 'Drama',
        },
        {
          titulo: 'Avengers: Endgame',
          director: 'Anthony y Joe Russo',
          anio: 2019,
          genero: 'Acción',
        },
      ]);
    }

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log('Método Acción Endpoint Status Exitoso');
      console.log(`POST  Login        http://localhost:${PORT}/api/login 200 OK`);
      console.log(`GET   Leer todos   http://localhost:${PORT}/api/peliculas 200 OK`);
      console.log(`GET   Leer uno     http://localhost:${PORT}/api/peliculas/:id 200 OK`);
      console.log(`POST  Crear        http://localhost:${PORT}/api/peliculas 201 Created`);
      console.log(`PUT   Actualizar   http://localhost:${PORT}/api/peliculas/:id 200 OK`);
      console.log(`DELETE Eliminar    http://localhost:${PORT}/api/peliculas/:id 204 No Content`);
    });

  } catch (error) {
    console.error('Error al iniciar servidor:', error);
    process.exit(1);
  }
}

iniciarServidor();


