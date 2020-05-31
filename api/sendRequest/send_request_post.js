const axios = require('axios');
const sig = require('../api/module/sig.js');

let time = Date.now();
console.log("time: " + time)

 axios.post('http://d30cd9e5.ngrok.io/account/1',{data: {}} ,{
  //axios.get('https://bankdbb.herokuapp.com/account/1', {
  headers: {
    sig: sig.createHash(time,JSON.stringify({data: {}}),"thisisatokenfroma"),
    id: 'rsa-bank',
    ts: time,
    verify: sig.generateRSASig()
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
    console.log(error);
  });