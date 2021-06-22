import axios from 'axios'

const state = () => ({
  recomments: [],
})


const mutations = {
  GET_RECOMMENTS(state, recomments) {
    state.recomments = recomments
  },
}

const actions = {
  get_recomments({ commit }, commentId) {
    const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
    const URL = `${process.env.VUE_APP_API_URL}movies/${commentId}/recomment/`
    axios.get(URL, {
      headers: headers
    }) 
      .then(res => {
        console.log(res)
        commit('GET_RECOMMENTS', res.data)
      }) 
      .catch(err => {
        console.log(err)
      })
  }
  ,
  create_recomment({ dispatch }, {commentId, content}) {
    const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
    const URL = `${process.env.VUE_APP_API_URL}movies/${commentId}/recomment/`
    axios.post(URL, {content}, {headers: headers})
      .then(res => {
        console.log(res)
        dispatch('get_recomments', commentId)
        
      })
      .catch(err => {
        console.log(content)
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
