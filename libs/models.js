/*jshint esversion: 6 */

const shortid = require('shortid');
const redis = require('redis');
const debug = require('debug')('notes:models');
var notes = [];


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
      console.log('err', err);
      console.log(obj);
      notes = JSON.parse(obj);
      console.log(notes[0].email);
      debug('Notes array length:', notes.length);
      debug('Loaded');
    });

    
// END STARTUP


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

module.exports.storeNote = function(note){
  try{
    console.log('----- UPDATE REDIS -----')
    notes.push(note)
    console.log(notes.length)
    client.set("notes", JSON.stringify(notes), function(err) {
      console.error(err);
    });
  }
  catch(err){
    console.log(err);
  }
}

module.exports.getNotes = function(){
  return notes;
}

module.exports.closeRedis = function(){
  console.log('Closing connection to RedisLabs');
  client.quit();
}



