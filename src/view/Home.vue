<template>
  <div class="container">
    <div class="flex justify-between flex-col sm:flex-row sm:items-center">
      <h2 class="text-5xl">News</h2>
<<<<<<< HEAD
      <form action="" class="flex flex-col">
=======
      

      <form action="" class="flex flex-col  ">
      

        
>>>>>>> bc251ccf41a849ee370c6d20a9b0938cabe98803
        <div class="">
          <select v-model="selectedSource" @change="sourceChanged($event)" class="
              border border-gray-300
              px-4
              py-1
              text-sm
              font-medium
              text-gray-700
              hover:bg-gray-50
              focus:ring-2 focus:ring-offset-2
              z-50
              mt-2
              w-full
              sm:w-56
              rounded-md
              shadow-md
              bg-white
              ring-1 ring-black ring-opacity-5
              focus:outline-none
            ">
            <option disabled value="">Filter by source</option>
            <option value="all">All</option>
            <option v-for="source in this.$store.state.newsSources" :key="source"
              class="text-gray-700 hover:bg-gray-200 block px-4 py-2 text-sm" role="menuitem" selected tabindex="-1"
              id="menu-item-0">
              {{ source }}
            </option>
          </select>
        </div>

        <div class="flex items-center mt-2">
          <input type="checkbox" @change="OrderByTitleChanged" v-model="OrderByTitle" name="orderByTitle"
            class="w-4 h-4 rounded-md shadow-md" id="orderByTitle" />
          <label class="form-check-label ml-2 inline-block text-gray-800" for="orderByTitle">Order by title</label>
        </div>
      </form>
    </div>
    <News :news="this.$store.state.news" />

    <div class="flex justify-center" v-if="
      this.$store.state.news.length === 0 &&
      this.$store.state.isActive === false
    ">
      <h2 class="text-2xl font-bold">Sorry there,no news found</h2>
    </div>

    <div class="flex justify-center mb-3">
      <div v-if="this.$store.state.news.length !== 0" class="flex justify-center items-center mt-2">
        <img v-if="this.$store.state.pageNumber !== 1" class="
            w-4
            mr-2
            hover:scale-105
            transition-all
            delay-100
            transform
            hover:-translate-x-2
            cursor-pointer
          " v-on:click="previousPage" src="../assets/arrow.png" alt="" />

        <img v-if="
          this.$store.state.pageNumber + 1 ===
          Math.ceil(this.$store.state.totalNews / 20)
        " class="
            cursor-pointer
            w-4
            ml-2
            hover:scale-105
            transition-all
            delay-100
            transform
            hover:translate-x-2
          " v-on:click="nextPage" src="../assets/right-arrow.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import News from "../components/News.vue";
export default {
  name: "Home",
  components: {
    News,
  },
  data() {
    return {
      OrderByTitle: "",
      pageNumber: 1,
      totalNews: null,
      selectedSource: "",
    };
  },
  methods: {
    OrderByTitleChanged() {
      this.$store.commit('setOrderChecked', this.OrderByTitle);
      this.$store.dispatch("ordinePerTitolo", {
        orderByTitle: this.OrderByTitle,
      });
    },
    nextPage() {
      this.$store.dispatch("next");
      window.scrollTo(0, 0);
    },
    previousPage() {
      this.$store.dispatch("previous");
      window.scrollTo(0, 0);
    },
    sourceChanged(event) {
      this.$store.dispatch("getNewBasedOnSource", {
        source: event.target.value,
      });
    },
  },
  mounted() {
    this.$store.dispatch("getNews");
  },
  created() {
    this.totalNews = this.$store.state.totalNews;
  },
};
</script>
