<template>
  <div>
    <h2 class="mb-0"> Similar Movie </h2>
    <hooper :itemsToShow="6" :itemsToSlide="2" :infiniteScroll="true" :wheelControl="false" style="height: 380px">
      <slide v-for="simiarMovie in similarMovies" :key="simiarMovie.id" class="popup-container ms-1">
        <SimilarMovieItem :simiarMovie="simiarMovie" @click.native="MoveDetail(simiarMovie.id)" style="cursor: pointer"/>
      </slide>
      <hooper-navigation slot="hooper-addons"></hooper-navigation>
    </hooper>
    <div style="height: 20px;"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import SimilarMovieItem from '@/components/MovieDetailElements/SimilarMovieItem.vue'
import router from '@/router'

import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper'
import 'hooper/dist/hooper.css';

export default {
  name: 'SimilarMovieList',
  components: {
    SimilarMovieItem,
    Hooper,
    Slide,
    HooperNavigation
  },
  computed: {
    ...mapState('moviedetails', [
      'similarMovies'
    ])
  },
  methods: {
    MoveDetail(movieId){
      router.push({ name: 'MovieDetail', params: { id: movieId } })
    }
  }
}
</script>

<style>
.popup-container {
  display: flex;
  margin-top: 50px;
}

.popup-container .item:focus,
.popup-container .item:hover {
  transform: scale(1.15);
  z-index: 1;
}

.item {
  position: relative;
  display: block;
  flex: 1 1 0px;
  transition: transform 500ms;
}

.item img {
  display: block;
  max-width: 100%;
}
</style>