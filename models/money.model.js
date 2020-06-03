const bcrypt = require('bcryptjs');
const db = require('../utils/db');

module.exports = {
    addMoney: async entity => {
        let MoneyEntity = await db.load(`select m.money, m.idParent from MoneyAccount m, account a where m.idParent = a.id and a.username='${entity.username}'`)

        console.log("MoneyEntity: ", JSON.stringify(MoneyEntity[0]))

        currentMoney = parseInt(MoneyEntity[0].money) + parseInt(entity.money) 

        return db.edit({money: currentMoney}, {idParent: parseInt(MoneyEntity[0].idParent)}, 'MoneyAccount')
    }
}