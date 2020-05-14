const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env.PORT || 3000
const urlClient = process.env.URL_CLIENT || 'http://localhost:3000'

app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", urlClient);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
  next();
});

let routes = require('./api/routes') 
routes(app)

app.listen(port)

console.log('RESTful API server started on: ' + port)