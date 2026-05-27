const express = require('express');

module.exports = (sequelize, Pelicula) => {
  const router = express.Router();
  // GET /api/peliculas/:id
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const pelicula = await Pelicula.findByPk(id);
      if (!pelicula) {
        return res.status(404).json({ mensaje: 'Pelicula no encontrada' });
      }

      res.json(pelicula);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al obtener pelicula',
        error: error.message,
      });
    }
  });

  // GET /api/peliculas
  router.get('/', async (req, res) => {
    try {
      const peliculas = await Pelicula.findAll();
      res.json(peliculas);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al obtener peliculas',
        error: error.message,
      });
    }
  });



  // POST /api/peliculas
  router.post('/', async (req, res) => {
    try {
      const { titulo, director, anio, genero } = req.body || {};

      if (!titulo || !director || !anio || !genero) {
        return res.status(400).json({
          mensaje: 'Faltan datos requeridos: titulo, director, anio, genero',
        });
      }

      const pelicula = await Pelicula.create({ titulo, director, anio, genero });
      res.status(201).json(pelicula);
    } catch (error) {
      // Caso típico: titulo duplicado por unique constraint
      if (String(error?.name).toLowerCase().includes('unique')) {
        return res.status(409).json({
          mensaje: 'Ya existe una pelicula con ese titulo',
        });
      }

      res.status(500).json({
        mensaje: 'Error al crear pelicula',
        error: error.message,
      });
    }
  });

  // PUT /api/peliculas/:id
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, director, anio, genero } = req.body || {};

      const pelicula = await Pelicula.findByPk(id);
      if (!pelicula) {
        return res.status(404).json({ mensaje: 'Pelicula no encontrada' });
      }

      if (titulo !== undefined) pelicula.titulo = titulo;
      if (director !== undefined) pelicula.director = director;
      if (anio !== undefined) pelicula.anio = anio;
      if (genero !== undefined) pelicula.genero = genero;

      await pelicula.save();
      res.json(pelicula);
    } catch (error) {
      if (String(error?.name).toLowerCase().includes('unique')) {
        return res.status(409).json({
          mensaje: 'Ya existe una pelicula con ese titulo',
        });
      }

      res.status(500).json({
        mensaje: 'Error al actualizar pelicula',
        error: error.message,
      });
    }
  });

  // DELETE /api/peliculas/:id
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const pelicula = await Pelicula.findByPk(id);
      if (!pelicula) {
        return res.status(404).json({ mensaje: 'Pelicula no encontrada' });
      }

      await pelicula.destroy();
      return res.status(204).send();
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al eliminar pelicula',
        error: error.message,
      });
    }
  });

  return router;
};

