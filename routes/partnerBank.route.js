const express = require('express');
const router = express.Router();
const partnerBankModel = require('../models/partnerBank.model.js')
const moneyModel = require('../models/money.model.js');
const userModel = require('../models/user.model');
const Info = require('../config/partner').getInfo();

const NodeRSA = require('node-rsa');
const openpgp = require('openpgp');
const crypto = require('crypto');
const fs = require('fs');
const sha1 = require('sha1');
const md5 = require('md5');
const axios = require('axios');

const {
  promisify
} = require('util');
var {
  response
} = require('../config/response');

let partnerInfoKey;


const MyprivateKeyArmored = "-----BEGIN PGP PRIVATE KEY BLOCK-----\r\nVersion: OpenPGP.js v4.10.4\r\nComment: https://openpgpjs.org\r\n\r\nxYYEXso1rxYJKwYBBAHaRw8BAQdAqSXrVzJJez3AGH8gfHbBG/W5X0Q0PFvP\r\nMvAGqONsHWL+CQMIxsjxgYYdsErgw45Nsg7nqrjgVljo1oXGvDVERKqG1TV9\r\nMpEeKrKMWzq78KzZ5zIhRsBLFmCF4tcZ3WwKkf2lSBCFojAl+dqKLpxUZadC\r\nM80VRGF0IDxkYXRAZXhhbXBsZS5jb20+wngEEBYKACAFAl7KNa8GCwkHCAMC\r\nBBUICgIEFgIBAAIZAQIbAwIeAQAKCRAOCtTn3AR86FRTAQDDO8a9BgYaPyvH\r\n/Ypo+z7VBKbLYFpFLiVJc08SOw3yNQD/U+gqgUkNeDnteaVrIl5NWgOhui+O\r\n527DWWSQZ+wpjAHHiwReyjWvEgorBgEEAZdVAQUBAQdAJGwYTEttZP/2WIzL\r\naCzGDnVCK5poSo1KM0j9/DoNnDQDAQgH/gkDCH7hOb+pgUXo4KOpK9wrCZpP\r\n9slYMWcxlHWobqI0alaYQz7SEHNNQGJVTACibaXSmnhpiLYlzYGzartERHaH\r\n7ibxEQVR6Ph/ZUFl91FnAjbCYQQYFggACQUCXso1rwIbDAAKCRAOCtTn3AR8\r\n6Pl8AQCzoWtlGPs3crIoCTagg1bnOM5zRr3FanBmNB/VLqdL9gD/X2+bPnzj\r\nZfRY+kAOlJvZWirSjS8Be7JHDbE6awC+fQc=\r\n=556r\r\n-----END PGP PRIVATE KEY BLOCK-----\r\n"
const passphrase = `yourPassphrase`;

const decrypt = (req) => {
  console.log("sig: " + req.body.signature)
  let request;
  try {
    request = privateKey.decrypt(req.body.signature, 'json')
  } catch (err) {
    console.log(err)
    console.log("Wrong key")
    return false;
  }

  console.log(request);
  return request;
}

const checkRSASig = (partnerInfo, sig) => {
  try {
    //const pubKey = config.
    publickeyParnter = new NodeRSA(partnerInfo.PublicRSAKey)
    console.log("sig input: ", sig)
    console.log("partnerInfo.SecretKey: ", partnerInfo.SecretKey)

    let res = publickeyParnter.verify(partnerInfo.SecretKey, sig, 'base64', 'base64')

    console.log(res);
    return res;

  } catch (err) {
    console.log("error verify: " + err);
    return false;
  }
}
const generateRSASig = (secretKey) => {
  try {
    sig = privateKey.sign(secretKey, 'base64', 'base64');

    console.log(sig);

    return sig;
  } catch (err) {
    console.log("error sig: " + err);
  }
}
const checkPGPSig = async (partnerInfo, verify) => {

  let publicKeyArmored = partnerInfo.PublicKey;

  //         await new Promise((resolve, reject) => { 
  //     fs.readFile('././pgp/public', function read(err, data) {
  //     if (err) {
  //         throw err;
  //     }
  //     publicKeyArmored = data;

  //     resolve(true);
  // });

  // })

  const verified = await openpgp.verify({
    message: await openpgp.cleartext.readArmored(verify), // parse armored message
    publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys // for verification
  });

  return verified.signatures[0];
}

const checkTime = (time) => {
  if (Math.floor(Date.now() / 1000 - time) > 300) {
    return false;
  }

  return true;
}

const checkHash = (hash, ts, data, secretKey) => {
  console.log("hash: " + hash);

  console.log("ts: " + ts);

  data = JSON.stringify(data);

  console.log("data: " + data);

  console.log("secretKey: " + secretKey);

  console.log(sha1(ts + ":" + data + ":" + secretKey))

  return (hash === sha1(ts + ":" + data + ":" + secretKey))
}

