import axios from 'axios'

const state = () => ({
  movieInfo: null,
  movieImgs: {},
  similarMovies: {},
  actors: [],
  directers: [],
  liked: null,
  count: 0,
  rate: 0,
  rateAvg: 0,
})

const getters = {
  transformedCount ({ count }) {
    if ( count > 1000 ) {
      const trans = count / 1000
      return String(trans.toFixed(1)) + 'K'
    } else {
      return count
    } 
  }
}

const mutations = {
  GET_MOVIE_DETAIL(state, movie){
    state.movieInfo = {
      ...movie,
      backdrop_path: `https://image.tmdb.org/t/p/original${movie.backdrop_path}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`,
      poster_path: `https://image.tmdb.org/t/p/original${movie.poster_path}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`,
    }
  },
  GET_MOVIE_IMAGES(state, movieImgs){
    state.movieImgs = movieImgs.map(img => {
      return `https://image.tmdb.org/t/p/original/${ img.file_path }?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
    })
  },
  GET_SIMILAR_MOVIES(state, similarMovies){
    state.similarMovies = similarMovies.map(similarMovie => {
      return {
        ...similarMovie,
        backdrop_path: `https://image.tmdb.org/t/p/original/${similarMovie.backdrop_path}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`,
        poster_path: `https://image.tmdb.org/t/p/original/${similarMovie.poster_path}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`,
      }
    })
  },
  GET_ACTORS(state, actors){
    state.actors = actors.map(actor => {
      if (actor.profile_path) {
        return {
          ...actor,
          profile_path: `https://image.tmdb.org/t/p/original${actor.profile_path}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`,
        }
      } else {
        return {
          ...actor
        }
      }
    });
  },
  GET_DIRECTERS(state, directers){
    state.directers = directers.filter(directer => directer.known_for_department === 'Directing').map(directer => {
      if (directer.profile_path) {
        return {
          ...directer,
          profile_path: `https://image.tmdb.org/t/p/original${directer.profile_path}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`,
        }
      } else {
        return {
          ...directer
        }
      }
    });
  },
  GET_SET_LIKE(state, { liked, count }){
    state.liked = liked
    state.count = count
  },
  GET_SET_RATE(state, rate){
    state.rate = rate
  },
  GET_LIKE_RATE(state, { liked, rate, count, rate_avg }){
    state.rate = rate
    state.liked = liked
    state.count = count
    state.rateAvg = rate_avg
  },
}

const actions = {
  getMovieDetail({ state, commit }, movieId) {
    const movieUrl = `${process.env.VUE_APP_TMDB_API_URL}movie/${movieId}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=ko-kr`
    axios.get(movieUrl)
      .then(res => {
        commit('GET_MOVIE_DETAIL', res.data)
      })
      .then(() => {
        const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
        axios.post(`${process.env.VUE_APP_API_URL}movies/${Number(movieId)}/`, 
          {
            'backdrop_path': state.movieInfo.backdrop_path,
            'title': state.movieInfo.title,
            'poster_path': state.movieInfo.poster_path,
          },
          {
            headers: headers
          })
      })
      .catch(err => {
        console.log(err)
      })
  },
  getMovieImages({ commit }, movieId) {
    const movieImageUrl = `${process.env.VUE_APP_TMDB_API_URL}movie/${movieId}/images?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
    axios.get(movieImageUrl)
      .then(res => {
        commit('GET_MOVIE_IMAGES', res.data.backdrops.slice(0, 10))
      })
      .catch(err => {
        console.log(err)
      })
  },
  getSimilarMovies({ commit }, movieId){
    const similarUrl = `${process.env.VUE_APP_TMDB_API_URL}movie/${ movieId }/similar?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=ko-KR`
    axios.get(similarUrl)
      .then((res) => {
        commit('GET_SIMILAR_MOVIES', res.data.results)
      })
      .catch(err => {
        console.log(err)
      })
  },
  getCredits({ commit }, movieId){
    const creditUrl = `${process.env.VUE_APP_TMDB_API_URL}movie/${ movieId }/credits?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=ko-KR`
    axios.get(creditUrl)
      .then((res) => {
        console.log(res.data.cast)
        commit('GET_ACTORS', res.data.cast)
        commit('GET_DIRECTERS', res.data.crew)
      })
      .catch(err => {
        console.log(err)
      })
  },
  getMovieLike({ commit }, movieId) {
    const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
    axios.get(`${process.env.VUE_APP_API_URL}movies/${Number(movieId)}/like/`, {headers: headers})
      .then(res => {
         console.log(res)
        commit('GET_SET_LIKE', res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  setMovieLike({ commit, state }, movieId) {
    const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
    axios.post(`${process.env.VUE_APP_API_URL}movies/${Number(movieId)}/like/`, {
      title: state.movieInfo.title,
      poster_path: state.movieInfo.poster_path,
      headers: headers
      }, { headers: headers })
      .then(res => {
        console.log(res)
        commit('GET_SET_LIKE', res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  getMovieRate({ commit }, movieId) {
    const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
    axios.get(`${process.env.VUE_APP_API_URL}movies/${Number(movieId)}/rate/`, {headers: headers})
      .then(res => {
        console.log(res)
        commit('GET_SET_RATE', res.data.rate)
      })
      .catch(err => {
        console.log(err)
      })
  },
  setMovieRate({ commit, state }, {movieId, rate}) {
    const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
    axios.post(`${process.env.VUE_APP_API_URL}movies/${Number(movieId)}/rate/`, {
      rate: rate,
      title: state.movieInfo.title,
      poster_path: state.movieInfo.poster_path,
    }, { headers: headers })
      .then(res => {
        console.log(res)
        commit('GET_SET_RATE', res.data.rate)
      })
      .catch(err => {
        console.log(err)
      })
  },
  getMovieLikeRate({ commit }, movieId) {
    const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
    axios.get(`${process.env.VUE_APP_API_URL}movies/${Number(movieId)}/like/rate/`, {headers: headers})
      .then(res => {
        console.log(res)
        commit('GET_LIKE_RATE', res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}


export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
