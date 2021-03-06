const bcrypt = require('bcryptjs');
const moment = require('moment');
const db = require('../utils/db');
const dbMysql = require('../api/utils/mysql')


module.exports = {



    addRecipient: async entity => {
        console.log('entity:', entity)
        return db.add(entity, 'recipients')
    },
    editRecipient: async (data) => {
        let sqlUpdate='';
        if(data.id_recipient)
         sqlUpdate = `UPDATE recipients set name_recipient = '${data.name_recipient}' where id='${data.id }' and id_recipient ='${data.id_recipient}'`;
        else
         sqlUpdate = `UPDATE recipients set name_recipient = '${data.name_recipient}' where id='${data.id }' and walletId = ${data.walletId}`;
        console.log('sqlUpdate:', sqlUpdate)
        return db.load(sqlUpdate)
    },
    checkExistRecipient: async(id,id_recipient)=>{
        return db.load(`SELECT * FROM recipients where id = '${id}' and  id_recipient ='${id_recipient}'`);

    },
    checkExistRecipientForegin: async(id,walletId)=>{
        return db.load(`SELECT * FROM recipients where id = '${id}' and isLocal=0 and walletId =${walletId}`);

    },
    deleteRecipient: async (data) => {
        // return db.load(`DELETE FROM debt_reminder WHERE id_debtor=${data.id_debtor} and id_owner=${data.id_owner}`)
        return db.load(`DELETE FROM recipients WHERE walletId='${data.walletId}' and isLocal=${data.isLocal} and id='${data.id}'`)

    },
    getInfoUserRecipientByWalletId: async (walletId) => {
        return db.load(`select a.name
        from moneyaccount as ma, account as a
        where ma.username = a.username and ma.Number = ${walletId};`);
    },
    getAllRecipients: async (id) => {
        let query = `
        
        select  distinct r.*,ob.name as Name from recipients as r left join otherbank as ob on r.bank_LinkId= ob.BankCode
        where r.id = '${id}';`
        console.log('query:', query)
        return db.load(query);
    },
    getRecipientLocal: async (id) => {
        let query = `
        
        select * from recipients where id ='${id}'and isLocal =1;`
        console.log('query Local Recipient:', query)
        return db.load(query);
    },
    trackRecipientLocal: async (walletId) => {
        let query = `
        
        select distinct a.name as fullname,a.username,r.isLocal,a.email,r.bank_LinkId,ob.Name from account as a, recipients as r left join otherbank as ob on r.bank_LinkId = ob.BankCode,moneyaccount as ma
            where ma.Number = ${walletId} and ma.idParent = a.id and a.username = r.id_recipient and isLocal =1`
            console.log('Track recipient Local:', query)
        return db.load(query);
    },
    getRecipientForeign: async (id) => {
        let query = `
        
        select * from recipients where id ='${id}'and isLocal =0;`
        console.log('query Foreign Recipient:', query)

        return db.load(query);
    },
    trackRecipientForeign: async (walletId) => {
        let query = `
        
       
        select distinct r.name_recipient as fullname,r.bank_LinkId,ob.Name from recipients as r left join otherbank as ob on r.bank_LinkId = ob.BankCode
        where r.walletId = '${walletId}' and isLocal =0;`
        console.log('Track recipient Foreign:', query)

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