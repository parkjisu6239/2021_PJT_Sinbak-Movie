<template>
  <div>
    <div style="height: 50px"></div>
    <div v-if="userLikedMovies.length">
      <Loading :delayTime="500"/>
      <div v-if="!selected" style="height: 823px">
        <p>최근에 좋아요를 누른 영화 입니다. 가장 마음에 드는 영화 한가지를 클릭해주세요!</p>
        <div class="d-flex justify-content-center">
          <div v-for="userLikedMovie in userLikedMovies" :key="userLikedMovie.tmdb_id" class="popup-container">
            <MovieCard 
              @click.native="getRecommendation(userLikedMovie.tmdb_id, userLikedMovie.title)" 
              :movie="userLikedMovie" 
              style="cursor: pointer"
              class="item px-4"/>
          </div>
        </div>
      </div>
      <div v-else class="mx-5" style="height: 1350px">
        <Loading :delayTime="3000"/>
        <p>선택한 영화 "{{ selectedMovie }}" 의 추천영화입니다.</p>
        <div style="height: 50px;"></div>
        <div class="row row-cols-auto gy-5 ms-5">
          <div class="col my-4" v-for="movie in recommendationMovies" :key="movie.id">
            <div class="popup-container m-0">
              <MovieCard @click.native="MoveDetail(movie.id)" :movie="movie" style="cursor: pointer"  class="item px-2"/>
            </div>
          </div>
        </div>
        <div style="height: 50px"></div>
      </div>
    </div>
    <div v-else style="height: 823px">
      <p>좋아하는 영화가 없네요... 추천 영화를 보시려면, 좋아하는 영화에 <span class="badge bg-danger">Like ❤</span> 를 눌러보세요!</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MovieCard from '@/components/MovieCard'
import Loading from '@/components/Loading'

import router from '@/router'

export default {
  name: 'Recommendation',
  data() {
    return {
      userRatedMovies: [],
      userLikedMovies: [],
      recommendationMovies: [],
      selectedMovie: '',
      selected: false
    }
  },
  components: {
    MovieCard,
    Loading
  },
  methods: {
    getUserProfileInfo() {
      const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
      axios.get(`${process.env.VUE_APP_API_URL}accounts/${localStorage.getItem('username')}/user/movies/`, {
        headers: headers
      })
        .then(res => {
          console.log(res)
          this.userRatedMovies = res.data[0].slice(-7)
          this.userLikedMovies = res.data[1].slice(-7)
        })
    },
    getRecommendation(movieId, title) {
      this.selectedMovie = title
      this.selected = true
      const recommedationUrl = `${process.env.VUE_APP_TMDB_API_URL}movie/${movieId}/recommendations?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=ko-kr`
      axios.get(recommedationUrl)
        .then(res => {
          this.recommendationMovies = res.data.results.map(result => {
            return {
              ...result,
              backdrop_path: `https://image.tmdb.org/t/p/original/${result.backdrop_path}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`,
              poster_path: `https://image.tmdb.org/t/p/original/${result.poster_path}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`,
            }
          })
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    MoveDetail(movieId){
      router.push({ name: 'MovieDetail', params: { id: movieId } })
    },
  },
  created() {
    this.getUserProfileInfo(localStorage.getItem('username'))
  },
}
</script>

<style>
.popup-container {
  display: flex;
  margin-top: 50px;
}

.popup-container:focus-within .item,
.popup-container:hover .item {
  transform: translateX(-25%);
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

.item:focus ~ .item,
.item:hover ~ .item {
  transform: translateX(25%);
}

.item img {
  display: block;
  max-width: 100%;
}
</style>