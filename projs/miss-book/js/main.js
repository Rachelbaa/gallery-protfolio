
import { myRouter } from './routes.js'
import appHeader from '../cmps/app-header.cmp.js'
import userMsg from '../cmps/user-msg.cmp.js'
import {eventBus} from '../services/event-bus.service.js'

new Vue({
    el: '#app',
    router: myRouter,
    template: `
   <div>
       <app-header></app-header>
       <user-msg/>
       <main>
           <router-view/>
       </main>
       <footer></footer>
   </div>
   `,
    components: {
        appHeader,
        userMsg
    }
});
