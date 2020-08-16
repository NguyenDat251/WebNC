const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const config = require('../config/default.json');

module.exports = function (req, res, next) {
  console.log('url: ', req.url);

  if(req.url === '/getOTP' || req.url === '/sendOTPAndNewPassword'){
    console.log("equal 123 123 123");
    next();
    return;
  }

  const token = req.headers['x_accesstoken'];
  if (token) {
    try{
    jwt.verify(token, config.auth.secret, function (err, payload) {
      if (err){
      res.json({
        returnCode: 0,
        message: err.message,
        data: {}
      });

      return;
    }

      req.tokenPayload = payload;
      next();
    })
  }catch(err){
    // console.log("catch: ", err)
    // throw createError(401, err);

    res.json({
      returnCode: 0,
      message: err.message,
      data: {}
    })

    throw createError(401, err);
  }
  } else {
    //throw createError(401, 'No accessToken found.');
    res.json({
      returnCode: 0,
      message: 'No accessToken found',
      data: {
        url: req.url
      }
    });
  }
}
