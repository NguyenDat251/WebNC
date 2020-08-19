const express = require("express");
const router = express.Router();
const partnerBankModel = require("../models/partnerBank.model.js");
const moneyModel = require("../models/money.model.js");
const userModel = require("../models/user.model");
const Info = require("../config/partner").getInfo();

const NodeRSA = require("node-rsa");
const openpgp = require("openpgp");
const crypto = require("crypto");
const fs = require("fs");
const sha1 = require("sha1");
const md5 = require("md5");
const axios = require("axios");

const hostPGP = "https://final-ib.herokuapp.com";
//const hostPGP = "http://a9b19e70fb9e.ngrok.io";

const {
  encodeWalletId,
  decodeWalletId
} = require('../middlewares/convertWalletId.mdw.js');

const {
  promisify
} = require("util");
var {
  response
} = require("../config/response");

let partnerInfoKey;

const MyprivateKeyArmored = Info["bankdbb"].privatePGPKey;
const passphrase = `yourPassphrase`;

const decrypt = (req) => {
  let request;
  try {
    request = privateKey.decrypt(req.body.signature, "json");
  } catch (err) {
    return false;
  }

  return request;
};

const checkRSASig = (partnerInfo, sig) => {
  try {
    //const pubKey = config.
    publickeyParnter = new NodeRSA(partnerInfo.PublicRSAKey);

    let res = publickeyParnter.verify(
      partnerInfo.SecretKey,
      sig,
      "base64",
      "base64"
    );

    return res;
  } catch (err) {
    return false;
  }
};
const generateRSASig = (secretKey) => {
  try {
    sig = privateKey.sign(secretKey, "base64", "base64");

    return sig;
  } catch (err) {}
};
const checkPGPSig = async (partnerInfo, verify) => {
  let publicKeyArmored = partnerInfo.PublicKey;
  const verified = await openpgp.verify({
    message: await openpgp.cleartext.readArmored(verify), // parse armored message
    publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys, // for verification
  });

  return verified.signatures[0];
};

const checkTime = (time) => {
  if (Math.floor(Date.now() / 1000 - time) > 300) {
    return false;
  }

  return true;
};

const checkHash = (hash, ts, data, secretKey) => {

  data = JSON.stringify(data);

  return hash === sha1(ts + ":" + data + ":" + secretKey);
};

const createHash = (ts, data, secrectKey) => {

  const hash = sha1(ts + ":" + data + ":" + secrectKey);


  return hash;
};

const createHash256 = (ts, data, secretKey) => {
  return crypto
    .createHash("sha256")
    .update(ts + secretKey + data)
    .digest("base64");
};

async function signPGP() {
  const {
    keys: [privateKey],
  } = await openpgp.key.readArmored(MyprivateKeyArmored);
  await privateKey.decrypt(passphrase);

  const {
    signature: cleartext
  } = await openpgp.sign({
    message: openpgp.cleartext.fromText("thisisatokenfroma"), // CleartextMessage or Message object
    privateKeys: [privateKey], // for signing,
    detached: true,
  });
  return Promise.resolve(cleartext);
}

const sendMoneyPGP = async (body) => {
  let result;
  let time = Math.floor(Date.now() / 1000);

  const bodyToSend = {
    fromAccountNumber: encodeWalletId(body.idUser),
    amount: body.money,
    content: body.content,
    toAccountNumber: body.credit_number,
  };

  const hash = sha1(time + JSON.stringify(bodyToSend) + "thisisatokenfroma");
  console.log("hash: ", hash);

  console.log('body to send: ', JSON.stringify(bodyToSend));
  console.log('data to hash: ', time + JSON.stringify(bodyToSend) + "thisisatokenfroma");

  await signPGP().then((x) => {
    console.log("buffer: ", new Buffer.from(x).toString("base64"));
    const url = hostPGP + '/api/account/money'
    return axios
      .post(
        url, {
          ...bodyToSend,
        }, {
          headers: {
            csi: hash,
            partnerCode: "rsa-bank",
            timestamp: time,
            detachedSignature: new Buffer.from(x).toString("base64"),
          },
        }
      )
      .then((response) => {
        console.log("response: ");
        //console.log(response);
        if (response.data.status === 'failed') {
          result = false;
          return;
        }
        result = true;
        //return response.data;
      })
      .catch((error) => {
        console.log(error);
        result = false;
      });
  });

  return result;
};

function createSignRSA(dataToSign) {
  const privateKey = Info["bankdbb"].privateKey;

  const sign = crypto.createSign("SHA256");
  sign.update(dataToSign);
  sign.end();
  return sign.sign(privateKey);
}

function RSASign(data) {
  const privateKey = Info["bankdbb"].privateKey;

  const sign = crypto.createSign("RSA-sha256");
  const signature = sign.update(data).sign(privateKey, "base64");
  console.log("signature inside: ", signature);
  return signature;
}

