
<template>
  <div>
    <ProgressBar v-if="this.$store.state.isActive"/>
    <Alert v-if="this.$store.state.messageAlert && this.$store.state.messageAlert.isActive===true" :message="this.$store.state.messageAlert"/>
    <Header/>
    <BreakingNews/>
    <div class="container pt-4 mainDiv">
      <router-view />
    </div>
    <Footer/>
  </div>
  

</template>

<script>
import Home from './view/Home.vue'
import Header from './components/Header.vue'
import ProgressBar from './components/ProgressBar.vue'
import BreakingNews from './components/BreakingNews.vue'
import Alert from './components/Alert.vue';
import Footer from './components/Footer.vue';
import  './css/main.css'
export default {
  name: 'App',
  components:{
    Home,
    Header,
    ProgressBar,
    BreakingNews,
    Alert,
    Footer
    
  },
  data() {
    return {
      main: '',
    }
  },
}
</script>

<style scoped>
.mainDiv{
  min-height:calc(100vh - 163px) !important;
}
</style>