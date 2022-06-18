import { bookService } from '../services/book.servies.js';
import {eventBus} from '../services/event-bus.service.js'; 
// import starsRating from '/cmps/stars.cmp.js'
import starsRating from '../cmps/stars.cmp.js'

export default {
    props: ['bookId'],
    template: `
        <form @submit.prevent="saveReview" class="review-add">
            <h2 class="reviewAdd-title">Add Review :</h2>
            <input type="text" ref="input" placeholder="Books Reader" v-model.trim="reviewToAdd.readerName"/>
            <stars-rating :starNum="currStarNum" @setStarNum="onSetStarNum"></stars-rating>
            <input type="date" v-model="reviewToAdd.date"/>
            <textarea type="textarea" placeholder="Free Text..." v-model.trim="reviewToAdd.text"/>
            <button :disabled="!isValid">Add</button>
        </form>
    `,
    data() {
        return {
           currStarNum: 0,
           reviewToAdd: bookService.getEmptyReview()
        }
    },
    created() {

    },
    computed: {
       isValid() {
           return (this.currStarNum > 0 && this.reviewToAdd.date)
       }
    },
    methods: {
        onSetStarNum(starNum) {
           this.currStarNum = starNum;
           this.reviewToAdd.starNum = starNum;
        },
        saveReview() {
            bookService.addReview(this.bookId ,this.reviewToAdd);
            eventBus.$emit('showMsg', {type:'success', txt: `Review by: ${this.reviewToAdd.readerName} was added Seccessfuly !`});
            this.reviewToAdd = bookService.getEmptyReview();
            this.currStarNum = 0;
            this.$emit('newReview')
        }
    },
    components: {
        starsRating
    }
}