const bcrypt = require('bcryptjs');
const moment = require('moment');
const db = require('../utils/db');

module.exports = {
  add: async entity => {
    // entity = {
    //   "username": "admin",
    //   "password_hash": "admin",
    //   "name": "admin",
    //   "email": "admin@g.c",
    //   "phone": "0343244644,
    //   "role": 1
    // }
    const hash = bcrypt.hashSync(entity.password_hash, 8);
    entity.password_hash = hash;

    const resultAddUser = await db.add(entity, 'account');

    //resultAddUser

    return db.add({money: 0, type: 1, idParent: resultAddUser.insertId}, 'MoneyAccount')

    //return db.add(entity, 'account');
  },



  isUsernameExist: async username => {
    console.log("check username exist")

    const result = await db.load(`select * from account where username = '${username}'`)

    if(result.length > 0)
      return true

    return false
  },

isEmailExist: async email => {
    console.log("check email exist")

    const result = await db.load(`select * from account where email = '${email}'`)

    if(result.length > 0)
      return true

    return false
  },

  singleByUserName: userName => db.load(`select * from account where username = '${userName}'`),

  updateRefreshToken: async (userId, token) => {

    await db.del({ id: userId }, 'userRefreshTokenExt');

    const entity = {
      id: userId,
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

  checkOTPExisted: otp => {
    return db.load(`select * from otp where otp = '${otp}'`)
  },

  addOTP: entity => {
    return db.add(entity, 'otp')
  },

  setPassword: entity => {
    const pw = bcrypt.hashSync(entity.NewPassword, 8);
    return db.load(`update account set password_hash = '${pw}' where email = '${entity.email}'`)
  },

  forgetPassword: entity => {
    
  }
};