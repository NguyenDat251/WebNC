const express = require('express');
const router = express.Router();
const moneyModel = require('../models/money.model.js');
const userModel = require('../models/user.model');

const {
    promisify
} = require('util');
var {
    response,
    DEFINED_CODE
} = require('../config/response');
var _ = require('lodash')

const { decodeWalletId } = require('../middlewares/convertWalletId.mdw.js');

const doTheMoney = async (id, money, isSaving, res) => {
    var rsGetCurrentMoney = null;
    if (isSaving === null || !isSaving) {
        rsGetCurrentMoney = await moneyModel.getCurrentMoney(id)
    }
    else if (isSaving) {
        console.log("go inside isSaving")
        console.log('id:', id);
        rsGetCurrentMoney = await moneyModel.getCurrentMoneySaving(id)

    }
    console.log('rsGetCurrentMoney:', rsGetCurrentMoney)

    if (rsGetCurrentMoney.length == 0) {
        response(res, 'err', 'not found user to do the transfer')
        return
    }


    let CurrentMoney = parseInt(rsGetCurrentMoney[0].money) + parseInt(money)
    console.log("current money: ", CurrentMoney)

    if (CurrentMoney < 0) {
        response(res, 'err', 'Your account is not enough money')
        return
    }
    var result = null;
    if (isSaving === null || !isSaving) {
        result = await moneyModel.setMoney({
            id: rsGetCurrentMoney[0].id,
            CurrentMoney,
        })
    }
    else {
        result = await moneyModel.setMoneySaving({
            id_saving: id,
            spending: CurrentMoney,
        })
    }


    if (!result.affectedRows) {
        response(res, 'err', 'err transfer')
        return
    }
    // else{
    //     response(res, '', 'transaction money successfull')
    // }

    return true



}

const addToHistory = async (user, partner, type, money, description, time, isSaving) => {
    console.log("add to history")

    await moneyModel.addToHistory({
        user: user,
        partner: partner,
        type: type,
        isSaving,
        description,
        money_transfer: money,
        time: time / 1000
    })
}

router.post('/addMoney', async (req, res) => {
    //const result = await moneyModel.addMoney(req.body)

    /*{
        id: "01",
        money: 10000
    }503560
     */
    //const rs = await doTheMoney(req.body.username, req.body.money, res)

    let rs;


    console.log(req.body)
    rs = await doTheMoney(req.body.id, req.body.money, false, res)

    if (!rs) {
        return;
    }

    //const idReceiver = await userModel.getIdByUsername(req.body.username)

    // await Promise.all(idReceiver)

    await addToHistory(req.body.id, '-1', '1', req.body.money, req.description, Date.now(), false)


    //    await new Promise( (resolve, reject) => {
    //     rs =  doTheMoney(req.body.username, req.body.money, res)
    //     resolve(true)
    //    })

    console.log(rs)
    if (rs) {
        response(res, '', 'transaction money successfull')
        return;
    }

})

router.get('/info/:id', async (req, res) => {
    const id = req.params.id
    console.log("id: ", id)
    const rs = await moneyModel.getAccount(id)

    console.log(rs)

    if (rs.length > 0) {
        response(res, '', 'get infomation money account successful', {
            name: rs[0].name
        })
        return
    } else {
        response(res, 'err', 'user is not exist')
    }

})

router.post('/transferLocal', async (req, res) => {
    /*{
        otp: 
        email: 
        from: '1' id money account
        to: '2' id money account
        money: 100000
        content: 'a'
        paidBy: 1 -> sender
                2 -> receiver
    }
     */

    const checkOTP = await userModel.checkOTPExisted(req.body.otp);
    if (checkOTP.length > 0) {
        console.log("email input: ", req.body.email)
        console.log("email in data: ", checkOTP[0].email)
        if (checkOTP[0].email !== req.body.email) {
            response(res, 'err', 'wrong otp', {})
            console.log("abc after wrong otp")
            return
        }

        const fee = 3000;
        //
        const isSaving = req.body.isSaving;
        const Money = parseInt(req.body.money);
        const sender = decodeWalletId(req.body.from, isSaving);

        const receiver = decodeWalletId(req.body.to, false);
        console.log('sender:', sender)
        console.log('receiver:', receiver)
        const description = req.body.description
        const paidBy = req.body.paidBy
        console.log('isSaving:', isSaving)
        let moneySenderPaid, moneyReceiverPaid;
        if (paidBy == 1) {
            moneySenderPaid = -1 * (Money + fee)
            moneyReceiverPaid = Money
        } else {
            moneySenderPaid = -1 * Money
            moneyReceiverPaid = Money - fee
        }

        console.log("minus money")

        let rs;

        rs = await doTheMoney(sender, moneySenderPaid, isSaving, res);

        if (!rs)
            return

        console.log("add money")

        //rs =  await doTheMoney(receiver, moneyReceiverPaid, res)

        rs = await doTheMoney(receiver, moneyReceiverPaid, false, res)

        //const idReceiver = await userModel.getIdByUsername(receiver)
        //const idSender = await userModel.getIdByUsername(sender)

        //Promise.all(idReceiver, idSender)
        //this.subscribe
        await addToHistory(receiver, sender, `1`, moneyReceiverPaid, description, Date.now(), isSaving)
        await addToHistory(sender, receiver, `2`, moneySenderPaid, description, Date.now(), isSaving)

        console.log("rs: " + rs)
        if (!rs)
            return

        response(res, '', 'Transfer money successfull')

    } else {
        response(res, 'err', 'Otp is not exist', {})
        return
    }
})

router.get('/historyLocal/:id', async (req, res) => {
    const id = req.params.id

    const historyFromWallet = await moneyModel.getHistoryFromWallet(id);
    const historyFromSaving = await moneyModel.getHistoryFromSaving(id);
    if (historyFromWallet.length == 0 && historyFromSaving.length == 0) {
        response(res, '', 'There is no exchange history')
    } else {
        let result = [];
        //Concat 2 arrays by using lodash
        result = _.concat(historyFromWallet, historyFromSaving);
        console.log('result:', result)
        response(res, '', 'Get history successfull', result)
    }
})



module.exports = router;