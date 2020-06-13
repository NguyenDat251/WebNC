const axios = require('axios');
const sig = require('../module/sig.js');

let time = Date.now();
console.log("time: " + time)

const body = {
  Money: 10000,
  username: `Dat`,
  content: `abc`
}

 axios.post('http://localhost:3000/api/partner-bank/add-money/1',body ,{
  //axios.get('https://bankdbb.herokuapp.com/account/1', {
  headers: {
    sig: sig.createHash(time,JSON.stringify(body),"bankdbb"),
    id: 'bankdbb',
    ts: time,
    verify: sig.generateRSASig()
  }
})
  .then(response => {
    if(response.data.returnCode == ''){
      console.log("message")
      //console.log(response.data.returnMessage)

    
  }else {
    console.log("data")
    //console.log(response.data.data);
  }
  })
  .catch(error => {
    console.log("error")
    //console.log(error);
  });