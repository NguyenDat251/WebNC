const axios = require('axios');
const NodeRSA = require('node-rsa');
const crypto = require('crypto');
const sha1 = require('sha1');

const privateKeyRSA = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgHvGfCrOsLPolKTOprqzguNp85gkGdh/wbCBtXBtX7ObMSPqBN0a
FgijRfn0NKolIn0ievEiab82ttBO57FGgNWG+fm/CqX72dOpit9A5WqdwKY5iI/0
yO+WNMtJqLwJ5qs/Cp0EwFAbqMh/4Uxsyaiw029hX2IJEdW8oYb+0mwPAgMBAAEC
gYAmwTcPkDfznNct4yaBPsO0wO/sqyEMkLPsuDA/S3+zlNwGCrgLIqfTfIvkf3od
7BKoa6ti5QuHO3JyNsKE1zZvMG06pqiO56B793T2AvsVwfJvPIzWnAyHAQDo0C3H
sM5z6WPlYU3S+P6RKrma4cmVYiizQcB1Y9L15N3/Nib9QQJBAPFj+yJWmycMZ2Kb
RJoTR2IGIFKnhhVM2uBdHsJmXCl9wVr8dkKd9M2RONeCXk1Plw9afFlu10xxLRH8
SNgiSEUCQQCDRDdAvicscFwcAhmBLj+db3Ry2s+s8baGb6eGR13MX0YDS/IyLOH0
8mgeZ9e5a5uDwSQBNNG+noqgnc5q4JpDAkAfMZFhdZmlKSgvCOuLkZQ26Z3BsJ5W
IFFkjwQLkRi1z+dtr5REtY7OBcc3qkQvb2qQ9Ft/XyB5Y2K0oUp0i7GVAkAhVbp+
W4vRMjuB9VqKvrbzATHeVQj2T2/d1g8B/6+nTe6Wubuo2FMNhF3CkvZqpRQaMns1
Pzego9xqi4i3BZDHAkEAjGkNaEYa9PiQiBUUY9po/7CzWsIdASxR+w4B4D2cHPhE
Fv0qItIcqtVZynrY/Co62t5sF0fLBjBZb7X+h0F9jw==
-----END RSA PRIVATE KEY-----`

const privateKey = new NodeRSA(privateKeyRSA);

const time = Math.floor(Date.now() / 1000);
const secretKey = `Tj0xYDEDiQF9f2GYCxSv`;
// const body = {
//   number: `6`,
//   money: `1000`,
//   username: `test`,
//   content: `abc`
// };

const body = {
  "credit_number": "565572661049",
  "amount": 200000
}

const dataToHash = time + ":" + JSON.stringify(body) + ":" + secretKey;
const hash = sha1(dataToHash);
const sig = privateKey.sign(secretKey, 'base64', 'base64');

const host = `http://localhost:8080`;

//  axios.post(`${host}/api/partner-bank/add-money`,body ,{
//   //axios.get('https://bankdbb.herokuapp.com/account/1', {
//   // headers: {
//   //   sig: sig.createHash(time,body,"bankdbb"),
//   //   id: 'bankdbb',
//   //   ts: time,
//   //   verify: sig.generateRSASig()
//   // }
//   headers: {
//     sig: hash,
//     id: `kianto`,
//     ts: time,
//     verify: sig
//   }
// })
//   .then(response => {
//     console.log('response: ', response);

//     if(response.data.returnCode == ''){
//       console.log("message")
//       //console.log(response.data.returnMessage)


//   }else {
//     console.log("data")
//     console.log(response.data);
//   }
//   })
//   .catch(error => {
//     console.log("error")
//     console.log(error.response.data)
//     //console.log(error);
//   });