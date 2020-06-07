const bcrypt = require('bcryptjs');
const moment = require('moment');
const db = require('../utils/db');


module.exports = {
  add: async entity => {
    console.log('entity:', entity)
    // entity = {
    //   "username": "admin",
    //   "password_hash": "admin",
    //   "name": "admin",
    //   "email": "admin@g.c",
    //   "phone": "0343244644,
    //   "role": 1
    // }
    const hash = bcrypt.hashSync(entity.password, 8);
    entity.password_hash = hash;
    delete entity.password;
    const resultAddUser = await db.add(entity, 'account');

    //resultAddUser

    return db.add({ money: 0, type: 1, idParent: resultAddUser.insertId }, 'MoneyAccount')

    //return db.add(entity, 'account');
  },

  getIdByUsername: async username => {
    console.log("get id by username")

    const result = await db.load(`select * from account where username = '${username}'`)

    return result;
  },

  isUsernameExist: async username => {
    console.log("check username exist")

    const result = await db.load(`select * from account where username = '${username}'`)

    if (result.length > 0)
      return true

    return false
  },
  getNameByWalletId: async id_wallet=>{
    return db.load(`select a.name from account as a, moneyaccount as ma
    where a.id = ma.IdParent and ma.Number =${id_wallet}`)
  },
  getUserInfoByUsername: async username => {
    return db.load(`select a.username,a.name,a.email,a.phone,a.indentity_number as idenityNumber,a.dob,m.Money as balance,m.Number as walletNumber
    from account as a,moneyaccount as m 
    where a.id = m.IdParent and a.username = '${username}';`)
  },
  getUserInfoByWalletId: async walletId => {
    return db.load(`select a.name,a.username,a.indentity_number as identityNumber,m.Money as balance,m.Number as walletNumber
  from account as a,moneyaccount as m 
  where a.id = m.IdParent and m.Number = '${walletId}';`)
  },
  isEmailExist: async email => {
    console.log("check email exist")

    const result = await db.load(`select * from account where email = '${email}'`)

    if (result.length > 0)
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

    return db.edit({ password_hash: entity.password_hash }, { id: entity.userId }, 'account')
  },

  checkOTPExisted: otp => {
    return db.load(`select * from otp where otp = '${otp}'`)
  },

  addOTP: entity => {
    return db.add(entity, 'otp')
  },

  deleteOTP: () => {
    const timeToCompare = Math.floor(Date.now()/1000) - 300;
    //console.log("delete otp time: ", timeToCompare)
    return db.load(`delete from otp where time < '${timeToCompare}'`)
  },

  setPassword: entity => {
    const pw = bcrypt.hashSync(entity.NewPassword, 8);
    return db.load(`update account set password_hash = '${pw}' where email = '${entity.email}'`)
  },

  getList: role =>  {
    return db.load(`select * from account where role = '${role}'`)
  },

  updateUser: (username, entity) => {
    // return db.load(`update from account where username = '${entity.username}' set name = '${entity.name}', email = '${entity.email}', phone = '${entity.phone}', role = '${entity.role}', identity_number = '${entity.identity_number}'`)
    return db.edit(entity, {username}, 'account')
  },

  forgetPassword: entity => {

  }
};