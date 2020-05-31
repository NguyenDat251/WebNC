const openpgp = require('openpgp'); // use as CommonJS, AMD, ES6 module or via window.openpgp
 const fs = require('fs');
// import * as openpgp from 'openpgp';

(async () => {

    // import * as openpgp from 'openpgp';
    //await openpgp.initWorker({ path: 'openpgp.worker.js' }); // set the relative web worker path
 
    // put keys in backtick (``) to avoid errors caused by spaces or tabs
    // const privateKeyArmored = `-----BEGIN PGP PRIVATE KEY BLOCK-----
    // Version: OpenPGP.js v4.10.4
    // Comment: https://openpgpjs.org
    
    // xYYEXsH7fBYJKwYBBAHaRw8BAQdABgDpmyBu5KfjLcSPH5VYyd0mOcFdKGK1
    // VIzDjEBq/BD+CQMIRP5o5Sgqz33g3t+66iUJ37NTG97MuJ3XIzy8z98JlcoW
    // NUsG8nLjVnNsrq3owLuJGvidj2UjcY+nkTRFGrLJec4LuEcaEflnLH6VyDkY
    // ps0bSm9uIFNtaXRoIDxqb25AZXhhbXBsZS5jb20+wngEEBYKACAFAl7B+3wG
    // CwkHCAMCBBUICgIEFgIBAAIZAQIbAwIeAQAKCRAk6Rmj2eHbkrLJAQCZOSYK
    // J2+eCUs0owdlB34miH3DqWNHeDQyLOV7pU0B9AD8CKplfbGymgdnepnNrbAt
    // GJW53UbL4MeJz/hk8meH/gDHiwRewft8EgorBgEEAZdVAQUBAQdAD9Q3pgQd
    // kgykKeYT0/GcM1p/qN9ZpYdEx1ENJFdieBgDAQgH/gkDCJ6fBrWsg4Od4FK3
    // yrLuUmw5e7lgyhPlbJT01j+1fiwHtouDN8znN/SWxr98F31aRoRAwzAyJ9CU
    // tRWleKVzY+KveN+xsX3rO0YSdG4u+IvCYQQYFggACQUCXsH7fAIbDAAKCRAk
    // 6Rmj2eHbktCYAQCiFptLHDDu0APQTwlwWV/oau5MdcbVR+UCuIYSiwmDFwD/
    // eq3Db4RHPRqrFDCIbPH48umid4p9wkhdPyrw+uDdqQE=
    // =1C2F
    // -----END PGP PRIVATE KEY BLOCK-----`;
    // const publicKeyArmored= `-----BEGIN PGP PUBLIC KEY BLOCK-----
    // Version: OpenPGP.js v4.10.4
    // Comment: https://openpgpjs.org
    
    // xjMEXsH7fBYJKwYBBAHaRw8BAQdABgDpmyBu5KfjLcSPH5VYyd0mOcFdKGK1
    // VIzDjEBq/BDNG0pvbiBTbWl0aCA8am9uQGV4YW1wbGUuY29tPsJ4BBAWCgAg
    // BQJewft8BgsJBwgDAgQVCAoCBBYCAQACGQECGwMCHgEACgkQJOkZo9nh25Ky
    // yQEAmTkmCidvnglLNKMHZQd+Joh9w6ljR3g0Mizle6VNAfQA/AiqZX2xspoH
    // Z3qZza2wLRiVud1Gy+DHic/4ZPJnh/4AzjgEXsH7fBIKKwYBBAGXVQEFAQEH
    // QA/UN6YEHZIMpCnmE9PxnDNaf6jfWaWHRMdRDSRXYngYAwEIB8JhBBgWCAAJ
    // BQJewft8AhsMAAoJECTpGaPZ4duS0JgBAKIWm0scMO7QA9BPCXBZX+hq7kx1
    // xtVH5QK4hhKLCYMXAP96rcNvhEc9GqsUMIhs8fjy6aJ3in3CSF0/KvD64N2p
    // AQ==
    // =a2xR
    // -----END PGP PUBLIC KEY BLOCK-----`; // encrypted private key


    // const { privateKeyArmored, publicKeyArmored, revocationCertificate } = await openpgp.generateKey({
    //     userIds: [{ name: 'Jon Smith', email: 'jon@example.com' }], // you can pass multiple user IDs
    //     curve: 'ed25519',                                           // ECC curve name
    //     passphrase: 'super long and hard to guess secret'           // protects the private key
    // });
 
    // console.log(privateKeyArmored);     // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
    // console.log(publicKeyArmored);      // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
    //console.log(revocationCertificate); // '-----BEGIN PGP PUBLIC KEY BLOCK ... '

    // let privateKeyArmored, publicKeyArmored

//     await new Promise((resolve, reject) => { 
//         fs.readFile('pgp/private', function read(err, data) {
//         if (err) {
//             throw err;
//         }
//         privateKeyArmored = data;

//         resolve(true);
//     });

// })

let privateKeyArmored, publicKeyArmored

await new Promise((resolve, reject) => { 
    fs.readFile('pgp/private', function read(err, data) {
    if (err) {
        throw err;
    }
    privateKeyArmored = data;

    resolve(true);
});

})

    await new Promise((resolve, reject) => { 
        fs.readFile('pgp/public', function read(err, data) {
        if (err) {
            throw err;
        }
        publicKeyArmored = data;

        resolve(true);
    });
   
})


    console.log(privateKeyArmored);     // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
    console.log(publicKeyArmored);  


    // const passphrase = `super long and hard to guess secret`; // what the private key is encrypted with
 
    // const { keys: [privateKey] } = await openpgp.key.readArmored(privateKeyArmored);
    // await privateKey.decrypt(passphrase);
 
    
        const passphrase = `super long and hard to guess secret`; // what the private key is encrypted with
     
        const { keys: [privateKey] } = await openpgp.key.readArmored(privateKeyArmored);
        await privateKey.decrypt(passphrase);
     
        const { data: cleartext } = await openpgp.sign({
            message: openpgp.cleartext.fromText('Hello, World!'), // CleartextMessage or Message object
            privateKeys: [privateKey]                             // for signing
        });
        //console.log(cleartext); // '-----BEGIN PGP SIGNED MESSAGE ... END PGP SIGNATURE-----'
     
        const verified = await openpgp.verify({
            message: await openpgp.cleartext.readArmored(cleartext),           // parse armored message
            publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys // for verification
        });
        const { valid } = verified.signatures[0];
        if (valid) {
            console.log('signed by key id ' + verified.signatures[0].keyid.toHex());
        } else {
            throw new Error('signature could not be verified');
        }
    
})();