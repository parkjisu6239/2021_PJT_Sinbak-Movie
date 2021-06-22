<template>
  <div class="text-start d-flex justify-content-between">
    <div>
      <div class="d-flex align-items-center">
        <h2>{{ movieInfo.title }}</h2>
        <p class="border rounded-3 ms-3 mb-0 px-2 py-1">pop {{ movieInfo.popularity }}</p>
      </div>

      <p>{{ movieInfo.tagline }}</p>
      <hr>
      <div>
        <span>4.5 / 5</span> | 
        <span>PG-13</span> | 
        <span>{{ parseInt(movieInfo.runtime / 60) }}h {{ movieInfo.runtime % 60 }}min</span> |
        <span class="mx-1" v-for="genre in movieInfo.genres" :key="genre.id">{{ genre.name }}</span>
      </div>
      <hr>
      <div class="d-flex">
        <div style="width: 24rem">
          <h2 class="mb-4">Details</h2>
          <div class="mb-1">국가 : {{ movieInfo.production_countries[0].name }}</div>
          <div class="mb-1">언어 : {{ movieInfo.spoken_languages[0].english_name }}</div>
          <div class="mb-1">제작 : {{ movieInfo.production_companies[0].name }}</div>
          <div class="mb-1">개봉 : {{ movieInfo.release_date }}</div>
          <div v-if="directers.length">
            <span>감독 : </span>
            <img v-if="directers[0].profile_path" class="rounded-circle" :src="directers[0].profile_path" :alt="directers[0].name" style="width: 2rem; height:2rem; object-fit:cover">
            <span class="ms-2">{{ directers[0].name }}</span>
          </div>  
        </div>
        <div v-if="actors.length" style="width: 24rem">
          <h2 class="mb-4">Cast</h2>
          <div class="mb-2" v-for="n in 4" :key="n">
            <img v-if="actors[n-1].profile_path" class="rounded-circle" :src="actors[n-1].profile_path" :alt="actors[n-1].name" style="width: 2rem; height:2rem; object-fit:cover">
            <span class="ms-2">{{ actors[n-1].name }}</span>
            <span class="ms-2">({{ actors[n-1].character }})</span>
          </div>          
        </div>
      </div>
    </div>
    <div class="ms-4">
      <img class="m-1" v-for="url in movieImgs" :key="url" :src="url" alt="" style="width: 110px;">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MovieDetailContent',
  computed: {
    ...mapState('moviedetails', [
      'movieInfo',
      'movieImgs',
      'actors',
      'directers',
    ])
  }
}
</script>

<style>

</style>