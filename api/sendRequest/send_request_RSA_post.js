const axios = require('axios');
const sig = require('../module/sig.js');
const sha256 = require('js-sha256');

let time = Date.now()/1000;
console.log("time: " + time)

const body = {"credit_number":"565572661049","amount":200000}

 axios.post('http://bank-backend.khuedoan.com/api/partner/deposit',body ,{
  //axios.get('https://bankdbb.herokuapp.com/account/1', {
  headers: {
    "partner-code": "bankdbb",
"timestamp": time,
"authen-hash": sha256(time + 'bankdbb' + {}),
"authen-sig": sig.generateRSASig()

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
    //console.log(error);
  });