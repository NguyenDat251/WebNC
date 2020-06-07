const bcrypt = require('bcryptjs');
const userModel = require('./user.model');
const db = require('../utils/db');

module.exports = {
  getMoneyAccount: username => {
      return db.load(`select * from moneyaccount where username = '${username}'`)
  },
  getSaving: username => {
      return db.load(`select * from savinglist where username = '${username}'`)
  },
  createSaving: entity => {
      return db.add(entity, 'savinglist')
  }
};