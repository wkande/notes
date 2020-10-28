var express = require('express');
var router = express.Router();
const js2xmlparser = require("js2xmlparser");
const debug = require('debug')('notes:notes');

const Note  = require('../libs/models').Note;
const tokens = require("../libs/tokens");

const getNotes  = require('../libs/models').getNotes;
const deleteUserNotes  = require('../libs/models').deleteUserNotes;


/**
 * GET /notes
 * Gets the current user's notes. There is search by content and tags. Pagination with limit and skip.
 * 
 * @todo Add the skip/limit/content/tag filters.
 */
router.get('/', function(req, res, next) {
  try{
    // JWY verify and get the email
    const email = tokens.validateToken(req.get('Authorization'), res);
    debug(email);

    // Theses may be undefined or empty
    const skip = req.query.skip; 
    const limit = req.query.limit;
    const content = req.query.content;
    const tags = req.query.tags;

    let cnt = 0;
    let n = [];
    getNotes().forEach( (element)=>{
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
      res.send(200, n);
    }
  }
  catch(err){
    debug(err);
    throw(err);
  }
});


/**
 * Delete all notes associated with a single user.
 */
router.delete('/', function(req, res, next) {
  try{
    // JWY verify and get the email
    const email = tokens.validateToken(req.get('Authorization'), res);
    deleteUserNotes(email);
    res.type('application/json');
    res.status(204).send();
  }
  catch(err){
    debug(err);
    throw(err);
  }
});



module.exports = router;