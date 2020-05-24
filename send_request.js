const axios = require('axios');
const sig = require('../WebNC/api/module/sig.js');

let time = Date.now();

axios.get('http://localhost:8080/account/1', {
  headers: {
    sig: 'd99b0ff68091ca03d1273360d9cd255a8ee95688',
    id: 'rsa-bank',
    ts: 1590300963046
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