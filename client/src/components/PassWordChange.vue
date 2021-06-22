<template>
  <div style="height: 873px">
    <div style="height: 100px"></div>
    <div class="mx-auto" style="width: 500px">
      <h3>비밀번호 변경</h3>
      <hr>
      <br>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">기존 비밀번호</span>
        <input type="password" v-model="credentials.old_password" class="form-control" aria-describedby="basic-addon1">
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon2">새 비밀번호</span>
        <input type="password" v-model="credentials.new_password1" class="form-control" aria-describedby="basic-addon2">
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon3">새 비밀번호 확인</span>
        <input type="password" v-model="credentials.new_password2" class="form-control" @keyup.enter="clickPasswordChange" aria-describedby="basic-addon3">
      </div>
      <br>
      <div style="color: #7eca9c">{{ message }}</div>
      <br>
      <button class="btn btn-outline-success" style="color: #7eca9c" @click="clickPasswordChange">비밀번호 변경</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'PassWordChange',
  data() {
    return {
      credentials: {
        old_password: '', 
        new_password1: '', 
        new_password2: '',
      },
      message: ''
    }
  },
  methods: {
    ...mapActions('userinfos',[
      'passwordChange',
    ]),
    clickPasswordChange() {
      if (this.credentials.new_password1 === this.credentials.new_password2) {
        this.passwordChange(this.credentials)
      } else {
        this.message = '비밀번호가 일치하지 않습니다.'
      }
    }
  }
}
</script>

<style>

</style>