var express = require('express');
var router = express.Router();
const js2xmlparser = require("js2xmlparser");
const debug = require('debug')('notes:users');
//const { token } = require('morgan');
var nodemailer = require('nodemailer');
//const notes  = require('../libs/models').notes;
const Note  = require('../libs/models').Note;
const tokens = require("../libs/tokens");
const storeNote  = require('../libs/models').storeNote;
const getNotes  = require('../libs/models').getNotes;


// XML conversion
// let usersXML = {user:[{id:1, email:'warren@wyosoft.com'}, {id:2, email:'gayle@wyosoft.com'}]};
// let usersXML2 = {user:users};
let users = [{id:1, email:'warren@wyosoft.com'}, {id:2, email:'gayle@wyosoft.com'}];
let codes = [];

/**
 * GET /user
 * Gets the current user's email and summary information as a User Object
 */
router.get('/', function(req, res, next) {
  try{
    // JWY verify and get the email
    const email = tokens.validateToken(req.get('Authorization'), res);
    debug(email);

    let cnt = 0;
    getNotes().forEach( (element)=>{
      debug('el', element);
      if(element.email === email){
        cnt++;
      }
    });

    if(req.get("accept").toLowerCase() === 'application/xml'){
      res.type('application/xml');
      res.send(200, js2xmlparser.parse("user",{email:email, notes_cnt:cnt}));
    }
    else{
      res.type('application/json');
      res.send(200, {user:{email:email, notes_cnt:cnt}});
    }
  }
  catch(err){
    debug(err);
    throw(err);
  }
});


/** 
 * POST /user/code
 * 
 * Creates a login code and emails it to a user's email address. This is part of the 
 * Email-Code-Token mechanism. The email/code must then be passed to GET/token to 
 * get a JWT token which is required to call other endpoints.
 * 
 * @todo Change sendMail to receive a promise and embed the response in the callback.
 */
router.post('/code', function(req, res, next) {
  try{

    // Add the request ip to the logs and to the response
    var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
    console.log('Email/IP', req.body.email, ip); // Do not remove this line

    // Check content-type
    if(req.get('content-type') !== 'application/x-www-form-urlencoded'){
      res.status(400);
      throw {mesasge:'The header Content-Type must be set to application/x-www-form-urlencoded.'};
    }

    // Check email and set Code
    let code = Math.floor(Math.random() * 90000) + 100000;
    let email = req.body.email;
    debug(email);
    if(!emailIsValid(email)){
      res.status(400);
      throw {message:"Invalid email format."};
    }

    // Delete the email if it exists in the codes array
    codes.forEach(function (element, i) {
        if(element.email === email){
          codes.splice(i,1);
        }
    });

 
    const user = {email:email, temp_code:code, code:'A code was sent to the email address.', ip:ip};
    codes.push({email:email, code:code});
    debug('codes array', codes);

    // Send email
    //let result = sendEmail(email, code);
    //debug(result);

    // Send response
    if (req.get("accept").toLowerCase() === 'application/xml'){
      res.type('application/xml');
      res.status(201).send(js2xmlparser.parse("user",user));
    }
    else{
      res.type('application/json');
      res.status(201).send( {user:user});
    }
  }
  catch(err){
    debug(err);
    throw err;
  }
});


/**
 * Returns a token after validating the email and code sent.
 * A JWT token which is required to call other endpoints.
 */
router.get('/token', function(req, res, next) {
  try{
    const email = req.query.email;
    const code = req.query.code;
    
    // Valid the code
    let codeIsValid = false;
    codes.forEach(element => {
      debug('-->', element.email, email, element.code, code);
      if(element.code == code && element.email == email){ // Numbers may be strings
        codeIsValid = true;
      }
    });
    if(!codeIsValid){
      res.status(401);
      throw {message:"Invalid code"};
    }

    let token = null;
    if(emailIsValid(email)){
      token = tokens.getToken(req.query.email)
    }
    else{
      res.status(400);
      throw {message:"Invalid email format."};
    }

    // Ready to send the token. Add a note about it.
    storeNote(new Note(email, 'Sent a new token.', 'token'));

    if (req.get("accept").toLowerCase() === 'application/xml'){
      res.type('application/xml');
      res.status(200).send(js2xmlparser.parse("token",token));
    }
    else{
      res.type('application/json');
      res.status(200).send({token,token});
    }
  }
  catch(err){
    debug(err);
    throw err;
  }
});


module.exports = router;


/**
 * Validate email format
 * @param email 
 */
function emailIsValid (email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}


/**
 * Send an email with nodemailer
 * 
 * @param {*} email 
 * @param {*} code 
 * 
 * @todo Need to notify logs if the email fails
 */
async function sendEmail(email, code){
  try{
    let transporter = nodemailer.createTransport({
      service: 'gandi',
      auth: {
        user: 'support@lelandcreek.com',
        pass: process.env.EMAIL_PSWD
      }
    });
    let mailOptions = {
      from: "Notes Support support@lelandcreek.com",
      to: email,
      subject: 'Notes Login Code',
      text: `Notes is a demonstration project using a Node.js backend for the purpose 
      of illustrating the use of Docsify to create an API Reference Guide. 
      A code `+code+` was requested for this email address. 
      If you did not request the code please do nothing. \n\nRegards,\nNotes Support`,
            html: `Notes is a demonstration project using a Node.js backend for the purpose 
            of illustrating the use of Docsify to create an API Reference Guide. 
            A code <b>`+code+`</b> was requested for this email address. 
            If you did not request the code please do nothing.  
            <br><br>Regards,<br>Notes Support</div>`
    };
    let result = await transporter.sendMail(mailOptions);
    console.log('----- EMAIL SEND RESULT -----');
    console.log(result);
  }
  catch(err){
    console.error('----- EMAIL SEND ERROR -----');
    console.error(err);
  }
}