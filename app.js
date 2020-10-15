var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const js2xmlparser = require("js2xmlparser");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const debug = require('debug')('notes:app');


if(!process.env.NODE_ENV){
  console.log('-> DEV MODE <-');
  require('dotenv').config();
}

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user', usersRouter);

console.log('NODE_ENV ->', process.env.NODE_ENV);
console.log('EMAIL_PSWD ->', process.env.EMAIL_PSWD);
console.log('JWT_SECRET ->', process.env.JWT_SECRET);

/**
 * Global Error Handler
 */
app.use(function(err, req, res, next) {
  try{
    // If the default 2xx codes are present convert to 500.
    // "Throws" should be sending a none 2xx code.
    if (res.statusCode < 300){
      res.status(500);
    }

    debug('---- Global Error Handler-----');
    debug('res.statusCode', res.statusCode);
    debug(err);

    if (req.get("accept").toLowerCase() === 'application/xml'){
      res.type('application/xml');
      res.status(res.statusCode).send(js2xmlparser.parse("error",err));
    }
    else{
      res.type('application/json');
      res.status(res.statusCode).send({error:err.toString()});
    }
  }
  catch(err){
      res.type('text/plain');
      res.status(500).send({msg:"Issue at Global Error handler.", error:err.toString()});
  }
});

module.exports = app;
