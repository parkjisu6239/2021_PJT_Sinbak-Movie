<template>
  <div class="movie-card">
    <div class="mx-1">
      <img class="poster-img" :src="URL" :alt="userLikedMovie.title" @click="ShowDetail" @mouseover="cursorChange" @mouseleave="cursorChange" :class="{ mouseOverPointing: mouseOver }">
      <div class="mt-1">
        <div class="text-truncate" style="max-width: 12rem;">{{ userLikedMovie.title }}</div>
        <span style="color: pink">
        </span>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'LikedMovie',
  data() {
    return {
      URL: `https://image.tmdb.org/t/p/w200/${this.userLikedMovie.poster_path}?api_key=${process.env.VUE_APP_API_KEY}`,
      mouseOver: false,
    }
  },
  props: {
    userLikedMovie: {
      type: Object,
    }
  },
  methods: {
    ShowDetail(event) {
      console.log(event)
      router.push({name: 'MovieDetail', params:{ id: this.userLikedMovie.tmdb_id }})
    },
    cursorChange() {
      this.mouseOver = !this.mouseOver
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