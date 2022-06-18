import noteHoverContollers from "./note-hover-controllers.cmp.js";
import editNote from "./edit-note.cmp.js";

export default {
    props: ['note'],
    template: `
    <section :class="note.type"  @mouseover="hoverEvent(true)" @mouseleave="hoverEvent(false)" :style="getStyle">
        <note-hover-contollers :isHover="isHover" :isPin="note.isPinned" :noteId="note.id" @onEditNote="onSetEdit" v-if="!toEdit"/>    
        <input type="text" ref="inputTxt" placeholder="Edit your text here..." v-model="noteTxt" v-if="editTxt"/>
        <h3 @click="onEditText" v-show="!editTxt">{{note.info.title}}</h3>
        <div class="audio-bar-container">
            <audio controls class="audio-bar" :style="(note.isPinned) ? {width: this.note.style.width - 30 + 'px'} : {width: 150 + 'px'}">
                <source :src="note.info.url" />
            </audio>
        </div>
        <edit-note v-if="toEdit" :note="note" @closeEdit="onCloseEdit" @editedNote="changeNote"/>
    </section>
    `,
    data() {
        return {
          isHover: false,
          toEdit: false,
          editTxt: false,
          noteTxt: this.note.info.title,
        }
    },
    components: {
        noteHoverContollers,
        editNote
    },
    methods: {
      hoverEvent(onHover) {
        this.isHover = onHover;
      },
      onSetEdit(isSetToEdit) {
        this.toEdit = isSetToEdit;
      },
      onEditText() {
        if (!this.editTxt && !this.toEdit) return;
        this.editTxt = true;
      },
      onCloseEdit() {
        this.toEdit = false;
        this.editTxt = false;
        this.noteTxt = this.note.info.title;
      },
      changeNote() {
        this.note.info.title = this.noteTxt;
      }
    },
    computed: {
      getStyle() {
        if (this.note.isPinned) {
          return {
            width: this.note.style.width + 'px',
            height: this.note.style.height + 'px',
            backgroundColor: this.note.style.backgroundColor
          }
        }else {
          return {
            width: 180 + 'px',
            height: 180 + 'px',
            backgroundColor: this.note.style.backgroundColor
          }
        }
      }
    }
}

