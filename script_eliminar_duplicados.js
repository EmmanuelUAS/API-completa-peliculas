// Script para eliminar películas duplicadas en peliculas.sqlite por `titulo`.
// Conserva la fila con el id más bajo.

const { Sequelize, QueryTypes } = require('sequelize');

async function main() {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'peliculas.sqlite',
    logging: false,
  });

  try {
    // Asegura que la tabla exista.
    await sequelize.query(
      `CREATE TABLE IF NOT EXISTS peliculas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        director TEXT NOT NULL,
        anio INTEGER NOT NULL,
        genero TEXT NOT NULL
      );`,
      { type: QueryTypes.RAW }
    );

    // Elimina duplicados dejando 1 por titulo (el de id más bajo).
    const result = await sequelize.query(
      `DELETE FROM peliculas
       WHERE id NOT IN (
         SELECT MIN(id) AS id
         FROM peliculas
         GROUP BY titulo
       );`,
      { type: QueryTypes.RAW }
    );

    console.log('Duplicados eliminados correctamente por titulo.');
    // sequelize devuelve distintas estructuras según driver; no dependemos del contenido.
  } finally {
    await sequelize.close();
  }
}

main().catch((err) => {
  console.error('Error eliminando duplicados:', err);
  process.exit(1);
});

