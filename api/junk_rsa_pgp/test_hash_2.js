
const sha1 = require('sha1');
const crypto = require('crypto');
const md5 = require('md5');
 

let data ={};

data = JSON.stringify(data);



secretKey = 'sacombank'

// console.log(Date.now())
// console.log(data);
// console.log(secretKey)

let time = Date.now()

// console.log(crypto.createHash('sha256').update("1590206994606" + "/" + data + "/" + secretKey).digest('hex'))

console.log(md5(time + "/" + data + "/" + secretKey));
// console.log(sha1(time + "/" + data + "/" + secrectKey))

// console.log(sha1(time + "/" + data + "/" + secrectKey))