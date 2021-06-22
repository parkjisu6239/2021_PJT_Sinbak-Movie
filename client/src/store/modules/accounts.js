import axios from 'axios'
import router from '@/router'

const state = () => ({
  accessToken: localStorage.getItem('access_token') || '',
  user: localStorage.getItem('user') || '',
  username: localStorage.getItem('username') || '',
  issuperuser: localStorage.getItem('issuperuser') || 'NO',
  signupError: '',
  errorMessage: '',
})


const getters = {
  isLoggedIn({ accessToken }) {
    return accessToken ? true : false
  },
}


const mutations = {
  DELETE_TOKEN(state) {
    state.accessToken = '' 
    state.user = '' 
    state.username = '' 
    state.issuperuser = 'NO'
  },
  UPDATE_TOKEN(state, {token, user, username}) {
    state.accessToken = token
    state.user = user
    state.username = username
  },
  UPDATE_SUPER_USER(state, issuperuser) {
    state.issuperuser = issuperuser
  },
  SIGNUP_ERROR_MESSAGE(state, msg) {
    state.signupError = msg
  },
  UPDATE_ERROR_MESSAGE(state, msg) {
    state.errorMessage = msg
  }
}

const actions = {
  signup({commit, dispatch}, credentials) {
    axios.post(`${process.env.VUE_APP_API_URL}accounts/signup/`, credentials)
      .then(res => {
        console.log(res)
        dispatch('login', credentials)
      })
      .catch(err => {
        console.log(err)
        commit('SIGNUP_ERROR_MESSAGE', '이미 사용중인 아이디입니다.')
      })
  },
  login({ commit }, credentials) {
    axios.post(`${process.env.VUE_APP_API_URL}token/`, credentials)
      .then(res => {
        // res.data.access => access_token
        const user = JSON.parse(atob(res.data.access.split('.')[1]))

        // localStroage에 저장.
        localStorage.setItem('access_token', res.data.access)
        localStorage.setItem('user', user.user_id)
        localStorage.setItem('username', credentials.username)

        // Token 
        commit('UPDATE_TOKEN', {token: res.data.access, user: user.user_id, username: credentials.username})
      })
      .then(() => {
        const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
        axios.get(`${process.env.VUE_APP_API_URL}accounts/issuperuser/`, {
          headers: headers,
        })
          .then(res => {
            localStorage.setItem('issuperuser', res.data.data)
            commit('UPDATE_SUPER_USER', res.data.data)
          })
          .catch(err => {
            console.log(err)
          })
        })
      .then(() => {
        commit('UPDATE_ERROR_MESSAGE', '')
        commit('SIGNUP_ERROR_MESSAGE', '')
        router.push({ name: 'Home' })
      })
      .catch(err => {
        console.log(err)
        commit('UPDATE_ERROR_MESSAGE', '로그인 정보가 잘못되었습니다.')
      })
  },
  logout({ commit }) {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    localStorage.removeItem('username')
    localStorage.removeItem('issuperuser')
    commit('DELETE_TOKEN')
    router.push({ name: 'Login' })
  }
}


export default {
  namespaced: true,
  actions,
  state,
  mutations,
  getters
}