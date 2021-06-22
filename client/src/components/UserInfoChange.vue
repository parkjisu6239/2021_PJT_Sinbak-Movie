<template>
  <div class="container input-font">
    <Loading :delayTime="500"/>
    <div style="height: 100px"></div>
    <div v-show="!updatedMode">
      <div class="my-4" v-if="newInfo.profile_image" style="transform: translate(17px, 0px)">
        <img :src="newInfo.profile_image" style="border-radius: 50%; width: 150px">
      </div>
      <hr style="width: 450px; transform: translate(443px, 0px)">
      <div class="mb-3 row justify-content-center">
        <label for="last-name" class="col-1 col-form-label text-center fw-bold">last name </label>
        <div class="col-3">
          <input type="text" readonly class="form-control-plaintext" id="last-name" :value="newInfo.last_name" style="color: white;">
        </div>
      </div>
      <hr style="width: 450px; transform: translate(443px, 0px)">
      <div class="mb-3 row justify-content-center">
        <label for="first-name" class="col-1 col-form-label text-center fw-bold">first name </label>
        <div class="col-3">
          <input type="text" readonly class="form-control-plaintext" id="first-name" :value="newInfo.first_name" style="color: white;">
        </div>
      </div>
      <hr style="width: 450px; transform: translate(443px, 0px)">
      <div class="mb-3 row justify-content-center">
        <label for="email" class="col-1 col-form-label text-center fw-bold" style="transform: translate(-14px, 0px)">e-mail </label>
        <div class="col-3">
          <input type="text" readonly class="form-control-plaintext" id="email" :value="newInfo.email" style="color: white;">
        </div>
      </div>
      <hr style="width: 450px; transform: translate(443px, 0px)">
      <div class="col-8" style="transform: translate(234px, 0px)">
        <button @click="updatedMode = true " class="btn btn-outline-success" style="width: 200px ;color: #7eca9c">수정</button>
      </div>
      <div style="transform: translate(17px, 20px)">
        비밀번호를 변경하고 싶다면 <router-link to="/usersetting/passwordchange" style="text-decoration: none; color: #7eca9c;"><b>여기</b></router-link>를 눌러주세요.
      </div>
      <div style="height: 283px"></div>
    </div>
    <div v-show="updatedMode">
      <div class="mb-3 row justify-content-center">
        <label for="image" class="col-1 col-form-label text-center">Profile </label>
        <div class="col-3">
          <input type="file" class="form-control" ref="profileimage" id="image" @change="fileSelect">
        </div>
      </div>
      <div class="mb-3 row justify-content-center">
        <label for="last" class="col-1 col-form-label text-center">last name </label>
        <div class="col-3">
          <input type="text" class="form-control" id="last" v-model="newInfo.last_name">
        </div>
      </div>
      <div class="mb-3 row justify-content-center">
        <label for="first" class="col-1 col-form-label text-center">first name </label>
        <div class="col-3">
          <input type="text" class="form-control" id="first" v-model="newInfo.first_name">
        </div>
      </div>
      <div class="mb-3 row justify-content-center">
        <label for="email" class="col-1 col-form-label text-center">e-mail </label>
        <div class="col-3">
          <input type="text" class="form-control" id="email" v-model="newInfo.email">
        </div>
      </div>
      <div class="col-8 text-end">
        <button @click="getUserinfo(newInfo)" class="btn btn-danger mx-1">취소</button> 
        <button @click="setUserInfo(newInfo)" class="btn btn-primary">완료</button>
      </div>
      <Loading v-if="changed" :delayTime="1000"/>
      <div style="height: 519px"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import Loading from '@/components/Loading'

export default {
  name: 'UserInfoChange',
  components:{
    Loading,
  },
  data() {
    return {
      newInfo: {
        first_name: '',
        last_name: '',
        email: '',
        profile_image: '',
      },
      updatedMode: false,
      changed: false,
    }
  },
  created() {
    this.getUserinfo()
  },
  methods: {
    fileSelect() {
      // refs => file에 접근 가능
      // DOM에 이름을 달아줍니다 => input tag에 ref로 달아주었습니다.
      // JSON이 아닌 form data로 보내주려면 새로운 객체가 필요합니다.
      this.newInfo.profile_image = this.$refs.profileimage.files[0]
      console.log(this.$refs)
    },
    getUserinfo() {
      const headers = { 'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''}
      axios.get(`${process.env.VUE_APP_API_URL}accounts/users/`, {
        headers: headers
      })
      .then(res => {
        console.log(res)
        this.newInfo = {
          ...res.data,
          profile_image: `${process.env.VUE_APP_API_MEDIA_URL}${res.data.profile_image}`
        }
        console.log(this.newInfo)
        this.updatedMode = false
      })
      .catch(err => {
        console.log(this.newInfo)
        console.log(err)
      })
    },
    setUserInfo(newInfo) {
      this.changed = true
      const formData = new FormData()
      formData.append('first_name', newInfo.first_name)
      formData.append('last_name', newInfo.last_name)
      formData.append('email', newInfo.email)
      formData.append('profile_image', newInfo.profile_image)

      const headers = { 
        'Authorization':  localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : '',
        'Content-Type' : 'multipart/form-data',
      }
      axios.put(`${process.env.VUE_APP_API_URL}accounts/users/`, formData, { 
        headers: headers,
      })
        .then(res => {
          // dispatch('accounts/logout', null, { root: true })
          console.log(`${process.env.VUE_APP_API_MEDIA_URL}${res.data.profile_image}`)
          this.newInfo = {
            ...res.data,
            profile_image: `${process.env.VUE_APP_API_MEDIA_URL}${res.data.profile_image}`
          }
          this.updatedMode = false
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>

<style>
.empty-background {
  background-color: rgb(20, 20, 20);
  height: 40rem;
}
.label-font {
  color: white;

}

</style>