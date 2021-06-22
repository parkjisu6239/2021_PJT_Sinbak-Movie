<template>
  <div>
    <div style="height: 100%; background-color: white;">
      <h2 style="font-family: 'Nanum Pen Script', cursive; color: black;" class="pt-3 text-center">진....짜에요?</h2>
      <img src="@/assets/pants_evichu.png" class="ms-4" alt="">
    <div class="p-5">
      <button
        @click="hideOnly"
        class="btn btn-outline-dark btn-lg fw-bold me-5" 
        style="font-family: 'Nanum Pen Script', cursive; font-size: 25px;">
        ❤미안해 내가 더 잘할게❤
      </button>
      <button 
        @click="hideWithUserDelete"
        class="btn btn-outline-dark btn-lg fw-bold" 
        style="font-family: 'Nanum Pen Script', cursive; font-size: 25px;">
        😥탈퇴하기😭
      </button>
    </div>
    </div> 
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'UserDelete',
  methods: {
    ...mapActions('userinfos', [
      'deleteUser'
    ]),
    hideWithUserDelete() {
      this.deleteUser()
      this.$emit('close')
    },
    hideOnly() {
      this.$emit('close')
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap');
</style>