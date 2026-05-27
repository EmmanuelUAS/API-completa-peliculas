const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  const Pelicula = sequelize.define(
    'Pelicula',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      director: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      anio: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      genero: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'peliculas',
      timestamps: false,
    }
  );

  return Pelicula;
};

