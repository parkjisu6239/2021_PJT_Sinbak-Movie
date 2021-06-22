<template>
  <div class="movie-card">
    <div class="mx-1">
      <img class="poster-img" :src="URL" :alt="userRatedMovie.title" @click="ShowDetail" @mouseover="cursorChange" @mouseleave="cursorChange" :class="{ mouseOverPointing: mouseOver}">
      <div class="mt-1">
        <div class="text-truncate" style="max-width: 12rem;">{{ userRatedMovie.title }}</div>
        <div style="color: #7eca9c" class="d-flex">
          <span class="me-2 mt-1">내 별점</span>
          <star-rating :read-only="true" :show-rating="false" :rating="userRatedMovie.rate" :star-size="15"></star-rating>
        </div>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import router from '@/router'


export default {
  name: 'RatedMovie',
  data() {
    return {
      URL : `https://image.tmdb.org/t/p/w200/${this.userRatedMovie.poster_path}?api_key=${process.env.VUE_APP_API_KEY}`,
      mouseOver: false
    }
  },
  components: {
    StarRating
  },
  props: {
    userRatedMovie: {
      type: Object
    }
  },
  methods: {
    cursorChange() {
      this.mouseOver = !this.mouseOver
    },
    ShowDetail() {
      router.push({name: 'MovieDetail', params:{ id: this.userRatedMovie.tmdb_id }})
    },
  }
}
</script>

<style scoped>
.mouseOverPointing {
  cursor: pointer;
}

.rate {
  color: orange;
}
.movie-card {
  text-align: start;
}
.poster-img {
  width: auto;
  height: 18rem;
  border-radius: 4px;
  object-fit: fill;
}
</style>