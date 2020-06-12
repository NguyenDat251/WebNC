const bcrypt = require('bcryptjs');
const moment = require('moment');
const db = require('../utils/db');


module.exports = {



    addRecipient: async entity => {
        console.log('entity:', entity)
        entity.status = 0;
        return db.add(entity, 'recipients')
    },
    editRecipient: async (entity, username) => {
        return db.edit(entity, { username }, 'recipients')

    },
    deleteRecipient: async (data) => {
        // return db.load(`DELETE FROM debt_reminder WHERE id_debtor=${data.id_debtor} and id_owner=${data.id_owner}`)
        return db.load(`DELETE FROM recipients WHERE walletId='${data.walletId}' and isLocal=${data.isLocal} and id='${data.id}'`)

    },
    getInfoUserRecipientByWalletId: async (walletId)=>{
        return db.load(`select a.name
        from moneyaccount as ma, account as a
        where ma.username = a.username and ma.Number = ${walletId};`);
    },
    getAllRecipients: async (id) => {
        let query = `
        
        select  distinct r.*,ob.* from recipients as r left join otherbank as ob on r.bankCode= ob.BankCode
        where r.id = ${id};`

        return db.load(query);
    },
    getRecipientLocal: async (id) => {
        let query = `
        
        select * from recipients where id ='${id}'and isLocal =1;`

        return db.load(query);
    },
    trackRecipientLocal: async (walletId) => {
        let query = `
        
        select distinct a.name as fullname,a.email,r.bankCode,ob.Name from account as a, recipients as r left join otherbank as ob on r.bankCode = ob.BankCode,moneyaccount as ma
            where ma.Number = ${walletId} and ma.id = a.id and a.id = r.id_recipient and isLocal =1`

        return db.load(query);
    },
    getRecipientForeign: async (id) => {
        let query = `
        
        select * from recipients where id ='${id}'and isLocal =0;`

        return db.load(query);
    },
    trackRecipientForeign: async (walletId) => {
        let query = `
        
       
 select distinct r.name_recipient as fullname,r.bank_LinkId,lb.name from recipients as r left join linkbanks as lb on r.bank_LinkId = lb.id_link_bank
 where walletId = '${walletId}' and isLocal =0`

        return db.load(query);
    },


    // getRecipientByUsername: async (id_owner) => {
    //     let query = `
    //     SELECT a.name as debtor,ma.Number as walletID,dr.* FROM debt_reminder as dr, account as a, moneyaccount as ma 
    //     where dr.id_debtor = a.id  and ma.username = a.username  and dr.id_owner = ${id_owner}
    //     ORDER BY dr.dateCreate desc`
    //     return db.load(query);
    // }

};