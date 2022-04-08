<template>
        <div   class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 mt-4">
            <div v-for="newCompo in news" :key="newCompo.id">
                <NewsItem :data="newCompo"  />
            </div>
        </div>
</template>

<script>
import axios from "axios";
import NewsItem from "./NewsItem.vue";
var localhost = "http://127.0.0.1:80";
export default {
  name: "News",
  data() {
    return {
      news: [],
    };
  },
  components:{
      NewsItem
  },
  mounted() {
    
    this.$store.commit('showProgressBar');
    axios
      .get(`${localhost}/news/`)
      .then((res)=>{
        this.news = res.data;
        this.$store.commit('hideProgressBar');
        
        
      })
      .catch((err) => console.log(err));
  },
};
</script>