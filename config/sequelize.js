const Sequelize = require('sequelize');

//const DB_URI = 'postgresql://postgres@localhost:5432/' + process.env.DB_NAME;
const DB_URI = process.envDATABASE_URL
const sequelize = new Sequelize(DB_URI, {
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false,
  dialectOptions: {
    useUTC: false //for reading from database
  },
  timezone: '+03:30'
});

module.exports = {sequelize, Sequelize};