const sendMoneyRSA = async (data) => {
  const secretKey = "Tj0xYDEDiQF9f2GYCxSv";
  const time = Math.floor(Date.now() / 1000);
  const body = {
    credit_number: data.credit_number,
    amount: data.money,
  };
  const dataToHash = time + secretKey + JSON.stringify(body);
  const hash = crypto.createHash("sha256").update(dataToHash).digest("base64");

  let result;

  await axios
    .post("http://bank-backend.khuedoan.com/api/partner/deposit", {
      ...body
    }, {
      //axios.get('https://bankdbb.herokuapp.com/account/1', {
      headers: {
        "authen-hash": hash,
        "partner-code": "bankdbb",
        timestamp: time,
        "authen-sig": RSASign(dataToHash),
      },
    })
    .then((responseR) => {
      //console.log("response: ", responseR);
      result = true;
      return true;
    })
    .catch((error) => {
      result = false;
      return false;
    });

  return result;
};

const getInfoPGP = (res) => {
  const time = Math.floor(Date.now() / 1000);

  const url = hostPGP + "/api/account/info";

  axios
    .get(url, {
      headers: {
        csi: sha1(time + JSON.stringify({}) + "thisisatokenfroma"),
        partnerCode: "rsa-bank",
        timestamp: time,
      },
    })
    .then((result) => {
      response(res, "", "success", result.data);
      //response(res, '', 'transfer money successful')

      console.log(result.data);
      return result;
    })
    .catch((error) => {
      response(res, "err", "not success", error.data);
      console.log(error.data);
      return null;
    });
};

const getInfoRSA = (res, credit_number) => {
  const time = Math.floor(Date.now() / 1000);
  const dataToHash = time + "Tj0xYDEDiQF9f2GYCxSv" + `{}`;
  const hash = crypto.createHash("sha256").update(dataToHash).digest("base64");

  console.log("credit_number:", credit_number);
  axios
    .get(
      "http://bank-backend.khuedoan.com/api/partner/get-account-info?credit_number=" +
      credit_number, {
        //axios.get('https://bankdbb.herokuapp.com/account/1', {
        headers: {
          "authen-hash": hash,
          "partner-code": "bankdbb",
          timestamp: time,
        },
      }
    )
    .then((rp) => {
      if (rp.data.returnCode == "0") {
        console.log("return code 0");
        console.log(rp.data);
        response(res, "err", "err get info partner rsa", rp.data);
      } else {
        console.log("return code 1");
        console.log(rp.data);
        response(res, "", "get info successful", rp.data);
        return;
      }
    })
    .catch((error) => {
      console.log("error");
      response(res, "err", "err get info partner rsa", error);
      //console.log(error);
    });
};

router.get("/transaction/:time", async (req, res) => {
  const time = req.params.time;

  const month = parseInt(time.substr(0, 2));

  const year = parseInt(time.substr(2, 6));

  let nextMonth, nextYear;

  if (month == 12) {
    nextMonth = 1;
    nextYear = year + 1;
  } else {
    nextMonth = month + 1;
    nextYear = year;
  }

  const TimeFrom = new Date(year, month, 0).getTime() / 1000;
  const TimeTo = new Date(nextYear, nextMonth, 0).getTime() / 1000;

  console.log("second: ", TimeFrom, TimeTo);

  const result = await partnerBankModel.getTransaction(TimeFrom, TimeTo);
  console.log(result);
  if (!result) {
    response(res, "err", "error getting transaction history");
  } else {
    response(res, "", "Getting transaction history successful", result);
  }
});

router.get("/banks", async (req, res) => {
  const result = await partnerBankModel.getBanks();

  if (!result) {
    response(res, "err", "error getting banks");
    return;
  } else {
    response(res, "", "Getting banks successful", result);
  }
});

router.get("/transaction", async (req, res) => {
  //?time=&from=&to=&name=
  const time = req.query.time;
  const fromDate = parseInt(req.query.from || 0);
  const toDate = parseInt(req.query.to || 0);
  const nameBank = req.query.name || "";

  const month = parseInt(time.substr(0, 2)) - 1;
  const year = parseInt(time.substr(2, 6));

  let nextMonth, nextYear;

  if (toDate) {
    nextMonth = month;
    nextYear = year;
  } else {
    if (month == 12) {
      nextMonth = 1;
      nextYear = year + 1;
    } else {
      nextMonth = month + 1;
      nextYear = year;
    }
  }

  console.log('from year: ', year);
  console.log('from month: ', month);
  console.log('from date: ', fromDate);
  console.log('from year: ', nextYear);
  console.log('from year: ', nextMonth);
  console.log('from year: ', toDate);

  const TimeFrom = new Date(year, month, fromDate).getTime() / 1000;
  const TimeTo = new Date(nextYear, nextMonth, toDate).getTime() / 1000;

  console.log("TimeFrom: ", TimeFrom);
  console.log("TimeTo:", TimeTo);

  const result = await partnerBankModel.getTransaction(
    TimeFrom,
    TimeTo,
    nameBank
  );

  if (!result) {
    response(res, "err", "error getting transaction history");
    return;
  } else {
    response(res, "", "Getting transaction history successful", result);
  }
});

