const express = require('express');
const jwt = require('jsonwebtoken');
const randToken = require('rand-token');
// const jwt_decode = require('jwt-decode');
const createError = require('http-errors');

const authModel = require('../models/auth.model');
const userModel = require('../models/user.model');

const config = require('../config/default.json');
const {encodeWalletId,decodeWalletId} = require('../middlewares/convertWalletId.mdw')
const router = express.Router();

/**
 * login
 */

router.post('/login', async (req, res) => {
  // req.body = {
  //   "user": "admin",
  //   "pwd": "admin"
  // }

  const ret = await authModel.login(req.body);
  if (!ret.boolean) {
    return res.json({
      returnCode: 0,
      message: ret.message,
      data: {}
    })
  }

  console.log("data login: ", JSON.stringify(ret))

  const userId = ret.data.id;
  console.log("userId: ", userId)
  
  const accessToken = generateAccessToken(ret.data);

  const refreshToken = randToken.generate(config.auth.refreshTokenSz);
  await userModel.updateRefreshToken(userId, refreshToken);

  res.json({
    // authenticated: true,
    returnCode: 1,
    message: "Login successful",
    data: {
      accessToken,
      refreshToken
    }
  })
})

/**
 * refresh token
 */

router.post('/refresh', async (req, res) => {
  // req.body = {
  //   accessToken,
  //   refreshToken
  // }

  // const { userId } = jwt_decode(req.body.accessToken);
  jwt.verify(req.body.accessToken, config.auth.secret, { ignoreExpiration: true }, async function (err, payload) {
    const { userId } = payload;
    const ret = await userModel.verifyRefreshToken(userId, req.body.refreshToken);
    if (ret === false) {
      throw createError(400, 'Invalid refresh token.');
    }

    const accessToken = generateAccessToken(userId);
    res.json({ accessToken });
  })
});

const generateAccessToken = params => {
  console.log('params:', params)
  params.walletId = encodeWalletId(params.Number);
  const payload = { userId: params.id, role: params.role,username:params.username,walletId:params.walletId,Number:params.Number,balance:params.Money, email: params.email,name:params.name,dob:params.dob,phone:params.phone };
  const accessToken = jwt.sign(payload, config.auth.secret, {
    expiresIn: config.auth.expiresIn
  });

  return accessToken;
}

module.exports = router;