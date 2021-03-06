const bcrypt = require('bcryptjs');
const moment = require('moment');
const db = require('../utils/db');


module.exports = {
  add: async entity => {
    console.log('entity:', entity)
    const hash = bcrypt.hashSync(entity.password_hash, 8);
    entity.password_hash = hash;
    delete entity.password;
    const resultAddUser = await db.add(entity, 'account');

    return db.add({
      money: 0,
      id: resultAddUser.insertId
    }, 'MoneyAccount')
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
  getNameByWalletId: async id_wallet => {
    return db.load(`select a.name,a.id from account as a, moneyaccount as ma
    where a.id = ma.idParent and ma.Number =${id_wallet}`)
  },
  getUserInfoByUsername: async username => {
    return db.load(`select a.username,a.role,a.name,a.email,a.phone,a.identity_number as idenityNumber,a.dob,m.Money as balance,m.Number as walletNumber
    from account as a,moneyaccount as m 
    where a.id = m.idParent and a.username = '${username}';`)
  },
  getUserInfoByWalletId: async walletId => {
    return db.load(`select a.name, a.role,a.username,a.identity_number as identityNumber,m.Money as balance,m.Number as walletNumber
  from account as a,moneyaccount as m 
  where a.id = m.idParent and m.Number = '${walletId}';`)
  },
  isEmailExist: async email => {
    console.log("check email exist")

    const result = await db.load(`select * from account where email = '${email}'`)

    if (result.length > 0)
      return true

    return false
  },

  singleByUserName: userName => db.load(`select account.*,moneyaccount.Number,moneyaccount.Money from account,moneyaccount where account.username = '${userName}' and account.id=moneyaccount.idParent`),

  updateRefreshToken: async (userId, token) => {

    // await db.del({
    //   id: userId
    // }, 'userrefreshtokenext');

    await db.load(`delete from userrefreshtokenext where id = ${userId}`);

    const entity = {
      id: userId,
      refreshToken: token
      // rdt: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    return db.add(entity, 'userrefreshtokenext');
  },

  verifyRefreshToken: async (userId, token) => {
    const sql = `select * from userrefreshtokenext where ID = ${userId} and refreshToken = '${token}'`;
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

    return db.edit({
      password_hash: entity.password_hash
    }, {
      id: entity.userId
    }, 'account')
  },

  checkOTPExisted: otp => {
    return db.load(`select * from otp where otp = '${otp}'`)
  },

  addOTP: entity => {
    return db.add(entity, 'otp')
  },

  deleteOTP: () => {
    const timeToCompare = Math.floor(Date.now() / 1000) - 300;
    //console.log("delete otp time: ", timeToCompare)
    return db.load(`delete from otp where time < '${timeToCompare}'`)
  },

  setPassword: entity => {
    const pw = bcrypt.hashSync(entity.NewPassword, 8);
    return db.load(`update account set password_hash = '${pw}' where email = '${entity.email}'`)
  },

  getList: role => {
    return db.load(`select * from account where role = '${role}'`)
  },

  getUserById: id => {
    return db.load(`select name, email, phone, identity_number from account where id = ${id}`)
  },

  updateUser: (username, entity) => {
    // return db.load(`update from account where username = '${entity.username}' set name = '${entity.name}', email = '${entity.email}', phone = '${entity.phone}', role = '${entity.role}', identity_number = '${entity.identity_number}'`)

    return db.edit(entity, {
      username
    }, 'account')

  },

  deleteUser: id => {
    return db.load(`delete from account where id = ${id}`);
  }
};