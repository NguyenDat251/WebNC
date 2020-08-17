const sha1 = require('sha1');
const openpgp = require('openpgp');
const passphrase = `yourPassphrase`;
const Info = require('../../config/partner').getInfo();
//const MyprivateKeyArmored = "-----BEGIN PGP PRIVATE KEY BLOCK-----\r\nVersion: OpenPGP.js v4.10.4\r\nComment: https://openpgpjs.org\r\n\r\nxYYEXso1rxYJKwYBBAHaRw8BAQdAqSXrVzJJez3AGH8gfHbBG/W5X0Q0PFvP\r\nMvAGqONsHWL+CQMIxsjxgYYdsErgw45Nsg7nqrjgVljo1oXGvDVERKqG1TV9\r\nMpEeKrKMWzq78KzZ5zIhRsBLFmCF4tcZ3WwKkf2lSBCFojAl+dqKLpxUZadC\r\nM80VRGF0IDxkYXRAZXhhbXBsZS5jb20+wngEEBYKACAFAl7KNa8GCwkHCAMC\r\nBBUICgIEFgIBAAIZAQIbAwIeAQAKCRAOCtTn3AR86FRTAQDDO8a9BgYaPyvH\r\n/Ypo+z7VBKbLYFpFLiVJc08SOw3yNQD/U+gqgUkNeDnteaVrIl5NWgOhui+O\r\n527DWWSQZ+wpjAHHiwReyjWvEgorBgEEAZdVAQUBAQdAJGwYTEttZP/2WIzL\r\naCzGDnVCK5poSo1KM0j9/DoNnDQDAQgH/gkDCH7hOb+pgUXo4KOpK9wrCZpP\r\n9slYMWcxlHWobqI0alaYQz7SEHNNQGJVTACibaXSmnhpiLYlzYGzartERHaH\r\n7ibxEQVR6Ph/ZUFl91FnAjbCYQQYFggACQUCXso1rwIbDAAKCRAOCtTn3AR8\r\n6Pl8AQCzoWtlGPs3crIoCTagg1bnOM5zRr3FanBmNB/VLqdL9gD/X2+bPnzj\r\nZfRY+kAOlJvZWirSjS8Be7JHDbE6awC+fQc=\r\n=556r\r\n-----END PGP PRIVATE KEY BLOCK-----\r\n"
const MyprivateKeyArmored = Info["bankdbb"].privatePGPKey;

const time = Math.floor(Date.now() / 1000);
//const time = 1597677671;
const body = {
  fromAccountNumber: 123,
  amount: 100000,
  content: "Tra no",
  toAccountNumber: 449909617
}
const strBody = JSON.stringify(body);
//const strBody = '1597677671{"fromAccountNumber":123,"amount":100000,"content":"Tra no","toAccountNumber":449909617}thisisatokenfroma';

const hash = sha1(time + strBody + 'thisisatokenfroma');
//const hash = sha1(strBody);

async function signPGP() {

  const {
    keys: [privateKey]
  } = await openpgp.key.readArmored(MyprivateKeyArmored);
  await privateKey.decrypt(passphrase);

  const {
    signature: cleartext
  } = await openpgp.sign({
    message: openpgp.cleartext.fromText('thisisatokenfroma'), // CleartextMessage or Message object
    privateKeys: [privateKey], // for signing,
    detached: true
  });
  return Promise.resolve(cleartext)
}

let sig = '';

const sendMoneyPGP = (async () => {
  console.log("send money");
  await signPGP().then(x => {
    console.log("buffer: ", new Buffer.from(x).toString('base64'))

    sig = new Buffer.from(x).toString('base64');

    console.log('sig: ', sig);

    // return axios.post('http://55a363d49088.ngrok.io/api/account/money', {
    //     fromAccountNumber: 123,
    //     amount: 100000,
    //     content: "Tra no",
    //     toAccountNumber: 449909617
    //   }, {
    //     headers: {
    //       csi: sha1(time + JSON.stringify({}) + 'thisisatokenfroma'),
    //       partnerCode: 'rsa-bank',
    //       timestamp: time,
    //       detachedSignature: new Buffer.from(x).toString('base64')
    //     }
    //   })
    //   .then(response => {

    //     console.log("response: ");
    //     console.log(response)

    //     return response.data
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  })
})();

console.log('time: ', time);
console.log('hash: ', hash);