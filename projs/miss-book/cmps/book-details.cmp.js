// import longText from '/cmps/long-text.cmp.js';
import longText from '../cmps/long-text.cmp.js';
// import reviewAdd from '/cmps/review-add.cmp.js';
import reviewAdd from '../cmps/review-add.cmp.js';
// import { bookService } from "../services/book.servies.js";
import { bookService } from "../services/book.servies.js";
// import { Utils } from '../services/utils.servies.js';
// import { eventBus } from '../services/event-bus.service.js';
import { eventBus } from '../services/event-bus.service.js';



export default {
    // props: ['book'],
    template: `
        <section class="book-details" :class="isOnSale" v-if="book">
            <router-link class="np-btn" v-if="previousBookId" :to="'/book/' + previousBookId"><</router-link>
            <div>
                <button @click="close">X</button>
                <div class="book-title">
                    <h2>{{book.title}}</h2>
                    <h3>{{getAuthors}}</h3>
                </div>
                <div class="book-info">
                    <p>{{getPageCount}}</p>
                    <p>{{getPublishDate}}</p>
                    <p >Price: <span :class="setPriceColor">{{getBookPrice}} {{book.listPrice.currencyCode}}</span></p>
                    <long-text :text="bookDescription"></long-text>
                    <div class="book-reviews-container" v-if="book.reviews && book.reviews.length > 0">
                        <h2>Book Reviews: </h2>
                        <section  class="book-reviews">
                            <address class="book-review" v-for="bookReview in book.reviews">
                                <button @click.stop="deleteReview(bookReview.id)">X</button><br/><br/>
                                Reader Name: {{bookReview.readerName}} <br/>
                                Rating: {{bookReview.starNum}} star <br/>
                                Date: {{bookReview.date}} <br/>
                                Description: {{bookReview.text}} <br/>
                            </address>
                        </section>
                    </div>
                </div>
                <review-add @newReview="onNewReview" :bookId="book.id"></review-add>
            </div>
            <router-link class="np-btn" v-if="nextBookId" :to="'/book/' + nextBookId">></router-link>
        </section>
   `,
    data() {
        return {
            highPrice: 0,
            book: '',
            nextBookId: null,
            previousBookId: null
        }
    },
    computed: {
        bookDescription() {
            if (!this.book.description) {
                return this.book.volumeInfo.description;
            }else {
                return this.book.description;
            }
        },
        getPageCount() {
            let pageCount = this.book.pageCount;
            if (!pageCount) {
                pageCount = this.book.volumeInfo.pageCount;
            }
            if (pageCount >= 500) {
                return 'Long Reading (+500)'
            } else if (pageCount >= 200) {
                return 'Decent Reading (+200)'
            } else {
                return 'Light Reading'
            }
        },
        getAuthors() {
            let authors = this.book.authors
            if (!authors) {
                authors = this.book.volumeInfo.authors
            }else
            return authors.join(' , ');
        },
        getPublishDate() {
            let publishDate = this.book.publishedDate;
            if(!publishDate){
                publishDate = Number(this.book.volumeInfo.publishedDate.substr(0,3));
            }
            var today = new Date();
            var currYear = today.getFullYear();
            if (currYear - publishDate >= 10) {
                return 'Veteran Book (10+)'
            } else if (currYear - publishDate <= 1) {
                return 'NEW! (this Year)'
            }
        },
        getBookPrice() {
            if (this.book.listPrice.amount >= 150) {
                this.highPrice = 2;
            } else if (this.book.listPrice.amount <= 50) {
                this.highPrice = 1;
            } else {
                this.highPrice = 0;
            }
            return this.book.listPrice.amount
        },
        setPriceColor() {
            if (this.highPrice === 1) {
                return 'green'
            } else if (this.highPrice === 2) {
                return 'red'
            }
        },
        isOnSale() {
            if (this.book.listPrice.isOnSale) {
                return 'onSaleImg'
            }
        },

    },
    created() {
        this.loadBook()
    },
    methods: {
        loadBook() {
            const { bookId } = this.$route.params;

            bookService.getById(bookId)
                .then(book => {
                    this.book = book;

                    bookService.getNextBookId(this.book.id)
                      .then(bookId => {
                          this.nextBookId = bookId;
                      })

                    bookService.getPreviousBookId(this.book.id)
                      .then(bookId => {
                          this.previousBookId = bookId;
                      })
                })
        },
        close() {
            this.$emit('close', []);
            this.$router.push('/book')
        },
        deleteReview(reviewId) {
            for (let i = 0; i < this.book.reviews.length; i++) {
                const reviewToDelete = this.book.reviews[i];
                if (reviewToDelete.id === reviewId) {
                    eventBus.$emit('showMsg', {type:'delete', txt: `Review by: ${reviewToDelete.readerName} was Deleted !`});
                    this.book.reviews.splice(i, 1);
                    bookService.saveGBooks()
                }
            }
        },
        onNewReview() {
            const { bookId } = this.$route.params;

            bookService.getById(bookId)
                .then(book => {
                    this.book = { ...book };
                })
        }

    },
    components: {
        longText,
        reviewAdd
    },
    watch: {
        '$route.params.bookId'(newBookId) {
            // console.log('Book ID CHANGED IN ROUTE', newBookId);
            this.loadBook();
        }
    }
};