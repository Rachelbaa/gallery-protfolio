
export default {
    props: [],
    template: `
        <section class="book-filter">
            <p>Filter:</p>
            <input type="text" placeholder="book name" v-model="filterBy.byName" @input="filter"/>
            <input type="number" placeholder="from Price" v-model.number="filterBy.fromPrice" min=0 @input="filter"/>
            <input type="number" placeholder="to Price" v-model.number="filterBy.toPrice" min=0 @input="filter"/>
        </section>
  `,
    data() {
        return {
            filterBy: {
                byName: '',
                fromPrice: '',
                toPrice: ''
            }
        }
    },
    computed: {

    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy);
        }
    }
};