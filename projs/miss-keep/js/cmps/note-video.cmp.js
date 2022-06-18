import noteHoverContollers from "./note-hover-controllers.cmp.js";
import editNote from "./edit-note.cmp.js";



export default {
  template: `
    <section :class="note.type"  @mouseover="hoverEvent(true)" @mouseleave="hoverEvent(false)" :style="getStyle">
    <note-hover-contollers :isPin="note.isPinned" :noteId="note.id" :isHover="isHover" @onEditNote="onSetEdit" v-if="!toEdit"/>
    <h3 @click="onEditText" v-show="!editTxt">{{note.info.title}}</h3>
    <input type="text" ref="inputTxt" placeholder="Edit your text here..." v-model="noteTxt" v-if="editTxt"/>
    <iframe :width="(note.isPinned) ? note.style.width - 25 : 155" :height="(note.isPinned) ? note.style.height - 100 : 80" :src="note.info.url"/>  
    <edit-note v-if="toEdit" :note="note" @closeEdit="onCloseEdit" @editedNote="changeNote"/>   
    </section>
    `,
  props: ["note"],
  data() {
    return {
      isHover: false,
      toEdit: false,
      editTxt: false,
      noteTxt: this.note.info.title,
    };
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
  },
  components: {
    noteHoverContollers,
    editNote
  }

}