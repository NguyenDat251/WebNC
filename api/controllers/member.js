'use strict'

const db = require('../mysql')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT M.*, P.name as ProjectName FROM member M left join project P on M.projectID = P.id'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    add: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO member SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({message: 'Insert success!'})
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM member WHERE id = ?'
        db.query(sql, [req.params.memberId], (err, response) => {
            if (err) throw err
            res.json(response[0])
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
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM member WHERE id = ?'
        db.query(sql, [req.params.memberId], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    }
}