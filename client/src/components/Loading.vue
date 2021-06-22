<template>
    <div class="vld-parent">
        <loading :active.sync="isLoading" 
        :can-cancel="false"
        :is-full-page="fullPage"
        :opacity="0.9"
        :background-color="backColor"
        :color="color"
        ></loading>
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  data() {
      return {
        isLoading: true,
        fullPage: true,
        backColor: '#000',
        color: '#fff',
      }
  },
  props: {
    delayTime: {
      type: Number
    }
  },
  components: {
    Loading
  },
  methods: {
    loadingDelay() {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, this.delayTime)
    }
  },
  created() {
    this.loadingDelay()
  },
  watch: {
    $route() {
      this.loadingDelay()
    }
  }
}
</script>
<style>

</style>