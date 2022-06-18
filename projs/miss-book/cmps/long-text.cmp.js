
export default{
    props: ['text'],
    template: `
        <section class="long-text">
            <p v-if="shortText">{{text}}</p>
            <p v-else @click="showAllText = !showAllText" class="longText">
                {{toggleLongText}}<span v-if="(!showAllText)">...</span>
            </p>
        </section>
   `,
    data() {
        return {
            showAllText: false,
        }
    },
    computed: {
        shortText() {
            if (this.text.length <= 100) {
                return true;
            } else return false;
        },
        toggleLongText() {
            if (this.showAllText === false) {
                let displayText = this.text.slice(0, 100);
                return displayText;
            }else {
                return this.text
            }
        }

    },
    methods: {

    }
};