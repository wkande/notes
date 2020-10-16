console.info('\n/*-------------------------*/');
console.info('  -> STARTING NOTES');
if(!process.env.NODE_ENV){
  console.info('  -> DEVELOPMENT MODE');
  require('dotenv').config();
}
console.info('/*-------------------------*/\n');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const js2xmlparser = require("js2xmlparser");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var notesRouter = require('./routes/notes');
const debug = require('debug')('notes:app');
var app = express();




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user', usersRouter);
app.use('/notes', notesRouter);

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

    // ip
    var ip = req.headers['x-forwarded-for'] || 
      req.connection.remoteAddress || 
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null);

    console.group('\n--> GLOBAL ERROR HANDLER <--');

    console.error('res.statusCode', res.statusCode);
    console.error('ip', ip);

    // Has stack trace
    if(err.stack){
        console.log('HAS STACK TRACE');
        let e = {message:null, location:null};
        e.message = err.stack.split("\n")[0].trim();
        e.location = err.stack.split("\n")[1].trim();
        e.ip = ip;

        if(req.get("accept").toLowerCase() === 'application/xml'){
          res.type('application/xml');
          res.status(res.statusCode).send(js2xmlparser.parse("error",e));
        }
        else{
          res.type('application/json');
          res.status(res.statusCode).send(e);
        }
        console.error(e);
    }
    // No stack trace
    else {
        console.log('NO STACK TRACE');
        err.ip = ip;
        if(req.get("accept").toLowerCase() === 'application/xml'){
          res.type('application/xml');
          res.status(res.statusCode).send(js2xmlparser.parse("error",err));
        }
        else{
          res.type('application/json');
          res.status(res.statusCode).send(err);
        }
        console.error(err);
    }
    console.groupEnd();
    console.error();
  }
  catch(err){
      res.type('text/plain');
      res.status(500).send({message:"Issue at Global Error handler.", error:err.toString(), ip:ip});
  }
});

module.exports = app;
