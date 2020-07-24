const moneyModel = require('../models/money.model');
var {
    response,
    DEFINED_CODEgetCurrentMoneyFromIdUser } = require('../config/response');

const doTheMoney = async (id, money, isSaving, res) => {
    var rsgetCurrentMoneyFromIdUser = null;
    if (isSaving === null || !isSaving) {
        rsgetCurrentMoneyFromIdUser = await moneyModel.getCurrentMoneyFromIdUser(id)
        console.log('rsgetCurrentMoneyFromIdUser:', rsgetCurrentMoneyFromIdUser)
    }
    else if (isSaving) {
        rsgetCurrentMoneyFromIdUser = await moneyModel.getCurrentMoneySaving(id)

    }

    if (rsgetCurrentMoneyFromIdUser.length == 0) {
        response(res, 'err', 'not found user to do the transfer')
        return false
    }

    let CurrentMoney = parseInt(rsgetCurrentMoneyFromIdUser[0].money) + parseInt(money)
    if (CurrentMoney < 0) {
        res.json({
            message: "Your account is not enough money to pay this Debt",
            returnCode: -1
        })
        return false
    }
    var result = null;
    if (isSaving === null || !isSaving) {
        result = await moneyModel.setMoney({
            idParent: rsgetCurrentMoneyFromIdUser[0].id,
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
        return false
    }

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

module.exports.doTheMoney = doTheMoney
module.exports.addToHistory = addToHistory