const axios = require('axios');
const sig = require('../module/sig.js');

let time = Date.now();
console.log("time: " + time)

const body = {
  number: `6`,
  money: `1000`,
  username: `test`,
  content: `abc`
}

const host= `http://localhost:8080`;

 axios.post(`${host}/api/partner-bank/add-money`,body ,{
  //axios.get('https://bankdbb.herokuapp.com/account/1', {
  // headers: {
  //   sig: sig.createHash(time,body,"bankdbb"),
  //   id: 'bankdbb',
  //   ts: time,
  //   verify: sig.generateRSASig()
  // }
  headers: {
    sig: '7ae591986f04ec5afca9d66c2d051138a0ce9ab4',
    id: 'bankdbb',
    ts: '1593249076',
    verify: sig.generateRSASig()
  }
})
  .then(response => {
    if(response.data.returnCode == ''){
      console.log("message")
      //console.log(response.data.returnMessage)

    
  }else {
    console.log("data")
    console.log(response.data);
  }
  })
  .catch(error => {
    console.log("error")
    console.log(error.response.data)
    //console.log(error);
  });