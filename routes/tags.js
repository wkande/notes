var express = require('express');
var router = express.Router();
const js2xmlparser = require("js2xmlparser");
const debug = require('debug')('notes:tags');

const tokens = require("../libs/tokens");
const getNotes  = require('../libs/models').getNotes;
const updateTag  = require('../libs/models').updateTag;



/**
 * GET /tags
 * Gets a unique list of tags within a user's notes.
 */
router.get('/', function(req, res, next) {
  try{
    // JWY verify and get the email
    const email = tokens.validateToken(req.get('Authorization'), res);
    debug('email', email);

    // Get distinct tags
    let n = [];
    getNotes().forEach((element) => {
      let tags;
      if(element.tags){ // tags could be null
        tags = element.tags.split(' '); 
        for (var i=0; i<tags.length; i++){
          tags[i].trim();
          if(tags[i].length > 0) n.push(tags[i]);
        }
      }
      
    });
    const distinct = (value, index, self) => {
      return self.indexOf(value) === index;
    }
    const unique = n.filter(distinct);


    if(req.get("accept").toLowerCase() === 'application/xml'){
      res.type('application/xml');
      res.status(200).sendjs2xmlparser.parse("tags",unique);
    }
    else{
      res.type('application/json');
      res.status(200).send(unique);
    }
  }
  catch(err){
    debug(err);
    throw(err);
  }
});


/**
 * Updates all instances of a single tag attached to all of a user's notes. 
 * Useful to correct misspelled tags.
 */
router.put('/:tag', function(req, res, next) {
  try{
    // JWY verify and get the email
    const email = tokens.validateToken(req.get('Authorization'), res);
    const tag = req.params['tag'];
    const tag_new = req.body.tag.trim();

    console.log('tag_old', req.params['tag'])
    console.log('tag_new', req.body.tag)

    if(!tag){
      res.status(400);
      throw {message:"A value for the (new) tag was not sent."};
    }

    updateTag(email, tag, tag_new);

    if(req.get("accept").toLowerCase() === 'application/xml'){
      res.type('application/xml');
      res.status(200).send(js2xmlparser.parse("tag",{tag_old:tag, tag_new:tag_new}));
    }
    else{
      res.type('application/json');
      res.status(200).send({tag_old:tag, tag_new:tag_new});
    }
  }
  catch(err){
    debug(err);
    throw(err);
  }
});


/**
 * Deletes a tag from all of a user's notes.
 */
router.delete('/:tag', function(req, res, next) {
  try{
    // JWY verify and get the email
    const email = tokens.validateToken(req.get('Authorization'), res);
    const tag = req.params.tag.trim();

    updateTag(email, tag, "");

    res.type('application/json');
    res.status(204).send()
  }
  catch(err){
    debug(err);
    throw(err);
  }
});


module.exports = router;