const express = require('express');
const moneyAccountModel = require('../models/moneyAccount.model');
const config = require('../config/default.json');
const bcrypt = require('bcryptjs');
const otp = require('otp-generator');
const moment = require('moment');
var {
    response,
    DEFINED_CODE
  } = require('../config/response');

const router = express.Router();

router.get('/:username', async (req, res) => {
    const username = req.params.username

    let listMoneyAccount = await moneyAccountModel.getMoneyAccount(username)
    let listSaving = await moneyAccountModel.getSaving(username)

    if(!listMoneyAccount || !listSaving){
        response(res, 'err', 'error get list money account')
    }
    else{
        response(res, '', 'get list money account successful', {
            MainAccount: listMoneyAccount,
            Saving: listSaving
        })
    }
})

router.post('/createSaving', async (req, res) => {
    /*{
        spending: 10000,
        username: '',
        name_saving: '' 
    }*/

    const result = await moneyAccountModel.createSaving(req.body)

    if(result.affectedRows < 1){
        response(res, 'err', 'Can not create saving account')
    }else{
        response(res, '', 'Create saving account successful')
    }
})

module.exports = router;