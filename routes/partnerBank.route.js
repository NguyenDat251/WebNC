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

// const DaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
// const DaysInMonthLeapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const decrypt = (req) => {
    console.log("sig: " + req.body.signature)
    let request;
    try{
     request =  privateKey.decrypt(req.body.signature, 'json')
}catch(err){
    console.log(err)
    console.log("Wrong key")
    return false;
}

console.log(request);
    return request;
}

const checkRSASig = (partnerInfo, sig) => {
    try {
        publickeyParnter = new NodeRSA(partnerInfo.PublicKey)
        console.log("sig input: ", sig)

        let res = publickeyParnter.verify(partnerInfo.SecretKey, sig, 'base64', 'base64')

        console.log(res);
        return res;

    } catch (err) {
        console.log("error verify: " + err);
        return false;
    }
}
const generateRSASig = () => {
    try{
        sig = privateKey.sign("thisisatokenfroma", 'base64', 'base64');

        console.log(sig);

        return sig;
    } catch(err) {
        console.log("error sig: " + err);
    }
}
const checkPGPSig = async () => {

    let publicKeyArmored;

        await new Promise((resolve, reject) => { 
    fs.readFile('././pgp/public', function read(err, data) {
    if (err) {
        throw err;
    }
    publicKeyArmored = data;

    resolve(true);
});

})

    const verified = await openpgp.verify({
        message: await openpgp.cleartext.readArmored(cleartext),           // parse armored message
        publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys // for verification
    });

    return verified.signatures[0];

    // const { valid } = verified.signatures[0];
    // if (valid) {
    //     console.log('signed by key id ' + verified.signatures[0].keyid.toHex());
    // } else {
    //     throw new Error('signature could not be verified');
    // }
}

const checkTime = (time) => {
    if(Math.floor(Date.now()/1000 - time) > 300){
        return false;
    }

    return true;
}

const checkHash = (hash, ts, data, secretKey) => {
    console.log("hash: " + hash);

    console.log("ts: " + ts);

    data = JSON.stringify(data);

    console.log("data: " + data );

    console.log("secretKey: " + secretKey);

    // console.log("hash check: " + sha1(ts + "/" + data + "/" + secretKey))

    //console.log("hash check: " + sha1("1590203652347/{}/sacombank"))

    // console.log(md5(ts + "/" + data + "/" + secretKey));


    // console.log("hash check: " + crypto.createHash('sha256').update(ts + "/" + data + "/" + secretKey).digest('hex'))
    console.log(sha1(ts + ":" + data + ":" + secretKey)) 
    
    return (hash === sha1(ts + ":" + data + ":" + secretKey))
}

