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
    console.log('body:', req.body)
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
            element.walletID = encodeWalletId(element.walletID);
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
            element.walletID = encodeWalletId(element.walletID);

        })
        res.status(200).json({
            returnCode: 1,
            message: `Get Data Debt Owner Success`,
            data: result
        });
    }
})
router.get('/getNameByWalletId/:id_wallet', async (req, res) => {
    let id_wallet = decodeWalletId(req.params.id_wallet);
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
    const otp = req.body.otp
    console.log('req.body:', req.body);
    const checkOTP = await userModel.checkOTPExisted(req.body.otp);
    console.log('checkOTP:', checkOTP)
    if (checkOTP.length <= 0) {
        res.json({
            returnCode: 0,
            message: 'Wrong OTP Please Send an OTP and Check your email to get an OTP'
        })
        return
    }

    if (checkOTP[0].email !== req.body.email) {
        res.json({
            returnCode: 0,
            message: 'Wrong OTP Please Check your email you have register to get an OTP!!'
        })
        // response(res, 'err', 'wrong otp', {})
        console.log("wrong after wrong otp")
        return
    }

    const fee = FEE;
    const id_debt = req.body.id_debt;
    const decodeWalletIdOwner = decodeWalletId(req.body.walletID);
    const decodeWalletIdDebtor = req.body.decodeWalletIdDebtor;

    const debt = await debtReminderModel.getDebt(id_debt);



    if (!debt) {
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

    if (!rs) {
        //response(res, 'err', 'set money false for sender')
        return
    }

    console.log("add money")

    //rs =  await money.doTheMoney(receiver, moneyReceiverPaid, res)

    rs = await money.doTheMoney(receiver, moneyReceiverPaid, false, res)

    if (!rs) {
        //response(res, 'err', 'set money false for receiver')
        return
    }

    //const idReceiver = await userModel.getIdByUsername(receiver)
    //const idSender = await userModel.getIdByUsername(sender)

    //Promise.all(idReceiver, idSender)
    //this.subscribe
    await money.addToHistory(decodeWalletIdOwner, decodeWalletIdDebtor, `1`, moneyReceiverPaid, `Receive ${Money}  VND from ${req.body.name} pay a Debt from you`, Date.now(), false)
    await money.addToHistory(decodeWalletIdDebtor, decodeWalletIdOwner, `3`, moneySenderPaid, `Pay A Debt ${Money} VND to ${req.body.creditor}`, Date.now(), false)

    console.log("rs: " + rs)
    if (!rs)
        return

    //response(res, '', 'Transfer money successfull')


    //change status debt
    const resultChangeStatus = await debtReminderModel.changeStatus(id_debt);
    if (!resultChangeStatus) {
        response(res, 'err', 'error when change status debt', {})
        return
    }
    response(res, '', `You Pay ${Money} Debt Successful!`)

})
module.exports = router;