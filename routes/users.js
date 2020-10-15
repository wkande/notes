var express = require('express');
var router = express.Router();
const js2xmlparser = require("js2xmlparser");
const debug = require('debug')('notes:users');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');


// XML conversion
// let usersXML = {user:[{id:1, email:'warren@wyosoft.com'}, {id:2, email:'gayle@wyosoft.com'}]};
// let usersXML2 = {user:users};
let users = [{id:1, email:'warren@wyosoft.com'}, {id:2, email:'gayle@wyosoft.com'}];
let codes = [];

/**
 * Gets a list of users. This endpoint will only respond to users that are Admins.
 */
router.get('/', function(req, res, next) {
  if (req.get("accept").toLowerCase() === 'application/json'){
    res.type('application/json');
    res.send(200, users);
  }
  else if (req.get("accept").toLowerCase() === 'application/xml'){
    res.type('application/xml');
    res.send(200, js2xmlparser.parse("users",{user:users}));
  }
  else{
    throw new Error('Did not understand the request header for "accept".');
  }
});


/**
 * Creates a login code and emails it to a user's email address. This is part of the 
 * Email-Code-Token mechanism. The email/code must then be passed to GET/token to 
 * get a JWT token which is required to call other endpoints.
 */
router.post('/code', async function(req, res, next) {
  try{
    // Email and Code
    let code = generateCode();
    let email = req.body.email;
    if(!emailIsValid(email)){
      res.status(401);
      throw "Invalid email format."
    }

    // Delete the email if it exists in the codes array
    codes.forEach(function (element, i) {
        if(element.email === email){
          codes.splice(i,1);
        }
    });

    debug('EMAIL/CODE', email, code);
    const user = {email:email, code:'A code was sent to the email address.'};

    codes.push({email:email, code:code});
    debug(codes);

    // Send email
    let result = await sendEmail(email, code);
    

    // Send response
    if(req.get('content-type') !== 'application/x-www-form-urlencoded'){
      res.status(400);
      throw new Error('The header "content-type" must be set to "application/x-www-form-urlencoded".');
    }
    else if (req.get("accept").toLowerCase() === 'application/xml'){
      res.type('application/xml');
      res.status(201).send(js2xmlparser.parse("user",user));
    }
    else{
      res.type('application/json');
      res.status(201).send( {user:user});
    }
  }
  catch(err){
    console.error(err)
    console.error('--------------------------------')
    res.type(500);
    throw err;
  }
});


/**
 * Returns a token after validating the email and code sent.
 * A JWT token which is required to call other endpoints.
 */
router.get('/token', function(req, res, next) {
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
  debug(codeIsValid)
  if(!codeIsValid){
    res.status(401);
    throw "Invalid code";
  }

  let token = null;
  if(emailIsValid(email)){
    token = generateJwtToken(req.query.email); 
  }
  else{
    res.status(401);
    throw "Invalid email format."
  }

  if (req.get("accept").toLowerCase() === 'application/xml'){
    res.type('application/xml');
    res.send(200, js2xmlparser.parse("token",token));
  }
  else{
    res.type('application/json');
    res.send(200, {token,token});
  }
});


module.exports = router;


/**
 * Generates a random six digit code.
 */
function generateCode() {
  return Math.floor(Math.random() * 90000) + 100000;
}


/**
 * Validate email format
 * @param email 
 */
function emailIsValid (email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}


/**
 * Creates a token with persons array of ids only.
 */
function generateJwtToken(email){
  debug(process.env.JWT_SECRET)
  let userTokenInfo = {email};
  return jwt.sign(userTokenInfo, process.env.JWT_SECRET);
};


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
    throw err;
  }
}