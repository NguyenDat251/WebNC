const sha1 = require('sha1');

const ts = 1597684980.15;
const data = {
  "number": "1",
  "money": "120322",
  "username": "Lê Văn Lê",
  "content": "test tu nguyen"
};

// const data = {}

const secretKey = 'thisisatokenfroma';

console.log("ts: " + ts);

const strData = JSON.stringify(data);

const strData2 = JSON.stringify(strData);

console.log(strData2 === strData);

console.log("data: " + strData);

console.log("secretKey: " + secretKey);

console.log(sha1(ts + ":" + strData + ":" + secretKey))

//console.log(hash === sha1(ts + ":" + strData + ":" + secretKey))