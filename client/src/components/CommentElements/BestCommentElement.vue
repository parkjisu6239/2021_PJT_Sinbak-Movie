<template>
  <div class="comment-card mt-4 m-auto rounded">
    <div class="fw-bold text-start m-2 pt-3" style="color: black;">
      <img :src="profileURL" alt="" style="border-radius: 50%; width: 30px; "> 
      <router-link 
        :to="{ name: 'Profile', params: { username: bestComment.username } }" 
        style="text-decoration: none; color: black" 
        class="mx-2 fw-bold">
          {{ bestComment.username }}
      </router-link>
    </div>
    <hr class="mb-1 mx-1 mt-0" style="color: black;">
    <div class="text-start px-2" style="height: 60%; color: black; overflow: hidden;" >
      {{ bestComment.content }}
    </div>
    <hr class="m-1" style="color: black;">
    <div class="d-flex justify-content-between p-1" style="margin-top:2px;">
      <div class="btn p-0 mx-2" style="cursor: pointer" v-show="!liked" @click="setCommentLike"><i class="bi bi-suit-heart" style="color: crimson; font-size: 20px"></i></div>
      <div class="btn p-0 mx-2" style="cursor: pointer" v-show="liked" @click="setCommentLike"><i class="bi bi-suit-heart-fill" style="color: crimson; font-size: 20px"></i></div>
      <div class="fw-bold d-flex" style="transform: translate(0px, 4px);">
        <h5>
          <span class="badge bg-success mx-1 px-2">Re {{ bestComment.recomment_count }}</span>
        </h5>
        <h5>
          <span class="badge bg-danger mx-1 px-2">Like {{ count }}</span>
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'BestCommentElement',
  data() {
    return {
      liked: 0,
      count: 0,
    }
  },
  props: {
    bestComment: {
      type: Object,
    }
  },
  computed: {
    profileURL() {
      return `${process.env.VUE_APP_API_MEDIA_URL}${this.bestComment.profile_image}`
    }
  },
  created() {
    this.getCommentLike()
  },
  methods: {
    getCommentLike() {
      const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
      axios.get(`${process.env.VUE_APP_API_URL}movies/comments/${Number(this.bestComment.id)}/like/`, {
        headers: headers
      })
        .then(res => {
          this.liked = res.data.liked
          this.count = res.data.count
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    setCommentLike() {
      const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
      axios.post(`${process.env.VUE_APP_API_URL}movies/comments/${Number(this.bestComment.id)}/like/`, {}, {
        headers: headers
      })
        .then(res => {
          this.liked = res.data.liked
          this.count = res.data.count
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.comment-card{
  background-color:#faf2d3;
  height: 18rem;
  width: 18rem;
}

</style>