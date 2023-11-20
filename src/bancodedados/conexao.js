require("dotenv").config();

const knex = require("knex")({
  client: "pg",
  connection: {
    //connectionString: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    //ssl: {rejectUnauthorized: false}
  },
});



module.exports = knex;
