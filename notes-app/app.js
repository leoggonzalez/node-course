const validator = require('validator');
const { getNotes } = require('./notes.js');

const notes = getNotes();

console.log(notes);

console.log(validator.isURL('http://asd.com', {
  require_protocol: true
}));