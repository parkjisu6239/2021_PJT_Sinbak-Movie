<template>
  <div class="container-fluid" style="height: 873px">
    <div style="height: 100px"></div>
    <h2>Signup</h2>
    <div class="mx-auto basic">
      <div class="my-3">
        <div class="text-start fw-bold">
          아이디 :
        </div>
        <input
          class="form-control"
          id="username" 
          type="text" 
          v-model.trim="credentials.username">
      </div>
      <div class="my-3">
        <div class="text-start fw-bold">
          비밀번호 :
        </div>
        <input
          class="form-control"
          id="password" 
          type="password" 
          v-model.trim="credentials.password">
      </div>
      <div class="my-3">
        <div class="text-start fw-bold">
          비밀번호 확인 :
        </div>
        <input
          @keyup.enter="signupClick(credentials)" 
          class="form-control"
          id="password_confirmation" 
          type="password" 
          v-model.trim="credentials.password_confirmation">
      </div>
      <hr>
      <div style="color: #7eca9c">{{ message }}</div>
      <div style="color: #7eca9c">{{ signupError }}</div>
      <br>
      <div class="text-end">
        <button @click="signupClick(credentials)" class="btn btn-success" style="color: #7eca9c">회원가입</button>
      </div>
    </div>

    <div style="height: 50px">
    </div>
    <img v-if="!message" src="../assets/totoro_smile.png" alt="" style="height: 20rem">
    <img v-else src="../assets/totoro_fail.png" alt="" style="height: 20rem">
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Signup',
  data() {
    return {
      credentials : {
        username: '',
        password: '',
        password_confirmation: '',
      },
      message: ''
    }
  },
  methods: {
    ...mapActions('accounts',[
      'signup',
    ]),
    signupClick(credentials) {
      if (credentials.password && credentials.password_confirmation) {
        if (credentials.password === credentials.password_confirmation) {
          this.message= ''
          this.signup(credentials)
        } else {
          this.message = '비밀번호가 일치하지 않습니다.'
        }
      } else {
        this.message='비밀번호의 형식이 잘못되었습니다! 1글자 이상'
      }
    }
  },
  computed: {
    ...mapState('accounts', [
      'signupError'
    ])
  }
}
</script>

<style>
.basic {
  width: 30%;
}
</style>