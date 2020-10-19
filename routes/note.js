var express = require('express');
var router = express.Router();
const js2xmlparser = require("js2xmlparser");
const debug = require('debug')('notes:note');

const Note  = require('../libs/models').Note;
const tokens = require("../libs/tokens");
const addNote  = require('../libs/models').addNote;
const updateNote  = require('../libs/models').updateNote;
const getNotes  = require('../libs/models').getNotes;
const deleteNote  = require('../libs/models').deleteNote;
const verifyNoteOwnership  = require('../libs/models').verifyNoteOwnership;


/**
 * GET /note
 * Gets a note from the current user.
 */
router.get('/:id', function(req, res, next) {
  try{
    // JWY verify and get the email
    const email = tokens.validateToken(req.get('Authorization'), res);
    const id = req.params['id']
    debug(email, id);

    let found = false;
    getNotes().forEach( (element)=>{
      if(element.email === email && element.id === id){
        found = true;
        if(req.get("accept").toLowerCase() === 'application/xml'){
          res.type('application/xml');
          res.status(200).send(js2xmlparser.parse("note", element));
        }
        else{
          res.type('application/json');
          res.status(200).send(element);
        }
      }
    });

    if (!found) {
      res.status(400);
      throw {message:"Invalid note id."};
    }
  }
  catch(err){
    debug(err);
    throw(err);
  }
});


router.post('/', function(req, res, next) {
  try{
    // JWY verify and get the email
    const email = tokens.validateToken(req.get('Authorization'), res);
    const content = req.body.content;
    const tags = req.body.tags;

    if(!content){
      res.status(400);
      throw {message:"No content for the note was sent."};
    }

    const note = new Note(email, content, tags);
    addNote(note);

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


router.put('/:id', function(req, res, next) {
  try{
    // JWY verify and get the email
    const email = tokens.validateToken(req.get('Authorization'), res);
    const id = req.params['id']
    const content = req.body.content;
    const tags = req.body.tags;

    if(!content){
      res.status(400);
      throw {message:"No content for the note was sent"};
    }

    // Does the user own this note?
    if(!verifyNoteOwnership(id, email)){
      res.status(403);
      throw {message:"You cannot change that note, please check the id."};
    }

    const note = new Note(email, content, tags);
    note.id = id;
    updateNote(note);

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


router.delete('/:id', function(req, res, next) {
  try{
    // JWY verify and get the email
    const email = tokens.validateToken(req.get('Authorization'), res);
    const id = req.params['id']

    // Does the user own this note?
    if(!verifyNoteOwnership(id, email)){
      res.status(403);
      throw {message:"You cannot change that note, please check the id."};
    }
    deleteNote(id, email);

    res.type('application/json');
    res.status(204).send()
  }
  catch(err){
    debug(err);
    throw(err);
  }
});


module.exports = router;