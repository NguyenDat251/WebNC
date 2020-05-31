const NodeRSA = require('node-rsa');
const md5 = require('md5');

const key = new NodeRSA(`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSHgxSkQ2wHFcV/lxVOZPOemKd
ho4Hpl95JSD0kUQE/3WYeroRUeGLNm86s8EWg5tREzLIi2CzJ1Q6fcHvPHjg8Mr/
WLU4YvS8h5i1Jk+Kd7lf5VEaWFuAX+bEuQ7qt0TAx07o3HOJDNfG/d6k1rLg346y
scQzONE8Ui++wGJM+wIDAQAB-----END PUBLIC KEY-----`)
let priKey = new NodeRSA("-----BEGIN RSA PRIVATE KEY-----\
    MIICXgIBAAKBgQCSHgxSkQ2wHFcV/lxVOZPOemKdho4Hpl95JSD0kUQE/3WYeroR\
    UeGLNm86s8EWg5tREzLIi2CzJ1Q6fcHvPHjg8Mr/WLU4YvS8h5i1Jk+Kd7lf5VEa\
    WFuAX+bEuQ7qt0TAx07o3HOJDNfG/d6k1rLg346yscQzONE8Ui++wGJM+wIDAQAB\
    AoGAVKNHLASN0zd3UmwWe99wOKg3u1uXpeK/ZuMU5dXHesWnDn34jdPKO+N6Jpy8\
    +hedvibKwdPKXbwoVAFIdxWmRnXG9KjKFKfqBKa431QTBheW4ko0WuUVivLuJAhD\
    QiLN00mPnW+Geq5HgKoiO6xE6hhg1RZ4uXOk3u5D+A1wesECQQDHs63LZdD0WVZu\
    Q9/6de2DhrFyZrbf8Ffc+o98PeuHnaCBcQNonTJyKXgZfGy/z7EYySDQh2CvavG7\
    enTEvJMxAkEAu084TkQh61F/sU7bh+XKeA4zD5d5ul4u8Q00XyViJB8e7aeTpSWd\
    T/XyFt+jOmUsbEQ+tYpY4UQtrZOKvShf6wJBAKbm96iXtrSRedf8KFSWfORBDUr0\
    p4CvyW8phgQraA7W4Y9tWZD0WHXrTLHYOLdyqKtzZVaC3n6dXdz3cmH+zPECQQCt\
    2c2M9zf0TeSTEXo5HFNcMvG5mwJktF4lZfgiB3SbyjbOpicntU3ZlZFpIZFC9fzR\
    UFZT8WClVL6AyNyQzRSZAkEAnWT2i/isLbLgD1irK0E4C1BAFkSzIp4YQPpOZsLB\
    HF8j2si5lqtf46VQOVzOg1NlcKy4QoGmVgdMejd/748oqQ==\
    -----END RSA PRIVATE KEY-----")
data={
    Money: 10000
}

data = JSON.stringify(data)

let time = Date.now()



//console.log(md5(time + "/" + data + "/" + secretKey));

let res = key.encrypt(data, 'base64')

//     console.log(res);

//     let resDec = priKey.decrypt(res, 'json');



//     console.log(resDec)

//     //resDec = JSON.parse(resDec)

//     console.log(resDec.Money)

let verify = priKey.sign("bankdbb", "base64", "base64");

console.log(sigVerify)