const express = require('express');
const router = express.Router();
const partnerBankModel = require('../models/partnerBank.model.js')
const moneyModel = require('../models/money.model.js');
const userModel = require('../models/user.model');

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
  response,
  DEFINED_CODE
} = require('../config/response');


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

const sendMoneyRSA = () => {
  let time = Math.floor(Date.now() / 1000);
  console.log("time: " + time)

  const body = {
    Money: 10000,
    username: `Dat`,
    content: `abc`
  }

  axios.post('http://localhost:3000/api/partner-bank/add-money/1', body, {
      //axios.get('https://bankdbb.herokuapp.com/account/1', {
      headers: {
        sig: sig.createHash(time, JSON.stringify(body), "bankdbb"),
        id: 'bankdbb',
        ts: time,
        verify: sig.generateRSASig()
      }
    })
    .then(response => {
      if (response.data.returnCode == '') {
        console.log("message")
        //console.log(response.data.returnMessage)


      } else {
        console.log("data")
        //console.log(response.data.data);
      }
    })
    .catch(error => {
      console.log("error")
      //console.log(error);
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
  console.log("time: " + time)

  axios.get('http://bank-backend.khuedoan.com/api/partner/get-account-info?credit_number=' + credit_number, {
      //axios.get('https://bankdbb.herokuapp.com/account/1', {
      headers: {
        "authen-hash": createHash256(time, {}, 'bankdbb'),
        "partner-code": 'bankdbb',
        "timestamp": time
      }
    })
    .then(response => {
      if (response.data.returnCode == '') {

        console.log(response.data.returnMessage)
        response(res, 'err', 'err get info partner rsa', response.data)

      } else {
        console.log(response.data.data);
        response(res, '', 'get info successful', response.data)
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
    BankCode: req.headers.id,
    Money: req.body.money,
    Time: Math.floor(Date.now() / 1000),
    Content: req.body.content
  })

  response(res, '', 'transfer money successful')

})

router.post('/send-money', async (req, res) => {
  // {
  //      idBank:
  //    idUser:
  //    credit_number: 
  //     BankCode: 
  //     Money:
  //     Content:
  // }

  const CodeBankPGP = 'thisisatokenfroma'
  //const idParent = req.params.id;

  console.log("id: ", req.params.id);
  console.log("boolean: ", req.params.id == CodeBankPGP);

  let resultSendMoney;
  if (req.params.id == CodeBankPGP)
    resultSendMoney = await sendMoneyPGP()
  else
    resultSendMoney = await sendMoneyRSA()

  console.log(resultSendMoney);

  //add to history
  await partnerBankModel.addToHistory({
    user: req.body.id,
    partner: req.body.username,
    BankCode: req.headers.id,
    Money: -1 * req.body.money,
    Time: Math.floor(Date.now() / 1000),
    Content: req.body.content
  })


})

router.get('/info-partner/:idBank/:credit_number', async (req, res) => {
  const CodeBankPGP = 'thisisatokenfroma'

  if (req.params.idBank == CodeBankPGP)
    getInfoPGP(res)
  else
    getInfoRSA(res, req.params.credit_number)
})

module.exports = router;