const createHash = (ts, data, secrectKey) => {
    console.log("before hash: " + ts + ":" + data + ":" + secrectKey)

    const hash = sha1(ts + ":" + data + ":" + secrectKey);

    console.log("hash: " + hash)

    return hash
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


const sendMoneyPGP = () => {
    
let time = Math.floor(Date.now() / 1000);
signPGP().then(x => {
    console.log("buffer: ", new Buffer.from(x).toString('base64'))

    return axios.post('http://16754b80.ngrok.io/api/account/money', {}, {
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

 axios.post('http://localhost:3000/api/partner-bank/add-money/1',body ,{
  //axios.get('https://bankdbb.herokuapp.com/account/1', {
  headers: {
    sig: sig.createHash(time,JSON.stringify(body),"bankdbb"),
    id: 'bankdbb',
    ts: time,
    verify: sig.generateRSASig()
  }
})
  .then(response => {
    if(response.data.returnCode == ''){
      console.log("message")
      //console.log(response.data.returnMessage)

    
  }else {
    console.log("data")
    //console.log(response.data.data);
  }
  })
  .catch(error => {
    console.log("error")
    //console.log(error);
  });
}

const getInfoPGP = () => {
    axios.get('http://16754b80.ngrok.io/api/account/info', {
  headers: {
    csi: sha1(time+JSON.stringify({})+'thisisatokenfroma'),
    partnerCode: 'rsa-bank',
    timestamp: Math.floor(Math.floor(Date.now() / 1000))
  }
})
  .then(response => {
        console.log(response.data)
        return response.data
  })
  .catch(error => {
    console.log(error);
    return null;
  });
}

const getInfoRSA = () => {
    let time = Math.floor(Date.now() / 1000);
    console.log("time: " + time)
    
     axios.get('http://localhost:3000/api/partner-bank/info/1', {
      //axios.get('https://bankdbb.herokuapp.com/account/1', {
      headers: {
        sig: sig.createHash(time,JSON.stringify({}),'bankdbb'),
        id: 'bankdbb',
        ts: time
      }
    })
      .then(response => {
        if(response.data.returnCode == ''){
    
          console.log(response.data.returnMessage)
    
        
      }else {
        console.log(response.data.data);
      }
      })
      .catch(error => {
        console.log("error")
        //console.log(error);
      });
}

router.get('/transaction/:time', async (req, res) => {
    const time = req.params.time;

    const month = parseInt(time.substr(0, 2));
    
    const year = parseInt(time.substr(2, 6));

    let nextMonth, nextYear;

    if(month == 12){
        nextMonth = 1
        nextYear = year + 1
    }else{
        nextMonth = month + 1;
        nextYear = year;
    }

    const TimeFrom = new Date(year, month, 0).getTime()/1000;
    const TimeTo = new Date(nextYear, nextMonth, 0).getTime()/1000;

    console.log("second: ", TimeFrom, TimeTo)

    const result = await partnerBankModel.getTransaction(TimeFrom, TimeTo);
    console.log(result)
    if(!result){
        response(res, 'err', 'error getting transaction history')
    }
    else{
        response(res, '', 'Getting transaction history successful', result)
    }
})

// router.get('/transaction/:time', async (req, res) => {
//     const time = req.params.time;

//     const month = parseInt(time.substr(0, 2));
    
//     const year = parseInt(time.substr(2, 6));

//     let nextMonth, nextYear;

//     if(month == 12){
//         nextMonth = 1
//         nextYear = year + 1
//     }else{
//         nextMonth = month + 1;
//         nextYear = year;
//     }

//     const TimeFrom = new Date(year, month, 0).getTime()/1000;
//     const TimeTo = new Date(nextYear, nextMonth, 0).getTime()/1000;

//     console.log("second: ", TimeFrom, TimeTo)

//     const result = await partnerBankModel.getTransaction(TimeFrom, TimeTo);
//     console.log(result)
//     if(!result){
//         response(res, 'err', 'error getting transaction history')
//     }
//     else{
//         response(res, '', 'Getting transaction history successful', result)
//     }
// })

router.get('/info/:id', async (req, res) => {
    const partnerInfo = partnerBankModel.getInfo(req.headers.id)

    //check hash
    if(!checkHash(req.headers.sig, req.headers.ts, req.body, partnerInfo.SecretKey)){
        response(res, 'err', 'The request has been fixed!')
        return;
    }

    console.log("check hash successful")

    //check time

    if(!checkTime(req.headers.ts)){
        response(res, 'err', 'The request is out of date!')
        return;
    }

    const resultInfo = await userModel.getUserById(req.params.id)

    if(!resultInfo){
        response(res, 'err', 'Error when get infomation user')
        return
    }

    response(res, '', 'Get info successful', resultInfo)

    return
})

router.post('/add-money/:id', async (req, res) => {
    // header: {
    //     id: bank code
    //     time:
    //     sig:
    //     verify:
    // }

    // body: {
    //     money: ,
    //     username: ,
    //     content: 
    // }

    //console.log(partnerBankModel.getInfo("kianto"))

    const partnerInfo = partnerBankModel.getInfo(req.headers.id)

    const secretKey = partnerInfo.SecretKey;
        // let publicKey = partnerInfo.PublicKey;
        // let currentTime = Date.now();

        //check id -> lấy secret key

        //verify

        console.log("header: " + JSON.stringify(req.headers));
        console.log("body: " +  JSON.stringify(req.body));

        

        if(!checkRSASig(partnerInfo, req.headers.verify)){
            // res.json({
            //     "returnCode": 0,
            //     "returnMessage": "Error verify!",
            //     "data": null
            // })

            response(res, 'err', 'Error verify!')
            return;
        }

        console.log("check verify successful")

    // if(key.encrypt("abc", 'hex', 'utf8'));

        //check hash

        if(!checkHash(req.headers.sig, req.headers.ts, req.body, secretKey)){
            // res.json({
            //     "returnCode": 0,
            //     "returnMessage": "The request has been fixed",
            //     "data": null
            // })
            response(res, 'err', 'The request has been fixed!')
            return;
        }

        console.log("check hash successful")

        //check time

        if(!checkTime(req.headers.ts)){
            // res.json({
            //     "returnCode": 0,
            //     "returnMessage": "The request is out of date",
            //     "data": null
            // })
            response(res, 'err', 'The request is out of date!')
            return;
        }


        //thực hiện api

        console.log("begin api")

        console.log(req.params.id)

        const idParent = req.params.id

        let CurrentMoney = await moneyModel.getCurrentMoney(idParent);

        if(!CurrentMoney){
            response(res, 'err', 'error when getting money user');
            return;
        }

            console.log("before: " + CurrentMoney);

            if(!req.body.Money){
                response(res, 'err', 'Money to transaction is empty');
                return;
            }

            CurrentMoney += req.body.Money;

            console.log("after: " + CurrentMoney);

        const resultSetMoney = await moneyModel.setMoney({
            CurrentMoney,
            idParent
        }) 

        if(!resultSetMoney){
            response(res, 'err', 'error update money')
            return
        }

        //add to history
        await partnerBankModel.addToHistory({
            user: idParent,
            partner: req.body.username,
            BankCode: req.headers.id,
            Money: req.body.Money,
            Time: Math.floor(Date.now() / 1000),
            Content: req.body.content
        })

        response(res, '', 'transfer money successful')

})

router.post('/send-money', async(req, res) => {
    // {
    //     BankCode: 
    //     Money:
    //     Content:
    // }

    const CodeBankPGP = 'thisisatokenfroma'

    if(req.body.BankCode == CodeBankPGP)
        sendMoneyPGP()
    else
        sendMoneyRSA()

     //add to history
     await partnerBankModel.addToHistory({
        user: idParent,
        partner: req.body.username,
        BankCode: req.headers.id,
        Money: -1*req.body.Money,
        Time: Math.floor(Date.now() / 1000),
        Content: req.body.content
    })
})

router.get('/info-partner/:id', async (req, res) => {
    const CodeBankPGP = 'thisisatokenfroma'

    if(req.body.BankCode == CodeBankPGP)
        getInfoPGP()
    else
        getInfoRSA()
})

module.exports = router;