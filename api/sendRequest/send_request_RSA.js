const axios = require('axios');
//const sig = require('../module/sig.js');
const sha256 = require('js-sha256');
const crypto = require('crypto');


//const time = Math.floor(Date.now()/1000);
const time = Math.floor(Date.now() / 1000);
const dataToHash = time + 'Tj0xYDEDiQF9f2GYCxSv' + `{}`;
const hash = crypto.createHash('sha256').update(dataToHash).digest('base64');
console.log("time: " + time)
console.log("hash: ", hash)


//  axios.get('https://bankdbb.herokuapp.com/api/partner-bank/info/1', {
  //axios.get('https://bankdbb.herokuapp.com/account/1', {

    axios.get('http://bank-backend.khuedoan.com/api/partner/get-account-info?credit_number=565572661049', {
  headers: {
    "authen-hash":hash,
    "partner-code": 'bankdbb',
    "timestamp": time
  }
})
  .then(response => {
    if(response.data.returnCode != '1'){

      console.log(response.data)

    
  }else {
    console.log(response.data);
  }
  })
  .catch(error => {
    console.log("error")
    console.log(error.response.data)
    //console.log(error);
  });