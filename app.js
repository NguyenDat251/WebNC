// const express = require('express')
// const app = express()
// const bodyParser = require('body-parser')
// require('dotenv').config()
// const port = process.env.PORT || 8080
// const urlClient = process.env.URL_CLIENT || 'http://localhost:3000'

// app.use(bodyParser.json())

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", urlClient);
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
//   next();
// });

// app.use('/api/auth', require('./routes/auth.route'));
// app.use('/api/users', require('./routes/user.route'));
// app.use('/api/categories', verify, require('./routes/category.route'));
// app.use('/api/products', verify, require('./routes/product.route'));


// //let routes = require('./api/routes') 
// //routes(app)

// app.listen(port)

// console.log('RESTful API server started on: ' + port)


const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userModel = require('./models/user.model.js');

require('dotenv').config()

require('express-async-errors');

const verify = require('./middlewares/auth.mdw');

const app = express();
// CORS fixed
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
//app.use(morgan('dev'));

app.use(express.json());

// app.get('/', (req, res) => {
//   res.json({
//     msg: 'hello from nodejs express api'
//   });
// })





app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/users', verify, require('./routes/user.route'));
app.use('/api/staff', verify, require('./routes/staff.route'));
app.use('/api/money', verify, require('./routes/money.route'));

app.use('/api/moneyAccount', verify, require('./routes/moneyAccount.route'));

app.use('/api/debt-reminder/', verify, require('./routes/debt-reminder.route'));
app.use('/api/recipient/', verify, require('./routes/recipient.route'));
app.use('/api/partner-bank/', require('./routes/partnerBank.route'));

setInterval(function(){ userModel.deleteOTP() }, 3000);


// app.use('/api/categories', verify, require('./routes/category.route'));
// app.use('/api/products', verify, require('./routes/product.route'));

app.use((req, res, next) => {
  res.status(404).send('NOT FOUND');
  //res.status(401).send("abc");
})

app.use(function (err, req, res, next) {
  console.log(err.stack);
  // console.log(err.status);
  const statusCode = err.status || 500;
  //res.status(statusCode).send('View error log on console.');
})

//module.exports = app;

const PORT = process.env.PORT || 8000;
app.listen(PORT, _ => {
  console.log(`API is running at http://localhost:${PORT}`);
})