const bcrypt = require('bcryptjs');
const userModel = require('./user.model');
const db = require('../utils/db');

module.exports = {
  login: async entity => {
    // entity = {
    //   "username": "admin",
    //   "password": "admin"
    // }

    let ret = {
      boolean: false,
      message: "",
      data: null
    }

    const rows = await userModel.singleByUserName(entity.username);
    if (rows.length === 0){
      ret.message = "Not found user"
      return ret;
    }

    const hashPwd = rows[0].password_hash;

    console.log("hashPwd: " ,hashPwd)

    console.log("hash pass input: " ,bcrypt.hashSync(entity.password, 8))

    if (bcrypt.compareSync(entity.password, hashPwd)) {
      ret.boolean = true;
      ret.data = rows[0]
      return ret;
    }

    ret.message = "Wrong passwords"
      return ret;
  }
};