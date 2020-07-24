const bcrypt = require('bcryptjs');
const moment = require('moment');
const db = require('../utils/db');


module.exports = {



    addDebtReminder: async entity => {
        console.log('entity:', entity)
        entity.status = 0;
        return db.add(entity, 'debt_reminder')
    },
    editDebtReminder: async (entity, id_debt) => {
        return db.edit(entity, { id_debt }, 'debt_reminder')

    },
    deleteDebtReminder: async (id_debt,id_owner) => {
        console.log('id_debt:', id_debt)
        // return db.load(`DELETE FROM debt_reminder WHERE id_debtor=${data.id_debtor} and id_owner=${data.id_owner}`)
        return db.load(`DELETE FROM debt_reminder WHERE id_debt=${id_debt} and id_owner=${id_owner}`)

    },
    getDebtReminder: async (id_debtor) => {
        let query = `
        SELECT a.name as creditor,ma.Number as walletID,dr.* FROM debt_reminder as dr, account as a, moneyaccount as ma 
        where dr.id_owner = a.id  and ma.idParent = a.id  and dr.id_debtor = ${id_debtor}
        ORDER BY dr.dateCreate desc`
        
        return db.load(query);
    },
    getDebtOwner: async (id_owner) => {
        let query = `
        SELECT a.name as debtor,ma.Number as walletID,dr.* FROM debt_reminder as dr, account as a, moneyaccount as ma 
        where dr.id_debtor = a.id  and ma.idParent = a.id  and dr.id_owner = ${id_owner}
        ORDER BY dr.dateCreate desc`
        return db.load(query);
    },
    getDebt: async id_debt => {
        return db.load(`SELECT * FROM debt_reminder WHERE id_debt = ${id_debt}`)
    },
    changeStatus: async (id_debt) => {
        return db.load(`UPDATE debt_reminder SET status = 1 WHERE id_debt = ${id_debt}`)
    }
};