const createHash = (ts, data, secrectKey) => {
  console.log("before hash: " + ts + ":" + data + ":" + secrectKey)

  const hash = sha1(ts + ":" + data + ":" + secrectKey);

  console.log("hash: " + hash)

  return hash
}

const createHash256 = (ts, data, secretKey) => {
  return crypto.createHash('sha256').update(ts + secretKey + data).digest('base64');
}

async function signPGP() {

  const {
    keys: [privateKey]
  } = await openpgp.key.readArmored(MyprivateKeyArmored);
  await privateKey.decrypt(passphrase);

  const {
    signature: cleartext
  } = await openpgp.sign({
    message: openpgp.cleartext.fromText('thisisatokenfroma'), // CleartextMessage or Message object
    privateKeys: [privateKey], // for signing,
    detached: true
  });
  return Promise.resolve(cleartext)
}

const sendMoneyPGP = async () => {
  console.log("send money");
  let time = Math.floor(Date.now() / 1000);
  await signPGP().then(x => {
    console.log("buffer: ", new Buffer.from(x).toString('base64'))

    return axios.post('http://83350975a9f8.ngrok.io/api/account/money', {}, {
        headers: {
          csi: sha1(time + JSON.stringify({}) + 'thisisatokenfroma'),
          partnerCode: 'rsa-bank',
          timestamp: time,
          detachedSignature: new Buffer.from(x).toString('base64')
        }
      })
      .then(response => {

        console.log("response: ");
        console.log(response)

        return response.data
      })
      .catch(error => {
        console.log(error);
      });
  })
}

function createSignRSA(dataToSign) {
  const privateKey = Info["bankdbb"].privateKey;

  const sign = crypto.createSign('SHA256');
  sign.update(dataToSign);
  sign.end();
  return sign.sign(privateKey);
}

function RSASign(data) {
  const privateKey = Info["bankdbb"].privateKey;
  const sign = crypto.createSign('RSA-sha256')
  const signature = sign.update(data).sign(privateKey, 'base64');
  console.log(signature);
  return signature;
}

const sendMoneyRSA = async (res, data) => {
  const secretKey = "Tj0xYDEDiQF9f2GYCxSv";
  const time = Math.floor(Date.now() / 1000);
  const dataToHash = time + secretKey + data;
  const hash = crypto.createHash('sha256').update(dataToHash).digest('base64');

  const body = {
    "credit_number": data.credit_number,
    "amount": data.money
  };

  await axios.post('http://bank-backend.khuedoan.com/api/partner/deposit', body, {
      //axios.get('https://bankdbb.herokuapp.com/account/1', {
      headers: {
        "authen-hash": hash,
        "partner-code": 'bankdbb',
        "timestamp": time,
        "authen-sig": RSASign(time + secretKey + data)
      }
    })
    .then(response => {
     
        console.log("data")
        //console.log(response.data.data);
      response(res, '', 'send money', response.data);

      return true;
    })
    .catch(error => {
      console.log("error")
      response(res, 'err', 'send money false', error.response.data);
      //console.log(error);

      return false;
    });
}

const getInfoPGP = (res) => {
  const time = Math.floor(Date.now() / 1000);

  axios.get('http://83350975a9f8.ngrok.io/api/account/info', {
      headers: {
        csi: sha1(time + JSON.stringify({}) + 'thisisatokenfroma'),
        partnerCode: 'rsa-bank',
        timestamp: time
      }
    })
    .then(result => {
      response(res, '', 'success', result.data)
      //response(res, '', 'transfer money successful')

      console.log(result.data)
      return result
    })
    .catch(error => {
      response(res, "err", "not success", error)
      console.log(error);
      return null;
    });
}

const getInfoRSA = (res, credit_number) => {
  const time = Math.floor(Date.now() / 1000);
  const dataToHash = time + 'Tj0xYDEDiQF9f2GYCxSv' + `{}`;
  const hash = crypto.createHash('sha256').update(dataToHash).digest('base64');

  console.log("credit_number:", credit_number);
  axios.get('http://bank-backend.khuedoan.com/api/partner/get-account-info?credit_number=' + credit_number, {
      //axios.get('https://bankdbb.herokuapp.com/account/1', {
      headers: {
        "authen-hash": hash,
        "partner-code": 'bankdbb',
        "timestamp": time
      }
    })
    .then(rp => {
      if (rp.data.returnCode == '0') {
        console.log("return code 0");
        console.log(rp.data)
        response(res, 'err', 'err get info partner rsa', rp.data)

      } else {
        console.log("return code 1");
        console.log(rp.data);
        response(res, '', 'get info successful', rp.data)
        return;
      }
    })
    .catch(error => {
      console.log("error")
      response(res, 'err', 'err get info partner rsa', error)
      //console.log(error);
    });
}

