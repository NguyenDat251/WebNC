const axios = require('axios');
const sig = require('../WebNC/api/module/sig.js');

let time = Date.now();

axios.get('http://localhost:8080/account/1', {
  headers: {
    sig: '93e6e8b8ce95f1580814c21b235fa35496e8fb70',
    id: 'rsa-bank',
    ts: 1590301762385
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