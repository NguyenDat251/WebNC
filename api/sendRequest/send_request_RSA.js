const axios = require('axios');
const sig = require('../module/sig.js');
const sha256 = require('js-sha256');


let time = Date.now()/1000;
console.log("time: " + time)

//  axios.get('https://bankdbb.herokuapp.com/api/partner-bank/info/1', {
  //axios.get('https://bankdbb.herokuapp.com/account/1', {

    axios.get('http://bank-backend.khuedoan.com/api/partner/get-account-info?credit_number=565572661049', {
  headers: {
    "authen-hash":sha256(time + 'bankdbb' + {}),
    "partner-code": 'bankdbb',
    "timestamp": time
  }
})
  .then(response => {
    if(response.data.returnCode != '1'){

      console.log(response.data.returnMessage)

    
  }else {
    console.log(response.data);
  }
  })
  .catch(error => {
    console.log("error")
    console.log(error.response.data)
    //console.log(error);
  });