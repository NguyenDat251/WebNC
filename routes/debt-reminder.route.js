const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../config/default.json');
const bcrypt = require('bcryptjs');

const router = express.Router();
var moment = require('moment')
var { response, DEFINED_CODE } = require('../config/response');
var { mailer } = require('../utils/nodemailer');
const debtReminderModel = require('../models/debt-reminder.model.js');


router.post('/addDebtReminder', async (req, res) => {
    debtReminderModel.addDebtReminder(req.body).then(data => {
        console.log('data:', data)
        res.status(201).json({
            returnCode: 1,
            message: `Add Debt Reminder Successs`,
            data

        })
    })
})
router.put('/editDebtReminder', async (req, res) => {
    let id_debt = req.body.id_debt
    if (id_debt) {
        debtReminderModel.editDebtReminder(req.body, id_debt).then(data => {
            console.log('data:', data)
            res.status(201).json({
                returnCode: 1,
                message: `Edit Debt Reminder Successs`,
                data

            })
        })
    }
    else
        res.status(500).json({
            returnCode: -1,
            message: `Can find Id Debt in your request`,

        })

})
router.delete('/deleteDebtReminder', async (req, res) => {
    console.log("req.body: ", req.body);
    let id_debt = req.body.id_debt;
    if (id_debt) {
        debtReminderModel.deleteDebtReminder(id_debt).then(data => {
            console.log('data:', data)
            res.status(201).json({
                returnCode: 1,
                message: `Delete Debt Reminder Successs`,
                data

            })
        })
    }
    else
        res.status(500).json({
            returnCode: -1,
            message: `Can find Id Debt in your request`,

        })

});
router.get('/getDebtReminder/:id_debtor', async (req, res) => {

    let id_debtor = req.params.id_debtor;
    console.log('id_debtor:', id_debtor)
    if (id_debtor) {
        const result = await debtReminderModel.getDebtReminder(id_debtor)

        result.forEach(element => {
            element.dateCreate = moment(element.dateCreate).format("DD-MM-YYYY HH:mm");
        })
        res.status(200).json({
            returnCode: 1,
            message: `Get Data Debt Reminder Success`,
            data: result
        });
    }
})
router.get('/getDebtOwner/:id_owner', async (req, res) => {

    let id_owner = req.params.id_owner;

    if (id_owner) {
        const result = await debtReminderModel.getDebtOwner(id_owner)
        result.forEach(element => {
            element.dateCreate = moment(element.dateCreate).format("DD-MM-YYYY HH:mm");
        })
        res.status(200).json({
            returnCode: 1,
            message: `Get Data Debt Owner Success`,
            data: result
        });
    }
})
router.get('/getNameByWalletId/:id_wallet', async (req, res) => {
    let id_wallet = req.params.id_wallet;
    userModel.getNameByWalletId(id_wallet).then(data => {
        res.status(200).json({
            returnCode: 1,
            message: `Get Name User by Wallet Id Success`,
            data
        });
    })
})
module.exports = router;