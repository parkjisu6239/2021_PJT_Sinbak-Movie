	<template>
  <div>
    <br>
    <div class="input-group mb-3">
      <input @keyup.enter="create_recomment({commentId: comment.id, content: recommentContent})" type="text" class="form-control" v-model="recommentContent" aria-describedby="button-addon">
      <button @click="create_recomment({commentId: comment.id, content: recommentContent})" class="btn btn-success" type="button" id="button-addon">작성</button>
    </div>
    <ReComment v-for="recomment in recomments" :key="recomment.id" :recomment="recomment" :profileImage="recomment.profile_image" @delete_recomment="deleteRecomment"/>
  </div>
</template>

<script>
import ReComment from '@/components/ReComment'
import axios from 'axios'


export default {
  name: 'ReCommentList',
  components: {
    ReComment
  },
  data() {
    return {
      recommentContent: '',
      recomments: [],
    }
  },
  props: {
    comment: {
      type: Object,
    }
  },
  methods:{
    get_recomments() {
      const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
      const URL = `${process.env.VUE_APP_API_URL}movies/${this.comment.id}/recomment/`
      axios.get(URL, {
        headers: headers
      }) 
        .then(res => {
          console.log(res)
          this.recomments = res.data
        }) 
        .catch(err => {
          console.log(err)
        })
    },
    create_recomment() {
      const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
      const URL = `${process.env.VUE_APP_API_URL}movies/${this.comment.id}/recomment/`
      axios.post(URL, {
        content: this.recommentContent,
      }, { headers: headers })
        .then(res => {
          console.log(res)
          this.get_recomments()
          this.recommentContent = ''
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteRecomment(recommentId) {
      const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
      const URL = `${process.env.VUE_APP_API_URL}movies/${this.comment.id}/recomment/${recommentId}/`
      axios.delete(URL, {
        headers: headers
      })
        .then(res => {
          console.log(res)
          this.get_recomments()
        })
        .catch(err => {
          console.log(err)
        })
 
    }
  },
  created() {
    this.get_recomments(this.comment.id)
  }
}
</script>

<style>
</style>