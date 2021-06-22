<template>
  <div>
    <Loading :delayTime="2000"/>
    <div v-if="movieInfo" :style="allStlye">
      <div class="container">
        <div style="height: 30rem;">
        </div>
        <MovieDetailHeader/>
        <hr>
        <div class="d-flex justify-content-between">
          <MovieDetailLeftSide/>
          <div class="ms-5">
            <MovieDetailContent/>
            <hr>
            <MovieDatailOverview/>
          </div>
        </div>
        <hr>
        <SimilarMovieList/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import MovieDetailHeader from '@/components/MovieDetailElements/MovieDetailHeader.vue'
import MovieDetailLeftSide from '@/components/MovieDetailElements/MovieDetailLeftSide.vue'
import MovieDetailContent from '@/components/MovieDetailElements/MovieDetailContent.vue'
import MovieDatailOverview from '@/components/MovieDetailElements/MovieDatailOverview.vue'
import SimilarMovieList from '@/components/MovieDetailElements/SimilarMovieList.vue'
import Loading from '@/components/Loading'

export default {
  name: 'MovieDetail',
   components:{
    Loading,
    MovieDetailHeader,
    MovieDetailLeftSide,
    MovieDetailContent,
    MovieDatailOverview,
    SimilarMovieList,
  },
  computed: {
    ...mapState('moviedetails', [
      'movieInfo',
      'movieImgs',
      'similarMovies',
    ]),
    allStlye() {
      if (this.movieInfo) {
        return {
          'background-image': `linear-gradient(to bottom, transparent, rgba(20, 20, 20, 0.45), rgba(20, 20, 20, 0.8), rgba(20, 20, 20, 0.95), rgb(20, 20, 20), rgb(20, 20, 20),  rgb(20, 20, 20)), url('${this.movieInfo.backdrop_path}')`, 
          'background-repeat':'no-repeat',
          'background-size': '100% auto',
          'background-position': 'center top'
        }
      } else {
        return {}
      }
    }
  },
  methods: {
    ...mapActions('moviedetails', [
      'getMovieDetail',
      'getMovieImages',
      'getSimilarMovies',
      'getCredits',
      'getMovieLikeRate'
    ])
  },
  created() {
    this.getMovieDetail(this.$route.params.id)
    this.getMovieImages(this.$route.params.id)
    this.getSimilarMovies(this.$route.params.id)
    this.getCredits(this.$route.params.id)
    this.getMovieLikeRate(this.$route.params.id)
  },
  watch: {
    $route() {
      this.getMovieDetail(this.$route.params.id)
      this.getMovieImages(this.$route.params.id)
      this.getSimilarMovies(this.$route.params.id)
      this.getCredits(this.$route.params.id)
      this.getMovieLikeRate(this.$route.params.id)
    }
  }
}
</script>

<style>

</style>