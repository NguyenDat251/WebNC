const express = require('express');
const router = express.Router();
const moneyModel = require('../models/money.model.js');
const userModel = require('../models/user.model');
const moment = require('moment');
const {
    promisify
} = require('util');
var {
    response,
    DEFINED_CODE
} = require('../config/response');
var _ = require('lodash')

const FEE = 3000;

const { encodeWalletId, decodeWalletId } = require('../middlewares/convertWalletId.mdw.js');

const doTheMoney = async (id, money, isSaving=false, res) => {
    var rsGetCurrentMoney = null;
    if (isSaving === null || !isSaving) {
        rsGetCurrentMoney = await moneyModel.getCurrentMoney(id)
    }
    else if (isSaving) {
        rsGetCurrentMoney = await moneyModel.getCurrentMoneySaving(id)

    }

    if (rsGetCurrentMoney.length == 0) {
        response(res, 'err', 'not found user to do the transfer')
        return
    }


    let CurrentMoney = parseInt(rsGetCurrentMoney[0].money) + parseInt(money)
    console.log('CurrentMoney:', CurrentMoney)

    if (CurrentMoney < 0) {
        response(res, 'err', 'Your account is not enough money')
        return
    }
    var result = null;
    if (isSaving === null || !isSaving) {
        result = await moneyModel.setMoney({
            idParent: rsGetCurrentMoney[0].idParent,
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
    console.log('req:', req.body)

    /*{
        id: "01",
        money: 10000
    }503560
     */
    //const rs = await doTheMoney(req.body.username, req.body.money, res)

    let rs;


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
    const rs = await moneyModel.getAccount(id)


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

        const fee = FEE;
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
        console.log('Money:', Money)
        if (paidBy == 1) {
            moneySenderPaid = -1 * (Money + fee)
            moneyReceiverPaid = Money
        } else {
            moneySenderPaid = -1 * Money
            moneyReceiverPaid = Money - fee
        }
        console.log('moneySenderPaid:', moneySenderPaid)
        console.log('moneyReceiverPaid:', moneyReceiverPaid)
        console.log("minus money")

        let rs;

        rs = await doTheMoney(sender, moneySenderPaid, isSaving, res);

        if (!rs){
            response(res, 'err', 'set money false for sender')
            return
        }

        console.log("add money")

        //rs =  await doTheMoney(receiver, moneyReceiverPaid, res)

        rs = await doTheMoney(receiver, moneyReceiverPaid, false, res)

        if (!rs){
            response(res, 'err', 'set money false for receiver')
            return
        }

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

router.get('/historyLocal', async (req, res) => {
    //?id=&isAll=
    const id = req.query.id;
    const isAll = req.query.isAll === 'true';

    const historyFromOtherBank = await moneyModel.getHistoryFromOtherBank(id);
    historyFromOtherBank.forEach(element => {
        element.user = encodeWalletId(element.user);
        element.isSaving = false;
    })

    const historyFromWallet = await moneyModel.getHistoryFromWallet(id);
    const historyFromSaving = await moneyModel.getHistoryFromSaving(id);
    if (historyFromWallet.length == 0 && historyFromSaving.length == 0 && historyFromOtherBank.length == 0) {
        response(res, '', 'There is no exchange history')
    } else {
        let result = [];
        //Concat 2 arrays by using lodash
        //const limitTime = Date.now()/1000 - 2592000;
        const limitTime = 1592047850;
        result = _.concat(historyFromWallet, historyFromSaving);
        result = _.sortBy(result, [function(o) { return o.time; }]).reverse();
        if(!isAll) {
            result = result.filter(el => el.time >= limitTime)
        }

        //Encode id_saving and Number to walletId;
        result.forEach(element => {
            if (element.isSaving) {
                if (element.type == 2) {
                    element.user = encodeWalletId(element.user, element.isSaving);
                    element.partner = encodeWalletId(element.partner);
                }
                else {
                    element.user = encodeWalletId(element.user);
                    element.partner = encodeWalletId(element.partner, element.isSaving);
                }
            }
            else {
                element.user = encodeWalletId(element.user);
                element.partner = encodeWalletId(element.partner);

            }
            element.user = element.type == 2 ? element.name + ` (${element.user})`: element.user;
            element.partner = element.type == 1 ? element.name  + ` (${element.partner})`: element.partner;
            element.time = moment(element.time * 1000).format("DD-MM-YYYY hh:mm a")
            element.type = (element.type == 1 ? 'Credited' : (element.type == 2 ? 'Transfer' : 'Debted'));
            
        });
        result = _.concat(result, historyFromOtherBank);
        console.log('result:', result)
        
        response(res, '', 'Get history successfull', result)
    }
})



module.exports = router;