<template>
  <div>
    <div class="d-flex justify-content-between align-items-center m-2">
      <star-rating @rating-selected="setRating" :rating="rating" :show-rating="false" :star-size="32"></star-rating>
      <span class="mt-2">{{ rating }}</span>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import { mapActions } from 'vuex'

export default {
  name: 'MovieRate',
  components: {
    StarRating
  },
  props: {
    rating: {
      type: Number
    }
  },
  methods: {
    ...mapActions('moviedetails',[
      'setMovieRate',
      'getMovieLikeRate'
    ]),  
    setRating(rate){
      this.setMovieRate({movieId: this.$route.params.id, rate})
      this.getMovieLikeRate(this.$route.params.id)
    },
  }
}
</script>

<style>

</style>