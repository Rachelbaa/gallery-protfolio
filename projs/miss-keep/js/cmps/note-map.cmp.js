import noteHoverContollers from "./note-hover-controllers.cmp.js";
import editNote from "./edit-note.cmp.js";

export default {
    props: ['note'],
    template: `
    <section :class="note.type" @mouseover="hoverEvent(true)" @mouseleave="hoverEvent(false)" :style="getStyle">
      <note-hover-contollers :isHover="isHover" :isPin="note.isPinned" :noteId="note.id" @onEditNote="onSetEdit" v-if="!toEdit"/>
      <input type="text" ref="inputTxt" placeholder="Edit your text here..." v-model="noteTxt" v-if="editTxt"/>
      <h3 @click="onEditText" v-show="!editTxt">{{note.info.title}}</h3>
            <div class="gmap_canvas">
              <iframe :width="(note.isPinned) ? note.style.width - 30 : 150" :height="(note.isPinned) ? note.style.height - 50 : 130" id="gmap_canvas" :src="'https://maps.google.com/maps?q='+ note.info.adress + '%20' + note.info.num + note.info.city +'&t=&z=13&ie=UTF8&iwloc=&output=embed'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
              <style>.gmap_canvas {position:relative;text-align:right;overflow:hidden;background:none!important;height: this.note.style.height+ 'px';width: this.note.style.height+ 'px';}</style>
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