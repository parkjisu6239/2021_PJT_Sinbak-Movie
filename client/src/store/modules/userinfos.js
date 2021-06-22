import axios from 'axios'
import router from '@/router'

const state = () => ({
  followInfo: {},
})


const mutations = {
  GET_FOLLOW(state, followInfo){
    state.followInfo = followInfo
  }
}

const actions = {
  
  getUserinfo({ commit }) {
    const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
    axios.get(`${process.env.VUE_APP_API_URL}accounts/users/`, {
      headers: headers
    })
      .then(res => {
        console.log(res)
        commit('GET_USER_INFO', res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  setUserInfo({ dispatch }, newInfo) {
    const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
    axios.put(`${process.env.VUE_APP_API_URL}accounts/users/`, { newInfo }, { headers: headers })
      .then(res => {
        console.log(res)
        dispatch('accounts/logout', null, { root: true })
        router.push({ name: 'Login' })
        
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteUser({ dispatch }) {
    const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
    axios.delete(`${process.env.VUE_APP_API_URL}accounts/users/`, {
      headers: headers
      })
      .then(res => {
        console.log(res)
        dispatch('accounts/logout', null, { root: true })
        // router.push({ name: 'Login' })
      })
      .catch(err => {
        console.log(err)
      })
  },
  passwordChange({ dispatch }, credentials) {
    const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
    axios.put(`${process.env.VUE_APP_API_URL}accounts/password-change/`, { credentials }, { headers: headers })
      .then(res => {
        console.log(res)
        dispatch('accounts/logout', null, { root: true })
      })
      .catch(err => {
        console.log(err)
      })
  },
  getFollow({ commit }, username) {
    const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
    axios.get(`${process.env.VUE_APP_API_URL}accounts/${username}/follow/`, { headers: headers })
      .then(res => {
        console.log(res)
        commit('GET_FOLLOW', res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  setFollow({ dispatch }, username) {
    const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
    axios.post(`${process.env.VUE_APP_API_URL}accounts/${username}/follow/`, {}, { headers: headers })
      .then(res => {
        console.log(res)
        dispatch('getFollow', username)
      })
      .catch(err => {
        console.log(err)
      })
  },
}

export default {
  namespaced: true,
  actions,
  state,
  mutations
}