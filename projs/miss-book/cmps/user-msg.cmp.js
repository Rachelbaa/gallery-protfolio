import {eventBus} from '../services/event-bus.service.js' 


export default {
    template: `
    <div :class="'user-msg-' + msg.type" v-if="msg.type">
        <h3 v-if="msg.type === 'success'"><span>✔️</span>{{msg.type}}!</h3>
        <h3 v-else><span>❌</span>{{msg.type}}!</h3>
        <p>{{msg.txt}}</p>
    </div>
    `,
    data() {
        return {
            msg:{
                type: null,
                txt: null
            }, 
        }
    },
    created() {
        eventBus.$on('showMsg', (msg) => {
            // this.msg = msg;
            this.msg.type = msg.type;
            this.msg.txt = msg.txt;
            setTimeout(()=>{
                // this.msg =null
                this.msg = {type: null, txt: null}
            },3000)
        });
    }
}
