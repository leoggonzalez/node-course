const { name, add } = require('./utils.js');
const { getNotes } = require('./notes.js');

const sum = add(4, 2);
const notes = getNotes();

console.log(name);
console.log(sum);
console.log(notes);