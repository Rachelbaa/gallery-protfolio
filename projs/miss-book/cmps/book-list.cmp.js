// import bookPreview from '/cmps/book-preview.cmp.js'
import bookPreview from '../cmps/book-preview.cmp.js'


export default {
    props: ['books'],
    template: `
        <ul class="book-list-container flex">
            <book-preview v-for="book in books" @click.native="selectBook(book)" :book="book" :key="book.id"></book-preview>
        </ul>
  `,
    data() {
        return {

        }
    },
    methods: {
        selectBook(book) {
            this.$emit('bookSelected', book)
        }
    },
    components: {
        bookPreview
    }

};