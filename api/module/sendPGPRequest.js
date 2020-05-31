const openpgp = require('openpgp'); // use as CommonJS, AMD, ES6 module or via window.openpgp
var fs = require('fs');

let privateKeyArmored = "";
let publicKeyArmored = "";

// (async () => {
//   console.log("read key")

//   await new Promise((resolve, reject) => {
//     fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data) {
//       if (err) {
//         console.log(err);
//       } else {
//         obj = JSON.parse(data); //now it an object
//         console.log( obj["private"])
//         privateKeyArmored = obj["private"];
//         publicKeyArmored = obj["public"];

//         resolve(true);
//       }
//     });
//   })
// })();


// console.log(privateKeyArmored)

async function  getPGPKeys () {
  /*----generate keys---*/
  const { privateKeyArmored, publicKeyArmored, revocationCertificate } = await openpgp.generateKey({
      userIds: [{ name: 'Dat', email: 'dat@example.com' }], // you can pass multiple user IDs
      curve: 'ed25519',                                           // ECC curve name
      passphrase: 'yourPassphrase'           // protects the private key
  });
  /*-----------------------*/

  console.log(publicKeyArmored);

  /*------Write file---------*/
  let json = JSON.stringify({
      private: privateKeyArmored,
      public: publicKeyArmored
  });

  fs.writeFile('myjsonfile.json', json, 'utf8', function cb(){});
  /*-----------------------*/

  // await new Promise((resolve, reject) => {
  //   fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       obj = JSON.parse(data); //now it an object

  //       privateKeyArmored = obj["private"];
  //       publicKeyArmored = obj["public"];

  //       resolve(true);
  //     }
  //   });
  // })

}

getPGPKeys()

module.exports = {
  

  encrypt: async(data) => {

    await getPGPKeys();

    data =  JSON.stringify(data);

    const passphrase = `yourPassphrase`; // what the private key is encrypted with
 
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
        privateKeys: [privateKey]                                           // for decryption
    });
    console.log(decrypted); // 'Hello, World!'
  }
}

