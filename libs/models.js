/*jshint esversion: 6 */


const shortid = require('shortid');
const redis = require('redis');
const { response } = require('express');
const e = require('express');
const debug = require('debug')('notes:models');
var notes = [];


/**
 * This script runs at startup to connect to RedisLabs where the 
 * notes are stored.
 */
// STARTUP
    debug('Running startup script');
    // Connect to RedisLabs
    const client = redis.createClient(
      process.env.REDIS_PORT,
      process.env.REDIS_HOST
    );
    client.auth('xjl1MH8AgbS7qPGVkDEfRmpaogdnM8RN');

    client.get("notes", function(err, obj) {
      // arr is null when the key is missing
      if(err) console.log('err', err);
      notes = JSON.parse(obj);
      debug('Notes array length:', notes.length);
      debug('Connection to RedisLabs OK');
    });
// END STARTUP


/**
 * Note class definition
 */
class Note {
  constructor(email, content, tags) {
    this.id = shortid.generate();
    this.email = email;
    this.content = content;
    this.tags = tags;
    this.dttm = new Date();
    
  }
}


// EXPORTS
module.exports.Note = Note;


/**
 * Adds a new note
 * @param {*} note 
 */
module.exports.addNote = function(note){
  try{
    debug('----- addNote - UPDATE REDIS -----')
    notes.push(note);
    client.set("notes", JSON.stringify(notes), function(err) {
      if(err) throw err;
    });
  }
  catch(err){
    debug(err);
    throw err;
  }
}


/**
 * Updates an existing note.
 * @param {*} note 
 */
module.exports.updateNote = function(note){
  try{
    debug('----- updateNote - UPDATE REDIS -----')
    // Find the note
    notes.forEach( (element, i)=>{
      if(element.email === note.email && element.id === note.id){
        notes.splice(i,1); // Delete the note
        notes.push(note); // Add updated note back in
        client.set("notes", JSON.stringify(notes), function(err) {
          if(err) throw err;
        });
      }
    });
  }
  catch(err){
    debug(err);
    throw err;
  }
}


/**
 * Deletes a note
 * @param {*} id 
 * @param {*} email 
 */
module.exports.deleteNote = function(id, email){
  try{
    debug('----- deleteNote - UPDATE REDIS -----')
    // Find the note and remove it
    notes.forEach( (element, i)=>{
      if(element.email === email && element.id === id){
        notes.splice(i,1); // Delete the note
        client.set("notes", JSON.stringify(notes), function(err) {
          if(err) throw err;
        });
      }
    }); 
  }
  catch(err){
    debug(err);
    throw err;
  }
}


/**
 * Deletes all tags from a note
 * @param {*} id 
 * @param {*} email 
 */
module.exports.removeNoteTags = function(id, email){
  try{
    debug('----- removeNoteTags - UPDATE REDIS -----')
    // Find the note and remove its tags
    let note;
    notes.forEach( (element, i)=>{
      if(element.email === email && element.id === id){
        element.tags = null;
        note = element;
        client.set("notes", JSON.stringify(notes), function(err) {
          if(err) throw err;
        });
      }
    }); 

    if(note){
      return note;
    }
    else {
      throw {status:400, message:"Note ID not found."};
    }
  }
  catch(err){
    debug(err);
    throw err;
  }
}


/**
 * Delete all notes associated with a single user.
 * @param {*} email 
 */
module.exports.deleteUserNotes = function(email){
  try{
    debug('----- deleteUserNotes - UPDATE REDIS -----')
    
    var newNotesArray = notes.filter(function (el) {
      return el.email != email;
    });
    notes = newNotesArray;

    console.log(notes)

    // Find the notes by email and remove them
    /*notes.forEach( (note, i)=>{
      if(note.email === email){
        notes.splice(i,1); // Delete the note
      }
    });*/ 
    client.set("notes", JSON.stringify(notes), function(err) {
      if(err) throw err;
    });
  }
  catch(err){
    debug(err);
    throw err;
  }
}


/**
 * Verifyies note ownership by id and email. The email should be extracted from the token
 * @param {*} id 
 * @param {*} email 
 */
module.exports.verifyNoteOwnership = function(id, email){
  try{
    debug('----- verifyNoteOwnership -----')
    // Find the note
    for(var i=0; i<notes.length; i++){
      if(notes[i].email === email && notes[i].id === id){
        return true;
      }
    }
    return false;
  }
  catch(err){
    debug(err);
    return false;
  }
}


/**
 * Return the entire notes array. Caller must take care to consider note ownership.
 */
module.exports.getNotes = function(){
  return notes;
}


/**
 * Updates all instances of a particular tag for all of a user's notes.
 * Useful for mispelled tags.
 * @param {*} tag
 * @param {*} tag_new
 */
module.exports.updateTag = function(email, tag, tag_new){
  try{
    debug('----- updateTag - UPDATE REDIS -----')
    // Find the user's notes
    notes.forEach( (note, i)=>{
      if(note.email === email){
        note.tags = note.tags.replace(new RegExp(tag, "g"), tag_new).trim();
        // Remove multiple spaces between words
        // cover tabs, newlines, etc, just replace \s\s+ with ' '
        if(note.tags){
          note.tags = note.tags.replace(/\s\s+/g, ' ').trim();
        }
      }
    });

    

    client.set("notes", JSON.stringify(notes), function(err) {
      if(err) throw err;
    });
  }
  catch(err){
    debug(err);
    throw err;
  }
}


// Closes the connection to RedisLabs where the notes are stored.
module.exports.closeRedis = function(){
  console.log('Closing connection to RedisLabs');
  client.quit();
}



