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
var { encodeWalletId, decodeWalletId } = require('../middlewares/convertWalletId.mdw');

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

    if (req.body) {
        RecipientModel.deleteRecipient(req.body).then(data => {
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
router.get('/getAllRecipient/:id', async (req, res) => {

    let id = req.params.id;
    console.log('id:', id)
    if (id) {
        const result = await RecipientModel.getAllRecipients(id)
        result.forEach(element => {
            if (element.isLocal) {
                element.Name = "VietNam BBD Bank"
            }
        })

        res.status(200).json({
            returnCode: 1,
            message: `Get Data Recipient`,
            data: result
        });
    }
})
router.get('/getRecipientLocal/:id', async (req, res) => {

    let id = req.params.id;
    console.log('id:', id)
    if (id) {
        const result = await RecipientModel.getRecipientLocal(id)
        if (result) {
            result.forEach(element => {
                element.walletId = encodeWalletId(element.walletId,false);
            });
            console.log('result:', result)

            res.status(200).json({
                returnCode: 1,
                message: `Get Data Recipient`,
                data: result
            });
        }

    }
})
router.get('/trackRecipientLocal/:walletId', async (req, res) => {

    let walletId = req.params.walletId;
    console.log('walletId:', walletId)
    walletId = decodeWalletId(walletId,false);
    console.log('walletId:', walletId)
    const result = await RecipientModel.trackRecipientLocal(walletId)

    res.status(200).json({
        returnCode: 1,
        message: `Get Data Debt Owner Success`,
        data: result
    });

})
router.get('/getRecipientForeign/:id', async (req, res) => {

    let id = req.params.id;
    console.log('id:', id)
    if (id) {
        const result = await RecipientModel.getRecipientForeign(id)
        result.forEach(element => {
            element.walletId = encodeWalletId(element.walletId,false);
        });
        console.log('result:', result)

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