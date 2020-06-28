const axios = require('axios');
const sig = require('../module/sig.js');

let time = Math.floor(Date.now()/1000);
console.log("time: " + time);
console.log("hash: ", sig.createHash(time,{},'bankdbb'));

//  axios.get('https://bankdbb.herokuapp.com/api/partner-bank/info/1', {
  //axios.get('https://bankdbb.herokuapp.com/account/1', {

    axios.get('http://localhost:8080/api/partner-bank/info/1', {
  headers: {
    sig: sig.createHash(time,{},'bankdbb'),
    id: 'bankdbb',
    ts: time
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