const express = require('express');
const router = express.Router();
const moneyModel = require('../models/money.model.js');
var { response, DEFINED_CODE } = require('../config/response');

router.post('/addMoney', async (req, res) => {
   const result = await moneyModel.addMoney(req.body)

   if(!result.affectedRows){
       response(res, 'err', 'user is not exist')
   }
    else{
        response(res, '', 'transaction money successfull')
    }

})

module.exports = router;