router.get('/transaction/:time', async (req, res) => {
  const time = req.params.time;

  const month = parseInt(time.substr(0, 2));

  const year = parseInt(time.substr(2, 6));

  let nextMonth, nextYear;

  if (month == 12) {
    nextMonth = 1
    nextYear = year + 1
  } else {
    nextMonth = month + 1;
    nextYear = year;
  }

  const TimeFrom = new Date(year, month, 0).getTime() / 1000;
  const TimeTo = new Date(nextYear, nextMonth, 0).getTime() / 1000;

  console.log("second: ", TimeFrom, TimeTo)

  const result = await partnerBankModel.getTransaction(TimeFrom, TimeTo);
  console.log(result)
  if (!result) {
    response(res, 'err', 'error getting transaction history')
  } else {
    response(res, '', 'Getting transaction history successful', result)
  }
})

router.get('/transaction', async(req, res) => {
  
})

router.get('/info/:number', async (req, res) => {
  const partnerInfo = partnerBankModel.getInfo(req.headers.id)
  console.log("header: ", req.headers)
  //check hash
  if (!checkHash(req.headers.sig, req.headers.ts, req.body, partnerInfo.SecretKey)) {
    response(res, 'err', 'The request has been fixed!')
    return;
  }

  console.log("check hash successful")

  //check time

  if (!checkTime(req.headers.ts)) {
    response(res, 'err', 'The request is out of date!')
    return;
  }

  const resultInfo = await userModel.getUserInfoByWalletId(req.params.number)

  if (!resultInfo) {
    response(res, 'err', 'Error when get infomation user')
    return
  }

  response(res, '', 'Get info successful', resultInfo)

  return
})

router.post('/add-money', async (req, res) => {
  // header: {
  //     id: bank code
  //     time:
  //     sig:
  //     verify:
  // }

  // body: {
  //    number: ,
  //     money: ,
  //     username: ,
  //     content: 
  // }
  console.log("partner id: ", req.headers.id)
  const partnerInfo = partnerBankModel.getInfo(req.headers.id)

  const secretKey = partnerInfo.SecretKey;
  //verify
  if (!checkRSASig(partnerInfo, req.headers.verify)) {
    response(res, 'err', 'Error verify!')
    return;
  }

  if (!checkHash(req.headers.sig, req.headers.ts, req.body, secretKey)) {
    response(res, 'err', 'The request has been fixed!')
    return;
  }

  if (!checkTime(req.headers.ts)) {
    response(res, 'err', 'The request is out of date!')
    return;
  }

  //thực hiện api
  const idParent = req.body.number

  let CurrentMoney = await moneyModel.getCurrentMoney(idParent);
  CurrentMoney = CurrentMoney[0].money;

  if (!CurrentMoney) {
    response(res, 'err', 'error when getting money user');
    return;
  }
  if (!req.body.money) {
    response(res, 'err', 'Money to transaction is empty');
    return;
  }

  CurrentMoney += req.body.money;

  const resultSetMoney = await moneyModel.setMoney({
    CurrentMoney,
    idParent
  })

  if (!resultSetMoney) {
    response(res, 'err', 'error update money')
    return
  }

  await partnerBankModel.addToHistory({
    user: idParent,
    partner: req.body.username,
    bankName: req.headers.id,
    money: req.body.money,
    time: Math.floor(Date.now() / 1000),
    type: 1,
    content: req.body.content
  })

  response(res, '', 'transfer money successful')

})

router.post('/send-money', async (req, res) => {
  // {
  //      idBank:
  //    idUser:
  //    credit_number: 
  //     money:
  //     content:
  // }
  partnerInfoKey = Info[req.body.idBank];
  console.log(partnerInfoKey);

  const CodeBankPGP = 'thisisatokenfroma';
  const idBank = req.body.idBank;
  //const idParent = req.params.id;

  let resultSendMoney;
  if (idBank === CodeBankPGP)
    resultSendMoney = await sendMoneyPGP(res, req.body)
  else
    resultSendMoney = await sendMoneyRSA(res, req.body)

  console.log(resultSendMoney);

  if(resultSendMoney) {
  //add to history
  await partnerBankModel.addToHistory({
    user: req.body.id,
    partner: req.body.credit_number,
    bankName: idBank,
    money: -1 * req.body.money,
    time: Math.floor(Date.now() / 1000),
    type: 2,
    content: req.body.content
  })
}

})

router.get('/info-partner/:idBank/:credit_number', async (req, res) => {
  const CodeBankPGP = 'thisisatokenfroma'

  console.log("req.params.credit_number:",req.params.credit_number);
  

  if (req.params.idBank == CodeBankPGP)
    getInfoPGP(res)
  else
    getInfoRSA(res, req.params.credit_number)
})

module.exports = router;