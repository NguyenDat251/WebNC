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

const doTheMoney = async (id, money, res) => {
    const rsGetCurrentMoney = await moneyModel.getCurrentMoney(id)
    
    console.log(rsGetCurrentMoney)

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

    const result = await moneyModel.setMoney({
        idParent: rsGetCurrentMoney[0].idParent,
        CurrentMoney,
    })

    if (!result.affectedRows) {
        response(res, 'err', 'err transfer')
        return 
    }
    // else{
    //     response(res, '', 'transaction money successfull')
    // }

    return true
}

const addToHistory = async (user,partner, type, money,description, time) => {
    console.log("add to history")
    await moneyModel.addToHistory({
        user: user,
        partner: partner,
        type: type,
        description,
        money_transfer: money,
        time: time/1000
    })
}

router.post('/addMoney', async (req, res) => {
    //const result = await moneyModel.addMoney(req.body)

    /*{
        id: "01",
        money: 10000
    }
     */
    //const rs = await doTheMoney(req.body.username, req.body.money, res)

    let rs;


    console.log(req.body)
    rs = await doTheMoney(req.body.id, req.body.money, res)

    if(!rs){
        return;
    }

    //const idReceiver = await userModel.getIdByUsername(req.body.username)

    // await Promise.all(idReceiver)

    await addToHistory(req.body.id, '-1', '1', req.body.money, Date.now())


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
        const Money = parseInt(req.body.money);
        const sender = req.body.from
        const receiver = req.body.to
        //const content = req.body.content
        const paidBy = req.body.paidBy
        const isSaving = req.body.isSaving

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

        rs = await doTheMoney(sender, moneySenderPaid, res)


        if (!rs)
            return

        console.log("add money")

        //rs =  await doTheMoney(receiver, moneyReceiverPaid, res)

        rs = await doTheMoney(receiver, moneyReceiverPaid, res)

        //const idReceiver = await userModel.getIdByUsername(receiver)
        //const idSender = await userModel.getIdByUsername(sender)

        //Promise.all(idReceiver, idSender)
        //this.subscribe
        await addToHistory(receiver, sender, `1`, moneyReceiverPaid, Date.now())
        await addToHistory(sender, receiver, `2`, moneySenderPaid, Date.now())

        console.log("rs: " + rs)
        if (!rs)
            return

        response(res, '', 'Transfer money successfull')

    } else {
        response(res, 'err', 'Otp is not exist', {})
        return
    }
})

router.get('/history/:id', async (req, res) => {
    const id = req.params.id

    const result = await moneyModel.getHistory(id)
    console.log(result)
    console.log(result.length)
    if (result.length == 0) {
        response(res, '', 'There is no exchange history')
    } else {
        response(res, '', 'get history successfull', result)
    }
})



module.exports = router;