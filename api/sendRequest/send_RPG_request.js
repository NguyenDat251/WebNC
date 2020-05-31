const openpgp = require('openpgp'); // use as CommonJS, AMD, ES6 module or via window.openpgp
var fs = require('fs');

let privateKeyArmored = "-----BEGIN PGP PRIVATE KEY BLOCK-----\r\nVersion: OpenPGP.js v4.10.4\r\nComment: https://openpgpjs.org\r\n\r\nxYYEXsn4MBYJKwYBBAHaRw8BAQdAkIK3f3JYjRZcLgcxXqSDliCcwg1imb3S\r\nF2aq8TquEjX+CQMIIYWmIqwLvYvgOMx496vRmXoUgnwf7M3bXTmmKx8W7nHV\r\ncS4DO2VxxLLvSbyilFJSObHXletHIbmY2OltU0Mrclkhj+6oLzRKbGClXO2R\r\nqc0VRGF0IDxkYXRAZXhhbXBsZS5jb20+wngEEBYKACAFAl7J+DAGCwkHCAMC\r\nBBUICgIEFgIBAAIZAQIbAwIeAQAKCRDjn7HaNrpADEvfAQD//xB9YWV0I2xM\r\nwjh1vZPIqQMo3kq0GgHvSLoUo+qdWQD/bxPkhP/Hi0pacdVtDvz4G3vgOJU6\r\nquXpnUkbzLCDiADHiwReyfgwEgorBgEEAZdVAQUBAQdAuD3+QU0T/qx1fB7E\r\nl1GSXdjXQfXXZyKYerSF3cA/wx8DAQgH/gkDCKu1srN4hjg04IiIrcG0QMb8\r\nJ6N3qMyToJuVJdkrUwH6Qt0djdeiANpSZR3PRLIAD4PawiiPYmZ1wIySFfgB\r\nF7CbownNMhCNgaDXGe1gyoLCYQQYFggACQUCXsn4MAIbDAAKCRDjn7HaNrpA\r\nDBkGAP9+3/pdJ2QkQreThB0JWNrpNiwdmgz1+atrkCkxs+6lLwEA2RINgWun\r\nWb/GGhWhizTCtX+2QfOjHtLBQ0+NW79ChA4=\r\n=xPBh\r\n-----END PGP PRIVATE KEY BLOCK-----\r\n";
let publicKeyArmored = "-----BEGIN PGP PUBLIC KEY BLOCK-----\r\nVersion: OpenPGP.js v4.10.4\r\nComment: https://openpgpjs.org\r\n\r\nxjMEXsn4MBYJKwYBBAHaRw8BAQdAkIK3f3JYjRZcLgcxXqSDliCcwg1imb3S\r\nF2aq8TquEjXNFURhdCA8ZGF0QGV4YW1wbGUuY29tPsJ4BBAWCgAgBQJeyfgw\r\nBgsJBwgDAgQVCAoCBBYCAQACGQECGwMCHgEACgkQ45+x2ja6QAxL3wEA//8Q\r\nfWFldCNsTMI4db2TyKkDKN5KtBoB70i6FKPqnVkA/28T5IT/x4tKWnHVbQ78\r\n+Bt74DiVOqrl6Z1JG8ywg4gAzjgEXsn4MBIKKwYBBAGXVQEFAQEHQLg9/kFN\r\nE/6sdXwexJdRkl3Y10H112cimHq0hd3AP8MfAwEIB8JhBBgWCAAJBQJeyfgw\r\nAhsMAAoJEOOfsdo2ukAMGQYA/37f+l0nZCRCt5OEHQlY2uk2LB2aDPX5q2uQ\r\nKTGz7qUvAQDZEg2Ba6dZv8YaFaGLNMK1f7ZB86Me0sFDT41bv0KEDg==\r\n=ZPES\r\n-----END PGP PUBLIC KEY BLOCK-----\r\n";

let privateKey = null;

const passphrase = `yourPassphrase`;

  async function encrypt(data) {

    data =  JSON.stringify(data);

     // what the private key is encrypted with
 
    const { keys: [privateKey] } = await openpgp.key.readArmored(privateKeyArmored);
    await privateKey.decrypt(passphrase);
 
    const { data: encrypted } = await openpgp.encrypt({
        message: openpgp.message.fromText(data),                 // input as Message object
        publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys, // for encryption
        // privateKeys: [privateKey]                                           // for signing (optional)
    });
    console.log(encrypted); // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
    const { data: decrypted } = await openpgp.decrypt({
        message: await openpgp.message.readArmored(encrypted),              // parse armored message
        // publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys, // for verification (optional)
        privateKeys: [privateKey]                                          // for decryption
    });
    console.log(decrypted); // 'Hello, World!'
  }

 async function createEncrypt(data){
    privateKey = await openpgp.key.readArmored(privateKeyArmored);
    await privateKey.decrypt(passphrase);
 
    const { data: encrypted } = await openpgp.encrypt({
        message: openpgp.message.fromText(data),                 // input as Message object
        publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys, // for encryption
        // privateKeys: [privateKey]                                           // for signing (optional)
    });
    console.log(encrypted); // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
   
    return encrypted
 } 

encrypt("abc")
