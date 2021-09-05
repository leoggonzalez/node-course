const chalk = require('chalk');
const yargs = require('yargs');
const { getNotes } = require('./notes.js');

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
    console.log(`Note added: "${argv.title}"`);
    console.log('');
    console.log(argv.title);
    console.log('--- --- ---');
    console.log(argv.body);
  }
});

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a new note',
  handler: function () {
    console.log('Removing a new note');
  }
});

// Create list command
yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler: function () {
    console.log('Here are your notes:');
  }
});

// Create read command
yargs.command({
  command: 'read',
  describe: 'Read note',
  handler: function () {
    console.log('Note:');
  }
});

yargs.parse();