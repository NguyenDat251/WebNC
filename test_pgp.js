const openpgp = require('openpgp'); // use as CommonJS, AMD, ES6 module or via window.openpgp
 
(async () => {
    //await openpgp.initWorker({ path: 'openpgp.worker.js' }); // set the relative web worker path
 
    // put keys in backtick (``) to avoid errors caused by spaces or tabs
    const publicKeyArmored = `-----BEGIN PGP PRIVATE KEY BLOCK-----
    Version: Keybase OpenPGP v1.0.0
    Comment: https://keybase.io/crypto
    
    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
    =mjkw
    -----END PGP PRIVATE KEY BLOCK-----
    `;
    const privateKeyArmored = `-----BEGIN PGP PUBLIC KEY BLOCK-----
    Version: Keybase OpenPGP v1.0.0
    Comment: https://keybase.io/crypto
    
    xo0EXsFoOQEEALQRCTxvoclzS2wrp18brDPBX/O9UPk6MyybQx2EWwzRagjafGz8
    FA/oNI/F47i15D9oyOHql9CtRYQL3fj88xrQV/TsHlqPl2uPaErQtyAZGavo9BEA
    w5HUgrqURUE1vN4yMTTQehmHqEXP4Sy5jfjPLKRBGDPIQvdVA1JdF1rXABEBAAHN
    KGRhdCAoYSkgPG5ndXllbnF1b2NkYXQyNTExOTk4QGdtYWlsLmNvbT7CrQQTAQoA
    FwUCXsFoOQIbLwMLCQcDFQoIAh4BAheAAAoJENQqVSBzMOKxAhkEAIwbJLBS42HI
    GxMknYz6BFtecrUPQEty3OQi6SZfXfIU6PMOxsz31tdIgwQ9WGKApkvFUop45O5b
    fDLg8WSAua6dyD/aUI7LZGbjS0qsuyEGAsyma8e6Dsmmk64S4d+hLaWetJs7osIt
    MnHRMItVCQliccqGjxrZ3XRF6rNtX4rtzo0EXsFoOQEEAN01p5vHBKlWnsA2TV2f
    Rd4PD2mj6Go+MdMxud26CZhsK2dVQS4RkzDgOolcFUH678gLzF8wlPGzk7UjsJ++
    ZQrJh9kmgFBYjk0HDxMRhoNaY5zHNtafr8d88gIIe6D8qJd1zfcjdBgs9rH6Dzoj
    J4yRkyQIZGJFKI7rbTlZxmYdABEBAAHCwIMEGAEKAA8FAl7BaDkFCQ8JnAACGy4A
    qAkQ1CpVIHMw4rGdIAQZAQoABgUCXsFoOQAKCRCxlDljPWZWoXlHBACh1upq5tm2
    2N95sapHv32mlQyybA+U4WUTsOGz0flKqM0w/Ydd+2b2RTDcH1aGWf6UGhl5X2o4
    N8d8kMDBPxywWdpiNsUq0JfTszUoYvKKW/MrfSgWuSGli+AQ+8CYI80fdHzzpnlw
    oadZrUrsQJxZTy9v+RtHDMeoiyUxxeI1zczLA/9bZbN3alyi4P8Q42clQMMi1oDr
    yP9kzSFD7yaiqpbUBGSdqupxI7/szU09FiC0iroO8NBimsieGNUWxYy4xUEn9gdk
    ZnagXtELER6UxKZMJEjITID2GC2uU0UXZNoJRTaJZncdrGmBkzpPPixOiIiR8QE4
    mox/s2l58qnEc3B7xs6NBF7BaDkBBADb4RqFpAmJPadkdWKKzRSIoZ16ZSf0K2WH
    O5zbHgNfuQug8fUgwQm1iHOKS9DxisgMTQU5YnJeLfItVOZplOGOaHmKCo8mr8UX
    MMyaZrTG1RDfYnD8D3T5ob4vj4BxB934FMRfTKI/oX7CR/mxIa77X7/NmUHPi9EP
    JGdtc9y2HwARAQABwsCDBBgBCgAPBQJewWg5BQkPCZwAAhsuAKgJENQqVSBzMOKx
    nSAEGQEKAAYFAl7BaDkACgkQkbsFnQnaDV4UTAP9GD/dSEE7xmEoahFQyGZHQJsJ
    qbn/tIyJoROyjWHkbrEG4Akqcmra9qq6G2uAujcFc8IAQGa+0SXUDqJCni0k9SWC
    tAdnDAlt9v1AbPftljIjWCR56Q3dBjom1h0ymo60bDXTEf8JhtcRbhQogHVWlBsn
    saGyLMj56w4RwGJQAgfmlQQAqNdhv7F2gC0q6Mc/kzdrttfM0P4K9JrH4+a5cWjW
    yZo/Eg6ACnJlcp962CSaWBHpNKNcGN6xNKe7WE3LqstMnm3Goy3scxOO0neMArwd
    bOyu/8A+UDUTQuHSkGBJj8/e/+BL0Hqw4aVvu4zO3elveqBuE4YZYC58l5zs/JYt
    Nqo=
    =zWOf
    -----END PGP PUBLIC KEY BLOCK-----
    `; // encrypted private key
    const passphrase = `yourPassphrase`; // what the private key is encrypted with
 
    const { keys: [privateKey] } = await openpgp.key.readArmored(privateKeyArmored);
    await privateKey.decrypt(passphrase);
 
    const { data: encrypted } = await openpgp.encrypt({
        message: openpgp.message.fromText('Hello, World!'),                 // input as Message object
        publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys, // for encryption
        privateKeys: [privateKey]                                           // for signing (optional)
    });
    console.log(encrypted); // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
    const { data: decrypted } = await openpgp.decrypt({
        message: await openpgp.message.readArmored(encrypted),              // parse armored message
        publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys, // for verification (optional)
        privateKeys: [privateKey]                                           // for decryption
    });
    console.log(decrypted); // 'Hello, World!'
})();