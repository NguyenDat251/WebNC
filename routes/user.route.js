const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../config/default.json');
const bcrypt = require('bcryptjs');
const otp = require('otp-generator');
const moment = require('moment');

const router = express.Router();

var {
  response,
  DEFINED_CODE
} = require('../config/response');
var {
  mailer
} = require('../utils/nodemailer');

const TimeExistOTP = 6000;

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


  console.log('req.body:',req.body)
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

router.post('/changePassword', async (req, res) => {
  let token;
  try{
    token = req.headers["x-access-token"]
  } catch{
    response(res, 'err', 'undifined access token')
  }
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
    let result = await userModel.changePassword({
      password_hash: NewPassword,
      userId: userId
    })
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

router.post('/getOTP', async (req, res) => {
  const email = req.body.email;
  // const type = req.body.type;

  let otpCode;
  let result = false;
  while (!result) {
    //otpCode = otp.generate(6, { digits: false,  upperCase: false, specialChars: false });
    otpCode = Math.floor(100000 + Math.random() * 900000);
    console.log("otp: ", otpCode)
    let rs
    try {
      rs = await userModel.checkOTPExisted()
    } catch {
      response(res, 'err', 'send otp fail', {})
    }
    console.log(rs.length)
    result = rs.length == 0 ? true : false
    console.log(result)
  }
  //let otpCode = 

  let rsAddOTP = await userModel.addOTP({
    otp: otpCode,
    email: email,
    time: Date.now() / 1000
  })

  // let text;
  // if(type == 'Password')
  //   text

  if (rsAddOTP) {
    var mailOptions = {
      subject: "Reset password",
      html:`<p stlye="color:black">Dear customer. <br></br>` +
      'You are receiving this because you have forgoten your password to login our website.<br></br>' +
      'Please use this otp: ' + `<h2>${otpCode}</h2>` + '<br></br>'

      +
      'BankDBB Support team<p>',
      text: `Dear customer. \n\n` +
        'You are receiving this because you have forgoten your password to login our website.\n\n' +
        'Please use this otp: ' + otpCode + '\n\n'

        +
        'BankDBB Support team',
    }
    mailer(mailOptions, 'BankDBB', req.body.email, res)
  } else {
    response(res, 'err', 'send otp fail', {})
  }


  // var mailOptions = {
  //     subject: "Reset password",
  //     text:
  //       `Dear customer. \n\n`
  //       + 'You are receiving this because you have forgoten your password to login our website.\n\n'
  //       + 'Please use this otp: '+ otpCode + '\n\n'

  //       + 'F2L Support team',
  //   }
  //   mailer(mailOptions, 'BankDBB', req.body.email, res)

  // await userModel.addOTP({
  //   otp: otpCode,
  //   email: email,
  //   time: Date.now()/1000
  // })

  response(res, '', 'send otp successful', {})

  console.log("otp: ", otpCode)
})

router.post('/sendOTPAndNewPassword', async (req, res) => {
  /* {
    otp: '123456',
    time: '11111111111111',
    NewPassword: 'abcedf',
    email: ''
  } */

  const otp = req.body.otp;
  const time = req.body.time;
  const email = req.body.email;

  console.log("otp: ", otp)

  const checkOTP = await userModel.checkOTPExisted(otp);
  if (checkOTP.length > 0) {
    console.log("email input: ", email)
    console.log("email in data: ", checkOTP[0].email)
    if(checkOTP[0].email !== email){
      response(res, 'err', 'wrong otp', {})
      console.log("abc after wrong otp")
      return
    }

    console.log(time - checkOTP[0].time)
    if (time - checkOTP[0].time > TimeExistOTP) {
      response(res, 'err', 'otp is out of date', {})
      return
    } else {
      const NewPassword = req.body.NewPassword
      console.log("NewPassword: ", NewPassword)
      const rs = await userModel.setPassword({
        NewPassword,
        email})

      if (rs.affectedRows > 0) {
        response(res, '', 'change password successful', {})
        return
      }
    }
  } else {
    response(res, 'err', 'otp is not exist', {})
    return
  }

})

router.post('/setPassword', async (req, res) => {
  /*{

    NewPassword: 'abcedf'
  }*/

  const NewPassword = req.body.NewPassword

  const rs = await userModel.setPassword(NewPassword)

})

router.get('/:role', async (req, res) => {
  const role = req.params.role
  const result = await userModel.getList(role)

  let type;

  if(role == 1)
    type = 'customer'
  else if(role == 2)
    type = 'employer'
  else
    type = 'admin'

  if(!result){
    response(res, 'err', `Can not get list ${type}`)
  }
  else{
    response(res, '', `get list ${type} successful`, result)
  }
})

router.put('/:username', async (req, res) => {
  /*
    {
  "name": "Nguyen Dat test",
  "email": "nguyendat2511998@gmail.commm",
  "phone": "034324464t",
  "role": 3,
  "identity_number": "225900611",
    }
   */

   const username = req.params.username

  const result = await userModel.updateUser(username, req.body)
s
  if(!result){
    response(res, 'err', 'Error edit user')
  }else{
    response(res, '', 'update user successful')
  }
})


module.exports = router;