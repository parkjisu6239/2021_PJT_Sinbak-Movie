<template>
  <div class="comment-card border mx-auto p-4 pt-2 rounded-3 my-4 font-color" style="width: 50rem">
    <div class="d-flex justify-content-between" style="height: 20%;">
      <span style="line-height: 60px;">
        <img :src="this.profileURL" alt="" style="border-radius: 50%; width: 30px;">
        <router-link :to="{ name: 'Profile', params: { username: comment.username } }" style="text-decoration: none; color: black" class="mx-2 fw-bold">{{ comment.username }}</router-link>
      </span>
      <div class="d-flex mt-3">
        <p style="transform: translate(0px, 1px);">{{ comment.created_at.substring(0, 10) }}</p>
        <div v-if="comment.movie_rate" class="ms-2">
          <h5>
            <span class="badge bg-warning text-dark">⭐ {{ comment.movie_rate }}</span>
          </h5>
        </div> 
      </div>
    </div>
    <hr class="m-0 mb-2">
    <div v-if="!editMode" class="text-start h-60">
      <div v-for="(word, index) in comment.content.split('\n')" :key="index">{{ word }}</div>
    </div>
    <div v-else>
      <textarea @keyup.enter="updateCompleted(comment.id)" cols="91" v-model="updateContent"></textarea>
      <br>

    </div>
    <hr class="my-2">
    <div class="d-flex justify-content-between">
      <div class="text-start d-flex">
        <div class="me-2">Like {{ count }}</div>
        <div style="transform: translate(0px, -1px); cursor: pointer;" v-show="!liked" @click="setCommentLike"><i class="far fa-thumbs-up" style="color: DarkCyan"></i></div>
        <div style="transform: translate(0px, -1px); cursor: pointer" v-show="liked" @click="setCommentLike"><i class="fas fa-thumbs-up" style="color: DarkCyan"></i></div>
      </div>
      <div v-if="!editMode">
        <div class="text-end" v-if="user == comment.user">
          <button class="btn btn-danger btn-sm me-1" @click="delete_comment({tmdbId: Number($route.params.id), commentId: Number(comment.id)})">삭제</button>
          <button class="btn btn-primary btn-sm" @click="editModeEnter(comment.content)">수정</button>
        </div>
      </div>
      <div v-else>
        <div class="text-end">
          <button class="btn btn-secondary btn-sm me-1" @click="editMode = false">취소</button>
          <button class="btn btn-success btn-sm" @click="updateCompleted(comment.id)">완료</button>
        </div>
      </div>

    </div>
    <hr class="m-1">

    <div class="text-start">
      <small @click="recommentShow = !recommentShow" style="cursor: pointer">댓글 작성하기 & 보기</small>
    </div>
    <div v-show="recommentShow">
      <ReCommentList :comment="comment"/>
    </div>
  </div>

</template>

<script>
import { dom } from '@fortawesome/fontawesome-svg-core'
dom.watch()

import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp as fasThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as farThumbsUp } from "@fortawesome/free-regular-svg-icons"

library.add(fasThumbsUp, farThumbsUp)


import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import ReCommentList from '@/components/ReCommentList'

export default {
  name: 'Comment',
  components:{
    ReCommentList
  },
  props:{
    comment: {
      type: Object
    }
  },
  data() {
    return {
      editMode: false,
      updateContent: '',
      liked: null,
      count: 0,
      recommentShow: false,
    }
  },
  created() {
    this.getCommentLike()
  },
  computed: {
    ...mapState('accounts',[
      'user'
    ]),
    profileURL() {
      return `${process.env.VUE_APP_API_MEDIA_URL}${this.comment.profile_image}`
    }
  },
  methods: {
    ...mapActions('comments',[
      'delete_comment',
      'update_comment'
    ]),
    editModeEnter(content){
      this.editMode = true
      this.updateContent = content
    },
    updateCompleted(commentId) {
      this.update_comment({tmdbId: Number(this.$route.params.id), commentId: Number(commentId), content: this.updateContent })
      this.editMode = false
    },
    getCommentLike() {
      const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
      axios.get(`${process.env.VUE_APP_API_URL}movies/comments/${Number(this.comment.id)}/like/`, {
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
      axios.post(`${process.env.VUE_APP_API_URL}movies/comments/${Number(this.comment.id)}/like/`, {}, {
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

<style>
.comment-card {
  background-color: #faf2d3;
  width: 60%; 
}

.font-color {
  color: rgb(0, 0, 0);
}

</style>