const express = require('express');
const userModel = require('../models/user.model');
const moneyModel = require('../models/money.model');
const jwt = require('jsonwebtoken');
const config = require('../config/default.json');
const bcrypt = require('bcryptjs');
const money = require('../module/money')

const router = express.Router();
var moment = require('moment')
var { response, DEFINED_CODE } = require('../config/response');
var { mailer } = require('../utils/nodemailer');
const { encodeWalletId, decodeWalletId } = require('../middlewares/convertWalletId.mdw.js');

const debtReminderModel = require('../models/debt-reminder.model.js');

const FEE = 3000

router.post('/addDebtReminder', async (req, res) => {
    debtReminderModel.addDebtReminder(req.body).then(data => {
        console.log('data:', data)
        res.status(201).json({
            returnCode: 1,
            message: `Add Debt Reminder Successs`,
            data

        })
    })
})
router.put('/editDebtReminder', async (req, res) => {
    let id_debt = req.body.id_debt
    if (id_debt) {
        debtReminderModel.editDebtReminder(req.body, id_debt).then(data => {
            console.log('data:', data)
            res.status(201).json({
                returnCode: 1,
                message: `Edit Debt Reminder Successs`,
                data

            })
        })
    }
    else
        res.status(500).json({
            returnCode: -1,
            message: `Can find Id Debt in your request`,

        })

})
router.delete('/deleteDebtReminder', async (req, res) => {
    console.log("req.body: ", req.body);
    let id_debt = req.body.id_debt;
    if (id_debt) {
        debtReminderModel.deleteDebtReminder(id_debt).then(data => {
            console.log('data:', data)
            res.status(201).json({
                returnCode: 1,
                message: `Delete Debt Reminder Successs`,
                data

            })
        })
    }
    else
        res.status(500).json({
            returnCode: -1,
            message: `Can find Id Debt in your request`,

        })

});
router.get('/getDebtReminder/:id_debtor', async (req, res) => {

    let id_debtor = req.params.id_debtor;
    console.log('id_debtor:', id_debtor)
    if (id_debtor) {
        const result = await debtReminderModel.getDebtReminder(id_debtor)

        result.forEach(element => {
            element.dateCreate = moment(element.dateCreate).format("DD-MM-YYYY HH:mm");
        })
        res.status(200).json({
            returnCode: 1,
            message: `Get Data Debt Reminder Success`,
            data: result
        });
    }
})
router.get('/getDebtOwner/:id_owner', async (req, res) => {

    let id_owner = req.params.id_owner;

    if (id_owner) {
        const result = await debtReminderModel.getDebtOwner(id_owner)
        result.forEach(element => {
            element.dateCreate = moment(element.dateCreate).format("DD-MM-YYYY HH:mm");
        })
        res.status(200).json({
            returnCode: 1,
            message: `Get Data Debt Owner Success`,
            data: result
        });
    }
})
router.get('/getNameByWalletId/:id_wallet', async (req, res) => {
    let id_wallet = req.params.id_wallet;
    id_wallet= decodeWalletId(id_wallet);
    userModel.getNameByWalletId(id_wallet).then(data => {
        res.status(200).json({
            returnCode: 1,
            message: `Get Name User by Wallet Id Success`,
            data
        });
    })
})

router.post('/payDebt', async (req, res) => {

    // {
    //     id_debt:
    //     otp: 
    // }

    const checkOTP = await userModel.checkOTPExisted(req.body.otp);

    if(checkOTP.length <= 0){
        response(res, 'err', 'Otp is not exist', {})
        return
    }
    
        if (checkOTP[0].email !== req.body.email) {
            response(res, 'err', 'wrong otp', {})
            console.log("abc after wrong otp")
            return
        }

        const fee = FEE;
        const id_debt = req.body.id_debt;

        const debt = await debtReminderModel.getDebt(id_debt);

       

        if(!debt){
            response(res, 'err', 'debt is not exist', {})
            return
        }

        //debt = debt[0];

        console.log("debt: ", debt)

        const Money = debt[0].money_debt;
        const sender = debt[0].id_debtor;



        const receiver = debt[0].id_owner;

        console.log("sender: ", sender);
        console.log("receiver: ", receiver);
        
            moneySenderPaid = -1 * (Money + fee)
            moneyReceiverPaid = Money

        console.log("minus money")

        let rs;

        rs = await money.doTheMoney(sender, moneySenderPaid, false, res);

        if (!rs){
            //response(res, 'err', 'set money false for sender')
            return
        }

        console.log("add money")

        //rs =  await money.doTheMoney(receiver, moneyReceiverPaid, res)

        rs = await money.doTheMoney(receiver, moneyReceiverPaid, false, res)

        if (!rs){
            //response(res, 'err', 'set money false for receiver')
            return
        }

        //const idReceiver = await userModel.getIdByUsername(receiver)
        //const idSender = await userModel.getIdByUsername(sender)

        //Promise.all(idReceiver, idSender)
        //this.subscribe
        await money.addToHistory(receiver, sender, `1`, moneyReceiverPaid, `receive payment`, Date.now(), false)
        await money.addToHistory(sender, receiver, `3`, moneySenderPaid, `pay dept`, Date.now(), false)

        console.log("rs: " + rs)
        if (!rs)
            return

        //response(res, '', 'Transfer money successfull')

    
        //change status debt
        const resultChangeStatus = await debtReminderModel.changeStatus(id_debt);
        if(!resultChangeStatus){
            response(res, 'err', 'error when change status debt', {})
            return
        }

        response(res, '', 'pay debt successful')
})
module.exports = router;