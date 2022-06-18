export default {
    props: ['book'],
    template: `
        <router-link class="rl-bookList" :to="'/book/'+ book.id">
          <li class="book-list clean-list text-center">
            <h3>{{setBookT}}</h3>
            <p>{{book.listPrice.amount}} {{book.listPrice.currencyCode}}</p>
          </li>
        </router-link>
  `,
  computed: {
    setBookT() {
      return (this.book.title.length > 27) ?  this.book.title.substr(0,27) +'...' : this.book.title
    }
  }
};