const fs = require('fs');
const chalk = require('chalk');

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
}


const getNotes = () => {
  const notes = loadNotes();
  console.log(chalk.yellow('Your notes: '));
  notes.forEach((note, index) => console.log(`${index + 1}. ${note.title}`));
};

const addNote = (title, body) => {
  const notes = loadNotes();

  try {
    const exists = notes.find(note => note.title === title);

    if (exists) {
      throw new Error('Note already exists');
    }

    notes.push({
      title,
      body,
    });

    saveNotes(notes);
    console.log(chalk.green('Note was succesfully added!'))
  } catch (error) {
    console.log(chalk.red(error));
  }
}

const readNote = (title) => {
  const notes = loadNotes();

  try {
    const note = notes.find(note => note.title === title);

    if (!note) {
      throw new Error('Note does not exist');
    }

    console.log(chalk.green(note.title));
    console.log(note.body)
  } catch (error) {
    console.log(chalk.red(error));
  }
}

const removeNote = (title) => {
  try {
    const notes = loadNotes();
    const note = notes.find(item => item.title === title);
    if (!note) {
      throw new Error('Note does not exist');
    }
    saveNotes(notes.filter(item => item.title !== title));
    console.log(chalk.green('Note was succesfully removed!'))
  } catch (error) {
    console.log(chalk.red(error));
  }
}

module.exports = {
  getNotes,
  addNote,
  readNote,
  removeNote,
};
