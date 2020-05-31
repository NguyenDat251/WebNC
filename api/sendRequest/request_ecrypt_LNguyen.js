const axios = require('axios');
const sha1 = require('sha1')
const sig = require('../api/module/sig.js');
const openpgp = require('openpgp');

publicKeyArmored = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: Keybase OpenPGP v1.0.0
Comment: https://keybase.io/crypto

xsBNBF7E808BCACxinqRPN0uwuMfXw3kBB79tTapTP4rxf93OyBL1U34sZeyw+GE
Wg8exhuapvrcEsFEim+aryLRzKlyVopmeATzOfYoawbLTsXYltt/i/bLo2EJsdHV
SBV5H/nVQBauuAzrY3rkWtB6edD/B+T26Fw90Hn46/5cBS56RwLijNAs40eY2hyd
kSTzXIQtLUmv6WOyH8kHWLEYqovFyWJ66jZywqACOJnkbBhwidEz1/TnSXnkVej5
P0nn14xG5kSv55FUUoEG0OtwL+SEWIfX1lEsgAHUlm7gBm+Is/QZq36ovNtyt+zc
Qt+2evWaEDOa4qbGgkBp2HKqK4e3OV0HG1WvABEBAAHNHU5ndXllbiBOZ3V5ZW4g
PHNhZEBnbWFpbC5jb20+wsBtBBMBCgAXBQJexPNPAhsvAwsJBwMVCggCHgECF4AA
CgkQ3jab8C/mZyIQQwgAk3zKkzjjcEppFKDh56zWJdafEKMUNXJzB01ttEaBYiPt
wRHPRjr508GGKMRQm1yWzK0sajlbONoD0p6xY7sscrsAvsNiiHoL/ykC+wIKu6WX
HJ8HJ68X5WvtQutxEezwizzh8Xb9Z6dxKHt5ECvUUS3WtRNou/Mt/6ia++6boDQS
cI3zGEpIT5UsUzcHU8K0hjGzK9yKCinbtTGCr53DaulsAnfyMYDuN3GGgkEOhxOf
lDlNML+eMD7Coo0DdECET3uGSBKc3FauX8DuFEXqeo6wPMypibHqeGtkpU3pPQDM
tcmDl4t0UqyHKPF8wpg/5lcdY6FRE41CFw/Nf8ZOGc7ATQRexPNPAQgA1DDnnVXq
VLVrE4idQ5baKlBEbPSiUL0zKx38fBg2lfcZzGffqoQlb3e68m/Y5atzaCFpVoEP
GicIRTBGzZkYx2zYeSB5KE1DuUUmjcH/JeacmMDU/1RHbKQ9AQNGLUf7/paVmTHz
crVYMR89QdH240Nb02oq1wBXOYquEOkNiJRYgZ78F4jI5vVSKu9g1wTDBx+6d4MR
sbNT27KD82fnzohLS96CF4EvUr/29QEOpdsqJi++LhSrxIS0TxBJX/VGG6r3gTTK
9eAEG2YBilwfxWOzo0cWn/3tZGqZ9jg/Phpoo+MYq9Xs9Y9RF+NQ2x98QTu8yxLG
MzUEo3RNCGf+LQARAQABwsGEBBgBCgAPBQJexPNPBQkPCZwAAhsuASkJEN42m/Av
5mciwF0gBBkBCgAGBQJexPNPAAoJEDC2jHYjLhcMKZwH/0+DZKnrjI9AmrnW4OgK
y2NPBU70RWbfkaagubF0lXDD3a8foHCaZYDdWL28cFNROQvYqsuA1XZczDUVA9OA
6xLuJhbnWdIDWxaGcsSuG+7hkVFcnax3hPDchKXc4rGl73NSMJa41OS3uaiInsEg
w/RezeM+uTvX51gLdsOZvQHck6u/YAYcSi9cdkR2lrlFEztFLqasVajjU8vqUt1I
a/Jzy6PDvuBXKJUhkQk7A48l+rhqhgleLi3UdCHTTswTOEYh3YZSk5eDiQ5mW0hp
TqYKC3q9YWjxbjoHRLb/3BWOyfZ1edrIwA6st3DHIyiwXmNvkMkY7liPREX0DUxA
6rHDDwf7BqnwyFUvZSFICwfr3meNVCHflW5CFpRLGFUr2GRiuigElpxbZMlh8rSz
DbpzUR5HZQ0vudlDNjg8Ua9QQ9g86+ujxQASGyEkIx5Egox0LYAypKVyQqwgd0dL
v0+OvVt+NcGYlItSZu9asvHPrBVQa2hleDhAv/dVmwHzJaTSn5KYHqZuP1rWVEfZ
8G7/cJ9KhkaxniRrvh1YvVP3ph/lbEosZdBvBeFeAs6/0DllqmoMepYUOY236fhF
HGLeWxKa0zGZvoOOZHhz5kqKgNKOyEcwq3yhplvlwGulP8h20ZE5nlABQY/LD9UA
Inj3AAygUVabp8JiybwEYRi0M28qIM7ATQRexPNPAQgAszW6+bkNuosUxMkUennw
KHvAHo3d5gGD0NsNLX3mbDvxgocYYEokXhif5rGJ6kGyTUMnXsg0zMduK/NMhbjw
yU16/gEJExB2HGsES0N+jVL73rePCdO5Xyn7fI02yw2OCa3r1sby8Y+lHAulAIlD
fO46qjTsY8Vy3QalJrZQ2SsILvr2uqXD4vyXCU61VamM1TQXWZ7U9CAyOMvG5/ku
1gwMrkW1P7jaN0iwjvO5FBvqj73nukB2wM8qU0Y12e5McUfQlXQQyNYsNhKwJeRf
1ukyR/etSX83ACdV6kjtFs5W9IlTcdp9n+L2Uj0WlDQgabrhfZ/jW8JfKul75Hu3
4wARAQABwsGEBBgBCgAPBQJexPNPBQkPCZwAAhsuASkJEN42m/Av5mciwF0gBBkB
CgAGBQJexPNPAAoJEFDhIdCC011bmjwH/jD8vnI5pbGap1rv85qeIqLI/4i3tS8S
z3QlsAhLiKIZYHJSwakhDx5TrlYd0y6dkwNz4l3bSxGpC3L54Z9D4PRN7Ta8+Xov
69WPc3QVyDDO5yrihEPDRHEcuQUs1nUO9BIOgkk9wSEvRmkYMzaEfs/LvaxlbQ1M
7qdFeLloML3feqayWz/dprkSCBpxuwTjVSWsFKSRc3c1kqwJKrVmC906PP77vQ76
QrzNvaln7Z1ydeDSDQoxxzBfD65qaTW1HdqXMAgF1Z737rGYqcFL6uHr1ekVH9eb
/LujGqt3dh1AvyVfvJwLf5GTfQY7ste4p5OU0LzotzGCHChJHRODzwrnXgf/eTlC
A8+7SGEpaKTRcdukt/bCJc1RTzsFv4z7lo3BsgegnpJRxcecrPrVwkrmpkiSVHxf
uQmoi9f+Xjb7lOr6oC5p7pkXM5O5a5mWqxfznvVS8Yo7Nh9DgB/ofWlz1ujEgLK0
Pqn7jfPpBpSDzDFRK+t7GgJa1GeQiXqkbTghgpDCb6no0PVl4D2418xurpDDWV6+
A6pN1nNqST9DUku1NJlNmlvU3INNZ30+KiOLqER1zMibyKm4O2LzVKsq0U5BKSKx
aF3Wf+6bME92QZ6aDOq+AEBqeV0FUkrjNUbLI6QFG6xzeC+akTv7MlZTwasYfagi
u5RMN8INapOvye5lCw==
=JFcr
-----END PGP PUBLIC KEY BLOCK-----
`

MyPublicKeyArmored = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v4.10.4
Comment: https://openpgpjs.org

xjMEXsn04xYJKwYBBAHaRw8BAQdAwxg6ctLdm9IrOUmzcbBPUwRU8V+ca197
NTWgOOJ5KnDNFURhdCA8ZGF0QGV4YW1wbGUuY29tPsJ4BBAWCgAgBQJeyfTj
BgsJBwgDAgQVCAoCBBYCAQACGQECGwMCHgEACgkQUSO1qdbrbvSm8AD/UqgB
LaFjKU7ye4rA8fb0hNO7W1Ilu8Udt1vS0ISmviABAOt1xnlRljT5cq3lygqG
l3MeTyVC5Pz3QsnWe6++lvIEzjgEXsn04xIKKwYBBAGXVQEFAQEHQOfY9rio
QDtpTo7T2UmEowCnC/dgThHxtwmZp5XNyx9xAwEIB8JhBBgWCAAJBQJeyfTj
AhsMAAoJEFEjtanW6270dNcA/09BblFcqBMs+MFE8YAGXOVN7Ysh7cPK2dli
sLuyVKJEAQCxhh5PE57Aln7CKnfnEZkfzfoz5ZJ0CIRuI4LPnoWJDw==
=Vcfd
-----END PGP PUBLIC KEY BLOCK-----`

