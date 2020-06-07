const express = require('express');
const router = express.Router();
const moneyModel = require('../models/money.model.js');
const {
    promisify
} = require('util');
var {
    response,
    DEFINED_CODE
} = require('../config/response');

const doTheMoney = async (username, money, res) => {
    const rsGetCurrentMoney = await moneyModel.getCurrentMoney(username)

    console.log(rsGetCurrentMoney)

    if (rsGetCurrentMoney.length == 0) {
        response(res, 'err', 'not found user to do the transfer')
        return false
    }


    let CurrentMoney = parseInt(rsGetCurrentMoney[0].money) + parseInt(money)
    console.log("current money: ", CurrentMoney)

    if (CurrentMoney < 0) {
        response(res, 'err', 'Your account is not enough money')
        return false
    }

    const result = await moneyModel.setMoney({
        idParent: rsGetCurrentMoney[0].idParent,
        CurrentMoney,
    })

    if (!result.affectedRows) {
        response(res, 'err', 'err transfer')
        return false
    }
    // else{
    //     response(res, '', 'transaction money successfull')
    // }

    return true
}

router.post('/addMoney', async (req, res) => {
    //const result = await moneyModel.addMoney(req.body)

    /*{
        username: "adminn",
        money: 10000
    }
     */
    //const rs = await doTheMoney(req.body.username, req.body.money, res)

    let rs;


    console.log(req.body)
    rs = await doTheMoney(req.body.username, req.body.money, res)




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
        from: 'abc' username money account
        to: 'username' username money account
        money: 100000
        content: 'a'
        paidBy: 1 -> sender
                2 -> receiver
    }
     */

    const fee = 3000;
    //
    const Money = parseInt(req.body.money);
    const sender = req.body.from
    const receiver = req.body.to
    const content = req.body.content
    const paidBy = req.body.paidBy

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

    console.log("rs: " + rs)
    if (!rs)
        return

    response(res, '', 'transfer money successfull')
})

module.exports = router;