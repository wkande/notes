var express = require('express');
var router = express.Router();

const debug = require('debug')('notes:notes');
var jwt = require('jsonwebtoken');

const notes  = require('../libs/models').notes;
const storeNotes  = require('../libs/models').storeNotes;
const tokens = require("../libs/tokens");


/**
 * GET /notes
 * Gets the current user's notes.
 */
router.get('/', function(req, res, next) {
  try{
    // JWY verify
    const email = tokens.validateToken(req.get('Authorization'), res);
    debug(email);

    let cnt = 0;
    n = [];
    notes.forEach( (element)=>{
      debug('el', element);
      if(element.email === email){
        n.push(element);
      }
    });

    if(req.get("accept").toLowerCase() === 'application/xml'){
      res.type('application/xml');
      res.send(200, js2xmlparser.parse("notes",n));
    }
    else{
      res.type('application/json');
      res.send(200, {email:email, notes:n});
    }
  }
  catch(err){
    debug(err);
    throw(err);
  }
});


module.exports = router;