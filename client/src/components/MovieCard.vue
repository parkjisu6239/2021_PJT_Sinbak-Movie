<template>
  <div class="item">
    <div class="movie-card">
      <!-- <div class="mx-1"> -->
      <img v-if="movieInfo.poster_path" class="poster-img" :src="movieInfo.poster_path" :alt="movieInfo.title">
      <div v-else class="poster-img-none">
        <div class="text-center" style="line-height: 100px;">no images</div>
        <div class="text-center">❌</div>
      </div>
      <!-- </div> -->
    </div>
    <div class="mt-1 card-text text-start">
      <div class="text-truncate" style="max-width: 12rem;">{{ movieInfo.title }}</div>
      <small v-if="movieInfo.release_date && movieInfo.original_language" >{{ movieInfo.release_date }} | {{ movieInfo.original_language }}</small>
      <br>
      <small v-if="movieInfo.vote_average">TMDB VOTE {{ movieInfo.vote_average }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  data() {
    return {
      isReady: true,
    }
  },
  props: {
    movie: {
      type: Object
    }
  },
  methods:{
  },
  computed: {
    movieInfo() {
      if (this.movie.poster_path) {
        return {
          ...this.movie,
          poster_path: `https://image.tmdb.org/t/p/original/${this.movie.poster_path}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`,
        }
      } else {
        return this.movie
      }
    }
  },
  mounted() {
    this.isReady = false
  }
}
</script>

<style scoped>
.movie-card {
  text-align: start;
}

.poster-img {
  width: auto;
  height: 18rem;
  border-radius: 4px;
  object-fit: fill;
}

.poster-img-none{
  width: 12rem;
  height: 18rem;
  border-radius: 4px;
  object-fit: fill;
  background-color: darkgrey;
}
</style>