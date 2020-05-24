'use strict'

const db = require('../mysql')
const sig = require('../module/sig.js')

module.exports = {
    detail: (req, res) => {

        let secretKey = 'sacombank';
        let publicKey = "";
        let currentTime = Date.now();

        //check id -> lấy secret key
        if(req.headers.id == 'sacombank'){
            secretKey = 'sacombank'
            
        }
        else if(req.headers.id == ' rsa-bank')
        {
            secretKey = 'rsa-bank'
        }
        else{
            res.json({
                "returnCode": 0,
                "returnMessage": "Unknowed bank",
                "data": null
            })

            return;
        }

        //check hash

        
        if(!sig.checkHash(req.headers.sig, req.headers.ts, req.body, secretKey)){
            res.json({
                "returnCode": 0,
                "returnMessage": "The request has been fixed",
                "data": null
            })

            return;
        }

        //check time

        if(checkTime(req.headers.ts)){
            res.json({
                "returnCode": 0,
                "returnMessage": "The request is out of date",
                "data": null
            })

            return;
        }

        //trả res

        // if(sig.checkPGPSig(req.headers.sig)){

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

    // }else{
    //     console.log("Access denied!")
    //     res.json({
    //         "returnCode": 0,
    //         "returnMessage": "Access denied!",
    //         "data": null
    //     })
    // }
    },
    addMoney: async (req, res) => {
        let secretKey = "";
        let publicKey = "";
        let currentTime = Date.now();

        //check id -> lấy secret key
        if(req.headers.id == 'sacombank'){
            secretKey = 'sacombank'
            
        }


        //giải nén
        //const key = new NodeRSA(sig.privateKey)

        //const request = key.decrypt(req.body.signature, 'hex')
        const request = sig.decrypt(req);

        if(!request){
            res.json({
                "returnCode": 0,
                "returnMessage": "wrong key",
                "data": null
            })

            return;
        }

        console.log(request);

        //verify

        if(!sig.checkRSASig(req.headers.verify)){
            res.json({
                "returnCode": 0,
                "returnMessage": "Error verify!",
                "data": null
            })

            return;
        }

    // if(key.encrypt("abc", 'hex', 'utf8'));

        //check hash

        if(!sig.checkHash(req.headers.sig, req.headers.ts, request, secretKey)){
            res.json({
                "returnCode": 0,
                "returnMessage": "The request has been fixed",
                "data": null
            })

            return;
        }

        //check time

        if(checkTime(req.headers.ts)){
            res.json({
                "returnCode": 0,
                "returnMessage": "The request is out of date",
                "data": null
            })
        }


        //thực hiện api


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