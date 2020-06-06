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

router.get('/info/:id', async (req, res) => {
    const id = req.params.id
    console.log("id: ", id)
    const rs = await moneyModel.getAccount(id)

    console.log(rs)

    if(rs.length > 0){
        response(res, '', 'get infomation money account successful', {
           name: rs[0].name
        })
        return
    }else{
        response(res, 'err', 'user is not exist')
    }

})

router.post('/transferLocal', async (req, res) => {
    /*{
        from: '1' id money account
        to: '2' money account
        money: 100000
        content: 'a'
        paidBy: 1 -> sender
                2 -> receiver
    }
     */

     //
})

module.exports = router;