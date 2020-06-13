const bcrypt = require('bcryptjs');
const db = require('../utils/db');

module.exports = {
    getCurrentMoney: id => {
        return db.load(`select m.money, m.id from MoneyAccount m, account a where m.id = a.id and m.Number='${id}'`)
    },
    getCurrentMoneySaving: id => {
        return db.load(`select s.spending as money, s.id from savinglist as s where s.id_saving=${id};`)
    },
    setMoney: async entity => {
        // let MoneyEntity = await db.load(`select m.money, m.id from MoneyAccount m, account a where m.id = a.id and a.username='${entity.username}'`)

        // console.log("MoneyEntity: ", JSON.stringify(MoneyEntity[0]))

        // currentMoney = parseInt(MoneyEntity[0].money) + parseInt(entity.money) 

        return db.edit({ Money: entity.CurrentMoney }, { id: parseInt(entity.id) }, 'MoneyAccount')
    },
    setMoneySaving: async entity => {
        // let MoneyEntity = await db.load(`select m.money, m.id from MoneyAccount m, account a where m.id = a.id and a.username='${entity.username}'`)

        // console.log("MoneyEntity: ", JSON.stringify(MoneyEntity[0]))

        // currentMoney = parseInt(MoneyEntity[0].money) + parseInt(entity.money) 

        return db.edit({ spending: entity.spending }, { id_saving: parseInt(entity.id_saving) }, 'savinglist')
    },
    getAccount: async id => {
        return db.load(`select a.* from account a, moneyaccount m where a.id = m.id and m.Number = '${id}'`);
    },

    addToHistory: entity => {
        return db.add(entity, 'history')
    },

    getHistoryFromWallet: id => {
        console.log("id: ", id)
        return db.load(`select  a.id,a.name,h.*,ma.Number
        from history as h,account as a,moneyaccount as ma  
        where ma.id= a.id and (ma.Number = h.user or ma.Number = h.partner) and a.id= ${id} and h.isSaving = 0;`)
    },
    getHistoryFromSaving: id => {
        console.log("id: ", id)
        return db.load(`
        select  a.id,a.name,h.*,sl.id_saving
        from history as h,account as a,savinglist as sl  
        where sl.id= a.id and (sl.id_saving = h.user or sl.id_saving = h.partner) and a.id= ${id} and h.isSaving = 1;`)
    }

    // minusMoney: async entity => {
    //     // console.log(entity.username)
    //     // let MoneyEntity = await db.load(`select m.money, m.id from MoneyAccount m, account a where m.id = a.id and a.username='${entity.username}'`)

    //     // if(MoneyEntity.length == 0)
    //     //     return 'false'

    //     // console.log("MoneyEntity: ", JSON.stringify(MoneyEntity[0]))

    //     // currentMoney = parseInt(MoneyEntity[0].money) - parseInt(entity.money) 

    //     // if(currentMoney < 0)
    //     //     return false

    //     return db.edit({money: entity.currentMoney}, {id: parseInt(entity.id)}, 'MoneyAccount') 
    // }
}