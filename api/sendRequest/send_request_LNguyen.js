const axios = require('axios');
const sha1 = require('sha1')
const sig = require('../module/sig.js');

let time = Math.floor(Date.now()/1000);
console.log("time: " + time)
console.log("before hash: " + time+JSON.stringify({})+'thisisatokenfroma')
 axios.get('http://16754b80.ngrok.io/api/account/info', {
  //axios.get('https://bankdbb.herokuapp.com/account/1', {
  headers: {
    csi: sha1(time+JSON.stringify({})+'thisisatokenfroma'),
    partnerCode: 'rsa-bank',
    timestamp: time
  }
})
  .then(response => {
//     if(response.data.returnCode == ''){

//       console.log(response.data.returnMessage)

    
//   }else {
//     console.log(response.data.data);
//   }

        console.log(response.data)
  })
  .catch(error => {
    console.log(error);
  });