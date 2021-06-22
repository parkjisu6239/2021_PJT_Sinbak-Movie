<template>
  <div class='item'>
    <img v-if="!simiarMovie.poster_path.match('null')" :src="simiarMovie.poster_path" :alt="simiarMovie.title" style="height: 270px">
    <div v-else class="poster-img-none">
      <div class="text-center" style="line-height: 100px;">no images</div>
      <div class="text-center">❌</div>
    </div>
    <div class="mt-2 me-3">{{ simiarMovie.title }}</div>
  </div>
</template>

<script>
export default {
  name: 'SimilarMovieItem',
  props: {
    simiarMovie: {
      type: Object
    }
  }
}
</script>

<style>
.poster-img-none{
  width: 12rem;
  height: 18rem;
  border-radius: 4px;
  object-fit: fill;
  background-color: darkgrey;
}
</style>