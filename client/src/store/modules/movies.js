import axios from 'axios'

const state = () => ({
  popularMovieList: {},
  nowPlayingMovieList: {},
  trendingMovieList: {},
  billboard: {},
  trailer: '',
})

const mutations = {
  GET_POPULAR(state, popularMovie) {
    state.popularMovieList = popularMovie
  },
  GET_NOW_PLAYING(state, nowPlayingMovie) {
    state.nowPlayingMovieList = nowPlayingMovie
  },
  GET_TRENDING(state, trendingMovie) {
    state.trendingMovieList = trendingMovie
  },
  GET_BILLBOARD(state, billboardMovie){
    state.billboard = {
      ...billboardMovie,
      backdrop_path: `https://image.tmdb.org/t/p/original/${billboardMovie.backdrop_path}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`,
      poster_path: `https://image.tmdb.org/t/p/original/${billboardMovie.poster_path}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`,
    }
    state.billboardTitle = billboardMovie.title
  },
  GET_TRAILER(state, trailer) {
    state.trailer =  `http://www.youtube.com/embed/${trailer.id.videoId}`
  }
}


const actions = {
  getPopular({ commit }) {
    const popularUrl = `${process.env.VUE_APP_TMDB_API_URL}movie/popular?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=ko-KR`
    axios.get(popularUrl)
      .then(res => {
        console.log(res.data.results)
        commit('GET_POPULAR', res.data.results)
      })
      .catch(err => {
        console.log(err)
      })
  },
  getNowPlaying({ commit }) {
    const nowPlayingUrl = `${process.env.VUE_APP_TMDB_API_URL}movie/now_playing?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=ko-KR`
    axios.get(nowPlayingUrl)
      .then(res => {
        console.log(res.data.results)
        commit('GET_NOW_PLAYING', res.data.results)
      })
      .catch(err => {
        console.log(err)
      })
  },
  getTrending({ commit }) {
    const trendingUrl = `${process.env.VUE_APP_TMDB_API_URL}trending/movie/week?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=ko-KR`
    axios.get(trendingUrl)
      .then(res => {
        console.log(res.data.results)
        commit('GET_TRENDING', res.data.results)
        commit('GET_BILLBOARD', res.data.results[0])
        return res.data.results[0].title
      })
      .then(res => {
        const query = `${res} trailer`
        console.log(res)

        const params = {
          key: process.env.VUE_APP_YOUTUBE_API_KEY,
          part: 'snippet',
          q: query,
          type: 'video',
        }

        const Url = `${process.env.VUE_APP_YOUTUBE_API_URL}`

        axios.get(Url, { params })
        .then( res => {
          console.log(Url, params, res.data)
          commit('GET_TRAILER', res.data.items[0])
        })
        .catch( err => {
          console.log(err)
        })

      })
      .catch(err => {
        console.log(err)
      })
  },
}


export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
