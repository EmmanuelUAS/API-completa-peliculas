const { Sequelize } = require('sequelize');

const databaseUrl = process.env.DATABASE_URL;

const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, {
      dialect: 'postgres',
      logging: false,
      dialectOptions:
        process.env.DB_SSL === 'false'
          ? {}
          : {
              ssl: {
                require: true,
                rejectUnauthorized: false,
              },
            },
    })
  : new Sequelize({
      // SQLite local. Se crea automaticamente.
      dialect: 'sqlite',
      storage: 'peliculas.sqlite',
      logging: false,
    });

module.exports = sequelize;

