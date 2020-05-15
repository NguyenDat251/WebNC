'use strict'

const db = require('../mysql')

module.exports = {
    detail: (req, res) => {
        let TransactionAccount = null;
        let SavingAccount = [];

        let sql = 'SELECT * FROM account WHERE IdParent=?'
        db.query(sql, [req.params.accountId], (err, response) => {
            if (err){
                res.json({
                    "returnCode": 0,
                    "returnMessage": err,
                    "data": null
                })
            }

            let i;
            for(i = 0; i < response.length; i++){
                if(response[i].Type === '1'){
                    TransactionAccount = response[i];
                    response.splice(i, 1);
                    break;
                }
            }
            
            SavingAccount=response

            console.log("Transition: " + TransactionAccount);
            console.log("Saving: " + SavingAccount);
        })

         sql = 'SELECT * FROM RealAccount WHERE id = ?'
        db.query(sql, [req.params.accountId], (err, response) => {
            if (err){
                res.json({
                    "returnCode": 0,
                    "returnMessage": err,
                    "data": null
                })
            }

            let data = response[0]
            data["Transaction Account"] = TransactionAccount;
            data["Saving Account"]= SavingAccount;

            console.log("data: " + data)

            res.json({
                "returnCode": 1,
                "returnMessage": "Success",
                "data": data
            }
                )
        })
    },
    addMoney: async (req, res) => {
        let CurrentMoney;

        let sql = 'SELECT * FROM account WHERE IdParent=?'
        await new Promise((resolve, reject) => {db.query(sql, [req.params.accountId], (err, response) => {
            if (err){
                res.json({
                    "returnCode": 0,
                    "returnMessage": err,
                    "data": null
                })
            }

            let i;
            for(i = 0; i < response.length; i++){
                if(response[i].Type === '1'){
                    CurrentMoney = parseInt(response[i].Money);
                    break;
                }
            }

            console.log("before: " + CurrentMoney);

            CurrentMoney += req.body.Money;

            console.log("after: " + CurrentMoney);

            let res = null;
            resolve(res); 
        })
    })

    console.log("abc")
        console.log(CurrentMoney)

        sql = "UPDATE account SET Money = ? WHERE IdParent = ? and Type = 1"
        db.query(sql, [CurrentMoney.toString(), req.params.accountId], (err, response) => {
            if (err){
                res.json({
                    "returnCode": 0,
                    "returnMessage": err,
                    "data": null
                })
            }

            res.json({
                "returnCode": 1,
                "returnMessage": "Transation successful",
                "data": null
            })
        })
    },
    update: (req, res) => {
        let data = req.body;
        let memberId = req.params.memberId;
        let sql = 'UPDATE member SET ? WHERE id = ?'
        db.query(sql, [data, memberId], (err, response) => {
            if (err) throw err
            res.json({message: 'Update success!'})
        })
    }
}