router.get("/info/:number", async (req, res) => {
  const partnerInfo = partnerBankModel.getInfo(req.headers.id);
  console.log("header: ", req.headers);
  //check hash
  if (
    !checkHash(req.headers.sig, req.headers.ts, req.body, partnerInfo.SecretKey)
  ) {
    response(res, "err", "The request has been fixed!");
    return;
  }

  console.log("check hash successful");

  //check time

  if (!checkTime(req.headers.ts)) {
    response(res, "err", "The request is out of date!");
    return;
  }

  const resultInfo = await userModel.getUserInfoByWalletId(decodeWalletId(req.params.number));

  if (!resultInfo) {
    response(res, "err", "Error when get infomation user");
    return;
  }

  response(res, "", "Get info successful", resultInfo);

  return;
});

router.post("/add-money", async (req, res) => {
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
  console.log("partner id: ", req.headers.id);
  const partnerInfo = partnerBankModel.getInfo(req.headers.id);

  if (!partnerInfo) {
    response(res, "err", "unknown partner");
    return;
  }

  const secretKey = partnerInfo.SecretKey;
  //verify
  if (!checkRSASig(partnerInfo, req.headers.verify)) {
    response(res, "err", "Error verify!");
    return;
  }

  if (!checkHash(req.headers.sig, req.headers.ts, req.body, secretKey)) {
    response(res, "err", "The request has been fixed!");
    return;
  }

  if (!checkTime(req.headers.ts)) {
    response(res, "err", "The request is out of date!");
    return;
  }

  //thực hiện api
  const idParent = decodeWalletId(req.body.number);

  const currentAccount = await moneyModel.getCurrentMoneyFromIdUser(idParent);

  if (!currentAccount) {
    response(req, 'err', 'user is not existed');
    return;
  }

  let CurrentMoney = parseInt(currentAccount[0].money);

  if (!CurrentMoney) {
    response(res, "err", "error when getting money user");
    return;
  }
  if (!req.body.money) {
    response(res, "err", "Money to transaction is empty");
    return;
  }

  CurrentMoney += parseInt(req.body.money);

  const resultSetMoney = await moneyModel.setMoney({
    CurrentMoney,
    idParent,
  });


  if (!resultSetMoney) {
    response(res, "err", "error update money");
    return;
  }

  try {
    await partnerBankModel.addToHistory({
      user: idParent,
      partner: req.body.username,
      bankcode: req.headers.id,
      money: req.body.money,
      time: Math.floor(Date.now() / 1000),
      type: 1,
      content: req.body.content,
    });

    response(res, "", "transfer money successful");
  } catch {
    response(res, "err", "save to history failed");
  }
});

router.post("/send-money", async (req, res) => {
  // {
  //      idBank:
  //    idUser:
  //    credit_number:
  //     money:
  //     content:
  // }
  partnerInfoKey = Info[req.body.idBank];

  const CodeBankPGP = "rsa-bank";
  const CodeBankRSA = "kianto";
  const idBank = req.body.idBank;
  //const idParent = req.params.id;

  let resultSendMoney;
  if (idBank === CodeBankPGP) {
    resultSendMoney = await sendMoneyPGP(req.body);
  } else if (idBank === CodeBankRSA) {
    resultSendMoney = await sendMoneyRSA(req.body);
  } else {
    response(res, "err", "unknown partner");
    return;
  }


  if (!resultSendMoney) {
    response(res, "err", "send money false", "");
    return;
  }

  //minus money
  const idParent = req.body.idUser;

  let CurrentMoney = await moneyModel.getCurrentMoneyFromIdUser(idParent);
  CurrentMoney = CurrentMoney[0].money;

  if (!CurrentMoney) {
    response(res, "err", "error when getting money user");
    return;
  }
  if (!req.body.money) {
    response(res, "err", "Money to transaction is empty");
    return;
  }


  CurrentMoney -= req.body.money;

  const resultSetMoney = await moneyModel.setMoney({
    CurrentMoney,
    idParent,
  });


  if (!resultSetMoney) {
    response(res, "err", "error update money");
    return;
  }

  //add to history
  try {
    await partnerBankModel.addToHistory({
      user: req.body.idUser,
      partner: req.body.credit_number,
      bankcode: req.body.idBank,
      money: -1 * req.body.money,
      time: Math.floor(Date.now() / 1000),
      type: 2,
      content: req.body.content,
    });

    response(res, "", "send money successfull", "");
  } catch (err) {
    response(res, "err", "save to history false", "");
  }
});

router.get("/info-partner/:idBank/:credit_number", async (req, res) => {
  const CodeBankPGP = "rsa-bank";

  if (req.params.idBank == CodeBankPGP) getInfoPGP(res);
  else getInfoRSA(res, req.params.credit_number);
});

module.exports = router;