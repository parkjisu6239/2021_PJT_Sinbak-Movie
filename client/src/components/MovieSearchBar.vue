<template>
  <div>
    <div class="input-group mb-3 mx-auto" style="width: 30rem">
      <input v-model="inputTxt" @keyup.enter="movieSearch" type="text" class="form-control" placeholder="search" aria-describedby="button-addon">
      <button @click="movieSearch" class="btn btn-outline-primary" type="button" id="button-addon">🔍</button>
    </div>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'MovieSearchBar',
  data() {
    return {
      inputTxt: ''
    }
  },
  methods: {
    movieSearch() {
      router.push({name: 'MovieSearchResult', query: {q: this.inputTxt}})
      // 인풋 비우기
      this.inputTxt = ''
    }
  }
}
</script>

<style>

</style>