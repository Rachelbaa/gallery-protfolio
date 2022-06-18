import { eventBus } from "../services/event-bus.service.js";

export default {
    template: `
    <div>
     <button class="isPinned-btn" @click="togglePin" v-show="isHover">{{isPinned}}</button>
     <img v-show="isPin===true" class="pin-img" src="./img/pin.png"/>
     <button class="edit-btn" @click="editNote" v-show="isHover"><img class="edit-image" src="./img/edit.png"/></button>
     <button class="delete-btn" @click="deleteNote" v-show="isHover"><img class="delete-image" src="./img/trash.png"/></button>
    </div>
    `,
    props: ['isPin', 'noteId', 'isHover'],
    data() {
        return {

        }
    },
    computed: {
        isPinned() {
            return (this.isPin) ? 'unPin' : 'Pin';
        }
    },
    methods: {
        togglePin() {
            this.isPin = !this.isPin;
            eventBus.$emit('togglePin', this.noteId , this.isPin);
        },
        deleteNote() {
            eventBus.$emit('deleteNote', this.noteId)
        },
        editNote() {
            this.$emit('onEditNote', true) 
        }
    },
    components: {
        eventBus
    }
}