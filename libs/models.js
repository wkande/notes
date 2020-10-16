/*jshint esversion: 6 */

const shortid = require('shortid');
var fs = require('fs');
const debug = require('debug')('notes:models');


// STARTUP
    debug('Running startup script');
    // Load the notes.text file into note if the file exists
    var notes = [];
    try{
      var notes = fs.readFileSync('notes.text').toString().split("\n");
      // The last row is the notes is a blank line so remove
      notes.splice(notes.length-1, 1);
      for(let i=0;i<notes.length;i++){
        notes[i] = JSON.parse(notes[i]);
      }
    }
    catch(err){
      debug(err)
      notes = [];
    }
    debug('Notes array length:', notes.length);
    debug('Loaded');
// END STARTUP


class Note {
  constructor(email, text, tags) {
    this.id = shortid.generate();
    this.email = email;
    this.text = text;
    this.tags = tags
    
  }
}

module.exports.Note = Note;
module.exports.notes = notes;


module.exports.storeNotes = function(){
  var file = fs.createWriteStream('notes.text');
  file.on('error', function(err) { 
    console.error(err); 
  });

  notes.forEach(value => file.write(`${JSON.stringify(value)}\r\n`));

  file.end();
}



