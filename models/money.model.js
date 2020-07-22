const bcrypt = require('bcryptjs');
const db = require('../utils/db');

module.exports = {
  getCurrentMoneyFromIdUser: id => {
    return db.load(`select money, id from moneyaccount where id = ${id}`)
  },
  getCurrentMoney: id => {
    return db.load(`select m.money, m.idParent from moneyaccount m, account a where m.idParent = a.id and m.Number=${id}`)
  },
  getCurrentMoneySaving: id => {
    return db.load(`select s.spending as money, s.id from savinglist as s where s.id_saving=${id};`)
  },
  setMoney: async entity => {
    // let MoneyEntity = await db.load(`select m.money, m.idParent from moneyaccount m, account a where m.idParent = a.id and a.username='${entity.username}'`)

    // console.log("MoneyEntity: ", JSON.stringify(MoneyEntity[0]))

    // currentMoney = parseInt(MoneyEntity[0].money) + parseInt(entity.money) 

    return db.edit({
      Money: entity.CurrentMoney
    }, {
      idParent: parseInt(entity.idParent)
    }, 'moneyaccount')
  },
  setMoneySaving: async entity => {
    // let MoneyEntity = await db.load(`select m.money, m.idParent from moneyaccount m, account a where m.idParent = a.id and a.username='${entity.username}'`)

    // console.log("MoneyEntity: ", JSON.stringify(MoneyEntity[0]))

    // currentMoney = parseInt(MoneyEntity[0].money) + parseInt(entity.money) 

    return db.edit({
      spending: entity.spending
    }, {
      id_saving: parseInt(entity.id_saving)
    }, 'savinglist')
  },
  getAccount: async id => {
    return db.load(`select a.* from account a, moneyaccount m where a.id = m.idParent and m.Number = '${id}'`);
  },

  addToHistory: entity => {
    return db.add(entity, 'history')
  },
  getHistoryFromOtherBank: id => {
    return db.load(`select o.*, m.Number from otherbanktransaction as o, moneyaccount as m where user = ${id} and m.idParent = ${id}`);
  },
  getHistoryFromWallet: id => {
    console.log("id: ", id)
    return db.load(`select  a.id,a.name,h.*,ma.Number,'Main Account' as name
        from history as h,account as a,moneyaccount as ma  
        where ma.idParent= a.id and ma.Number = h.user  and a.id= ${id} and h.isSaving = 0;`)
  },
  getHistoryFromSaving: id => {
    console.log("id: ", id)
    return db.load(`
        select  a.id,a.name,h.*,sl.id_saving,sl.name_saving as name
        from history as h,account as a,savinglist as sl  
        where sl.id= a.id and sl.id_saving = h.user and a.id= ${id} and h.isSaving = 1;`)
  }

  // minusMoney: async entity => {
  //     // console.log(entity.username)
  //     // let MoneyEntity = await db.load(`select m.money, m.idParent from moneyaccount m, account a where m.idParent = a.id and a.username='${entity.username}'`)

  //     // if(MoneyEntity.length == 0)
  //     //     return 'false'

  //     // console.log("MoneyEntity: ", JSON.stringify(MoneyEntity[0]))

  //     // currentMoney = parseInt(MoneyEntity[0].money) - parseInt(entity.money) 

  //     // if(currentMoney < 0)
  //     //     return false

  //     return db.edit({money: entity.currentMoney}, {id: parseInt(entity.id)}, 'moneyaccount') 
  // }
}