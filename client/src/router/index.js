import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import CommentList from '@/components/CommentList.vue'
import Profile from '../views/Profile.vue'
import UserInfoChange from '@/components/UserInfoChange.vue'
import PassWordChange from '@/components/PassWordChange.vue'
import MovieDetail from '@/components/MovieDetail'
import MovieSearchResult from '@/components/MovieSearchResult'
import Recommendation from '../views//Recommendation'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/:id/comments',
    name: 'CommentList',
    component: CommentList,
  },
  {
    path: '/:username/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/:username/usersetting/userinfochange',
    name: 'UserInfoChange',
    component: UserInfoChange,
  },
  {
    path: '/usersetting/passwordchange',
    name: 'PassWordChange',
    component: PassWordChange,
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetail,
  },
  {
    path: '/search',
    name: 'MovieSearchResult',
    component: MovieSearchResult,
  },
  {
    path: '/recommendation',
    name: 'Recommendation',
    component: Recommendation,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// vue router 참고사항!
// 전역 가드 : beforeEach
router.beforeEach((to, from, next) => {
  // 로그인 한 사람이면 login & signup 페이지에 접근 못하게!
  // 로그인 === 토큰
  const accessToken = localStorage.getItem('access_token')
  const authPaths = ['Login', 'Signup']
  if (accessToken) {
    // 로그인 한 사람!
    if (authPaths.includes(to.name)) {
      // 로그인 혹은 회원가입 페이지로 이동을 시도하면
      // Todo 페이지로 강제 이동
      next({ name: 'Home' })
    } else {
      next()
    }
  } else {
    // 로그인 안 한 사람!
    if (authPaths.includes(to.name)) {
      // 로그인 혹은 회원가입 페이지로 이동하려고하면 그냥 보내주고
      next()
    } else {
      // 아니면 강제 이동
      next({ name: 'Login' })
    }
  }
})



export default router
