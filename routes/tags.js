var express = require('express');
var router = express.Router();
const js2xmlparser = require("js2xmlparser");
const debug = require('debug')('notes:tags');

const tokens = require("../libs/tokens");
const getNotes  = require('../libs/models').getNotes;



/**
 * GET /tags
 * Gets a unique list of tags within a user's notes.
 */
router.get('/', function(req, res, next) {
  try{
    // JWY verify and get the email
    const email = tokens.validateToken(req.get('Authorization'), res);
    debug('TAGS', email);

    // Get distinct tags
    let n = [];
    getNotes().forEach((element) => {
      let tags = element.tags.split(' ');
      for (var i=0; i<tags.length; i++){
        tags[i].trim();
        if(tags[i].length > 0) n.push(tags[i]);
      }
    });
    const distinct = (value, index, self) => {
      return self.indexOf(value) === index;
    }
    const unique = n.filter(distinct);


    if(req.get("accept").toLowerCase() === 'application/xml'){
      res.type('application/xml');
      res.send(200, js2xmlparser.parse("tags",unique));
    }
    else{
      res.type('application/json');
      res.send(200, unique);
    }
  }
  catch(err){
    debug(err);
    throw(err);
  }
});

module.exports = router;