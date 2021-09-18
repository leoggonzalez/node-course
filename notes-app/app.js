const yargs = require('yargs');
const { getNotes, addNote, readNote, removeNote } = require('./notes.js');

// Customize yargs version
yargs.version('1.0.1');

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    }
  },
  handler: function (argv) {
    addNote(argv.title, argv.body);
  }
});

// Create read command
yargs.command({
  command: 'read',
  describe: 'Read an existing note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    readNote(argv.title);
  }
});

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    removeNote(argv.title);
  }
});

// Create list command
yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler: getNotes,
});

yargs.parse();