const crypto = require('crypto');

const githubKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCEUZJwvTYorustQY+F3iqhJe+M
+vk10V1gd+tXAT5eQ6Bfx/EOEEoFiwnH/I5KmRx3D3a2GHgWYILDnCVo5Kn6HH/R
Iuvi11rlvK5C798WYRjvNkOlcfI3M6ixQf+fAJSnflOqCcoPp/RM0HgcywoTkNWK
PQYpPpk9tno/qlOcwwIDAQAB
-----END PUBLIC KEY-----`

const myKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCEUZJwvTYorustQY+F3iqhJe+M
+vk10V1gd+tXAT5eQ6Bfx/EOEEoFiwnH/I5KmRx3D3a2GHgWYILDnCVo5Kn6HH/R
Iuvi11rlvK5C798WYRjvNkOlcfI3M6ixQf+fAJSnflOqCcoPp/RM0HgcywoTkNWK
PQYpPpk9tno/qlOcwwIDAQAB
-----END PUBLIC KEY-----`


function RSASign(privateKey, data) {
  const sign = crypto.createSign('RSA-SHA256')
  const signature = sign.update(data).sign(privateKey, 'base64');
  console.log(signature);
  return signature;
}

function RSAVerify(publicKey, signature, data) {
  const verify = crypto.createVerify('RSA-SHA256');
  verify.update(data);
  console.log(verify.verify(publicKey, signature, 'base64'));
}

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
const publicKey = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHvGfCrOsLPolKTOprqzguNp85gk
Gdh/wbCBtXBtX7ObMSPqBN0aFgijRfn0NKolIn0ievEiab82ttBO57FGgNWG+fm/
CqX72dOpit9A5WqdwKY5iI/0yO+WNMtJqLwJ5qs/Cp0EwFAbqMh/4Uxsyaiw029h
X2IJEdW8oYb+0mwPAgMBAAE=
-----END PUBLIC KEY-----`;

const timestamp = 1594742802;
const  secret = "Tj0xYDEDiQF9f2GYCxSv";
const body = {
  credit_number: "565572661049",
  amount: 200000
}

const dataToSign = timestamp + secret + JSON.stringify(body);
const signature = RSASign(privateKey, dataToSign);
RSAVerify(publicKey, signature, dataToSign);