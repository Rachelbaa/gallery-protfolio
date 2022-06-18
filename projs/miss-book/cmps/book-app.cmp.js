
// import bookAdd from '/cmps/book-add.cmp.js'
import bookAdd from '../cmps/book-add.cmp.js'
// import bookFilter from '/cmps/book-filter.cmp.js'
import bookFilter from '../cmps/book-filter.cmp.js'
// import bookDetails from '/cmps/book-details.cmp.js'
import bookDetails from '../cmps/book-details.cmp.js'
// import bookList from '/cmps/book-list.cmp.js'
import bookList from '../cmps/book-list.cmp.js'

// import { bookService } from '../services/book.servies.js';
import { bookService } from '../services/book.servies.js';
// import { Utils } from '../services/utils.servies.js';

export default {
    template: `
        <main class="book-app">
            <book-add></book-add>
            <book-filter @filter="setFilter" v-if="!currBookId"></book-filter>
            <book-details @close="setCurrBook" v-if="currBookId" :book="getCurrBook"></book-details>
            <book-list v-else @bookSelected="setCurrBook" :books="booksToShow"></book-list>
        </main>
   `,
    data() {
        return {
            books: [],
            currBookId: null,
            filterBy: {
                byName: '',
                fromPrice: '',
                toPrice: ''
            }
        }
    },
    computed: {
        booksToShow() {
            const filterBy = this.filterBy;
            if (!filterBy) return this.books;

            let filteredBooks = this.books.filter( book => {
                return book.title.toLowerCase().includes(filterBy.byName.toLowerCase())
            })
            filteredBooks = filteredBooks.filter( book => {
                if (book.listPrice.amount >= filterBy.fromPrice && filterBy.toPrice === '') {
                   return book; 
                }else if (book.listPrice.amount <= filterBy.toPrice && filterBy.fromPrice === '') {
                    return book; 
                }else if (book.listPrice.amount >= filterBy.fromPrice && book.listPrice.amount <= filterBy.toPrice) {
                    return book;
                }else if (filterBy.fromPrice === '' && filterBy.toPrice === '') {
                    return book
                }
            })
            return filteredBooks;

        },
        getCurrBook() {
            let currBook = this.getCurrBookById
            return currBook;
        },
        getCurrBookById() {
            const books = this.books
            for (let i = 0; i < books.length; i++) {
                if (books[i].id === this.currBookId) {
                    return books[i]
                }
            }
        }

    },
    methods: {
        setCurrBook(book) {
            if (book === []) {
                this.currBookId = null;
            }else {
                this.currBookId = book.id
            }
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
       

    },
    created() {
        bookService.getGBooks()
           .then(books => {                   
               this.books = books
            //    console.log("🚀 ~ file: book-app.cmp.js ~ line 84 ~ created ~ this.books", JSON.parse(JSON.stringify(this.books)))
           })
    },
    components: {
        bookAdd,
        bookFilter,
        bookDetails,
        bookList
    }
};

