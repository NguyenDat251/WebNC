var nodemailer = require('nodemailer');
var _ = require('lodash');
var { response, DEFINED_CODE } = require('../config/response');

const EMAIL_USERNAME = 'nhoxzolt16@gmail.com';
const EMAIL_PASSWORD = '1373PhuocLong';

var config = {
    // host: 'smtp.gmail.com',
    service: 'gmail',
    auth: {
        user: `${EMAIL_USERNAME}`,
        pass: `${EMAIL_PASSWORD}`,
    },
};

var transporter = nodemailer.createTransport(config);

module.exports.mailer = (mail, sender, target, res) => {
    var defaultMail = {
        from: sender,
        to: target,
    }
    mail = _.merge({}, defaultMail, mail);
    transporter.sendMail(mail, (err, info) => {
        if (err) {
            console.log(err);
            response(res, DEFINED_CODE.SEND_MAIL_FAIL);
        }
        else {
            console.log("Activation mail sent to " + target);
            response(res, DEFINED_CODE.SEND_MAIL_SUCCESS, info);
        }
    })
}