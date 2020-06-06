const bcrypt = require('bcryptjs');
const db = require('../utils/db');

module.exports = {
    getCurrentMoney: username => {
        return db.load(`select m.money, m.idParent from MoneyAccount m, account a where m.idParent = a.id and a.username='${username}'`)
    },

    setMoney: async entity => {
        // let MoneyEntity = await db.load(`select m.money, m.idParent from MoneyAccount m, account a where m.idParent = a.id and a.username='${entity.username}'`)

        // console.log("MoneyEntity: ", JSON.stringify(MoneyEntity[0]))

        // currentMoney = parseInt(MoneyEntity[0].money) + parseInt(entity.money) 

        return db.edit({Money: entity.CurrentMoney}, {idParent: parseInt(entity.idParent)}, 'MoneyAccount')
    },

    getAccount: async id => {
        return db.load(`select a.* from account a, moneyaccount m where a.id = m.idParent and m.Number = '${id}'`);
    },

    // minusMoney: async entity => {
    //     // console.log(entity.username)
    //     // let MoneyEntity = await db.load(`select m.money, m.idParent from MoneyAccount m, account a where m.idParent = a.id and a.username='${entity.username}'`)

    //     // if(MoneyEntity.length == 0)
    //     //     return 'false'

    //     // console.log("MoneyEntity: ", JSON.stringify(MoneyEntity[0]))

    //     // currentMoney = parseInt(MoneyEntity[0].money) - parseInt(entity.money) 

    //     // if(currentMoney < 0)
    //     //     return false

    //     return db.edit({money: entity.currentMoney}, {idParent: parseInt(entity.idParent)}, 'MoneyAccount') 
    // }
}