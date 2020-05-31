const express = require('express');
const userModel = require('../models/user.model');

const router = express.Router();

var { response, DEFINED_CODE } = require('../config/response');
var { mailer } = require('../utils/nodemailer');

router.post('/', async (req, res) => {
  const result = await userModel.add(req.body)

    var mailOptions = {
      subject: "Account activation",
      text:
        `Dear customer. \n\n`
        + 'You are receiving this because you (or someone else) have signed up to our website.\n\n'
        + 'Please click on the following link, or paste this into your browser to complete the process:\n\n'
       
        + 'If you did not request this, please ignore this email and your account will not be activate.\n'
        + 'F2L Support team',
    }
    mailer(mailOptions, 'BankDBB', req.body.email, res)
  

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

module.exports = router;