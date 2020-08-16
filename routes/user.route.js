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

  const result = await userModel.add(req.body)

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
  try {
    token = req.headers["x-access-token"]
  } catch{
    response(res, 'err', 'undifined access token')
  }
  var decodedPayload = jwt.decode(token, {
    secret: config.auth.secret,
  });

  const NewPassword = req.body.NewPassword;
  const OldPassword = req.body.OldPassword;

  const userId = decodedPayload.userId

  const CurrentPasswor = await userModel.getPassword(userId)

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
})

router.post('/getOTP', async (req, res) => {
  const email = req.body.email;

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

  if (rsAddOTP) {
    var mailOptions = {
      subject: "[OTP Service] from DBB Bank",
      html: `<p stlye="color:black">Dear customer. <br></br>` +
        'You are receiving this because you have private service from us.<br></br>' +
        'Please use this OTP to confirm your service: ' + `<h2>${otpCode}</h2>` + '<br></br>'

        +
        'BankDBB Support team<p>',
      text: `Dear customer. \n\n` +
        'You are receiving this because you have private service from us.\n\n' +
        'Please use this OTP to confirm your service: ' + otpCode + '\n\n'

        +
        'BankDBB Support team',
    }
    mailer(mailOptions, 'BankDBB', req.body.email, res)
  } else {
    response(res, 'err', 'send otp fail', {})
  }

  response(res, '', `Send OTP successful. Check your email: ${req.body.email}`, {})

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
    if (checkOTP[0].email !== email) {
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
        email
      })

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
router.post('/me', async (req, res) => {
  var token = req.headers.authorization.slice(7)
  var dataDecode = jwt.decode(token, {
    secret: config.auth.secret,
  });
  if (dataDecode.userId) {
    const result = await userModel.getUserInfoByUsername(dataDecode.username)
    if (result) {
      response(res, '', 'Get data success', result)

    }
    else {
      response(res, 'err', 'Get data fail')

    }


  }
  else {
    response(res, 'err', 'Get data fail')

  }
  /*{

    NewPassword: 'abcedf'
  }*/



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

  if (role == 1)
    type = 'customer'
  else if (role == 2)
    type = 'employer'
  else
    type = 'admin'

  if (!result) {
    response(res, 'err', `Can not get list ${type}`)
  }
  else {
    response(res, '', `get list ${type} successful`, result)
  }
})
router.put('/:id', async (req, res) => {
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
  
  if (!result) {
    response(res, 'err', 'Error edit user')
  } else {
    response(res, '', 'update user successful')
  }
})

router.delete('/:id', async(req, res) => {
  const id = req.params.id;

  const result = await userModel.deleteUser(id);

  if(!result){
    response(res, 'err', 'Error delete user')
  } else {
    response(res, '', 'delete user successful')
  }
})

module.exports = router;