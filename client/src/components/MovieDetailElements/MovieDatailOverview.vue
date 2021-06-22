<template>
  <div>
    <h3 class="text-start">Overview</h3>
    <p class="text-start">{{ movieInfo.overview }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MovieDatailOverview',
  computed: {
    ...mapState('moviedetails', [
      'movieInfo'
    ])
  }
}
</script>

<style>

</style>