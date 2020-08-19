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

router.post('/addRecipientLocal', async (req, res) => {
    console.log('body:', req.body);
    const { id, id_recipient } = req.body;
    if (id != id_recipient) {
        req.body.walletId = decodeWalletId(req.body.walletId);
        RecipientModel.checkExistRecipient(id, id_recipient).then(data => {
            console.log('data:', data);
            //Add recipient if not exist
            if (data.length > 0) {
                res.status(201).json({
                    returnCode: -1,
                    message: `Your recipients already Exist!!`,
        
                })
            }
            else {
                RecipientModel.addRecipient(req.body).then(data => {
                    res.status(201).json({
                        returnCode: 1,
                        message: `Add Recipient Successs`,
                        data
                    })
                })
            }

        })
    }
    //add account la recipient
    else
    {
        res.status(201).json({
            returnCode: -2,
            message: `You can't add yourself to recipients`,

        })
    }


})
router.post('/addRecipientForeign', async (req, res) => {
    console.log('body:', req.body);
    const { id, id_recipient ,walletId} = req.body;
    if (id != id_recipient) {
        RecipientModel.checkExistRecipientForegin(id, walletId).then(data => {
            console.log('data:', data);
            //Add recipient if not exist
            if (data.length > 0) {
                res.status(201).json({
                    returnCode: -1,
                    message: `Your recipients already Exist!!`,
        
                })
            }
            else {
                RecipientModel.addRecipient(req.body).then(data => {
                    res.status(201).json({
                        returnCode: 1,
                        message: `Add Recipient Successs`,
                        data
                    })
                })
            }

        })
    }
    //add account la recipient
    else
    {
        res.status(201).json({
            returnCode: -2,
            message: `You can't add yourself to recipients`,

        })
    }


})
router.put('/editRecipient', async (req, res) => {

    if (req.body) {
        RecipientModel.editRecipient(req.body).then(data => {
            res.status(201).json({
                returnCode: 1,
                message: `Edit Recipient Successs`,
                data

            })
        })
    }
    else
        res.status(500).json({
            returnCode: -1,
            message: `Can find Id Recipient in your request`,

        })

})
router.delete('/deleteRecipient', async (req, res) => {

    req.body.walletId = decodeWalletId(req.body.walletId);
    if (req.body) {
        RecipientModel.deleteRecipient(req.body).then(data => {
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

    if (id) {
        const result = await RecipientModel.getAllRecipients(id)

        result.forEach(element => {

            element.walletId = encodeWalletId(element.walletId);

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

    if (id) {
        const result = await RecipientModel.getRecipientLocal(id)
        if (result) {
            result.forEach(element => {
                element.walletId = encodeWalletId(element.walletId, false);
            });


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

    walletId = decodeWalletId(walletId, false);
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

    if (id) {
        const result = await RecipientModel.getRecipientForeign(id)
      


        res.status(200).json({
            returnCode: 1,
            message: `Get Data Recipient`,
            data: result
        });
    }
})
router.get('/trackRecipientForeign/:walletId', async (req, res) => {

    let walletId = decodeWalletId(req.params.walletId);
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