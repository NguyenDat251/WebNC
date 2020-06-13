const bcrypt = require('bcryptjs');
const db = require('../utils/db');

module.exports = {
    getCurrentMoney: id => {
        return db.load(`select m.money, m.idParent from MoneyAccount m, account a where m.idParent = a.id and a.id='${id}'`)
    },

    setMoney: async entity => {
        // let MoneyEntity = await db.load(`select m.money, m.id from MoneyAccount m, account a where m.id = a.id and a.username='${entity.username}'`)

        // console.log("MoneyEntity: ", JSON.stringify(MoneyEntity[0]))

        // currentMoney = parseInt(MoneyEntity[0].money) + parseInt(entity.money) 

        return db.edit({Money: entity.CurrentMoney}, {idParent: parseInt(entity.idParent)}, 'MoneyAccount')
    },

    getAccount: async id => {
        return db.load(`select a.* from account a, moneyaccount m where a.id = m.id and m.Number = '${id}'`);
    },

    addToHistory: entity => {
        return db.add(entity, 'history')
    },

    getHistory: id => {
        console.log("id: ", id)
        return db.load(`select * from history where sender = '${id}' or receiver = '${id}'`)
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