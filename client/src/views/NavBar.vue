<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="height: 4rem">
    <div id="nav" class="container-fluid mx-4 justify-content-between">
      <div class="d-flex">
        <img src="@/assets/main_logo.png" alt="" style="width: 60px; height: 45px; transform: translate(0px, 2px); cursor: pointer;" class="me-4" @click="moveToHome">
        <div class="me-4" style="line-height: 50px;"><router-link to="/">Home</router-link></div>
        <div><router-link to="/recommendation" style="line-height: 50px;">Recommendation</router-link></div>
      </div>
      <div class="mt-3"><MovieSearchBar/></div>
      <div v-if="isLoggedIn" class="d-flex">
        <a v-if="issuperuser === 'YES'" :href="adminUrl" style="text-decoration: none;" class="me-4">admin</a>
        <div class="me-4"><router-link :to="{ name: 'Profile', params: { username: username } }">Profile</router-link></div>
        <div><router-link to="#" @click.native="logout">Logout</router-link></div>
      </div>
      <div v-else class="d-flex">
        <div class="me-4"><router-link to="/signup">Signup</router-link></div>
        <div><router-link to="/login">Login</router-link></div>
      </div>
    </div>
  </nav>
</template>

<script>
import router from '@/router'
import MovieSearchBar from '@/components/MovieSearchBar'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  components: {
    MovieSearchBar,
  },
  data() {
    return {
      adminUrl: `${process.env.VUE_APP_API_ADMIN_URL}`,
    }
  },
  methods: {
    ...mapActions( 'accounts', [
      'logout'
    ]),
    moveToHome() {
      router.push({ name: 'Home' })
    }

  },
  computed: {
    ...mapState('accounts', [
      'username',
      'issuperuser'
    ]),
    ...mapGetters('accounts', [
      'isLoggedIn',
    ])
  },
}
</script>

<style>
#nav a {
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #7eca9c;
}
</style>