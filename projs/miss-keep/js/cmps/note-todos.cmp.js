import noteHoverContollers from "./note-hover-controllers.cmp.js";
import editNote from "./edit-note.cmp.js";
import { notesServies } from "../services/notes.service.js";



export default {
  template: `
        <section :class="note.type" @mouseover="hoverEvent(true)" @mouseleave="hoverEvent(false)" :style="getStyle">
        <note-hover-contollers :isPin="note.isPinned" :noteId="note.id" :isHover="isHover" @onEditNote="onSetEdit" v-if="!toEdit"/>
        <h3 @click="onEditText" v-show="!editTxt">{{note.info.title}}</h3>
        <input type="text" ref="inputTxt" placeholder="Edit your text here..." v-model="noteTxt" v-if="editTxt"/>
        <ul class="clean-list">
          <li class="todo-line" v-for="(todo, index) in note.info.todos" :key="index">
            <span v-if="todo.checked" class="check" @click="clickLi(index)">🗹</span>
            <span v-else class="check" @click="clickLi(index)">☐</span>
            <span ref="span" :class="(todo.checked)? 'didIt' : ''" @click="toggleToDo($event, index)">{{todo.txt}}, done at: {{getTime(index)}}</span>
          </li>
        </ul>
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
    onSetEdit(isSetToEdit) {
      this.toEdit = isSetToEdit;
    },
    clickLi(idx) {
      this.$refs.span[idx].click()
    },
    hoverEvent(onHover) {
      this.isHover = onHover;
    },
    getTime(idx) {
      let today = new Date(this.note.info.todos[idx].doneAt);
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let yyyy = today.getFullYear();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      today = dd + '/' + mm + '/' + yyyy;
      return today;
    },
    toggleToDo(event, idx) {
      event.target.classList.toggle('didIt');
      if (!event.target.classList.contains('didIt')) {
        this.note.info.todos[idx].checked = false
      } else {
        this.note.info.todos[idx].checked = true;
      }
      notesServies.updateNote(this.note)
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
    editNote,
    notesServies
  }
}
