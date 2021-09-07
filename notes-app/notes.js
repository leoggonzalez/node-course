const fs = require('fs');

function loadNotes() {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

function saveNotes(notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
}


function getNotes() {
  return loadNotes();
}

function addNote(title, body) {
  const notes = loadNotes();

  try {
    const duplicatedNotes = notes.filter(note => note.title === title);

    if (duplicatedNotes.length) {
      throw new Error('Note already exists');
    }

    notes.push({
      title,
      body,
    });

    saveNotes(notes);
  } catch (error) {
    console.log(error);
  }
}

function removeNote(title) {
  try {
    const notes = loadNotes();
    const note = notes.find(item => item.title === title);
    if (!note) {
      throw new Error('Note does not exist');
    }
    saveNotes(notes.filter(item => item.title !== title));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getNotes,
  addNote,
  removeNote,
};
