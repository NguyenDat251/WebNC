const NodeRSA = require('node-rsa');
const openpgp = require('openpgp');

let publicKey = "-----BEGIN PUBLIC KEY-----\
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSHgxSkQ2wHFcV/lxVOZPOemKd\
    ho4Hpl95JSD0kUQE/3WYeroRUeGLNm86s8EWg5tREzLIi2CzJ1Q6fcHvPHjg8Mr/\
    WLU4YvS8h5i1Jk+Kd7lf5VEaWFuAX+bEuQ7qt0TAx07o3HOJDNfG/d6k1rLg346y\
    scQzONE8Ui++wGJM+wIDAQAB-----END PUBLIC KEY-----"

let privateKey = "-----BEGIN RSA PRIVATE KEY-----\
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
    -----END RSA PRIVATE KEY-----"

privateKey = new NodeRSA(privateKey);

publicKey = new NodeRSA(publicKey);

module.exports = {
    checkRSASig: (sig)=>{
        try {
            let res = publicKey.verify("bankdbb", sig, 'utf8', 'hex')

            console.log(res);
            return res;

        } catch (err) {
            console.log("error verify: " + err);
        }
    },
    generateRSASig: ()=>{
        try{
            return sig = privateKey.sign("bankdbb", 'hex', 'utf8');
        } catch(err) {
            console.log("error sig: " + err);
        }
    },
    checkPGPSig: async  ()=>{

        const publicKeyArmored = `-----BEGIN PGP PUBLIC KEY BLOCK-----
        Version: BCPG C# v1.6.1.0
        
        mQENBF7BXO4BCACg5y/A9QREnPlm8MjJ/1cdLM8EwsEoGMmH+99bV6mLut3XBi9u
        OTxuSdkvruCpYsdEhgW0RhhWX59rDzGixHZHo9tq57vQJB/P5jSkap/MR602fmVR
        2g4WAiVWxN7XOyI2SEYFrM2nw7GY5hHVKKGrmSBxAHmxsQeZBm6LzU/2ZA/FJzWv
        Y/GrOyjzmtW587BiYQagVteNw0seUNcZFKwhyXAfWSsRgjaEw09nHCObyCH1IvId
        KOGD6r3Z5b5ZoVVI9PBnSOmqm0lKShYNOkyH55Awf6ZlvKOWA+Rck+qvXVEr9H9S
        grz73w/q3Na8S6hmP757q/HU6lq3kzUvmdg/ABEBAAG0AIkBHAQQAQIABgUCXsFc
        7gAKCRD4olkg7iuWHHSHB/wNtgVOi8L6/GtYX8ultQdHqXI7Tzv2GXDmu9hnvioM
        zx3qAXBrCj2XOAe3RBLV5VSn2Hq/1MpxhfHcrmX2mWqmkb5IsGPqI9XbSV8uRJI6
        r96sxsDxSssRSY10uhEJ+gqMFnOON517iw4TlDKAOHAKEWeM+vV3LB4cTSH4zwVd
        C6AntfSrf6sfAkwoVs4fLl83oqzUmSHe4txppzlJyyy6C5XE4KjA5Rink+mP80Nr
        Tv+dy2NkhitcMK4hJ4JK86VV56YAOdPDCtpWjqv1DTDRFMmxI2FY2x9a2j9WG600
        ZaCxxV0r9uCqaivvs7XrNh+hX9f8+oyPEgv81qGiwcde
        =AFra
        -----END PGP PUBLIC KEY BLOCK-----`;

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
    }
}