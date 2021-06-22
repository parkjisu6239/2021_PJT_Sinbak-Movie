<template>
  <div>
    <HomeBillBord/>
    <div class="mx-3 mt-3" >
      <h2 class="text-start">Popular</h2>
      <div class="mb-4 mx-3">
        <hooper :itemsToShow="8" :itemsToSlide="1" :infiniteScroll="true" :wheelControl="false" style="height: 435px;">
          <slide v-for="popularMovie in popularMovieList" :key="popularMovie.id" class="popup-container me-1">
            <MovieCard 
              :movie="popularMovie" 
              @click.native="MoveDetail(popularMovie.id)" 
              style="cursor: pointer"
            />
          </slide>
          <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </hooper>
      </div>

      <h2 class="text-start">Now Playing</h2>
      <div class="mb-4 mx-3">
        <hooper :itemsToShow="8" :itemsToSlide="1" :infiniteScroll="true" :wheelControl="false" style="height: 435px;">>
          <slide v-for="nowPlayingMovie in nowPlayingMovieList" :key="nowPlayingMovie.id" class="popup-container me-1">
            <MovieCard :movie="nowPlayingMovie" @click.native="MoveDetail(nowPlayingMovie.id)" style="cursor: pointer"/>
          </slide>
          <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </hooper>
      </div>

      <h2 class="text-start">Weekly Hot</h2>
      <div class="mb-4 mx-3">
        <hooper :itemsToShow="8" :itemsToSlide="1" :infiniteScroll="true" :wheelControl="false" style="height: 435px;">>
          <slide v-for="trendingMovie in trendingMovieList" :key="trendingMovie.id" class="popup-container me-1">
            <MovieCard :movie="trendingMovie" @click.native="MoveDetail(trendingMovie.id)" style="cursor: pointer"/>
          </slide>
          <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </hooper>
      </div>
    </div>
    <div style="height: 1rem">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import MovieCard from '@/components/MovieCard'
import HomeBillBord from '@/components/HomeBillBord'
import router from '@/router'
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper'
import 'hooper/dist/hooper.css';
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    MovieCard,
    HomeBillBord,
    Hooper,
    Slide,
    HooperNavigation,
  },
  computed: {
    ...mapState('movies',[
      'popularMovieList',
      'nowPlayingMovieList',
      'trendingMovieList',
    ])
  },
  methods: {
    ...mapActions('movies',[
      'getPopular',
      'getNowPlaying',
      'getTrending',
    ]),
    MoveDetail(movieId){
      router.push({ name: 'MovieDetail', params: { id: movieId } })
    },
  },
  created() {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=ba6f3ff96f5b9afd872b510c73aa2fb5&language=en-US&page=1')
      .then(res => {
        this.movieList = res.data.results.slice(0, 5)
      })
      .catch(err => {
        console.log(err)
      })
    this.getPopular()
    this.getNowPlaying()
    this.getTrending()
  },
}
</script>
<style scoped>
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
