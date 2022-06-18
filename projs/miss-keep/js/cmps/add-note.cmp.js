
import { eventBus } from "../services/event-bus.service.js"
import { notesServies } from "../services/notes.service.js"
import { Utils } from "../services/utils.service.js"


export default {
    template: `
    <div class="add-note">
        <div class="noteCreator-container">
            <div class="inputs-container">
                <input type="text" placeholder="Enter your note title..." v-model="titleNote" v-show="isNeedsTitle" class="add-input"/>
                <input type="text" :placeholder="setPlaceholder" v-model="inputTxt" class="add-input"/>
            </div>
            <div class="type-container">
                <img src="./img/txt.png" class="type-image" @click="setNoteType('NoteText')">
                <img src="./img/img.png" class="type-image" @click="setNoteType('NoteImg')">
                <img src="./img/video.png" class="type-image" @click="setNoteType('NoteVideo')">
                <img src="./img/todo.png" class="type-image" @click="setNoteType('NoteTodos')">
                <img src="./img/audio.png" class="type-image" @click="setNoteType('NoteAudio')">
                <img src="./img/map.png" class="type-image" @click="setNoteType('NoteMap')">
            </div>
        </div>
        <img src="./img/add.png" class="type-image add-image" @click="addNote">
    </div>
    `,
    data() {
        return {
        noteType: null,
        inputTxt: null,
        titleNote: null
        }
    },
    created() {

    },
    methods: {
        setNoteType(type) {
            this.noteType = type
        },
        addNote() {
            if (this.inputTxt === null) return;
            const note = notesServies.emptyNote();
            // console.log(note.style.backgroundColor);
            note.type = this.noteType;
            if (note.type === 'NoteText' || note.type === null) {
                note.type = 'NoteText'
                note.info.txt = this.inputTxt
            }
            else if (note.type === 'NoteTodos') {
                note.info = this.ontodoForm(note)
            }
            else if (note.type === 'NoteImg' || note.type === 'NoteVideo' || note.type === 'NoteAudio') {
                note.info = this.onUrlForm(note)
            }else if (note.type === 'NoteMap') {
                note.info = this.onMapForm(note)
            }
            eventBus.$emit('addNote', note)
            this.noteType = null;
            this.inputTxt = null;
            this.titleNote = null;
        },
        ontodoForm(note) {
            let info = note.info
            info.title = this.titleNote;
            let todosArray = this.inputTxt.split(',')
            // console.log('todos : ', todosArray);
            info.todos = []
            for (let i = 0; i < todosArray.length; i++) {
                const todoTxt = todosArray[i];
                let todo = { txt: todoTxt , doneAt: Date.now() , checked: false};
                info.todos.push(todo)
            }
            return info
        },
        onUrlForm(note) {
            let info = note.info;
            info.title = this.titleNote;
            info.url = this.inputTxt;
            return info;
        },
        onMapForm(note) {
            let info = note.info;
            info.title = this.titleNote
            let adressArray = this.inputTxt.split(',');
            info.adress = adressArray[0];
            info.num = adressArray[1];
            info.city = adressArray[2]
            return info;
        }
    },
    computed: {
        setPlaceholder() {
            if (this.noteType === 'NoteTodos') {
                return 'Enter comma seperated list...'
            }else if (this.noteType === 'NoteImg') {
                return 'Enter your image URL...'
            }else if (this.noteType === 'NoteVideo') {
                return 'Enter your video URL...'
            }else if (this.noteType === 'NoteAudio') {
                return 'Enter your audio URL...'
            }else if (this.noteType === 'NoteMap') {
                return 'Enter Adress , Num , City...'
            }else{
                return 'Enter your Text here...'
            }
        },
        isNeedsTitle() {
            if (this.noteType === 'NoteTodos' || this.noteType === 'NoteImg' ||
             this.noteType === 'NoteVideo' || this.noteType === 'NoteAudio' ||
             this.noteType === 'NoteMap') return true;
            else return false;
        }

    },
    components: {
        notesServies,
    }
}