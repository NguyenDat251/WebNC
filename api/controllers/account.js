'use strict'

const db = require('../mysql')

module.exports = {
    detail: (req, res) => {
        let sql = 'SELECT * FROM RealAccount WHERE id = ?'
        db.query(sql, [req.params.accountId], (err, response) => {
            if (err){
                res.json({
                    "returnCode": 0,
                    "returnMessage": err,
                    "data": null
                })
            }

            res.json({
                "returnCode": 1,
                "returnMessage": "Success",
                "data": response[0]
            }
                )
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