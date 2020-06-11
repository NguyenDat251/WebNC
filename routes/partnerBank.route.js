const express = require('express');
const router = express.Router();
const partnerBankModel = require('../models/partnerBank.model.js')
const moneyModel = require('../models/money.model.js');
const userModel = require('../models/user.model');

const {
    promisify
} = require('util');
var {
    response,
    DEFINED_CODE
} = require('../config/response');

// const DaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
// const DaysInMonthLeapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]



router.get('/transaction/:time', async (req, res) => {
    const time = req.params.time;

    const month = parseInt(time.substr(0, 2));
    
    const year = parseInt(time.substr(2, 6));

    let nextMonth, nextYear;

    if(month == 12){
        nextMonth = 1
        nextYear = year + 1
    }else{
        nextMonth = month + 1;
        nextYear = year;
    }

    const TimeFrom = new Date(year, month, 0).getTime()/1000;
    const TimeTo = new Date(nextYear, nextMonth, 0).getTime()/1000;

    console.log("second: ", TimeFrom, TimeTo)

    const result = await partnerBankModel.getTransaction(TimeFrom, TimeTo);
    console.log(result)
    if(!result){
        response(res, 'err', 'error getting transaction history')
    }
    else{
        response(res, '', 'Getting transaction history successful', result)
    }
})

router.post('/add-money/:id', async (req, res) => {
    console.log(partnerBankModel.getInfo("kianto"))

    const partnerInfo = partnerBankModel.getInfo(req.headers.id)

    const secretKey = partnerInfo.SecretKey;
        let publicKey = partnerInfo.PublicKey;
        let currentTime = Date.now();

        //check id -> lấy secret key

        //verify

        console.log("header: " + JSON.stringify(req.headers));
        console.log("body: " +  JSON.stringify(req.body));

        

        if(!sig.checkRSASig(req.headers.verify)){
            // res.json({
            //     "returnCode": 0,
            //     "returnMessage": "Error verify!",
            //     "data": null
            // })

            response(res, 'err', 'Error verify!')
            return;
        }

    // if(key.encrypt("abc", 'hex', 'utf8'));

        //check hash

        if(!sig.checkHash(req.headers.sig, req.headers.ts, req.body, secretKey)){
            // res.json({
            //     "returnCode": 0,
            //     "returnMessage": "The request has been fixed",
            //     "data": null
            // })
            response(res, 'err', 'The request has been fixed!')
            return;
        }

        //check time

        if(!sig.checkTime(req.headers.ts)){
            // res.json({
            //     "returnCode": 0,
            //     "returnMessage": "The request is out of date",
            //     "data": null
            // })
            response(res, 'err', 'The request is out of date!')
            return;
        }


        //thực hiện api

        console.log("begin api")

        console.log(req.params.accountId)

        let CurrentMoney;
})

module.exports = router;