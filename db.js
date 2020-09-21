const pg = require("pg");
// const Pool = require("pg").Pool;
const url = require("url");
require("dotenv").config();
var configs;

const devConfig = {
  user: "aurelialim",
  host: "localhost",
  database: "foodflash",
  port: 5432,
};


const proConfig = process.env.DATABASE_URL; //heroku addons

const pool = new pg.Pool(devConfig)

if (process.env.NODE_ENV === "production") {
  const pool = new pg.Pool(devConfig)
} else {
  const pool = new pg.Pool({ connectionString: proConfig })
}

//   connectionString:
//     (process.env.NODE_ENV === "production" ? proConfig : devConfig)
// });

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