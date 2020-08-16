const NodeRSA = require('node-rsa');
const openpgp = require('openpgp');
const crypto = require('crypto');
const fs = require('fs');
const sha1 = require('sha1');
const md5 = require('md5');

let publicKeyRSA = `-----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSHgxSkQ2wHFcV/lxVOZPOemKd
    ho4Hpl95JSD0kUQE/3WYeroRUeGLNm86s8EWg5tREzLIi2CzJ1Q6fcHvPHjg8Mr/
    WLU4YvS8h5i1Jk+Kd7lf5VEaWFuAX+bEuQ7qt0TAx07o3HOJDNfG/d6k1rLg346y
    scQzONE8Ui++wGJM+wIDAQAB-----END PUBLIC KEY-----`

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgHvGfCrOsLPolKTOprqzguNp85gkGdh/wbCBtXBtX7ObMSPqBN0a
FgijRfn0NKolIn0ievEiab82ttBO57FGgNWG+fm/CqX72dOpit9A5WqdwKY5iI/0
yO+WNMtJqLwJ5qs/Cp0EwFAbqMh/4Uxsyaiw029hX2IJEdW8oYb+0mwPAgMBAAEC
gYAmwTcPkDfznNct4yaBPsO0wO/sqyEMkLPsuDA/S3+zlNwGCrgLIqfTfIvkf3od
7BKoa6ti5QuHO3JyNsKE1zZvMG06pqiO56B793T2AvsVwfJvPIzWnAyHAQDo0C3H
sM5z6WPlYU3S+P6RKrma4cmVYiizQcB1Y9L15N3/Nib9QQJBAPFj+yJWmycMZ2Kb
RJoTR2IGIFKnhhVM2uBdHsJmXCl9wVr8dkKd9M2RONeCXk1Plw9afFlu10xxLRH8
SNgiSEUCQQCDRDdAvicscFwcAhmBLj+db3Ry2s+s8baGb6eGR13MX0YDS/IyLOH0
8mgeZ9e5a5uDwSQBNNG+noqgnc5q4JpDAkAfMZFhdZmlKSgvCOuLkZQ26Z3BsJ5W
IFFkjwQLkRi1z+dtr5REtY7OBcc3qkQvb2qQ9Ft/XyB5Y2K0oUp0i7GVAkAhVbp+
W4vRMjuB9VqKvrbzATHeVQj2T2/d1g8B/6+nTe6Wubuo2FMNhF3CkvZqpRQaMns1
Pzego9xqi4i3BZDHAkEAjGkNaEYa9PiQiBUUY9po/7CzWsIdASxR+w4B4D2cHPhE
Fv0qItIcqtVZynrY/Co62t5sF0fLBjBZb7X+h0F9jw==
-----END RSA PRIVATE KEY-----`;

publickeyParnter = new NodeRSA(`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCEUZJwvTYorustQY+F3iqhJe+M
+vk10V1gd+tXAT5eQ6Bfx/EOEEoFiwnH/I5KmRx3D3a2GHgWYILDnCVo5Kn6HH/R
Iuvi11rlvK5C798WYRjvNkOlcfI3M6ixQf+fAJSnflOqCcoPp/RM0HgcywoTkNWK
PQYpPpk9tno/qlOcwwIDAQAB
-----END PUBLIC KEY-----`)

let privateKey = new NodeRSA(privateKeyRSA);

let publicKey = new NodeRSA(publicKeyRSA);

const secretKey = "bankdbb";

module.exports = {
    decrypt: (req)=>{
        console.log("sig: " + req.body.signature)
        let request;
        try{
         request =  privateKey.decrypt(req.body.signature, 'json')
    }catch(err){
        console.log(err)
        console.log("Wrong key")
        return false;
    }

    console.log(request);
        return request;
    },
    checkRSASig: (sig)=>{
        try {
            console.log("sig input: ", sig)

            let res = publickeyParnter.verify("thisisatokenfroma", sig, 'base64', 'base64')

            console.log(res);
            return res;

        } catch (err) {
            console.log("error verify: " + err);
            return false;
        }
    },
    generateRSASig: ()=>{
        try{
            sig = privateKey.sign(secretKey, 'base64', 'base64');

            console.log(sig);

            return sig;
        } catch(err) {
            console.log("error sig: " + err);
        }
    },
    checkPGPSig: async  ()=>{

        let publicKeyArmored;

            await new Promise((resolve, reject) => { 
        fs.readFile('././pgp/public', function read(err, data) {
        if (err) {
            throw err;
        }
        publicKeyArmored = data;

        resolve(true);
    });
   
})

        const verified = await openpgp.verify({
            message: await openpgp.cleartext.readArmored(cleartext),           // parse armored message
            publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys // for verification
        });

        return verified.signatures[0];

        // const { valid } = verified.signatures[0];
        // if (valid) {
        //     console.log('signed by key id ' + verified.signatures[0].keyid.toHex());
        // } else {
        //     throw new Error('signature could not be verified');
        // }
    },
    checkTime: (time)=> {
        if(Math.floor(Date.now()/1000 - time) > 300){
            return false;
        }

        return true;
    },
    checkHash: (hash, ts, data, secretKey) => {
        console.log("hash: " + hash);

        console.log("ts: " + ts);

        data = JSON.stringify(data);

        console.log("data: " + data );

        console.log("secretKey: " + secretKey);

        // console.log("hash check: " + sha1(ts + "/" + data + "/" + secretKey))

        //console.log("hash check: " + sha1("1590203652347/{}/sacombank"))

        // console.log(md5(ts + "/" + data + "/" + secretKey));


        // console.log("hash check: " + crypto.createHash('sha256').update(ts + "/" + data + "/" + secretKey).digest('hex'))
        console.log(sha1(ts + ":" + data + ":" + secretKey)) 
        
        return (hash === sha1(ts + ":" + data + ":" + secretKey))
    },
    createHash: (ts, data, secrectKey) => {
        console.log("before hash: " + ts + ":" + data + ":" + secrectKey)

        const hash = sha1(ts + ":" + JSON.stringify(data) + ":" + secrectKey);

        console.log("hash: " + hash)

        return hash
    }
}

