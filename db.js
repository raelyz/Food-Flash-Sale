const pg = require("pg");
const Pool = require("pg").Pool;
const url = require("url");
require("dotenv").config();
var configs;

const devConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
};


const proConfig = process.env.DATABASE_URL; //heroku addons

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production" ? proConfig : devConfig,
});

pool.on("error", function (err) {
  console.log("idle client error", err.message, err.stack);
});

const allFunction = require("./models/models");

const poolRoutes = allFunction(pool);

module.exports = {
  queryInterface: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
  pool: pool,
  poolRoutes,
};