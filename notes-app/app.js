const fs = require('fs');

fs.writeFileSync('notes.txt', 'This file was created by node.js. ');

fs.appendFileSync('notes.txt', 'This is an appended new line.');