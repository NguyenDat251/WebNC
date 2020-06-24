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
  host: process.env.DB_HOST || config.host,
  user: process.env.DB_USER || config.username,
  password: process.env.DB_PASS || config.password,
  database: process.env.DB_NAME || config.database,
  typeCast: function castField(field, useDefaultTypeCasting) {

    // We only want to cast bit fields that have a single-bit in them. If the field
    // has more than one bit, then we cannot assume it is supposed to be a Boolean.
    if ((field.type === "BIT") && (field.length === 1)) {

      var bytes = field.buffer();

      // A Buffer in Node represents a collection of 8-bit unsigned integers.
      // Therefore, our single "bit field" comes back as the bits '0000 0001',
      // which is equivalent to the number 1.
      return (bytes[0] === 1);

    }

    return (useDefaultTypeCasting());

  }
});

console.log("user: ", process.env.DB_USER || "root")
console.log("pass: ", process.env.DB_PASS || "root")
console.log("database: ", process.env.DB_NAME || "internetbanking2")


const pool_query = promisify(pool.query).bind(pool);

module.exports = {
  load: sql => pool_query(sql),
  add: (entity, tableName) => pool_query(`insert into ${tableName} set ?`, entity),
  del: (condition, tableName) => pool_query(`delete from ${tableName} where ?`, condition),
  edit: (entity, condition, tableName) => pool_query(`update ${tableName} set ? where ?`, [entity, condition])
};