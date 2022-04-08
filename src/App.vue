
<template>
  <div>
    <Header/>
    <ProgressBar v-if="this.$store.state.isActive"/>
    <div class="container pt-4">
      <Home/>
    </div>
  </div>
  

</template>

<script>
import Home from './view/Home.vue'
import Header from './components/Header.vue'
import ProgressBar from './components/ProgressBar.vue'

export default {
  name: 'App',
  components:{
    Home,
    Header,
    ProgressBar
    
  },
  data() {
    return {
      main: '',
    }
  }
}
</script>