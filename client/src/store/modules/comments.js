import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL



const state = () => ({
  comments: [],
})


const mutations = {
  GET_COMMENTS(state, comments) {
    state.comments = comments
  },
  DELETE_COMMENT(state, commentId) {
    const idx = state.comments.findIndex(comment => {
      return comment.id === commentId
    })
    state.comments.splice(idx, 1)
  },
  UPDATE_COMMENT(state, {commentId, content}) {
    state.comments = state.comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            content: content
          }
        } else {
          return comment
        }
    })
  }
}

const actions = {
  get_comments({ commit }, tmdbId) {
    const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
    const URL = `${process.env.VUE_APP_API_URL}movies/${tmdbId}/comment/`
    axios.get(URL, {
      headers: headers
    }) 
      .then(res => {
        console.log(res)
        commit('GET_COMMENTS', res.data)
      }) 
      .catch(err => {
        console.log(err)
      })
  }
  ,
  create_comment({ dispatch }, { tmdbId, content }) {
    const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
    const URL = `${process.env.VUE_APP_API_URL}movies/${tmdbId}/comment/`
    axios.post(URL, {
      content
    },{
      headers: headers
    })
      .then(res => {
        console.log(res)
        dispatch('get_comments', tmdbId)
      })
      .catch(err => {
        console.log(content)
        console.log(err)
      })
  },
  delete_comment({ commit }, {tmdbId, commentId}) {
    const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
    const URL = `${process.env.VUE_APP_API_URL}movies/${tmdbId}/comment/${commentId}/`
    axios.delete(URL, {
      headers: headers,
    })
      .then(res => {
        console.log(res)
        commit('DELETE_COMMENT', commentId)
      })
      .catch(err => {
        console.log(err)
      })
  },
  update_comment({ commit }, {tmdbId, commentId, content}){
    const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
    const URL = `${process.env.VUE_APP_API_URL}movies/${tmdbId}/comment/${commentId}/`
    axios.put(URL, { content }, { headers: headers })
      .then(res => {
        console.log(res)
        commit('UPDATE_COMMENT', {commentId, content})
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
}
