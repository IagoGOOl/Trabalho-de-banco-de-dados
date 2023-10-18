const { Sequelize } = require("sequelize");
require("dotenv").config();
const database = new Sequelize(
  process.env.DB_DATA,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { host: process.env.DB_HOST, port: process.env.DB_PORT, dialect: "postgres" }
);
module.exports = database;
