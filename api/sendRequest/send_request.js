const axios = require('axios');
const sig = require('../module/sig.js');

let time = Date.now();
console.log("time: " + time)

 axios.get('http://localhost:3000/api/partner-bank/info/1', {
  //axios.get('https://bankdbb.herokuapp.com/account/1', {
  headers: {
    sig: sig.createHash(time,JSON.stringify({}),'bankdbb'),
    id: 'bankdbb',
    ts: time
  }
})
  .then(response => {
    if(response.data.returnCode == ''){

      console.log(response.data.returnMessage)

    
  }else {
    console.log(response.data.data);
  }
  })
  .catch(error => {
    console.log("error")
    //console.log(error);
  });