const MyprivateKeyArmored = "-----BEGIN PGP PRIVATE KEY BLOCK-----\r\nVersion: OpenPGP.js v4.10.4\r\nComment: https://openpgpjs.org\r\n\r\nxYYEXso1rxYJKwYBBAHaRw8BAQdAqSXrVzJJez3AGH8gfHbBG/W5X0Q0PFvP\r\nMvAGqONsHWL+CQMIxsjxgYYdsErgw45Nsg7nqrjgVljo1oXGvDVERKqG1TV9\r\nMpEeKrKMWzq78KzZ5zIhRsBLFmCF4tcZ3WwKkf2lSBCFojAl+dqKLpxUZadC\r\nM80VRGF0IDxkYXRAZXhhbXBsZS5jb20+wngEEBYKACAFAl7KNa8GCwkHCAMC\r\nBBUICgIEFgIBAAIZAQIbAwIeAQAKCRAOCtTn3AR86FRTAQDDO8a9BgYaPyvH\r\n/Ypo+z7VBKbLYFpFLiVJc08SOw3yNQD/U+gqgUkNeDnteaVrIl5NWgOhui+O\r\n527DWWSQZ+wpjAHHiwReyjWvEgorBgEEAZdVAQUBAQdAJGwYTEttZP/2WIzL\r\naCzGDnVCK5poSo1KM0j9/DoNnDQDAQgH/gkDCH7hOb+pgUXo4KOpK9wrCZpP\r\n9slYMWcxlHWobqI0alaYQz7SEHNNQGJVTACibaXSmnhpiLYlzYGzartERHaH\r\n7ibxEQVR6Ph/ZUFl91FnAjbCYQQYFggACQUCXso1rwIbDAAKCRAOCtTn3AR8\r\n6Pl8AQCzoWtlGPs3crIoCTagg1bnOM5zRr3FanBmNB/VLqdL9gD/X2+bPnzj\r\nZfRY+kAOlJvZWirSjS8Be7JHDbE6awC+fQc=\r\n=556r\r\n-----END PGP PRIVATE KEY BLOCK-----\r\n"
const passphrase = `yourPassphrase`;

