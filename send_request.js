const axios = require('axios');

axios.get('http://localhost:8080/account/1', headers: {sig: })
  .then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });