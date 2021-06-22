<template>
  <div id="app">
    <NavBar/>
    <footer>
      <Footer/>
    </footer>
    <router-view/>
  </div>
</template>
<script>
import NavBar from '@/views/NavBar'
import Footer from '@/views/Footer'

export default {
  name: 'App',
  components: {
    NavBar,
    Footer,
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700&display=swap');
#app {
  font-family: 'Noto Sans KR', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e0e0e0;
  background-color: rgb(20, 20, 20);
}

</style>
