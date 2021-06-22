<template>
  <div class="ms-5">
    <Loading :delayTime="1500"/>
    <br>
    <p>"{{ $route.query.q }}"의 검색결과입니다.</p>
    <hr>
    <div class="row row-cols-auto gy-5 justify-content-start">
      <div class="col mx-1" v-for="result in results" :key="result.id">
        <div class="popup-container">
          <MovieCard :movie="result" @click.native="MoveDetail(result.id)" style="cursor: pointer" class="item"/>
        </div>
      </div>
    </div>
    <div v-if="!results.length">
      <div style="height: 12rem"></div>
      검색결과가 없습니다.
      <div style="height: 10rem"></div>
    </div>
    <div style="height: 20px"></div>
    <hr>
    <h2>Similar Movie </h2>
    <div v-if="results.length">
      <hooper :itemsToShow="8" :itemsToSlide="2" :infiniteScroll="true" :wheelControl="false" style="height: 24rem">
        <slide v-for="similar in similars" :key="similar.id" class="popup-container ms-1">
          <SimilarMovieItem :simiarMovie="similar" @click.native="MoveDetail(similar.id)" class="item" style="cursor: pointer"/>
        </slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>
      </hooper>
    </div>
    <div v-if="!results.length | !similars.length">
      <div style="height: 150px"></div>
      검색결과가 없습니다.
      <div style="height: 179px"></div>
    </div>

    <div style="height: 2rem"></div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '@/router'

import MovieCard from '@/components/MovieCard'
import SimilarMovieItem from '@/components/MovieDetailElements/SimilarMovieItem.vue'
import Loading from '@/components/Loading'

import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper'
import 'hooper/dist/hooper.css';

export default {
  name: 'MovieSearchResult',
  data() {
    return {
      results: {},
      similars: {}
    }
  },
  components: {
    Loading,
    MovieCard,
    SimilarMovieItem,
    Hooper,
    Slide,
    HooperNavigation
  },
  methods: {
    search() {
      const searchUrl = `${process.env.VUE_APP_TMDB_API_URL}search/movie?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=ko-KR&query=${this.$route.query.q}`
      axios.get(searchUrl)
        .then(res => {
          console.log(res.data)
          this.results = res.data.results
          const one = res.data.results[0].id
          
          const similarUrl = `${process.env.VUE_APP_TMDB_API_URL}movie/${ one }/similar?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=ko-KR`
          axios.get(similarUrl)
          .then((res) => {
            console.log(res)
            this.similars = res.data.results.map( similar => {
               if (similar.poster_path) {
                return {
                  ...similar,
                  poster_path: `https://image.tmdb.org/t/p/original/${similar.poster_path}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`,
                }
              } else {
                return similar
              }
            })
          })
          .catch(err => {
            console.log(err)
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    MoveDetail(movieId){
      router.push({ name: 'MovieDetail', params: { id: movieId } })
    }
  },
  created() {
    this.search()
  },
  watch: {
    $route() {
      this.search()
    }
  }
}
</script>

<style>
.popup-container {
  display: flex;
  margin-top: 50px;
}

/* .popup-container:focus-within .item,
.popup-container:hover .item {
  transform: translateX(-25%);
} */

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

/* .item:focus ~ .item,
.item:hover ~ .item {
  transform: translateX(25%);
} */

.item img {
  display: block;
  max-width: 100%;
}
</style>