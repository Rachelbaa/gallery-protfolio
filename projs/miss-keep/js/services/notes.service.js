import { Utils } from './utils.service.js'

const KEY = 'notes';

export const notesServies = {
    getById,
    emptyNote,
    getNoteById,
    removeNoteById,
    addNoteToNotes,
    saveNotes,
    updateNote
}

function getById() {
    let storageNotes = Utils.loadFromStorage(KEY);
    if (!storageNotes) {
        storageNotes = notes;
        Utils.saveToStorage(KEY, storageNotes)
    }
    return Promise.resolve(storageNotes)
}

function saveNotes(notess) {
  Utils.saveToStorage(KEY, notess)
}

function emptyNote() {
    return {
        type: null,
        id: Utils.getRandomId(),
        isPinned: false,
        info: {},
        style: {
            backgroundColor: Utils.getRandomColor(),
            height: 230,
            width: 230
        }
    }
}

function addNoteToNotes(note) {
    let storageNotes = Utils.loadFromStorage(KEY);
    if (!storageNotes) {
        storageNotes = notes;
    }
    storageNotes.unshift(note)
    Utils.saveToStorage(KEY,storageNotes);
}

function updateNote(noteToU) {
    let storageNotes = Utils.loadFromStorage(KEY);
    if (!storageNotes) {
        storageNotes = notes;
    }
    let noteIndex =  storageNotes.findIndex((note) => {
        if (note.id === noteToU.id) {
            return note;
        }
    })
    storageNotes[noteIndex] = noteToU;
    Utils.saveToStorage(KEY, storageNotes)
}

function getNoteById(id) {
    let storageNotes = Utils.loadFromStorage(KEY);
    if (!storageNotes) {
        storageNotes = notes;
    }
    return storageNotes.find((note) => {
        if (note.id === id) {
            return note;
        }
    })
}

function removeNoteById(id) {
    let storageNotes = Utils.loadFromStorage(KEY);
    if (!storageNotes) {
        storageNotes = notes;
    }
    let noteIndex = storageNotes.findIndex((note) => {
        if (note.id === id) {
            return note;
        }
    })
    storageNotes.splice(noteIndex,1);
    Utils.saveToStorage(KEY,storageNotes);
    // console.log('Notesssssssss: ', notes);
}


function editNoteById(note) {
    let noteIndex = notes.findIndex((noteidx) => {
        if (noteidx.id === note.id) {
            return noteidx;
        }
    })
}

var notes = [
    {
        type: "NoteText",
        id: Utils.getRandomId(),
        isPinned: true,
        info: {
            txt: "First Card...."
        },
        style: {
            backgroundColor:Utils.getRandomColor(),
            height: 230,
            width: 230
        }
    },
    {
        type: "NoteText",
        id: Utils.getRandomId(),
        isPinned: false,
        info: {
            txt: "Second Card...."
        },
        style: {
            backgroundColor:Utils.getRandomColor(),
            height: 230,
            width: 230
        }
    },
    {
        type: "NoteImg",
        id: Utils.getRandomId(),
        isPinned: true,
        info: {
            url: "https://image.shutterstock.com/image-photo/picture-beautiful-view-birds-600w-1836263689.jpg",
            title: "First Photo to put here"
        },
        style: {
            backgroundColor:Utils.getRandomColor(),
            width: 230,
            height: 230
        }
    },
    {
        type: "NoteTodos",
        id: Utils.getRandomId(),
        isPinned: true,
        info: {
            title: "Things to do :",
            todos: [
                { txt: "Do that", doneAt: Date.now() , checked: false },
                { txt: "Do this", doneAt: 187111111 , checked: false}
            ]
        },
        style: {
            backgroundColor:Utils.getRandomColor(),
            height: 230,
            width: 230
        }
    },
    {
        type: "NoteVideo",
        id: Utils.getRandomId(),
        isPinned: true,
        info: {
            url: "https://www.youtube.com/embed/tgbNymZ7vqY",
            title: "First Video to put here"
        },
        style: {
            backgroundColor:Utils.getRandomColor(),
            height: 230,
            width: 230
        }
    },
    {
        type: "NoteAudio",
        id: Utils.getRandomId(),
        isPinned: false,
        info: {
            url: "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
            title: "First Audio to put here"
        },
        style: {
            backgroundColor: Utils.getRandomColor(),
            height: 230,
            width: 230
        }
    },
    {
        type: "NoteAudio",
        id: Utils.getRandomId(),
        isPinned: false,
        info: {
            url: "https://www.computerhope.com/jargon/m/example.mp3",
            title: "second audio : "
        },
        style: {
            backgroundColor: Utils.getRandomColor(),
            height: 230,
            width: 230
        }
    },
    {
        type: "NoteMap",
        id: Utils.getRandomId(),
        isPinned: false,
        info: {
            city: 'bat-yam',
            num: 3,
            adress: 'rothschild',
            title: "my home :"
        },
        style: {
            backgroundColor: Utils.getRandomColor(),
            height: 230,
            width: 230
        }
    },
];