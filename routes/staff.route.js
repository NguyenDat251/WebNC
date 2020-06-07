const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../config/default.json');
const bcrypt = require('bcryptjs');

const router = express.Router();

var { response, DEFINED_CODE } = require('../config/response');
var { mailer } = require('../utils/nodemailer');
const moneyModel = require('../models/money.model.js');

router.post('/addUser', async (req, res) => {
    const checkUsernameExist = await userModel.isUsernameExist(req.body.username)

    if (checkUsernameExist) {
        response(res, 'err', 'username has been exist')
        return;
    }

    const checkEmailExist = await userModel.isEmailExist(req.body.email)

    if (checkEmailExist) {
        response(res, 'err', 'email has been exist')
        return;
    }

    console.log('req.body:', req.body)
    const result = await userModel.add(req.body)

    // var mailOptions = {
    //   subject: "Account activation",
    //   text:
    //     `Dear customer. \n\n`
    //     + 'You are receiving this because you (or someone else) have signed up to our website.\n\n'
    //     + 'Please click on the following link, or paste this into your browser to complete the process:\n\n'

    //     + 'If you did not request this, please ignore this email and your account will not be activate.\n'
    //     + 'F2L Support team',
    // }
    // mailer(mailOptions, 'BankDBB', req.body.email, res)


    console.log(result)
    const ret = {
        id: result.insertId,
        ...req.body
    }

    delete ret.password_hash;
    res.status(201).json({
        returnCode: 1,
        message: "Add user successful",
        data: ret
    });
})
router.get('/getInfoUserByUsername/:username', async (req, res) => {

    let username = req.params.username;
    console.log(req.params);
    console.log('username: ', username);
    if (username) {
        const result = await userModel.getUserInfoByUsername(username)
        res.status(200).json({
            returnCode: 1,
            message: `Get Data Success by username: ${username}`,
            data: result
        });
    }
})
router.get('/getInfoUserByWalletId/:idWallet', async (req, res) => {

    let idWallet = req.params.idWallet;
    if (idWallet) {
        const result = await userModel.getUserInfoByWalletId(idWallet)
        res.status(200).json({
            returnCode: 1,
            message: `Get Data Success by Wallet Id: ${idWallet}`,
            data: result
        });
    }
})
const doTheMoney = async (username, money, res) => {
    const rsGetCurrentMoney = await moneyModel.getCurrentMoney(username)

    console.log(rsGetCurrentMoney)

    if (rsGetCurrentMoney.length == 0) {
        response(res, 'err', 'not found user to do the transfer')
        return false
    }


    let CurrentMoney = parseInt(rsGetCurrentMoney[0].money) + parseInt(money)
    console.log("current money: ", CurrentMoney)

    if (CurrentMoney < 0) {
        response(res, 'err', 'Your account is not enough money')
        return false
    }

    const result = await moneyModel.setMoney({
        idParent: rsGetCurrentMoney[0].idParent,
        CurrentMoney,
    })

    if (!result.affectedRows) {
        response(res, 'err', 'err transfer')
        return false
    }
    // else{
    //     response(res, '', 'transaction money successfull')
    // }

    return true
}

router.post('/addMoney', async (req, res) => {
    //const result = await moneyModel.addMoney(req.body)

    /*{
        username: "adminn",
        money: 10000
    }
     */
    //const rs = await doTheMoney(req.body.username, req.body.money, res)

    let rs;



    rs = await doTheMoney(req.body.username, req.body.money, res)




    //    await new Promise( (resolve, reject) => {
    //     rs =  doTheMoney(req.body.username, req.body.money, res)
    //     resolve(true)
    //    })

    console.log(rs)
    if (rs) {
        response(res, '', 'transaction money successfull')
        return;
    }

})
router.post('/changePassword', async (req, res) => {
    const token = req.headers["x-access-token"]
    var decodedPayload = jwt.decode(token, {
        secret: config.auth.secret,
    });

    console.log("decodePayload: ", JSON.stringify(decodedPayload))

    const NewPassword = req.body.NewPassword;
    const OldPassword = req.body.OldPassword;

    const userId = decodedPayload.userId

    // console.log("id user: ", userId)

    const CurrentPasswor = await userModel.getPassword(userId)

    // console.log("CurrentPasswor: ", CurrentPasswor  )
    //console.log(req.user.password);
    // bcrypt.compare(OldPassword, CurrentPasswor, async (err, result) => {
    //   if (result) {
    //     console.log("result: ", JSON.stringify(result))
    //     let result = await userModel.changePassword({password_hash: NewPassword, userId: userId})
    //     console.log("result: ", result)
    //     // bcrypt.hash(newPassword, saltRounds, (err, hash) => {
    //     //   if (err) {
    //     //     res.json(err);
    //     //   } else {
    //     //     var updates = [{ field: 'password', value: `'${hash}'` }];
    //     //     userModel.updateUserInfo(id_user, updates)
    //     //       .then(data => {
    //     //         redis.setKey(token);
    //     //         response(res, DEFINED_CODE.CHANGE_PASSWORD_SUCCESS);
    //     //       }).catch(err => {
    //     //         response(res, DEFINED_CODE.ACCESS_DB_FAIL, err);
    //     //       })
    //     //   }
    //     // })
    //   } else {
    //     response(res, 'err', `Change password failed!`);
    //   }
    // })

    console.log(bcrypt.compareSync(OldPassword, CurrentPasswor))

    if (bcrypt.compareSync(OldPassword, CurrentPasswor)) {
        let result = await userModel.changePassword({ password_hash: NewPassword, userId: userId })
        console.log("result: ", result)

        response(res, '', 'change password successfull')
    } else {
        response(res, 'err', `Wrong current password!`);
    }

    // const result = await userModel.changePassword(req.body)

    // console.log(result);

    // if(result.affectedRows != 1){
    //   response(res, '-201', {})
    // }
    // else{
    //   response(res, '200', {status: "ok"})
    // }
})

module.exports = router;