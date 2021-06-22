<template>
  <div class="container">
    <Loading :delayTime="1000"/>
    <div style="height: 100px"></div>
    <div class="d-flex justify-content-center w-50 m-auto">
      <div class="col-6 m-0 p-0">
        <ProfileImage :profileImage="profile_image"/>
      </div>
      <div class="col-6 p-0  h-50">
        <ProfileSection 
          :ProfileUsername="$route.params.username"
          :followInfo="followInfo"
          :RatedMovieCnt="RatedMovieCnt"
          @set-follow="setFollow($route.params.username)"
        />
      </div>
    </div>
    <hr class="m-auto my-5">
    <h2>Rated Movies</h2>
    <div class="mt-5">
      <div v-if="RatedMovieCnt">
        <hooper :itemsToShow="6" :itemsToSlide="2" :wheelControl="false" style="height: 435px;">
          <slide v-for="userRatedMovie in userRatedMovies" :key="userRatedMovie.tmdb_id" class="popup-container ms-3">
            <RatedMovie
              :userRatedMovie="userRatedMovie"
              class="item"
            />
          </slide>
          <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </hooper>
      </div>
      <div v-else class="my-5">
        <h3>아직 평가된 영화가 없어요!</h3>
      </div>
    </div>
    <hr class="m-auto my-5">
    <h2>Liked Movies</h2>
    <div class="mt-5">
      <div v-if="LikedMovieCnt">
        <hooper :itemsToShow="6" :itemsToSlide="2" :wheelControl="false" style="height: 400px;">
          <slide v-for="userLikedMovie in userLikedMovies" :key="userLikedMovie.tmdb_id" class="popup-container ms-3">
            <LikedMovie
              :userLikedMovie="userLikedMovie"
              class="item"
            />
          </slide>
          <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </hooper>
      </div>
      <div v-else class="my-5">
        <h3>아직 보고싶은 영화가 없어요!</h3>
      </div>
      <div style="height: 159px"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import ProfileImage from '@/components/ProfileComponents/ProfileImage'
import ProfileSection from '@/components/ProfileComponents/ProfileSection'
import RatedMovie from '@/components/ProfileComponents/RatedMovie'
import LikedMovie from '@/components/ProfileComponents/LikedMovie'
import Loading from '@/components/Loading'

import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper'
import 'hooper/dist/hooper.css';

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Profile',
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    ProfileImage,
    ProfileSection,
    RatedMovie,
    LikedMovie,
    Loading,
  },
  data() {
    return {
      profileName: this.$route.params.username,
      profile_image: '', 
      userRatedMovies: [],
      userLikedMovies: [],
    }
  },
  computed: {
    ...mapState('accounts', [
      'username',
    ]),
    ...mapState('userinfos', [
      'followInfo',
    ]),
    RatedMovieCnt() {
      return this.userRatedMovies.length
    },
    LikedMovieCnt() {
      return this.userLikedMovies.length
    }
  },
  methods: {
    ...mapActions('userinfos', [
      'getFollow',
      'setFollow',
    ]),
    getUserProfileInfo() {
      const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
      axios.get(`${process.env.VUE_APP_API_URL}accounts/${this.$route.params.username}/user/movies/`, {
        headers: headers
      })
        .then(res => {
          console.log(res)
          this.userRatedMovies = res.data[0]
          this.userLikedMovies = res.data[1]
          this.profile_image = res.data[2].profile_image
        })
    }
  },
  created() {
    this.getFollow(this.$route.params.username)
    this.getUserProfileInfo(this.$route.params.username)
  },
  watch: {
    $route() {
      this.getFollow(this.$route.params.username)
      this.getUserProfileInfo(this.$route.params.username)
    }
  }
}
</script>

<style>
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