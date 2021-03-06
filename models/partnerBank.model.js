const db = require("../utils/db");
const Info = require("../config/partner.js");

module.exports = {
  getTransaction: (TimeFrom, TimeTo, nameBank) => {
    return db.load(`select a.username as sender, t.partner as receiver, b.name, time, money from otherbanktransaction t, 
        otherbank b, account a where 
        t.user = a.id and
        t.bankcode = b.bankcode 
        and Time >= ${TimeFrom} 
        and Time <= ${TimeTo} 
        and b.bankcode LIKE '%${nameBank}%'`);
  },

  getInfo: (id) => {
    //console.log(Info.getInfo())
    return Info.getInfo()[id];
  },

  detail: (req, res) => {
    let secretKey = "sacombank";
    let publicKey = "";
    let currentTime = Date.now();

    //check id -> lấy secret key
    if (req.headers.id == "sacombank") {
      secretKey = "sacombank";
    } else if (req.headers.id == "rsa-bank") {
      secretKey = "thisisatokenfroma";
    } else {
      res.json({
        returnCode: 0,
        returnMessage: "Unknowed bank",
        data: null,
      });

      return;
    }

    //check hash

    if (!sig.checkHash(req.headers.sig, req.headers.ts, req.body, secretKey)) {
      res.json({
        returnCode: 0,
        returnMessage: "The request has been fixed",
        data: null,
      });

      return;
    }


    let TransactionAccount = null;
    let SavingAccount = [];

    let sql = "SELECT * FROM moneyaccount WHERE id=?";
    db.query(sql, [req.params.accountId], (err, response) => {
      if (err) {
        res.json({
          returnCode: 0,
          returnMessage: err,
          data: null,
        });
      }

      let i;
      for (i = 0; i < response.length; i++) {
        if (response[i].Type === "1") {
          TransactionAccount = response[i];
          response.splice(i, 1);
          break;
        }
      }

      SavingAccount = response;

      console.log("Transition: " + TransactionAccount);
      console.log("Saving: " + SavingAccount);
    });

    sql = "SELECT * FROM account WHERE id = ?";
    db.query(sql, [req.params.accountId], (err, response) => {
      if (err) {
        res.json({
          returnCode: 0,
          returnMessage: err,
          data: null,
        });
      }

      let data = response[0];
      data["Transaction Account"] = TransactionAccount;
      data["Saving Account"] = SavingAccount;

      console.log("data: " + data);

      res.json({
        returnCode: 1,
        returnMessage: "Success",
        data: data,
      });
    });

  },
  addMoney: async (req, res) => {
    let sql = "SELECT * FROM moneyaccount WHERE id=?";
    await new Promise((resolve, reject) => {
      db.query(sql, [req.params.accountId], (err, response) => {
        if (err) {
          res.json({
            returnCode: 0,
            returnMessage: err,
            data: null,
          });
        }

        console.log("response: " + JSON.stringify(response));

        let i;
        for (i = 0; i < response.length; i++) {
          if (response[i].Type === "1") {
            CurrentMoney = parseInt(response[i].Money);
            break;
          }
        }

        console.log("before: " + CurrentMoney);

        if (!req.body.Money) {
          res.json({
            returnCode: 0,
            returnMessage: "Money to transaction is empty",
            data: null,
          });

          return;
        }

        CurrentMoney += req.body.Money;

        console.log("after: " + CurrentMoney);

        let res123 = null;
        resolve(res123);
      });
    });

    console.log("abc");
    console.log(CurrentMoney);

    sql = "UPDATE moneyaccount SET Money = ? WHERE id = ?";
    db.query(
      sql,
      [CurrentMoney.toString(), req.params.accountId],
      (err, response) => {
        if (err) {
          res.json({
            returnCode: 0,
            returnMessage: err,
            data: null,
          });
        }

        res.json({
          returnCode: 1,
          returnMessage: "Transation successful",
          data: null,
        });
      }
    );
  },
  update: (req, res) => {
    let data = req.body;
    let memberId = req.params.memberId;
    let sql = "UPDATE member SET ? WHERE id = ?";
    db.query(sql, [data, memberId], (err, response) => {
      if (err) throw err;
      res.json({
        message: "Update success!"
      });
    });
  },
  addToHistory: (entity) => {
    return db.add(entity, `otherbanktransaction`);
  },
  getBanks: () => {
    return db.load(`select * from otherbank`);
  },
};