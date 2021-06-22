<template>
  <div class="container-fluid" style="height: 873px">
    <div style="height: 100px"></div>
    <h2>Login</h2>
    <div class="mx-auto" style="width: 30%;">
      <div class="mx-auto">
        <div class="text-start fw-bold">아이디: </div>
        <input id="username" type="text" class="form-control" v-model="credentials.username">
      </div>
      <div class="mx-auto">
        <div class="text-start fw-bold mt-2">비밀번호: </div>
        <input id="password" type="password" class="form-control" @keyup.enter="login(credentials)" v-model="credentials.password">
      </div>
      <hr class="mx-auto">
      <div v-if="errorMessage" class="mt-3">
        <span style="color: #7eca9c;" >{{ errorMessage }}</span>
      </div>
      <div class="text-end">
        <button @click="login(credentials)" class="btn btn-success" style="color: #7eca9c">로그인</button>
      </div>
    </div>
    <br>
    <div style="height: 100px">
    </div>
    <img src="../assets/minions.png" alt="" style="height: 20rem">
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      credentials: {
        username: '',
        password: '',
      }
    }
  },
  computed: {
    ...mapState('accounts', [
      'errorMessage',
    ])
  },
  methods: {
    ...mapActions('accounts', [
      'login',
    ]),
  }
}
</script>

<style>
.empty-background {
  background-color: rgb(20, 20, 20);
  height: 30rem;
}
</style>