async function createEncrypt(data) {
    // privateKey = await openpgp.key.readArmored(privateKeyArmored);
    // await privateKey.decrypt(passphrase);

    const {
        data: encrypted
    } = await openpgp.encrypt({
        message: openpgp.message.fromText(data), // input as Message object
        publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys, // for encryption
        // privateKeys: [privateKey]                                           // for signing (optional)
    });
    console.log(encrypted); // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'

    return encrypted
}


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

//createEncrypt('thisisatokenfroma')

//string result =  signPGP()

let time = Math.floor(Date.now() / 1000);
//let sign = signPGP()
let sign = "";
// (async () => {
//     sign = await signPGP();
//     console.log("sign" ,sign)
// })();
signPGP().then(x => {
    console.log("buffer: ", new Buffer.from(x).toString('base64'))

    return axios.post('http://16754b80.ngrok.io/api/account/money', {}, {
            headers: {
                csi: sha1(time + JSON.stringify({}) + 'thisisatokenfroma'),
                partnerCode: 'rsa-bank',
                timestamp: time,
                detachedSignature: new Buffer.from(x).toString('base64')
            }
        })
        .then(response => {

            console.log("response: ");
            console.log(response)
        })
        .catch(error => {
            console.log(error);
        });
})
console.log("time: " + time)
console.log("before hash: " + time + JSON.stringify({}) + 'thisisatokenfroma')
console.log("detachedSignature: " + sign)
// axios.post('http://16754b80.ngrok.io/api/account/money', {}, {
//         headers: {
//             csi: sha1(time + JSON.stringify({}) + 'thisisatokenfroma'),
//             partnerCode: 'rsa-bank',
//             timestamp: time,
//             detachedSignature: sign
//         }
//     })
//     .then(response => {
//         //     if(response.data.returnCode == ''){

//         //       console.log(response.data.returnMessage)


//         //   }else {
//         //     console.log(response.data.data);
//         //   }

//         console.log(response.data)
//     })
//     .catch(error => {
//         console.log(error);
//     });