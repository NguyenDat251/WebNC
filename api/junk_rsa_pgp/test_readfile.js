const sig = require('./api/module/sig.js');

sig.checkTime(123);

let data= {
    money: 10000
}
sig.createHash(Date.now(), JSON.stringify(data), "bankdbb");