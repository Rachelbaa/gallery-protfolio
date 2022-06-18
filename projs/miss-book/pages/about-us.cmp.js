
export default {
    template: `
    <section class="about-us">
        <img class="about-img" src="./img/arcane.jpg">
        <transition name="fade">
           <p v-if="intervalCounter">Ever wonder what it’s like to drown? Story of opposites.
            There’s peace in water. Like it’s holding you,
            whispering in low tones to let it in. And every problem
            in the world will fade away. But then, there’s this thing…
            in your head, and it’s raging.
            Lighting every nerve with madness. To fight. To survive.
            And all the while this question lingers before you:
            “Have you had enough?” It’s funny.
            You could pass a lifetime without ever facing a choice like
            that. But it changes you forever.</p>
        </transition>
    </section>
    `,
    data() {
        return {
           val: 0,
           intervalCounter: ''
        }
    },
    methods: {
        change(diff) {
            this.val += diff;
        }
    },
    created() {
        console.log('Counter Created!', this.val);
        this.intervalCounter = setInterval(()=>{
            this.change(1)
            return console.log('interval: ',this.val);
        }, 1000)
    },
    destroyed() {
        console.log('Counter Destroyed!', this.val);
        clearInterval(this.intervalCounter)
    }
}