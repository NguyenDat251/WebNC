const bcrypt = require('bcryptjs');
const userModel = require('./user.model');
const db = require('../utils/db');

module.exports = {
  getMoneyAccount: id => {
      return db.load(`select * from moneyaccount where id = '${id}'`)
  },
  getSaving: id => {
      return db.load(`select * from savinglist where id = '${id}'`)
  },
  createSaving: entity => {
      return db.add(entity, 'savinglist')
  }
};