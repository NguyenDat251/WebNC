const crypto = require('crypto');
const timestamp = "1597631193";
const secret = "Tj0xYDEDiQF9f2GYCxSv";
const body = '{"credit_number":"565572661049","amount":200000}'
const dataToHash = timestamp + secret + body;

const Info = require('../../config/partner').getInfo();

let hashString = crypto.createHash('sha256').update(dataToHash).digest('base64')
console.log("hashString: ", hashString);
const fs = require('fs');

function RSASign(privateKey, data) {
  console.log('data to sign: ', data);
  const sign = crypto.createSign('RSA-SHA256')
  const signature = sign.update(data).sign(privateKey, 'base64');
  console.log("signature: ", signature);
  return signature;
}
function RSAVerify(publicKey, signature, data) {
  const verify = crypto.createVerify('RSA-SHA256');
  verify.update(data);
  console.log("verify: ", verify.verify(publicKey, signature, 'base64'));
}


const privateKey = Info["bankdbb"].privateKey;
const publicKey = Info["bankdbb"].publicKey;

var dataToSign = timestamp + secret + body;
var signature = RSASign(privateKey, dataToSign);
RSAVerify(publicKey, signature, dataToSign);