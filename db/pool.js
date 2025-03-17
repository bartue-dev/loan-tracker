const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

module.exports = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT
});