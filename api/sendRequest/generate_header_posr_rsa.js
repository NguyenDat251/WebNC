const crypto = require('crypto');
const Info = require('../../config/partner').getInfo();

const linhKey = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgGFkPDYzYPPrWGryFdZXEXtjRFlBycKW/cAdiBLUCcNQMYgyB3Kc
+oPRy7TV17xsuZC8qovx6P1XT9CXOHg63j1bJtyEQRkCXr/V2l2tkJxtjcHYjtDd
j2uupLYqodZ3Sb+UMi0LkRdk8fVE+taVk/Fn6ny/lLvcRhNPb01/yevBAgMBAAEC
gYA88EoYo/djSHwvlsCBOEOxEADhVJ/ZCT9HaXMOTOy68D+994ffeEfsGWa8BR4T
QXivDs4r+LcPZgWEAEsON898j83HjClnvpAKPzPwuJch+fQz26DPau6UQWdfMm5q
1GVx1yYOujjwi2gETb1hGlhagiZV1X+APm84bry7knDgAQJBALFqWZqFjGBUO2ro
liFsnY52vtl/xdfTwRqhwW98uEfi9xiM8D634abaYWlGAOZDDOpSgvxRgoKsxqF6
lrYvbUECQQCMh76mrbjYTh9DeEaPlNGfcWvwgKZggpsKNAiNoxpcBglS2WJ67psH
yQgx7AQgg7XMGsNetQa7xVGPyhxoRl6BAkB72kl5NNfde5ALPxlndgK7rKvo/Gjq
FZqN8/Qs1z1yecCT8/fXYNj3eSZdro/8Lzy57CYi7OgWP3Vez0ydHJjBAkAzcqro
qKcIgalOcSUcAbawsbx7ow3GPWp3VM9g0zqeQBN/wlgce2hEdGPMqwRjxvRykcW+
0XVynu2aP7sgrcqBAkEAsIWp2vZJvbJnqHoJX0qEQECEVj49PmscBpKIJZZL8FVf
gP78h6zdxHh1xq/oLavoZue7xpP6nFMQmRrqPek8+A==
-----END RSA PRIVATE KEY-----`

const linhPublic = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgGFkPDYzYPPrWGryFdZXEXtjRFlBycKW/cAdiBLUCcNQMYgyB3Kc
+oPRy7TV17xsuZC8qovx6P1XT9CXOHg63j1bJtyEQRkCXr/V2l2tkJxtjcHYjtDd
j2uupLYqodZ3Sb+UMi0LkRdk8fVE+taVk/Fn6ny/lLvcRhNPb01/yevBAgMBAAEC
gYA88EoYo/djSHwvlsCBOEOxEADhVJ/ZCT9HaXMOTOy68D+994ffeEfsGWa8BR4T
QXivDs4r+LcPZgWEAEsON898j83HjClnvpAKPzPwuJch+fQz26DPau6UQWdfMm5q
1GVx1yYOujjwi2gETb1hGlhagiZV1X+APm84bry7knDgAQJBALFqWZqFjGBUO2ro
liFsnY52vtl/xdfTwRqhwW98uEfi9xiM8D634abaYWlGAOZDDOpSgvxRgoKsxqF6
lrYvbUECQQCMh76mrbjYTh9DeEaPlNGfcWvwgKZggpsKNAiNoxpcBglS2WJ67psH
yQgx7AQgg7XMGsNetQa7xVGPyhxoRl6BAkB72kl5NNfde5ALPxlndgK7rKvo/Gjq
FZqN8/Qs1z1yecCT8/fXYNj3eSZdro/8Lzy57CYi7OgWP3Vez0ydHJjBAkAzcqro
qKcIgalOcSUcAbawsbx7ow3GPWp3VM9g0zqeQBN/wlgce2hEdGPMqwRjxvRykcW+
0XVynu2aP7sgrcqBAkEAsIWp2vZJvbJnqHoJX0qEQECEVj49PmscBpKIJZZL8FVf
gP78h6zdxHh1xq/oLavoZue7xpP6nFMQmRrqPek8+A==
-----END RSA PRIVATE KEY-----`

function RSASign(data) {
  console.log('data to sign: ', data)
  const privateKey = Info["bankdbb"].privateKey;
  // const privateKey = linhKey;
  const sign = crypto.createSign('RSA-SHA256')
  const signature = sign.update(data).sign(privateKey, 'base64');
  //console.log("signature inside: ", signature);
  return signature;
}

const secretKey = "Tj0xYDEDiQF9f2GYCxSv";
const time = Math.floor(Date.now() / 1000);
//const time = 1597631193;
const body = {
  "credit_number": "565572661049",
  "amount": 200000
};

console.log('body string: ', JSON.stringify(body))
console.log('{"credit_number":"565572661049","amount":200000}')
console.log("is equal: ", JSON.stringify(body) === '{"credit_number":"565572661049","amount":200000}')

const dataToHash = time + secretKey + JSON.stringify(body);
//const dataToHash = '1589520986kQYtFpj7pJfi5VVfoeGD{"credit_number":"565572661049","amount":200000}';
const hash = crypto.createHash('sha256').update(dataToHash).digest('base64');

const signature =  RSASign(dataToHash);

function RSAVerify(publicKey, signature, data) {
  const verify = crypto.createVerify('RSA-SHA256');
  verify.update(data);
  console.log(verify.verify(publicKey, signature, 'base64'));
}

const publicKey = Info["bankdbb"].publicKey;

console.log("time: ", time);
console.log("body: ", body);
console.log("hash: ", hash);
console.log("sig: ", signature);
console.log('verify: ', RSAVerify(publicKey, signature, dataToHash));