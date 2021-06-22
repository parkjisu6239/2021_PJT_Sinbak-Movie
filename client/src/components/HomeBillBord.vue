<template>
  <div v-if="billboard.overview" id="billboard" class="text-end me-2">
    <div class="d-flex justify-content-between shadow mb-5 rounded">
      <div :style="allStlye">
        <img :src="billboard.backdrop_path" :alt="billboard.title" style="height: 40rem; visibility: hidden;">
      </div>
      <div class="me-5 mt-4">
        <h6>이번주 인기 급상승 영화  <span class="badge bg-warning text-dark">No.1</span></h6>
        <h2>{{ billboard.title }} ({{ billboard.original_title }})</h2>
        <h5 class="d-flex justify-content-end align-items-center">
          <div class="me-2">개봉일 {{ billboard.release_date }} |</div>
          <div class="me-4">국가 {{ billboard.original_language }}</div>
          <button @click="MoveDetail(billboard.id)" class="btn btn-outline-success btn-sm" style="color: #7eca9c;">Get Detail</button>
        </h5>
        <hr>
        <div v-for="(sentence, index) in billboard.overview.split('. ')" :Key="sentence">
          <div v-if="index === billboard.overview.split('. ').length-1" style="width: 40rem; font-weight: 100;">{{ sentence }}</div>
          <div v-else style="width: 40rem; font-weight: 100;">{{ sentence }}.</div>
        </div>
        <br>
        <iframe 
          :src="trailer" 
          frameborder="0"
          width="640" height="360"
          >
        </iframe>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import router from '@/router'

export default {
  name: 'HomeBillBord',
  props: {
    movie: {
      type: Object
    }
  },
  methods:{
    MoveDetail(movieId){
      router.push({ name: 'MovieDetail', params: { id: movieId } })
    }
  },
  computed: {
    ...mapState('movies', [
      'billboard',
      'trailer',
    ]),
    allStlye() {
      return {
        'background-image': `linear-gradient(to right, transparent, rgba(20, 20, 20, 0.1), rgba(20, 20, 20, 0.5), rgba(20, 20, 20, 0.7), rgba(20, 20, 20)), url('${this.billboard.backdrop_path}')`, 
        'background-repeat':'no-repeat',
        'background-size': 'auto 40rem',
        'background-position': 'center top',
      }
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700&display=swap');
/* .poster-img {
  width: auto;
  height: 18rem;
  border-radius: 4px;
  object-fit: fill;
} */

#billboard {
  font-weight: 300;
}

</style>