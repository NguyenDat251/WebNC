const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../config/default.json');
const bcrypt = require('bcryptjs');

const router = express.Router();
var moment = require('moment')
var { response, DEFINED_CODE } = require('../config/response');
var { mailer } = require('../utils/nodemailer');
const RecipientModel = require('../models/recipient.model.js');


router.post('/addRecipient', async (req, res) => {
    RecipientModel.addRecipient(req.body).then(data => {
        console.log('data:', data)
        res.status(201).json({
            returnCode: 1,
            message: `Add Debt Reminder Successs`,
            data

        })
    })
})
router.put('/editRecipient', async (req, res) => {
    let id_debt = req.body.id_debt
    if (id_debt) {
        RecipientModel.editRecipient(req.body, id_debt).then(data => {
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
router.delete('/deleteRecipient', async (req, res) => {
    console.log("req.body: ", req.body);
    let id_debt = req.body.id_debt;
    if (id_debt) {
        RecipientModel.deleteRecipient(id_debt).then(data => {
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
router.get('/getRecipientLocal/:username', async (req, res) => {

    let username = req.params.username;
    console.log('username:', username)
    if (username) {
        const result = await RecipientModel.getRecipientLocal(username)


        res.status(200).json({
            returnCode: 1,
            message: `Get Data Recipient`,
            data: result
        });
    }
})
router.get('/trackRecipientLocal/:walletId', async (req, res) => {

    let walletId = req.params.walletId;
    const result = await RecipientModel.trackRecipientLocal(walletId)

    res.status(200).json({
        returnCode: 1,
        message: `Get Data Debt Owner Success`,
        data: result
    });

})
router.get('/getRecipientForeign/:username', async (req, res) => {

    let username = req.params.username;
    console.log('username:', username)
    if (username) {
        const result = await RecipientModel.getRecipientForeign(username)


        res.status(200).json({
            returnCode: 1,
            message: `Get Data Recipient`,
            data: result
        });
    }
})
router.get('/trackRecipientForeign/:walletId', async (req, res) => {

    let walletId = req.params.walletId;
    const result = await RecipientModel.trackRecipientForeign(walletId)

    res.status(200).json({
        returnCode: 1,
        message: `Get Data Debt Owner Success`,
        data: result
    });

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