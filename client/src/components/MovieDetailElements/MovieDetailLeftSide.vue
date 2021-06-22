<template>
  <div style="width: 210px">
    <img :src="movieInfo.poster_path" :alt="movieInfo.title" class="rounded mb-2" style="width: 200px">
    <div class="d-flex justify-content-center">
      <h5>
        <span v-if="rateAvg" class="badge bg-warning text-dark">
          Rate⭐ {{ rateAvg.toFixed(1) }}
        </span>
        <span v-else class="badge bg-warning text-dark">
          Rate⭐0
        </span>
      </h5>
      <h5><span class="ms-3 badge bg-danger">Likes ❤ {{ transformedCount }}</span></h5>
    </div>
    <MovieRate :rating="rate"/>
    <button v-show="!liked" @click="setMovieLike(movieInfo.id)" class="btn btn-outline-danger my-2" style="width: 200px"><i class="bi bi-suit-heart"></i> Like</button>
    <button v-show="liked" @click="setMovieLike(movieInfo.id)" class="btn btn-outline-danger my-2" style="width: 200px"><i class="bi bi-suit-heart-fill"></i> I Like it!</button>
    <br>
    <button @click="show" class="btn btn-outline-secondary" style="width: 200px; height: 100px;">Comment</button>
    <ModalsContainer @close="hide"/>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import MovieRate from '@/components/MovieDetailElements/MovieRate'
import BestComment from '@/components/CommentElements/BestComment'
import router from '@/router'
import ModalsContainer from 'vue-js-modal/src/components/ModalsContainer' // 여기서 커스텀 modalscontainer 가져오기

export default {
  name: 'MovieDetailLeftSide',
  components: {
    MovieRate,
    ModalsContainer,
  },
  computed: {
    ...mapGetters('moviedetails', [
      'transformedCount',
    ]),
    ...mapState('moviedetails', [
      'movieInfo',
      'liked',
      'count',
      'rate',
      'rateAvg',
    ])
  },
  methods: {
    ...mapActions('moviedetails',[
      'setMovieLike',
      'setMovieRate',
    ]),
    MoveComment(movieId) {
      router.push({ name: 'CommentList', params: { id: movieId } })
    },
    show() {
      this.$modal.show(BestComment,
        { 
          tmdbId: this.movieInfo.id 
        },{
          name: 'dynamic-modal',
          height: '400px',
          width: '1000px',
        }
    )},
    hide() {
      this.$modal.hide('dynamic-modal')
    }
  },
}
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css");
</style>