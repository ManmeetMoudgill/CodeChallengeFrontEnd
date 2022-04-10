
<template>
  <div>
    <ProgressBar v-if="this.$store.state.isActive"/>
    <Header/>
      <BreakingNews/>
    <div class="container pt-4">
      <Home/>
    </div>
  </div>
  

</template>

<script>
import Home from './view/Home.vue'
import Header from './components/Header.vue'
import ProgressBar from './components/ProgressBar.vue'
import BreakingNews from './components/BreakingNews.vue'
import  './css/main.css'
export default {
  name: 'App',
  components:{
    Home,
    Header,
    ProgressBar,
    BreakingNews
    
  },
  data() {
    return {
      main: '',
    }
  }
}
</script>
