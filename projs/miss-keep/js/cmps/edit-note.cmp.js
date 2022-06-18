import { Utils } from "../services/utils.service.js"
import { eventBus } from "../services/event-bus.service.js";
import { notesServies } from "../services/notes.service.js";

export default {
    props: ['note'],
    template: `
    <div class="editNote-container">
        <div class="done-cancel-btn">
            <p class="done" @click="editNote">Done</p>
            <p class="cancel" @click="closeEdit">cancel</p>
        </div>
        <div class="inputsOnEdit">
            <input type="number" min=200 max=300 placeholder="W" v-model="width">
            <input type="number" min=200 max=300 placeholder="H" v-model="height">
            <input type="text" :placeholder="setPlaceholder" class="inputEdit-txt" v-if="isNoteType" v-model="inputUrl"/>
        </div>
        <div class="colors-container">
            <div v-for="color in colors" class="color" :style="{'background-color': color}" @click="setNoteColor(color)"></div>
        </div>
    </div>
    `,
    data() {
        return {
            colors: ['#89B5FA', '#AE96C5', ' #F5D07A', '#A4D19F', '#FFFCBE', '#DD92A3'],
            width: this.note.style.width,
            height: this.note.style.height,
            inputUrl: null,
            noteColor: null

        }
    },
    created() {
    },
    components: {
        Utils,
        eventBus,
        notesServies
    },
    computed: {
        isNoteType() {
            if (this.note.type === 'NoteText' || this.note.type === 'NoteAudio') return false;
            else return true;
        },
        setPlaceholder() {
            if (this.note.type === 'NoteTodos') {
                return 'Edit comma seperated list...'
            } else if (this.note.type === 'NoteImg') {
                return 'Edit your image URL...'
            } else if (this.note.type === 'NoteVideo') {
                return 'Edit your video URL...'
            } else if (this.note.type === 'NoteMap') {
                return 'Adress , Num , City...'
            } else {
                return 'Enter your Text here...'
            }
        }
    },
    methods: {
        closeEdit() {
            this.$emit('closeEdit');
        },
        editNote() {
            if (this.width === '') this.width = 230
            if (this.height === '') this.height = 230
            if (this.inputUrl === '') return
            if (this.noteColor === null) this.noteColor = this.note.style.backgroundColor
            this.note.style.width = this.width;
            this.note.style.height = this.height;
            if (this.note.type === 'NoteImg' && this.inputUrl !== null || this.note.type === 'NoteVideo' && this.inputUrl !== null ) {
                this.note.info.url = this.inputUrl
            }
            else if (this.note.type === 'NoteTodos' && this.inputUrl !== null) {
                let todosArray = this.inputUrl.split(',')
                for (let i = 0; i < todosArray.length; i++) {
                    const todoTxt = todosArray[i];
                    let todo = { txt: todoTxt , doneAt: Date.now() , checked: false};
                    this.note.info.todos.push(todo)
                }
            }
            else if (this.note.type === 'NoteMap' && this.inputUrl !== null) {
                let adressArray = this.inputUrl.split(',')
                this.note.info.adress = adressArray[0];
                this.note.info.num = adressArray[1];
                this.note.info.city = adressArray[2];
            }
            // console.log('note : note : ', JSON.parse(JSON.stringify(this.note)));
            this.$emit('editedNote')
            this.$emit('closeEdit');
            notesServies.updateNote(this.note)

        },
        setNoteColor(color) {
            this.noteColor = color;
            this.note.style.backgroundColor = this.noteColor;
        }
    }
}
