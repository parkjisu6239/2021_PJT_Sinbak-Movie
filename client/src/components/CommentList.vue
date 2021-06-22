<template>
  <div>
    <Loading :delayTime="500"/>
    <div :style="allStlye">
      <div style="height: 30rem;">
      </div>
      <div class="mb-3">
        <h3>{{ title }}</h3>
        <small>{{ comments.length }} comments</small>
      </div>
    </div>
    <div>
    <br>
    <div class="container">
      <div class="text-start" style="width: 50rem;">
        <button class="btn btn-lg btn-outline-success" style="transform: translate(250px, 0px);" @click="showCreateModal">댓글 작성하기</button>
      </div>
      <div v-if="comments.length">
        <Comment v-for="comment in comments" :key="comment.id" :comment="comment"/>
      </div>
      <div v-else>
        <h2>No Comments</h2>
      </div>
    </div>
    <ModalsContainer @close="hideCreateModal"/>
    <div style="height: 242px"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import Comment from '@/components/Comment'
import ModalsContainer from 'vue-js-modal/src/components/ModalsContainer'
import CommentCreate from '@/components/CommentElements/CommentCreate'
import Loading from '@/components/Loading'

export default {
  name: 'CommentList',
  components: {
    Comment,
    ModalsContainer,
    Loading,
  },
  data() {
    return {
      backdrop_path: '',
      title: '',
    }
  },
  created() {
    this.get_comments(this.$route.params.id)
    this.get_backdropPath(this.$route.params.id)
  },
  computed: {
    ...mapState('comments', [
      'comments',
      'movieInfo',
    ]),
    allStlye() {
      return {
        'background-image': `linear-gradient(to bottom, transparent, rgba(20, 20, 20, 0.2), rgba(20, 20, 20, 0.5), rgba(20, 20, 20, 0.7), rgb(20, 20, 20, 0.8), rgb(20, 20, 20)), url('${this.backdrop_path}')`, 
        'background-repeat':'no-repeat',
        'background-size': '100% auto',
        'background-position': 'center top'
      }
    }
  },
  methods: {
    ...mapActions('comments', [
      'get_comments',
    ])
    ,
    showCreateModal() {
      this.$modal.show(CommentCreate, 
      {},{
        name: 'create-comment',
        height: "auto",
      }
      )
    },
    hideCreateModal() {
      this.$modal.hide('create-comment')
    },
    get_backdropPath(tmdbId) {
      const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
      const URL = `${process.env.VUE_APP_API_URL}movies/${tmdbId}/backdrop/`
      axios.get(URL, {
        headers: headers
      }) 
        .then(res => {
          console.log(res)
          this.backdrop_path = res.data.backdrop_path
        }) 
        .catch(err => {
          console.log(err)
        })
      }
  }
}
</script>

<style>
/* .vm--modal {
  background-color:white !important;
} */
</style>