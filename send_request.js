const axios = require('axios');
const sig = require('../WebNC/api/module/sig.js');

let time = Date.now();
console.log(time)

axios.get('https://bankdbb.herokuapp.com/account/1', {
  headers: {
    sig: sig.createHash(time,{},'thisisatokenfroma'),
    id: 'rsa-bank',
    ts: time
  }
})
  .then(response => {
    if(response.data.returnCode == ''){

      console.log(response.data.returnMessage)

    
  }else {
    console.log(response.data.url);
    console.log(response.data.explanation);
  }
  })
  .catch(error => {
    console.log(error);
  });