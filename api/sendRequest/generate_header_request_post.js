const axios = require('axios');
const NodeRSA = require('node-rsa');
const crypto = require('crypto');
const sha1 = require('sha1');

const privateKeyRSA = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQCJlQZ/m1+iLfK/lpYDmicle6v0llLWtdYhSkH6buiOrNbaXVH/
/ZcG9TpOLU1vL+PkvprCZ/N1Stqz0xNrzcdT0zFIxQSr31fB1qzD2+T4njBcGROS
tv0uxhaarmWVJwjLia0rlL7grRL0axw4rESM9nsNbe8XnJGVKtFy9MXHBwIDAQAB
AoGAFxRq3KlB58DxgfZPABeyDXWrqQI2r1Ids8PzQYGtfZG9ETCqetkdpssolsi+
vrI39r2K1KX/j2OZQKVeEq2YjFR+etusQzCRF6jqbk5O+/ajLL4veyxKQmTQXDVx
DwjsRDc1MvMsfqmnk5b0uYs9ntnT/iaqkLVtEwKMpnjFW/ECQQDvfz1wpjRKCduV
sdaH1JxqKw2mYu79Cyp7LkHKz0fvfg6SP7EAPt4j7dlBuA0n99OAklcvtfVpiXF3
rQOauC99AkEAkw/+JX4dfvGXOQ+fZerFamOUjVLEhH7I19wrHU4y56SDC2uQ1Q9n
xvxH81CxFTN7HXOKQ8uFNY06kyfzWNif0wJAd+dhMEPVy/eReymU+V4ljTXO2K2R
bxinBRLMl6gdILcgvnGqwS+4cY6EBdYKqCb4OdeKVPWpT1QjfcIeGtj51QJAMZgC
F/i4z7d/TOHk2kTbAG7GiQYxeZEcABeifoaBijajbrV+qStBzwwC454BqemrihoN
taErsgyHhVrCqOKcuwJAWyuluw+LXjvwY/sFgPXLqCPMfEP4kBXhqM/+hHK7ZerR
aLvYFAwzssSuUGlksRon0xjQ7M9P2+Bld3gcV6hUyg==
-----END RSA PRIVATE KEY-----`

const privateKey = new NodeRSA(privateKeyRSA);

const time = Date.now()/1000;
const secretKey = `Tj0xYDEDiQF9f2GYCxSv`;
const body = {
  number: `6`,
  money: `1000`,
  username: `test`,
  content: `abc`
};

const dataToHash = time + ":" + JSON.stringify(body) + ":" + secretKey;
const hash = sha1(dataToHash);
const sig = privateKey.sign(secretKey, 'base64', 'base64');
console.log("time: " + time);
console.log("secretKey: ", secretKey);
console.log("body: ", JSON.stringify(body));
console.log("hash: ", hash);
console.log("sig: ", sig);

const host= `http://localhost:8080`;

 axios.post(`${host}/api/partner-bank/add-money`,body ,{
  //axios.get('https://bankdbb.herokuapp.com/account/1', {
  // headers: {
  //   sig: sig.createHash(time,body,"bankdbb"),
  //   id: 'bankdbb',
  //   ts: time,
  //   verify: sig.generateRSASig()
  // }
  headers: {
    sig: hash,
    id: `kianto`,
    ts: time,
    verify: sig
  }
})
  .then(response => {
    if(response.data.returnCode == ''){
      console.log("message")
      //console.log(response.data.returnMessage)

    
  }else {
    console.log("data")
    console.log(response.data);
  }
  })
  .catch(error => {
    console.log("error")
    console.log(error.response.data)
    //console.log(error);
  });