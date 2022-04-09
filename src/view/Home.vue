<template>
  <div class="container">
    <div class="flex justify-between items-center">
      <h2 class="text-5xl">News</h2>
      <form action="" class="flex items-center">
        <label class="text-base" for="orderByTitle">Ordina per titolo</label>
        <input
          type="checkbox"
          v-on:change="OrderByTitleChanged"
          v-model="OrderByTitle"
          name="orderByTitle"
          class="ml-2 w-4 h-4"
          id="orderByTitle"
        />
      </form>
    </div>
    <News :news="news" />
    <div class="flex justify-between items-center mb-3">
      <button
      :disabled="pageNumber==1"
        v-on:click="previous"
        class="mt-4 py-2 px-4 text-white text-center rounded-md shadow-md bg-blue-600 hover:bg-blue-500 transition-all delay-150"
      >
        Previous
      </button>
      
      <button
        :disabled="pageNumber+1 > Math.ceil(totalNews/20)"
        v-on:click="next"
        class="mt-4 py-2 px-4 text-white text-center rounded-md shadow-md bg-blue-600 hover:bg-blue-500 transition-all delay-150"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
const baseUrl = "http://127.0.0.1:80";
import News from "../components/News.vue";
import axios from "axios";
export default {
  name: "Home",
  components: {
    News,
  },
  data() {
    return {
      OrderByTitle: "",
      news: [],
      pageNumber: 1,
      totalNews:null,
    };
  },
  methods: {
    OrderByTitleChanged() {
      axios
        .get(`${baseUrl}/news?orderByTitle=${this.OrderByTitle}&page=${this.pageNumber}`)
        .then((res) => {
          console.log(res.data.news);
          this.news=res.data.news;
          this.totalNews=res.data.totalArticles;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    next() {
      this.pageNumber++;
      this.getData(this.pageNumber);
    },
    previous() {
      this.pageNumber--;
      this.getData(this.pageNumber);
    },
    getData(pageNumber=1) {
      this.$store.commit("showProgressBar");
      axios
        .get(`${baseUrl}/news?page=${pageNumber}`)
        .then((res) => {
          this.news = res.data.news;
          this.totalNews=res.data.totalArticles;
          this.$store.commit("hideProgressBar");
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.getData(this.pageNumber);
  },
};
</script>
