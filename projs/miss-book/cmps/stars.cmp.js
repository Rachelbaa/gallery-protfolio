

export default {
    props: ['starNum'],
    template: `
    <div>
        <img class="star" @click="fullStar(1)" :src="isFullStar(1)" />
        <img class="star" @click="fullStar(2)" :src="isFullStar(2)" />                  
        <img class="star" @click="fullStar(3)" :src="isFullStar(3)" />
        <img class="star" @click="fullStar(4)" :src="isFullStar(4)" />
        <img class="star" @click="fullStar(5)" :src="isFullStar(5)" />
    </div>
    `,
    data() {
        return {
           clickedStarNum: 0,
           clicked: false
        }
    },
    computed: {
      
    },
    methods:{
        fullStar(num) {
            this.clicked = true;
            this.clickedStarNum = num;
            this.$emit('setStarNum', this.clickedStarNum)
        },
        isFullStar(num) {
            if (this.starNum === 0) {
                this.clicked = false;
            }
            if (!this.clicked) {
                return './img/empty-star.png';
            }
            if (num <= this.clickedStarNum) {
               return './img/full-star.png';
            }else {
                return './img/empty-star.png';
            }
        }
    },
    created() {

    }
}