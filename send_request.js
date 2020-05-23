const axios = require('axios');
const sig = require('api/module/sig.js');

let time = Date.now();

axios.get('http://localhost:8080/account/1', {
  headers: {
    sig: sig.createHash(time, {}, 'sacombank'),
    id: 'sacombank',
    ts: time
  }
})
  .then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });