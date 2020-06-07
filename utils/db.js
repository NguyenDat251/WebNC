const mysql = require('mysql');
const { promisify } = require('util');
// const promisify = require('util').promisify;
require('dotenv').config()
const config = require('../config/default.json');

console.log("host: ", process.env.DB_HOST || "root")

/*"connectionLimit": 100,
    "host": "localhost",
    "user": "root",
    "password": "root",
    "database": "internetbanking" */

// const pool = mysql.createPool(config.mysql);
const pool = mysql.createPool({
  connectionLimit: 100,
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "root",
    database: process.env.DB_NAME || "internetbanking"
});

console.log("user: ", process.env.DB_USER || "root")
console.log("pass: ", process.env.DB_PASS || "root")
console.log("database: ", process.env.DB_NAME || "internetbanking")


const pool_query = promisify(pool.query).bind(pool);

module.exports = {
  load: sql => pool_query(sql),
  add: (entity, tableName) => pool_query(`insert into ${tableName} set ?`, entity),
  del: (condition, tableName) => pool_query(`delete from ${tableName} where ?`, condition),
  edit: (entity, condition, tableName) => pool_query(`update ${tableName} set ? where ?`, [entity, condition])
};