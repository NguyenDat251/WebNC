'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
  // host: process.env.DB_HOST || "https://eban123.000webhostapp.com/",
  // user: process.env.DB_USER || "dat",
  // password: process.env.DB_PASSWORD || "Abc123@45678",
  // database: process.env.DB_NAME || "id13685629_bank"

  host: "sql12.freemysqlhosting.net",
  user:  "sql12340276",
  password: "59ZfQ3r1wm",
  database:  "sql12340276"
});

module.exports = db