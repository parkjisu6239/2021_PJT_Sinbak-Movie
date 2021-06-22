import Vue from 'vue'
import Vuex from 'vuex'
import accounts from './modules/accounts'
import comments from './modules/comments'
import movies from './modules/movies'
import recomments from './modules/recomments'
import userinfos from './modules/userinfos'
import moviedetails from './modules/moviedetails'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    accounts,
    comments,
    movies,
    recomments,
    userinfos,
    moviedetails
  }
})
