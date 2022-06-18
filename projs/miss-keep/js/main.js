
import notesCmp from './cmps/notes.cmp.js';
import appHeader from './cmps/app-header.cmp.js'
import addNote from './cmps/add-note.cmp.js'

Vue.config.devtools = true


new Vue({
  template: `
      <div class="myApp">
            <!-- <app-background> -->
            <app-header/>
            <main>
                <add-note/>
                <notes-cmp/>  
            </main>
            <footer></footer>
      </div>
      `,
  components: {
    notesCmp,
    appHeader,
    addNote
  }

}).$mount("#app");
