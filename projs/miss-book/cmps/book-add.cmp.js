import { bookService } from "../services/book.servies.js"
import { Utils } from "../services/utils.servies.js";


export default {
    template: `
    <section class="book-add">    
        <h4>Find and Add new Books: </h4>
        <input type="text" placeholder="Search for a book" v-model="bookTitle" @input="searchBook($event)" list="books-list"/>
        <button @click="onAddBook">Add</button>
        <datalist v-if="booksList" id="books-list">
            <option v-for="book in booksList" :value="book.volumeInfo.title"/>
        </datalist>
    </section>
    `,
    data() {
        return {
            bookTitle: null,
            booksList: null,
            selectedBookId: null
        }
    },
    computed: {

    },
    methods: {
        searchBook(event) {
            // console.log('bookk LIST :', this.booksList);
            if (this.booksList === null) {
                const bookApi = bookService.getBooksFromTitle(this.bookTitle);
                bookApi.then(result => {
                    this.booksList = result;
                    this.selectedBookId = this.getBookIdByTitle(event.data)
                    // console.log('my booksList :', result);
                })
            }else {
                this.selectedBookId = this.getBookIdByTitle(event.data)
            }
        },
        onAddBook() {
            if (this.selectedBookId === null) return;
            const bookToAdd = bookService.getByIdApi(this.selectedBookId);
            bookToAdd.then(book => {
                if (!book) return;
                book.title = book.volumeInfo.title;
                book.listPrice = {
                    "amount": Utils.getRandomInt(2, 200),
                    "currencyCode": "ILS",
                    "isOnSale": Utils.getRandomBuliani()
                }
                bookService.addBookToGBooks(book);
                this.booksList = null;
                this.bookTitle = null
                this.selectedBookId = null;
            })
        },
        getBookIdByTitle(bookTitle) {
            const book = this.booksList.find(book => book.volumeInfo.title === bookTitle)
            if (!book) {
                return null
            }else {
                return book.id;
            }
        }
    }

}