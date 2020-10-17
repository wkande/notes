var express = require('express');
var router = express.Router();
const js2xmlparser = require("js2xmlparser");
const debug = require('debug')('notes:notes');
var jwt = require('jsonwebtoken');

const Note  = require('../libs/models').Note;
const tokens = require("../libs/tokens");
const storeNote  = require('../libs/models').storeNote;
const getNotes  = require('../libs/models').getNotes;


/**
 * GET /notes
 * Gets the current user's notes. There is search by content and tags. Pagination with limit and skip.
 * 
 * @todo Add the skip/limit/content/tag filters.
 */
router.get('/', function(req, res, next) {
  try{
    // JWY verify
    const email = tokens.validateToken(req.get('Authorization'), res);
    debug(email);

    // Theses may be undefined or empty
    const skip = req.query.skip; 
    const limit = req.query.limit;
    const content = req.query.content;
    const tags = req.query.tags;

    let cnt = 0;
    n = [];
    getNotes().forEach( (element)=>{
      //debug('el', element);
      if(element.email === email){
        n.push(element);
      }
    });

    if(req.get("accept").toLowerCase() === 'application/xml'){
      res.type('application/xml');
      res.send(200, js2xmlparser.parse("notes",{note:n}));
    }
    else{
      res.type('application/json');
      res.send(200, {notes:n});
    }
  }
  catch(err){
    debug(err);
    throw(err);
  }
});


router.post('/', function(req, res, next) {
  try{
    // JWY verify
    const email = tokens.validateToken(req.get('Authorization'), res);
    debug(email);

    const text = req.body.text;
    const tags = req.body.tags;

    if(!text){
      res.status(400);
      throw {message:"No text for the note was sent"};
    }

    const note = new Note(email, text, tags);
    storeNote(note);

    if(req.get("accept").toLowerCase() === 'application/xml'){
      res.type('application/xml');
      res.send(201, js2xmlparser.parse("note",notes));
    }
    else{
      res.type('application/json');
      res.send(201, {email:email, note:note});
    }
  }
  catch(err){
    debug(err);
    throw(err);
  }
});


module.exports = router;