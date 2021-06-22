<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h2>{{ movieInfo.title }} ({{ movieInfo.release_date.substring(0, 4) }})</h2>
      <div>
        <span class="border rounded-3 p-2">TMDB {{ movieInfo.vote_average }}</span>
        <span class='border rounded-3 p-2 ms-1'>vote count {{ movieInfo.vote_count }}</span>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MovieDetailHeader',
  computed: {
    ...mapState('moviedetails', [
      'movieInfo'
    ])
  }
}
</script>

<style>

</style>