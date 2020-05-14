'use strict'

const db = require('../mysql')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM project'
        db.query(sql, (err, response) => {
            if (err) console.log(err)
            res.json(response)
        })
    },
    add: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO project SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) console.log(err)
            res.json({message: 'Insert success!'})
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM project WHERE id = ?'
        db.query(sql, [req.params.projectId], (err, response) => {
            console.log(req.params.projectId)
            if (err) {
                console.log('abc')
            console.log(err)
        }
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let projectId = req.params.projectId;
        let sql = 'UPDATE project SET ? WHERE id = ?'
        db.query(sql, [data, projectId], (err, response) => {
            if (err) console.log(err)
            res.json({message: 'Update success!'})
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM project WHERE id = ?'
        db.query(sql, [req.params.memberId], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    },
    listMember: (req, res) => {
        let sql = 'SELECT * FROM member WHERE projectID = ?'
        db.query(sql, [req.params.projectId], (err, response) => {
            console.log(req.params.projectId)
            if (err) console.log(err)
            res.json(response)
        })
    }
}