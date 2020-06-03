const bcrypt = require('bcryptjs');
const moment = require('moment');
const db = require('../utils/db');

module.exports = {
  add: entity => {
    // entity = {
    //   "username": "admin",
    //   "password_hash": "admin",
    //   "name": "admin",
    //   "email": "admin@g.c",
    //   "dob": "1990-09-09",
    //   "permission": 0
    // }
    const hash = bcrypt.hashSync(entity.password_hash, 8);
    entity.password_hash = hash;
    return db.add(entity, 'account');
  },

  singleByUserName: userName => db.load(`select * from account where username = '${userName}'`),

  updateRefreshToken: async (userId, token) => {

    await db.del({ ID: userId }, 'userRefreshTokenExt');

    const entity = {
      ID: userId,
      refreshToken: token
      // rdt: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    return db.add(entity, 'userRefreshTokenExt');
  },

  verifyRefreshToken: async (userId, token) => {
    const sql = `select * from userRefreshTokenExt where ID = ${userId} and refreshToken = '${token}'`;
    const rows = await db.load(sql);
    if (rows.length > 0)
      return true;

    return false;
  },

  getPassword: async (userId) => {
    const sql = `select password_hash from account where id = ${userId}`;
    const rows = await db.load(sql);

    console.log("rows: ", rows[0].password_hash)

    return rows[0].password_hash;
    // if (rows.length > 0)
    //   return rows.;

    // return false;
  },

  changePassword: entity => {

    console.log("entity: ", JSON.stringify(entity))

    const hash = bcrypt.hashSync(entity.password_hash, 8);
    entity.password_hash = hash;

    return db.edit({password_hash:entity.password_hash}, {id: entity.userId}, 'account')
  },

  forgetPassword: entity => {
    
  }
};