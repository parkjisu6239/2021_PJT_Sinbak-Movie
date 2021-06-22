	<template>
  <div class="text-start ms-2 my-1">
    <span>
      <span class="mx-1"><img :src="profileURL" style="border-radius:50%; width: 25px;" ></span>
      <router-link class="ms-1 fw-bold text-decoration-none" style="color: black;" :to="{name: 'Profile', params:{username: recomment.username}}">{{ recomment.username }}</router-link>
      <span class="mx-3">{{ recomment.content }}</span>
    </span> 
    <button class="btn btn-sm text-secondary" v-if="user == recomment.user" @click="delete_recomment">삭제</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ReComment',
  props:{
    recomment: {
      type: Object,
    },
    profileImage: {
      type: String,
    }
  },
  methods: {
    delete_recomment(){
      this.$emit('delete_recomment', this.recomment.id)
    }
  },
  computed: {
    ...mapState('accounts', [
      'user',
    ]),
    profileURL() {
      return `${process.env.VUE_APP_API_MEDIA_URL}${this.profileImage}`
    },
  },

}
</script>
<style>
</style>