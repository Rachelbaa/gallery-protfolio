import NoteText from './note-text.cmp.js'
import NoteImg from './note-img.cmp.js'
import NoteTodos from './note-todos.cmp.js'
import NoteVideo from './note-video.cmp.js'
import NoteAudio from './note-audio.cmp.js'
import NoteMap from './note-map.cmp.js'
import { notesServies } from "../services/notes.service.js"
import { eventBus } from '../services/event-bus.service.js'
import { Utils } from '../services/utils.service.js'


export default {
    template: `
    <section v-if="notes" class="notes-container">
        <div class="pinned-container">
            <component :is="note.type" :note="note" v-if="note.isPinned" class="note" v-for="(note, idx) in notes"></component>
        </div>
        <div class="unpinned-container">
           <component v-for="(note, idx) in notes" :is="note.type" :note="note" v-if="!note.isPinned" class="note"></component>
        </div>
    </section>
    `,
    data() {
        return {
           notes: null,
           positions: {
            clientX: undefined,
            clientY: undefined,
            movementX: 0,
            movementY: 0
          }
        }
    },
    created() {
        notesServies.getById()
        .then( notes => {
            this.notes = notes;
            // console.log('NOTES : ',JSON.parse(JSON.stringify(this.notes)));
        })

        eventBus.$on('togglePin', (noteId, isPin) => {
            const note = notesServies.getNoteById(noteId);
            note.isPinned = isPin;
            // console.log('NOTEeeeeeeeeeeeeeeee : ',note);
            notesServies.updateNote(note);
            notesServies.getById()
               .then( notes => {
                  this.notes = notes;
                })
 
        });
        eventBus.$on('deleteNote', (noteId) => {
            notesServies.removeNoteById(noteId);
            notesServies.getById()
                .then( notes => {
                  this.notes = notes;
                })
        });
        eventBus.$on('addNote', (note) => {
            notesServies.addNoteToNotes(note);
            notesServies.getById()
            .then( notes => {
                this.notes = notes;
                // console.log('NOTES added: ',JSON.parse(JSON.stringify(this.notes)));
            })
        })
    },
    components: {
        NoteText,
        NoteImg,
        NoteTodos,
        NoteVideo,
        NoteAudio,
        NoteMap,
        eventBus
    }
}
