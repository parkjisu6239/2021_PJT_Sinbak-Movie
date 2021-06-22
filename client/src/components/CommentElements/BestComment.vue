<template>
  <div class="comment-style pt-2">
    <div class="mx-4 mt-2 fw-bold d-flex justify-content-between">
      <button @click="hideAndMoveComment" class="btn btn-outline-success fw-bold" style="color: #7eca9c" >More Comments</button>
      <button @click="hideModal" class="btn btn-outline-success fw-bold" style="color: #7eca9c">X</button>
    </div>
    <div v-if="bestComments.length">
      <hooper :itemsToShow="3" :itemsToSlide="2" :infiniteScroll="false" :wheelControl="true" :mouseDrag="false" style="height: 25rem;">
        <slide v-for="bestComment in bestComments" :key="bestComment.id">
          <BestCommentElement :bestComment="bestComment"/>
        </slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>
      </hooper>
    </div>
    <div v-else style="height: 25rem; color: white;" class="text-center mt-5 pt-5">
      <h2>No comments</h2>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import router from '@/router'
import BestCommentElement from './BestCommentElement'
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper'
import 'hooper/dist/hooper.css';
export default {
  name: 'BestComment',
  data() {
    return {
      bestComments: []
    }
  },
  components: {
    BestCommentElement,
    Hooper,
    Slide,
    HooperNavigation,
  },
  props: {
    tmdbId: {
      type: Number,
    }
  },
  created() {
    this.getBestComment()
  },
  methods: {
    getBestComment(){
      const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
      axios.get(`${process.env.VUE_APP_API_URL}movies/${this.tmdbId}/comments/best/`, {
        headers: headers
      })
        .then(res => {
          const comments = res.data
          comments.sort(function(a, b) {
            if (a.likes_count > b.likes_count) {
              return -1
            } 
            if (a.likes_count < b.likes_count) {
              return 1
            }
            return 0
          })
          this.bestComments = comments
          console.log(this.bestComments)
        })
    },
    hideAndMoveComment() {
      this.$emit('close')
      router.push({name:'CommentList', params: { id: this.tmdbId }})
    },
    hideModal() {
      this.$emit('close')
    }
  },
}
</script>

<style>
.comment-style a {
  text-decoration: none;
  color: black;
}

.vm--modal {
  background-color: rgba(0, 0, 0, 0.9) !important;
}

.icon {
  fill: white;
  width: 100px;
  height: 100px;
}

</style>